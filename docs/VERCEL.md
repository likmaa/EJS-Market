# 🚀 Guide Complet - Déploiement Vercel

Guide consolidé pour déployer et configurer l'application sur Vercel.

## 📋 Variables d'Environnement Requises

### Obligatoires

1. **DATABASE_URL** - URL de connexion PostgreSQL (Supabase recommandé)
2. **NEXTAUTH_SECRET** - Secret JWT (minimum 32 caractères)
3. **NEXTAUTH_URL** - URL de votre application Vercel

### Optionnelles (pour plus tard)

- `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

---

## 🔧 Configuration Étape par Étape

### 1. Obtenir DATABASE_URL (Supabase)

1. Allez sur [supabase.com](https://supabase.com) → Créez un projet
2. **Settings** → **Database** → **Connection Pooler**
3. Sélectionnez **"Session mode"** (port 5432)
4. Copiez la connection string
5. **Format attendu** :
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres?schema=public
   ```
6. **Encoder le mot de passe** si caractères spéciaux :
   ```bash
   node -e "console.log(encodeURIComponent('VOTRE_MOT_DE_PASSE'))"
   ```

### 2. Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 3. Configurer sur Vercel

1. **Vercel** → **Settings** → **Environment Variables**
2. Ajoutez chaque variable :
   - **Key** : `DATABASE_URL`
   - **Value** : Connection string Supabase (pooler)
   - **Environments** : ✅ Production, ✅ Preview, ✅ Development
   - **Sensitive** : ✅ Activé
3. Répétez pour `NEXTAUTH_SECRET` et `NEXTAUTH_URL`
4. **Redéployez** après modification

---

## 🗄️ Initialisation de la Base de Données

### Option 1 : Via Vercel CLI (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter et lier le projet
vercel login
vercel link

# Récupérer les variables
vercel env pull .env.local

# Initialiser la base
npx prisma db push
npx prisma generate
npm run db:seed
```

### Option 2 : Via Script Local

```bash
# Utiliser les variables Vercel
DATABASE_URL="votre-connection-string" npx prisma db push
DATABASE_URL="votre-connection-string" npm run db:seed
```

---

## 🔑 Accès Admin

### Identifiants par Défaut

**Admin** :
- Email : `admin@ejsmarket.com`
- Mot de passe : `Admin123!`

**Manager** :
- Email : `manager@ejmarket.com`
- Mot de passe : `Manager123!`

⚠️ **Changez ces mots de passe en production !**

### URLs

- **Login** : `https://votre-projet.vercel.app/login`
- **Admin** : `https://votre-projet.vercel.app/admin`

---

## 🐛 Dépannage

### Erreur : `PrismaClientInitializationError`

**Causes** :
- `DATABASE_URL` incorrecte ou manquante
- Mot de passe non encodé
- Restrictions réseau Supabase

**Solutions** :
1. Vérifier `DATABASE_URL` utilise le **pooler** (`.pooler.supabase.com`)
2. Encoder le mot de passe si caractères spéciaux
3. Vérifier **Network Restrictions** dans Supabase
4. Redéployer après modifications

### Erreur : `NEXTAUTH_SECRET must be at least 32 characters`

**Solution** :
- Régénérer avec `openssl rand -base64 32`
- Mettre à jour sur Vercel
- Redéployer

### Erreur : "Mot de passe incorrect" sur Vercel

**Vérifications** :
1. Base de données initialisée (tables créées)
2. Utilisateur admin créé (`npm run db:seed`)
3. `DATABASE_URL` correcte sur Vercel
4. Logs Vercel pour erreurs Prisma/NextAuth

### Voir les Logs

1. **Vercel** → **Logs**
2. Filtrer par "Error"
3. Chercher messages `[Prisma]` ou `[NextAuth]`

---

## ✅ Checklist de Vérification

- [ ] `DATABASE_URL` configurée avec pooler Supabase
- [ ] Mot de passe encodé en URL si nécessaire
- [ ] `NEXTAUTH_SECRET` fait au moins 32 caractères
- [ ] `NEXTAUTH_URL` correspond à l'URL Vercel
- [ ] Base de données initialisée (tables créées)
- [ ] Utilisateur admin créé
- [ ] Application redéployée après modifications
- [ ] Logs Vercel sans erreurs critiques

---

## 🔄 Alternative : Utiliser Neon

Si Supabase pose problème, **Neon** est plus simple pour Vercel :

1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un projet PostgreSQL
3. Récupérer la connection string (format simple)
4. Mettre à jour `DATABASE_URL` sur Vercel
5. Initialiser la base

**Avantages** :
- ✅ Optimisé pour Vercel
- ✅ Pas besoin de pooler
- ✅ Connection string simple
- ✅ Gratuit pour commencer

---

**Dernière mise à jour** : 2024


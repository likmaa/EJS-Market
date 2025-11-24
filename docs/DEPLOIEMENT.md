# 🚀 Guide de Déploiement

## 📦 GitHub

### 1. Créer le dépôt sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (ou **"+"** > **"New repository"**)
3. Remplissez les informations :
   - **Repository name** : `electronica-jardin-store` (ou le nom de votre choix)
   - **Description** : "E-commerce platform for electronics and garden products in Europe"
   - **Visibility** : Public ou Private (selon votre choix)
   - **NE PAS** cocher "Initialize with README" (on a déjà les fichiers)
4. Cliquez sur **"Create repository"**

### 2. Connecter le dépôt local à GitHub

Une fois le dépôt créé, GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Ajouter le remote (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/electronica-jardin-store.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

**Alternative avec SSH** (si vous avez configuré SSH) :
```bash
git remote add origin git@github.com:USERNAME/electronica-jardin-store.git
git branch -M main
git push -u origin main
```

---

## ☁️ Vercel

### Option 1 : Déploiement depuis GitHub (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"Add New Project"**
4. Importez votre dépôt GitHub (il devrait apparaître dans la liste)
5. Configurez le projet :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
6. Ajoutez les **Environment Variables** :
   ```
   DATABASE_URL=votre-url-postgresql
   NEXTAUTH_URL=https://votre-projet.vercel.app
   NEXTAUTH_SECRET=votre-secret-ici
   ```
7. Cliquez sur **"Deploy"**

Vercel déploiera automatiquement à chaque push sur GitHub ! 🎉

### Option 2 : Déploiement avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

---

## 🗄️ Configuration Base de Données

### Pour la production (Vercel)

Vous devez configurer une base de données PostgreSQL en production :

#### Option 1 : Supabase (Recommandé)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans **Settings** > **Database**
4. Copiez la **Connection String** (URI)
5. Ajoutez-la dans Vercel comme variable d'environnement `DATABASE_URL`

#### Option 2 : Railway

1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet PostgreSQL
3. Copiez l'URL de connexion
4. Ajoutez-la dans Vercel

### Migration de la base de données

Une fois la DB configurée, vous devez exécuter les migrations :

```bash
# Option 1 : Via Vercel CLI (recommandé)
vercel env pull .env.local
npx prisma migrate deploy

# Option 2 : Via script dans Vercel
# Ajoutez un script "postinstall" dans package.json :
# "postinstall": "prisma generate && prisma migrate deploy"
```

---

## 🔐 Variables d'Environnement Vercel

Ajoutez ces variables dans **Settings** > **Environment Variables** sur Vercel :

### Obligatoires
- `DATABASE_URL` : URL PostgreSQL
- `NEXTAUTH_SECRET` : Générer avec `openssl rand -base64 32`
- `NEXTAUTH_URL` : URL de votre site Vercel (ex: `https://votre-projet.vercel.app`)

### Optionnelles (selon fonctionnalités)
- `STRIPE_PUBLIC_KEY` : Clé publique Stripe
- `STRIPE_SECRET_KEY` : Clé secrète Stripe
- `STRIPE_WEBHOOK_SECRET` : Secret webhook Stripe
- `ALGOLIA_APP_ID` : ID application Algolia
- `ALGOLIA_ADMIN_API_KEY` : Clé admin Algolia
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` : Clé recherche Algolia
- `RESEND_API_KEY` : Clé API Resend (emails)

---

## 📝 Checklist Déploiement

### Avant de déployer
- [ ] Code poussé sur GitHub
- [ ] Base de données PostgreSQL créée (Supabase/Railway)
- [ ] Variables d'environnement préparées
- [ ] `NEXTAUTH_SECRET` généré

### Sur Vercel
- [ ] Projet créé et connecté à GitHub
- [ ] Variables d'environnement ajoutées
- [ ] Build réussi
- [ ] Site accessible

### Après déploiement
- [ ] Migrations DB exécutées (`prisma migrate deploy`)
- [ ] Seed DB exécuté (`npm run db:seed`)
- [ ] Test du site en production
- [ ] Vérification SSL/TLS (automatique avec Vercel)

---

## 🔄 Déploiement Automatique

Avec Vercel connecté à GitHub :
- **Chaque push sur `main`** → Déploiement automatique en production
- **Pull Requests** → Preview deployment automatique
- **Rollback** possible depuis le dashboard Vercel

---

## 🐛 Dépannage

### Erreur "Module not found"
- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez que `node_modules` est bien dans `.gitignore`

### Erreur de build
- Vérifiez les logs dans Vercel
- Testez le build localement : `npm run build`

### Erreur de connexion DB
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que la DB accepte les connexions externes (Supabase : Settings > Database > Connection Pooling)

### Erreur Prisma
- Exécutez `npx prisma generate` avant le build
- Ajoutez dans `package.json` : `"postinstall": "prisma generate"`

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js Deployment](https://nextjs.org/docs/deployment)
- [Documentation Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Bon déploiement ! 🚀**


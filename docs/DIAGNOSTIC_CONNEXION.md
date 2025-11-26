# 🔍 Diagnostic de Connexion - Guide de Dépannage

## ✅ Tests Locaux Réussis

Les tests locaux confirment que :
- ✅ Connexion à la base de données fonctionne
- ✅ Utilisateur admin existe : `admin@ejsmarket.com`
- ✅ Mot de passe valide : `Admin123!`

## ❌ Problème sur Vercel

Si les identifiants ne fonctionnent pas sur Vercel, vérifiez les points suivants :

---

## 🔍 Checklist de Vérification

### 1. Vérifier les Variables d'Environnement sur Vercel

Allez dans **Vercel → Settings → Environment Variables** et vérifiez :

#### ✅ DATABASE_URL
- **Doit utiliser le Connection Pooler** (Session mode)
- **Format** : `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres?schema=public`
- **Important** : Le hostname doit contenir `.pooler.supabase.com`
- **Port** : `5432` (Session mode)

**Exemple correct** :
```
postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
```

#### ✅ NEXTAUTH_SECRET
- **Doit faire au moins 32 caractères**
- **Exemple** : `VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=`
- **Environnements** : Production, Preview, Development

#### ✅ NEXTAUTH_URL
- **Doit correspondre exactement à votre URL Vercel**
- **Format** : `https://votre-projet.vercel.app` (sans slash à la fin)
- **Exemple** : `https://ejs-market-dja5gzvs.vercel.app`
- **Environnements** : Production, Preview, Development

---

### 2. Vérifier les Logs Vercel

1. Allez dans **Vercel → Logs**
2. Cherchez les erreurs suivantes :

#### Erreur : `PrismaClientInitializationError`
**Cause** : La `DATABASE_URL` n'utilise pas le connection pooler ou est incorrecte.

**Solution** :
- Vérifiez que `DATABASE_URL` utilise `.pooler.supabase.com`
- Vérifiez que le mot de passe est encodé en URL
- Redéployez après modification

#### Erreur : `NEXTAUTH_SECRET must be at least 32 characters`
**Cause** : Le secret est trop court ou manquant.

**Solution** :
- Régénérez avec `openssl rand -base64 32`
- Mettez à jour sur Vercel
- Redéployez

#### Erreur : `[NextAuth] Utilisateur introuvable`
**Cause** : L'utilisateur n'existe pas dans la base de données Supabase.

**Solution** :
- Exécutez le script de seed sur Supabase :
  ```bash
  DATABASE_URL="votre-connection-string-pooler" npx tsx prisma/seed.ts
  ```

#### Erreur : `[NextAuth] Mot de passe invalide`
**Cause** : Le mot de passe dans la base de données ne correspond pas.

**Solution** :
- Réinitialisez le mot de passe :
  ```bash
  DATABASE_URL="votre-connection-string-pooler" npx tsx scripts/reset-admin-password.ts
  ```

---

### 3. Tester la Connexion avec le Pooler

Testez que la connection string du pooler fonctionne :

```bash
# Remplacez par votre connection string pooler
DATABASE_URL="postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public" npx tsx scripts/test-db-connection.ts
```

Si cela fonctionne localement mais pas sur Vercel, le problème vient de la configuration Vercel.

---

### 4. Vérifier que les Données Existent dans Supabase

1. Allez sur **Supabase → Table Editor**
2. Vérifiez la table `users`
3. Vérifiez qu'il y a un utilisateur avec :
   - Email : `admin@ejsmarket.com`
   - Rôle : `ADMIN`

Si l'utilisateur n'existe pas, exécutez le seed :

```bash
DATABASE_URL="votre-connection-string-pooler" npx tsx prisma/seed.ts
```

---

### 5. Redéployer après Modifications

⚠️ **Important** : Après avoir modifié les variables d'environnement :

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Attendez la fin du déploiement
5. Vérifiez les logs

---

## 🐛 Messages d'Erreur et Solutions

### "Email ou mot de passe incorrect"
**Causes possibles** :
1. L'utilisateur n'existe pas dans Supabase
2. Le mot de passe est incorrect
3. Erreur Prisma empêchant l'accès à la base de données

**Solutions** :
1. Vérifiez les logs Vercel pour voir l'erreur exacte
2. Testez la connexion avec le script de test
3. Réinitialisez le mot de passe si nécessaire

### "Erreur serveur" ou "Une erreur est survenue"
**Cause** : Erreur Prisma ou problème de connexion à la base de données.

**Solutions** :
1. Vérifiez les logs Vercel
2. Vérifiez que `DATABASE_URL` utilise le connection pooler
3. Vérifiez les restrictions réseau sur Supabase

---

## 📋 Identifiants de Test

**Email** : `admin@ejsmarket.com`  
**Mot de passe** : `Admin123!`

---

## 🔄 Scripts Utiles

### Tester la connexion
```bash
DATABASE_URL="votre-connection-string" npx tsx scripts/test-db-connection.ts
```

### Réinitialiser le mot de passe admin
```bash
DATABASE_URL="votre-connection-string" npx tsx scripts/reset-admin-password.ts
```

### Seed la base de données
```bash
DATABASE_URL="votre-connection-string" npx tsx prisma/seed.ts
```

---

## 📞 Support

Si rien ne fonctionne :
1. Vérifiez tous les logs Vercel
2. Vérifiez que Supabase est actif (pas en pause)
3. Vérifiez les restrictions réseau sur Supabase
4. Contactez le support si nécessaire

---

**Dernière mise à jour** : 2024


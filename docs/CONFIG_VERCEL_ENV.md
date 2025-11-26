# 🔧 Configuration des Variables d'Environnement sur Vercel

## 📋 Variables Requises

Pour que votre application fonctionne sur Vercel, vous devez configurer ces variables :

### ✅ Obligatoires

1. **DATABASE_URL** - URL de connexion à votre base de données PostgreSQL
2. **NEXTAUTH_SECRET** - Secret pour signer les tokens JWT (minimum 32 caractères)
3. **NEXTAUTH_URL** - URL de votre application Vercel

### ⚙️ Optionnelles (pour plus tard)

4. **STRIPE_PUBLIC_KEY** - Clé publique Stripe (si vous utilisez Stripe)
5. **STRIPE_SECRET_KEY** - Clé secrète Stripe
6. **STRIPE_WEBHOOK_SECRET** - Secret webhook Stripe

---

## 🚀 Guide Étape par Étape

### Étape 1 : Obtenir votre URL Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet `ejs-market-yx`
3. Notez l'URL de production (ex: `https://ejs-market-yx.vercel.app`)

### Étape 2 : Obtenir votre DATABASE_URL

⚠️ **IMPORTANT** : Vous utilisez actuellement une base de données PostgreSQL **locale** (`postgresql://happy@localhost:5432/ejs_market`). 

**Vercel ne peut pas accéder à votre base de données locale** car elle est sur votre ordinateur. Vous devez migrer vers une base de données cloud.

#### 🎯 Solution Recommandée : Migrer vers Supabase (Gratuit)

**Option A : Créer un nouveau projet Supabase (Recommandé)**

1. **Créer un compte Supabase** :
   - Allez sur [supabase.com](https://supabase.com)
   - Cliquez sur "Start your project"
   - Connectez-vous avec GitHub, Google, ou créez un compte

2. **Créer un nouveau projet** :
   - Cliquez sur "New Project"
   - Remplissez les informations :
     - **Name** : `ejs-market` (ou votre nom)
     - **Database Password** : Choisir un mot de passe fort (⚠️ **le noter quelque part !**)
     - **Region** : Choisir la région la plus proche (ex: `West EU (Paris)`)
   - Cliquez sur "Create new project"
   - Attendez 2-3 minutes que le projet soit créé

3. **Récupérer la connection string** :

   **📍 Méthode 1 : Via le bouton "Connect" (LE PLUS SIMPLE)**
   
   1. En haut à droite de votre dashboard Supabase, cliquez sur le bouton **"Connect"** (à côté de "Production")
   2. Une popup/modal s'ouvre avec plusieurs onglets
   3. Cliquez sur l'onglet **"URI"** (ou cherchez "Connection string")
   4. Vous verrez une connection string qui ressemble à :
      ```
      postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
      ```
   5. **OU** cherchez une connection string directe (sans pooler) :
      ```
      postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
      ```
   6. **Remplacez `[YOUR-PASSWORD]`** par le mot de passe que vous avez défini lors de la création du projet
   7. **Ajoutez `?schema=public`** à la fin :
      ```
      postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres?schema=public
      ```

   **📍 Méthode 2 : Via Settings (icône d'engrenage)**
   
   1. Dans la barre latérale gauche, en bas, cliquez sur **"Settings"** (icône d'engrenage ⚙️)
   2. Dans le menu Settings, cliquez sur **"Database"** (pas "Database Settings")
   3. Sur cette page, cherchez la section **"Connection string"** ou **"Connection pooler"**
   4. Sélectionnez l'onglet **"URI"**
   5. Copiez la connection string et remplacez `[YOUR-PASSWORD]` par votre mot de passe
   6. Ajoutez `?schema=public` à la fin

   **📍 Méthode 3 : Via la page principale Database**
   
   1. Dans la barre latérale gauche, cliquez sur **"Database"** (en haut, pas "Settings")
   2. Sur la page principale "Database", cherchez une carte ou section avec **"Connection string"** ou **"Connection info"**
   3. Si vous ne la voyez pas, essayez les méthodes 1 ou 2 ci-dessus

4. **Migrer vos données** (si vous avez déjà des données) :
   ```bash
   # 1. Exporter vos données locales
   pg_dump postgresql://happy@localhost:5432/ejs_market > backup.sql
   
   # 2. Mettre à jour votre .env.local avec la nouvelle DATABASE_URL Supabase
   # 3. Pousser le schéma vers Supabase
   npm run db:push
   
   # 4. Importer les données (si nécessaire)
   psql "postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres" < backup.sql
   ```

**Option B : Utiliser Railway (Alternative)**

1. Allez sur [railway.app](https://railway.app)
2. Créer un compte
3. Créer un nouveau projet > PostgreSQL
4. Récupérer la `DATABASE_URL` dans les variables d'environnement

**Option C : Utiliser Neon (Alternative)**

1. Allez sur [neon.tech](https://neon.tech)
2. Créer un compte
3. Créer un nouveau projet
4. Récupérer la connection string

### Étape 3 : Générer NEXTAUTH_SECRET

Exécutez cette commande dans votre terminal :

```bash
openssl rand -base64 32
```

Copiez le résultat (une chaîne de caractères aléatoires).

**Exemple** : `aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=`

### Étape 4 : Ajouter les Variables sur Vercel

1. **Dans Vercel**, allez dans **Settings** → **Environment Variables**

2. **Cliquez sur "Créer un nouveau"** (ou "Add New")

3. **Ajoutez chaque variable une par une** :

   #### Variable 1 : DATABASE_URL
   - **Clé** : `DATABASE_URL`
   - **Valeur** : Votre URL de base de données (ex: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`)
   - **Environnements** : ✅ Production, ✅ Preview, ✅ Development
   - **Sensible** : ✅ Activé (pour masquer la valeur)
   - Cliquez sur **"Sauvegarder"**

   #### Variable 2 : NEXTAUTH_SECRET
   - **Clé** : `NEXTAUTH_SECRET`
   - **Valeur** : Le secret généré à l'étape 3 (ex: `aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890=`)
   - **Environnements** : ✅ Production, ✅ Preview, ✅ Development
   - **Sensible** : ✅ Activé (pour masquer la valeur)
   - Cliquez sur **"Sauvegarder"**

   #### Variable 3 : NEXTAUTH_URL
   - **Clé** : `NEXTAUTH_URL`
   - **Valeur** : Votre URL Vercel (ex: `https://ejs-market-yx.vercel.app`)
   - **Environnements** : ✅ Production, ✅ Preview, ✅ Development
   - **Sensible** : ❌ Désactivé (pas besoin de masquer)
   - Cliquez sur **"Sauvegarder"**

### Étape 5 : Redéployer l'Application

⚠️ **Important** : Après avoir ajouté les variables, vous devez redéployer !

1. Allez dans **Deployments** (Déploiements)
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** (⋯) à droite
4. Sélectionnez **"Redeploy"** (Redéployer)
5. Confirmez le redéploiement

Ou simplement :
- Faites un nouveau commit et push vers GitHub
- Vercel redéploiera automatiquement

---

## ✅ Vérification

Après le redéploiement, vérifiez que tout fonctionne :

1. **Accédez à votre site** : `https://ejs-market-yx.vercel.app`
2. **Testez la connexion admin** : `https://ejs-market-yx.vercel.app/login`
   - Email : `admin@ejsmarket.com`
   - Mot de passe : `Admin123!`
3. **Vérifiez les logs** dans Vercel :
   - Allez dans **Logs** (Bûches)
   - Vérifiez qu'il n'y a pas d'erreurs liées aux variables d'environnement

---

## 🐛 Dépannage

### Erreur : "PrismaClientInitializationError: Invalid prisma"

**⚠️ Erreur la plus courante après le déploiement**

**Causes possibles** :
1. `DATABASE_URL` non configurée ou incorrecte sur Vercel
2. Restrictions réseau sur Supabase
3. Mot de passe non encodé correctement

**Solutions** :
1. **Vérifiez la DATABASE_URL sur Vercel** :
   - Allez dans Settings → Environment Variables
   - Vérifiez que `DATABASE_URL` existe et est correcte
   - Le mot de passe doit être encodé en URL si il contient des caractères spéciaux

2. **Utilisez le Connection Pooler de Supabase** (Recommandé) :
   - Allez dans Supabase → Settings → Database → Connection Pooler
   - Sélectionnez **"Session mode"** (recommandé pour Prisma)
   - Utilisez la connection string qui contient `pooler.supabase.com` (port 5432 pour Session mode)
   - Format : `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres?schema=public`

3. **Vérifiez les restrictions réseau** :
   - Allez dans Supabase → Settings → Database → Network Restrictions
   - Désactivez temporairement les restrictions ou ajoutez les IPs de Vercel

4. **Redéployez après les modifications** :
   - Deployments → ⋯ → Redeploy

📖 **Guide complet** : Voir `docs/TROUBLESHOOTING_VERCEL.md`

### Erreur : "DATABASE_URL is not defined"

**Solution** :
- Vérifiez que la variable `DATABASE_URL` est bien ajoutée dans Vercel
- Vérifiez que vous avez sélectionné les bons environnements (Production, Preview)
- Redéployez l'application

### Erreur : "NEXTAUTH_SECRET must be at least 32 characters"

**Solution** :
- Vérifiez que le secret fait au moins 32 caractères
- Régénérez un nouveau secret avec `openssl rand -base64 32`
- Mettez à jour la variable dans Vercel
- Redéployez

### Erreur : "Cannot connect to database"

**Solution** :
- Vérifiez que l'URL de la base de données est correcte
- Vérifiez que la base de données accepte les connexions externes
- Pour Supabase : Vérifiez les paramètres de connexion dans le dashboard
- Utilisez le Connection Pooler (Session mode, port 5432 avec pooler.supabase.com) au lieu de la connexion directe

### Erreur : "Invalid NEXTAUTH_URL"

**Solution** :
- Vérifiez que `NEXTAUTH_URL` correspond exactement à l'URL de votre application Vercel
- N'oubliez pas le `https://`
- Pas de slash à la fin (ex: `https://ejs-market-yx.vercel.app` et non `https://ejs-market-yx.vercel.app/`)

---

## 📝 Exemple de Configuration Complète

Voici un exemple de ce à quoi devrait ressembler votre configuration :

```
DATABASE_URL = postgresql://postgres:VotreMotDePasse@db.xxxxx.supabase.co:5432/postgres?schema=public
NEXTAUTH_SECRET = ip5x6fFv5MXTlPR3QMrhgveA8smj1c17fhxOVPJVvbI=
NEXTAUTH_URL = https://ejs-market-yx.vercel.app
```

## 🔄 Migration depuis PostgreSQL Local

Si vous avez déjà des données dans votre base de données locale, voici comment les migrer :

### Étape 1 : Exporter vos données locales

```bash
# Depuis votre terminal
pg_dump postgresql://happy@localhost:5432/ejs_market > backup.sql
```

### Étape 2 : Créer votre base de données Supabase

Suivez les étapes de l'**Option A** ci-dessus.

### Étape 3 : Pousser le schéma vers Supabase

```bash
# Mettre à jour .env.local avec la nouvelle DATABASE_URL Supabase
# Puis :
npm run db:push
```

### Étape 4 : Importer vos données (si nécessaire)

```bash
# Remplacer [YOUR-PASSWORD] et [PROJECT-REF] par vos valeurs
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" < backup.sql
```

### Étape 5 : Vérifier

```bash
# Ouvrir Prisma Studio pour vérifier
npm run db:studio
```

---

## 🔒 Sécurité

⚠️ **Important** :
- ✅ Activez l'option **"Sensible"** pour `DATABASE_URL` et `NEXTAUTH_SECRET`
- ✅ Ne partagez jamais ces valeurs publiquement
- ✅ Utilisez des secrets différents pour Production et Preview si possible
- ✅ Changez les mots de passe par défaut après la première connexion

---

**Dernière mise à jour** : 2024


# Guide de Configuration de l'Authentification

Ce guide vous aidera à configurer l'authentification NextAuth.js et créer un utilisateur admin.

## ✅ Étapes Complétées

1. ✅ Fichier `.env.local` créé avec :
   - `NEXTAUTH_URL="http://localhost:3000"`
   - `NEXTAUTH_SECRET="M0EFvSuREmmpa9rRVaNwz4WdQSdL5OTCxqpC8gkUvYQ="`
   - `DATABASE_URL` (à configurer selon votre base de données)

2. ✅ Client Prisma généré (`npm run db:generate`)

3. ✅ Script de seed mis à jour pour créer un utilisateur admin

## 📋 Étapes Restantes

### 1. Configurer la Base de Données

Vous devez configurer votre `DATABASE_URL` dans `.env.local` selon votre configuration :

#### Option A : PostgreSQL Local
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ejs_market?schema=public"
```

#### Option B : Supabase
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public"
```

#### Option C : Autre Provider
Consultez la documentation de votre provider de base de données.

### 2. Créer/Migrer la Base de Données

```bash
# Créer les tables dans la base de données
npm run db:push

# OU créer une migration
npm run db:migrate
```

### 3. Créer l'Utilisateur Admin

```bash
npm run db:seed
```

Cela créera un utilisateur admin avec :
- **Email** : `admin@ejsmarket.com`
- **Mot de passe** : `Admin123!`
- **Rôle** : `ADMIN`

⚠️ **Important** : Changez ce mot de passe après votre première connexion !

### 4. Tester l'Authentification

1. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Créer un compte utilisateur** :
   - Aller sur `http://localhost:3000/register`
   - Remplir le formulaire
   - Un compte `CUSTOMER` sera créé

3. **Se connecter** :
   - Aller sur `http://localhost:3000/login`
   - Utiliser les identifiants créés ou ceux de l'admin

4. **Accéder au panel admin** :
   - Se connecter avec `admin@ejsmarket.com` / `Admin123!`
   - Aller sur `http://localhost:3000/admin`
   - Vous devriez voir le dashboard admin

## 🔐 Identifiants par Défaut

### Admin
- Email : `admin@ejsmarket.com`
- Mot de passe : `Admin123!`

### Créer d'autres rôles

Pour créer un utilisateur MANAGER ou B2B_CUSTOMER, vous pouvez :

1. **Via l'interface** : Utiliser `/register?type=b2b` pour créer un compte B2B
2. **Via Prisma Studio** :
   ```bash
   npm run db:studio
   ```
   Puis créer manuellement un utilisateur avec le rôle souhaité

3. **Via un script personnalisé** : Créer un fichier `prisma/create-user.ts` et l'exécuter

## 🛠️ Dépannage

### Erreur : "Can't reach database server"

- Vérifiez que votre base de données PostgreSQL est démarrée
- Vérifiez que la `DATABASE_URL` dans `.env.local` est correcte
- Testez la connexion avec : `psql $DATABASE_URL`

### Erreur : "Environment variable not found: DATABASE_URL"

- Vérifiez que le fichier `.env.local` existe à la racine du projet
- Vérifiez que la variable `DATABASE_URL` est bien définie dans `.env.local`

### Erreur : "Invalid credentials"

- Vérifiez que vous utilisez les bons identifiants
- Si vous avez modifié le mot de passe admin, utilisez le nouveau mot de passe
- Vous pouvez réinitialiser le mot de passe via Prisma Studio

## 📚 Ressources

- [Documentation NextAuth.js](https://next-auth.js.org/)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Authentification](./AUTHENTICATION.md)


# 📋 Instructions Rapides - GitHub & Vercel

## 🐙 Étape 1 : Créer le dépôt GitHub

1. Allez sur https://github.com/new
2. **Repository name** : `electronica-jardin-store`
3. **Description** : "E-commerce platform for electronics and garden products"
4. Choisissez **Public** ou **Private**
5. **NE COCHEZ PAS** "Add a README file" (on a déjà tout)
6. Cliquez sur **"Create repository"**

## 🔗 Étape 2 : Connecter et pousser

**Copiez-collez ces commandes** (remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub) :

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/electronica-jardin-store.git

# Renommer la branche en 'main'
git branch -M main

# Pousser le code
git push -u origin main
```

**Si vous utilisez SSH** :
```bash
git remote add origin git@github.com:VOTRE_USERNAME/electronica-jardin-store.git
git branch -M main
git push -u origin main
```

## ☁️ Étape 3 : Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Sign Up"** et connectez-vous avec **GitHub**
3. Cliquez sur **"Add New Project"**
4. Sélectionnez votre dépôt `electronica-jardin-store`
5. Vercel détectera automatiquement Next.js
6. **Ajoutez les variables d'environnement** :
   - `DATABASE_URL` : (à configurer avec Supabase/Railway)
   - `NEXTAUTH_SECRET` : (générez avec `openssl rand -base64 32`)
   - `NEXTAUTH_URL` : (sera rempli automatiquement après le premier déploiement)
7. Cliquez sur **"Deploy"**

## ✅ C'est tout !

Votre site sera accessible sur `https://votre-projet.vercel.app`

**Note** : N'oubliez pas de configurer la base de données PostgreSQL avant de déployer !

---

Pour plus de détails, voir `DEPLOIEMENT.md`


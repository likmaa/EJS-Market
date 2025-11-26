# 🚀 Guide de Déploiement

Guide rapide pour déployer l'application.

## 📦 Étape 1 : GitHub

Pour créer le dépôt et pousser le code, voir [`INSTRUCTIONS_GITHUB.md`](./INSTRUCTIONS_GITHUB.md)

## ☁️ Étape 2 : Vercel

Pour configurer et déployer sur Vercel, voir [`VERCEL.md`](./VERCEL.md) - Guide complet avec variables d'environnement et dépannage.

### Déploiement Rapide

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur **"Add New Project"**
4. Sélectionnez votre dépôt
5. Configurez les variables d'environnement (voir [`VERCEL.md`](./VERCEL.md))
6. Cliquez sur **"Deploy"**

---

## 📚 Documentation Complète

- **Vercel** : [`VERCEL.md`](./VERCEL.md) - Configuration complète, variables, dépannage
- **GitHub** : [`INSTRUCTIONS_GITHUB.md`](./INSTRUCTIONS_GITHUB.md) - Push et configuration
- **Base de données** : [`SETUP_DATABASE.md`](./SETUP_DATABASE.md) - Configuration PostgreSQL
- **Authentification** : [`AUTHENTICATION.md`](./AUTHENTICATION.md) - Configuration NextAuth

---

## ✅ Checklist Rapide

- [ ] Dépôt GitHub créé et code poussé
- [ ] Projet Vercel créé et connecté à GitHub
- [ ] Base de données PostgreSQL configurée (Supabase/Neon)
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Base de données initialisée (`prisma db push`)
- [ ] Données seedées (`npm run db:seed`)
- [ ] Site accessible et fonctionnel

---

**Bon déploiement ! 🚀**

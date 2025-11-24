# EJS-Market

Plateforme E-commerce multi-produits (High-tech + Jardinage) pour le marché européen.

## 🚀 Stack Technique

- **Frontend/Backend** : Next.js 14+ (App Router) + TypeScript
- **Base de données** : PostgreSQL (Supabase) + Prisma ORM
- **Authentification** : NextAuth.js
- **Paiements** : Stripe
- **Recherche** : Algolia
- **Hébergement** : Vercel

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Générer le client Prisma
npm run db:generate

# Lancer le serveur de développement
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Build de production
- `npm run start` - Lancer le serveur de production
- `npm run lint` - Linter le code
- `npm run db:generate` - Générer le client Prisma
- `npm run db:push` - Pousser le schéma vers la DB
- `npm run db:migrate` - Créer une migration
- `npm run db:studio` - Ouvrir Prisma Studio
- `npm run db:seed` - Seed les données initiales

## 📚 Documentation

Toute la documentation est regroupée dans ce dossier :

- [`README.md`](./README.md) - Ce fichier (vue d'ensemble)
- [`CAHIER_DES_CHARGES.md`](./CAHIER_DES_CHARGES.md) - Cahier des charges complet
- [`GUIDE_DEMARRAGE.md`](./GUIDE_DEMARRAGE.md) - Guide de démarrage
- [`FRONTEND_README.md`](./FRONTEND_README.md) - Documentation frontend
- [`DEPLOIEMENT.md`](./DEPLOIEMENT.md) - Guide de déploiement
- [`STACK_VALIDATION.md`](./STACK_VALIDATION.md) - Validation de la stack technique
- [`OPTIMISATION_IMAGES.md`](./OPTIMISATION_IMAGES.md) - Guide d'optimisation des images
- [`GITHUB_PUSH.md`](./GITHUB_PUSH.md) - Instructions GitHub
- [`INSTRUCTIONS_GITHUB.md`](./INSTRUCTIONS_GITHUB.md) - Instructions GitHub supplémentaires
- [`DIAGNOSTIC_CSS.md`](./DIAGNOSTIC_CSS.md) - Diagnostic CSS

## 🔒 Sécurité

- SSL/TLS automatique (Vercel)
- Validation Zod sur tous les inputs
- Protection CSRF/XSS intégrée
- 3D Secure via Stripe (DSP2)
- Backups automatiques (Supabase)

## 📝 License

Propriétaire - Tous droits réservés

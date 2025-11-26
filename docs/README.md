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

### 🚀 Démarrage Rapide

- [`GUIDE_DEMARRAGE.md`](./GUIDE_DEMARRAGE.md) - Guide de démarrage complet
- [`SETUP_DATABASE.md`](./SETUP_DATABASE.md) - Configuration de la base de données
- [`AUTHENTICATION.md`](./AUTHENTICATION.md) - Configuration de l'authentification

### 🚢 Déploiement

- [`DEPLOIEMENT.md`](./DEPLOIEMENT.md) - Vue d'ensemble du déploiement
- [`VERCEL.md`](./VERCEL.md) - Guide complet Vercel (variables, dépannage)
- [`INSTRUCTIONS_GITHUB.md`](./INSTRUCTIONS_GITHUB.md) - Configuration GitHub

### 📖 Documentation Technique

- [`CAHIER_DES_CHARGES.md`](./CAHIER_DES_CHARGES.md) - Cahier des charges complet
- [`FRONTEND_README.md`](./FRONTEND_README.md) - Documentation frontend
- [`STRUCTURE_FICHIERS.md`](./STRUCTURE_FICHIERS.md) - Structure du projet
- [`STACK_VALIDATION.md`](./STACK_VALIDATION.md) - Validation de la stack technique

### ⚡ Performance & Optimisations

- [`OPTIMISATIONS_PERFORMANCE.md`](./OPTIMISATIONS_PERFORMANCE.md) - Optimisations mobile
- [`OPTIMISATION_IMAGES.md`](./OPTIMISATION_IMAGES.md) - Guide d'optimisation des images
- [`BREAKPOINTS_RESPONSIVE.md`](./BREAKPOINTS_RESPONSIVE.md) - Breakpoints responsive

### 👥 Administration

- [`ADMIN_PANEL.md`](./ADMIN_PANEL.md) - Documentation du panel admin
- [`MANAGER_PERMISSIONS.md`](./MANAGER_PERMISSIONS.md) - Permissions Manager
- [`CONTENT_MANAGEMENT.md`](./CONTENT_MANAGEMENT.md) - Gestion du contenu

### 🗺️ Roadmap

- [`PROCHAINES_ETAPES.md`](./PROCHAINES_ETAPES.md) - Prochaines étapes
- [`ROADMAP_V2.md`](./ROADMAP_V2.md) - Roadmap version 2
- [`AMELIORATIONS_OPTIONNELLES.md`](./AMELIORATIONS_OPTIONNELLES.md) - Améliorations futures

## 🔒 Sécurité

- SSL/TLS automatique (Vercel)
- Validation Zod sur tous les inputs
- Protection CSRF/XSS intégrée
- 3D Secure via Stripe (DSP2)
- Backups automatiques (Supabase)

## 📝 License

Propriétaire - Tous droits réservés

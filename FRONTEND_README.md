# 🎨 Frontend - Documentation

## ✅ Ce qui a été créé

### Composants UI de base
- ✅ **Button** : Bouton avec variantes (primary, secondary, outline, ghost) et tailles
- ✅ **Card** : Carte avec header, content, footer
- ✅ **Badge** : Badge avec variantes (default, success, warning, error, info)

### Composants Layout
- ✅ **Header** : Navigation avec menu mobile, panier, liens
- ✅ **Footer** : Footer avec liens, newsletter

### Composants Produits
- ✅ **ProductCard** : Carte produit avec image, prix, ajout au panier

### Pages
- ✅ **Page d'accueil** (`/`) : Hero section, catégories, features, CTA
- ✅ **Liste produits** (`/products`) : Filtres par catégorie, tri, grille produits
- ✅ **Détail produit** (`/products/[id]`) : Images, caractéristiques, ajout au panier
- ✅ **Panier** (`/cart`) : Liste articles, quantité, résumé, total

### Hooks
- ✅ **useCart** : Gestion du panier avec localStorage
  - `addToCart` : Ajouter un produit
  - `removeFromCart` : Retirer un produit
  - `updateQuantity` : Modifier la quantité
  - `clearCart` : Vider le panier
  - `itemsCount`, `totalHT`, `totalVAT`, `totalTTC` : Calculs automatiques

## 🎨 Design System

### Couleurs
- **Primary** : Bleu (`blue-600`)
- **Secondary** : Gris (`gray-200`)
- **Success** : Vert (`green-100/800`)
- **Warning** : Jaune (`yellow-100/800`)
- **Error** : Rouge (`red-100/800`)

### Typographie
- **Font** :  (via Next.js)
- **Tailles** : text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl

### Espacements
- Utilisation de l'échelle Tailwind (4, 8, 12, 16, 24, 32, etc.)

## 📱 Responsive Design

- **Mobile First** : Design optimisé pour mobile
- **Breakpoints** :
  - `sm:` 640px
  - `md:` 768px
  - `lg:` 1024px
  - `xl:` 1280px

## 🛒 Système de Panier

Le panier utilise **localStorage** pour persister les données entre les sessions.

### Structure d'un article
```typescript
interface CartItem {
  productId: string;
  sku: string;
  name: string;
  priceHT: number;      // En centimes
  vatRate: number;      // Ex: 0.20 pour 20%
  quantity: number;
  image?: string;
}
```

### Utilisation
```tsx
import { useCart } from '@/hooks/useCart';

function MyComponent() {
  const { cart, addToCart, itemsCount, totalTTC } = useCart();
  
  // Ajouter au panier
  addToCart({
    productId: '1',
    sku: 'APP-IPH-0001',
    name: 'iPhone 15',
    priceHT: 119900,
    vatRate: 0.20,
    image: 'https://...',
  });
}
```

## 🚀 Prochaines Étapes Frontend

### À implémenter
- [ ] Page checkout (formulaire commande)
- [ ] Page compte utilisateur
- [ ] Page authentification (login/register)
- [ ] Filtres avancés (prix, marque, etc.)
- [ ] Recherche produits
- [ ] Pagination liste produits
- [ ] Breadcrumbs
- [ ] Notifications toast (ajout au panier)
- [ ] Loading states
- [ ] Error boundaries
- [ ] Mode sombre (optionnel)

### Intégrations à faire
- [ ] Connexion API backend (remplacer données mockées)
- [ ] Intégration Stripe (paiement)
- [ ] Intégration Algolia (recherche)
- [ ] Multi-langues (next-intl)

## 📝 Notes

- Les données produits sont actuellement **mockées** (à remplacer par API)
- Le panier est stocké dans **localStorage** (à synchroniser avec backend plus tard)
- Les images utilisent **Next.js Image** pour optimisation automatique
- Tous les prix sont en **centimes** (ex: 119900 = 1199.00€)

## 🎯 Commandes Utiles

```bash
# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm run start

# Linter
npm run lint
```

---

**Le frontend est prêt pour le développement ! 🎉**


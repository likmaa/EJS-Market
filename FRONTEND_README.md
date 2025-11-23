# 🎨 Documentation Frontend & UX/UI - eJS MARKET

**Version** : 2.0 (Finale)  
**Concept Visuel** : Minimalisme Tech (Inspiration : Awwwards Market)  
**Style** : Premium Tech & Luxe

---

## 📘 1. IDENTITÉ VISUELLE (DESIGN SYSTEM)

### 🎨 1.1. Palette de Couleurs

Nous abandonnons le blanc "clinique" pour des tons plus doux et sophistiqués.

| Rôle | Couleur | Code Hex | Usage |
|------|---------|----------|-------|
| **Fond Global** | Off-White (Crème Tech) | `#FAFAFA` ou `#F8F8F8` | Couleur de fond de tout le site. **Ne jamais utiliser de blanc pur (#FFFFFF)** pour le fond, cela fatigue les yeux. |
| **Primaire** | Violet Électrique | `#7C3AED` (Proche Pantone 266C) | Boutons d'action (CTA), Badges, Prix, le "Point" du logo. |
| **Secondaire** | Noir Profond | `#111111` ou `#0F0F0F` | Textes, Titres, Fond du Marquee (bandeau haut). |
| **Surface** | Gris Doux | `#F3F4F6` | Fond de la barre de recherche, fond des cartes produits. |
| **Succès** | Vert Jardin | `#10B981` | Indicateurs "En stock", "Expédié". |

### 🔡 1.2. Typographie

**Police** : **Plus Jakarta Sans** (Google Fonts)

**Pourquoi ?** C'est une police géométrique (les "o" sont des cercles parfaits). Elle est très moderne, lisible sur mobile et rend les chiffres (prix) très élégants.

**Styles** :
- **Titres (H1, H2)** : Bold (Gras) ou ExtraBold
- **Textes courants** : Regular ou Medium

**Configuration Tailwind** :
```typescript
// tailwind.config.ts
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});
```

---

## 🧭 2. LA NAVIGATION (HEADER)

La navigation est la colonne vertébrale du site. Elle est **fixée en haut de l'écran (Sticky)** : elle reste visible même quand on descend sur la page.

### 📍 NIVEAU 1 : La "News Bar" (Tout en haut)

C'est un bandeau fin qui traverse l'écran.

**Visuel** :
- Fond : Noir/Violet sombre (`#111111` ou `#0F0F0F`)
- Texte : Blanc
- Hauteur : ~32px

**Animation** : **Marquee Infini**. Le texte défile en continu de droite à gauche.

**Contenu** : Publicités, Codes Promos, Alertes.

**Exemple** : `"Livraison Gratuite en Europe dès 100€ ⚡️ Nouveaux Robots Husqvarna en stock ⚡️ -10% sur Apple avec le code EJS10"`

**Implémentation** :
```tsx
import Marquee from 'react-fast-marquee';

<Marquee speed={50} gradient={false} className="bg-[#111111] text-white py-2">
  Livraison Gratuite en Europe dès 100€ ⚡️ Nouveaux Robots Husqvarna en stock ⚡️ -10% sur Apple avec le code EJS10
</Marquee>
```

### 📍 NIVEAU 2 : La Barre Principale

Juste en dessous du bandeau noir. Fond Off-White (`#FAFAFA`) ou Gris très pâle.

**Éléments (de gauche à droite)** :

1. **LOGO** : `"eJS MARKET"` (Texte Noir + Point Violet `#7C3AED`)
   ```tsx
   <div className="flex items-center gap-2">
     <span className="text-black font-bold text-xl">eJS</span>
     <span className="w-2 h-2 bg-[#7C3AED] rounded-full"></span>
     <span className="text-black font-bold text-xl">MARKET</span>
   </div>
   ```

2. **BOUTON "EXPLORER"** :
   - Texte simple avec une petite flèche vers le bas (Chevron)
   - Action : Au clic ou au survol, il ouvre le **Mega Menu** (voir section 3)

3. **BOUTON "BOUTIQUE"** : Lien simple vers le catalogue complet (`/shop`)

4. **BOUTON "BLOG"** : Lien vers les articles (`/blog`)

5. **BARRE DE RECHERCHE** (Au centre) :
   - Prend beaucoup de place (large)
   - Design arrondi, fond gris clair (`#F3F4F6`)
   - Texte fantôme : `"Rechercher un produit, une référence..."`
   - Fonction intelligente : Propose des produits dès qu'on commence à taper (Autocomplétion)

6. **PANIER** (Icône) :
   - Une icône de sac simple avec une pastille violette (ex: "2") indiquant le nombre d'articles

7. **BOUTON "BE PRO"** (Devenir Vendeur) :
   - Style distinctif : Fond Violet (`#7C3AED`), Texte Blanc
   - Pour attirer les partenaires B2B

8. **BOUTON "SUIVRE MA COMMANDE"** :
   - Style : Fond Transparent, Bordure fine Violette, Texte Violet

---

## 🎯 3. LE "MEGA MENU" (Menu Déroulant)

Quand on clique sur "EXPLORER", un grand panneau blanc s'ouvre sous la barre de navigation. Il est divisé en **5 colonnes** pour organiser votre catalogue mixte.

### Structure du Mega Menu

| Colonne | Titre | Contenu |
|---------|-------|---------|
| **1** | 📱 Apple & Mobile | iPhone & Smartphones<br>MacBook & iMac<br>iPad & Tablettes<br>Apple Watch & Accessoires |
| **2** | 🎮 Gaming & Image | Consoles (PS5) & VR<br>PC Gaming & Écrans<br>Photo (Sony, Canon) & Drones |
| **3** | 🛴 E-Mobilité | Trottinettes Électriques<br>Hoverboards & Gyropodes<br>Skateboards Électriques |
| **4** | 🌱 Jardin Tech | Robots Tondeuses (Husqvarna...)<br>Arrosage Connecté<br>Outils Motorisés & Main<br>Robots Culinaires (Thermomix) |
| **5** | ⭐️ En Vedette (Image) | Une belle image cliquable à droite pour promouvoir le produit du mois (ex: Le casque Apple Vision Pro) |

**Implémentation** :
- Utiliser **Headless UI** ou **Radix UI** pour l'accessibilité
- Animation d'ouverture avec **Framer Motion** (fade-in + slide-down)
- Fermeture au clic dehors ou sur Escape

---

## 💡 4. EXPÉRIENCE UTILISATEUR (UX) : LES INNOVATIONS

C'est ici que nous copions le style Awwwards pour rendre le site unique.

### 💡 4.1. Le "Sticky Cart" (Bouton Panier Flottant)

Au lieu de forcer l'utilisateur à remonter tout en haut pour voir son panier.

**Quoi** : Un bouton rectangulaire qui "flotte" en bas à droite de l'écran (ou fixe en bas sur mobile).

**Visuel** :
- Fond : Sombre (`#111111`) ou Violet (`#7C3AED`)
- Position : `fixed bottom-4 right-4` (desktop) / `fixed bottom-0 left-0 right-0` (mobile)
- Z-index élevé : `z-50`

**Contenu** : Affiche en temps réel le total (ex: `"2 Articles | 1 240,00 €"`)

**Action** : Au clic, il ouvre un **panneau latéral (tiroir)** pour voir le détail du panier sans changer de page.

**Implémentation** :
```tsx
// Composant StickyCart
<div className="fixed bottom-4 right-4 z-50 md:block hidden">
  <button
    onClick={() => setCartOpen(true)}
    className="bg-[#7C3AED] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
  >
    <ShoppingBagIcon className="w-5 h-5" />
    <span>{itemsCount} Articles | {formatPrice(totalTTC)}</span>
  </button>
</div>
```

### 💡 4.2. La "Quick View Modal" (Popup Produit)

C'est très important pour la fluidité.

**Le Problème classique** : Le client clique sur un produit → La page charge → Il n'aime pas → Il fait "Précédent" → La page recharge. C'est lent.

**Notre Solution (Popup)** :
1. Le client voit une liste de produits
2. Il clique sur l'image d'un produit
3. Une **Grande Fenêtre (Popup)** s'ouvre par-dessus la page actuelle (le fond s'assombrit)
4. Dans ce popup, il voit : les photos, le prix, la description, le bouton "Ajouter au panier"
5. S'il n'aime pas, il clique sur la croix (X) ou à côté. Le popup se ferme instantanément et il continue son shopping là où il était

**Implémentation** :
- Utiliser **Headless UI Dialog** ou **Radix UI Dialog**
- Animation avec **Framer Motion** (fade-in + scale)
- Fermeture au clic sur le backdrop ou Escape

---

## 🏠 5. STRUCTURE DE LA PAGE D'ACCUEIL (HOMEPAGE)

Structure visuelle bloc par bloc :

### 5.1. HERO SECTION (L'intro)

**Pas de slider défilant classique.**

**Contenu** :
- Une grosse typographie (Slogan) : `"La Technologie au service de votre Maison & Jardin"`
- Fond : Une vidéo abstraite tech ou une image très haute qualité
- CTA : Bouton violet "Découvrir" ou "Explorer"

**Design** :
- Typographie : ExtraBold, très grande (4xl-6xl)
- Contraste : Texte blanc sur fond sombre/vidéo

### 5.2. CATÉGORIES (Le Carrousel Artistique)

Une grille de **2 grosses colonnes** (Inspiration Awwwards).

**Layout** :
- **Gauche** : Une image artistique "Univers Tech" (iPhone, MacBook, etc.)
- **Droite** : Une image artistique "Univers Jardin" (Robots tondeuses, outils, etc.)

**Au clic**, on entre dans l'univers choisi.

### 5.3. TRENDING (Les Produits Phares)

Une grille classique de **4 colonnes sur 2 lignes**.

**Affiche** : 8 produits populaires

**Design carte** :
- Image sur fond gris clair (`#F3F4F6`)
- Titre en gras
- Prix violet (`#7C3AED`)

### 5.4. TÉMOIGNAGES (Preuve Sociale)

**Design épuré**. 3 avis clients défilant horizontalement.

**Style** :
- Fond Off-White
- Texte centré
- Nom + Note étoiles + Commentaire

### 5.5. PARTENAIRES (Marques)

**Logos des marques** (Apple, Sony, Husqvarna, STIHL) en **noir et blanc (grisés)** pour ne pas polluer visuellement.

**Layout** : Grille horizontale, logos alignés

---

## 📦 6. PAGE SUIVRE MA COMMANDE (/tracking)

Page très simple et rassurante.

### Structure

1. **Titre** : `"Où en est votre colis ?"`

2. **Champ de saisie** :
   - Label : "Numéro de commande"
   - Input : Champ texte + Bouton "Rechercher"

3. **Résultat (Timeline)** : Une ligne verticale avec des points qui changent de couleur.

   **États** :
   - ✅ **Commande Validée** (Vert `#10B981`)
   - ✅ **Préparation en cours** (Vert)
   - ⏳ **Expédiée** (Gris → devient Vert)
   - ⭕️ **En cours de livraison** (Violet `#7C3AED`)

**Implémentation Timeline** :
```tsx
// Composant Timeline
<div className="flex flex-col gap-4">
  {steps.map((step, index) => (
    <div key={index} className="flex items-center gap-4">
      <div className={`w-4 h-4 rounded-full ${
        step.completed ? 'bg-[#10B981]' : 'bg-gray-300'
      }`} />
      <div>
        <p className="font-semibold">{step.title}</p>
        <p className="text-sm text-gray-500">{step.date}</p>
      </div>
    </div>
  ))}
</div>
```

---

## 🛠️ 7. NOTES POUR LES DÉVELOPPEURS (TECHNIQUE)

### 7.1. Outils Recommandés

| Outil | Usage | Package |
|-------|-------|---------|
| **Framework CSS** | Tailwind CSS (Indispensable pour la rapidité) | `tailwindcss` |
| **Composant Marquee** | Animation News Bar | `react-fast-marquee` |
| **Composant Popup (Modal)** | Quick View, Mega Menu | `@headlessui/react` ou `@radix-ui/react-dialog` |
| **Animations** | Transitions fluides | `framer-motion` |
| **Police** | Plus Jakarta Sans | `next/font/google` |

### 7.2. Installation des Dépendances

```bash
npm install react-fast-marquee @headlessui/react framer-motion
```

### 7.3. Configuration Tailwind

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FAFAFA',
        'violet-electric': '#7C3AED',
        'black-deep': '#111111',
        'gray-soft': '#F3F4F6',
        'green-garden': '#10B981',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

### 7.4. Responsive Mobile

**Le Mega Menu** :
- Se transforme en **Menu Burger** (3 barres) sur mobile
- Animation slide-in depuis la gauche

**Le Sticky Cart** :
- Reste en bas de l'écran mobile (zone du pouce)
- Position : `fixed bottom-0 left-0 right-0`
- Hauteur : ~60px

**Breakpoints** :
- Mobile : `< 768px`
- Tablet : `768px - 1024px`
- Desktop : `> 1024px`

### 7.5. Performance

**Optimisations** :
- Images : Next.js Image avec lazy loading
- Animations : Utiliser `will-change` CSS pour les animations
- Code splitting : Pages chargées à la demande
- Objectif : Lighthouse > 90/100 Mobile

---

## 📋 Checklist de Développement

### Phase 1 : Design System
- [ ] Configurer Plus Jakarta Sans
- [ ] Créer les couleurs dans Tailwind
- [ ] Créer les composants de base (Button, Card, Badge)

### Phase 2 : Navigation
- [ ] Implémenter News Bar avec Marquee
- [ ] Créer Header avec tous les boutons
- [ ] Implémenter Mega Menu (5 colonnes)
- [ ] Menu Burger pour mobile

### Phase 3 : Innovations UX
- [ ] Sticky Cart (flottant)
- [ ] Panneau latéral du panier
- [ ] Quick View Modal pour produits
- [ ] Animations Framer Motion

### Phase 4 : Pages
- [ ] Homepage (Hero, Catégories, Trending, Témoignages, Partenaires)
- [ ] Page Tracking (/tracking)
- [ ] Page Produits avec Quick View
- [ ] Page Panier (tiroir latéral)

### Phase 5 : Responsive & Polish
- [ ] Tester sur mobile
- [ ] Optimiser les animations
- [ ] Vérifier l'accessibilité
- [ ] Tests de performance

---

## 🎯 Objectifs de Design

- ✅ **Premium** : Impression de luxe et qualité
- ✅ **Moderne** : Style Awwwards (minimalisme tech)
- ✅ **Fluide** : Animations douces, pas de saccades
- ✅ **Accessible** : Navigation clavier, ARIA labels
- ✅ **Performant** : Chargement rapide, animations optimisées

---

## 📚 Ressources

- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Headless UI](https://headlessui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Fast Marquee](https://www.react-fast-marquee.com/)
- [Awwwards](https://www.awwwards.com/) (Inspiration)

---

**Version** : 2.0  
**Dernière mise à jour** : 2024  
**Maintenu par** : Équipe eJS MARKET

'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';

// Données mockées pour le développement (à remplacer par API)
const mockProducts = [
  {
    id: '1',
    sku: 'APP-IPH-0001',
    name: 'iPhone 15 Pro',
    priceHT: 119900, // 1199.00€ en centimes
    vatRate: 0.20,
    brand: 'Apple',
    category: 'electronics',
    stock: 10,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
  },
  {
    id: '2',
    sku: 'SON-PS5-0001',
    name: 'PlayStation 5',
    priceHT: 49900,
    vatRate: 0.20,
    brand: 'Sony',
    category: 'electronics',
    stock: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
  },
  {
    id: '3',
    sku: 'HUS-ROB-0001',
    name: 'Robot Tondeuse Automower 430X',
    priceHT: 249900,
    vatRate: 0.20,
    brand: 'Husqvarna',
    category: 'garden',
    stock: 3,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
  },
  {
    id: '4',
    sku: 'SON-CAM-0001',
    name: 'Sony Alpha 7 IV',
    priceHT: 279900,
    vatRate: 0.20,
    brand: 'Sony',
    category: 'photo',
    stock: 8,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'electronics', label: 'Électronique' },
    { value: 'garden', label: 'Jardinage' },
    { value: 'photo', label: 'Photo & Vidéo' },
    { value: 'mobility', label: 'Mobilité' },
    { value: 'tools', label: 'Outils' },
  ];

  useEffect(() => {
    let filtered = [...mockProducts];

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceHT - b.priceHT;
      if (sortBy === 'price-desc') return b.priceHT - a.priceHT;
      return a.name.localeCompare(b.name);
    });

    setProducts(filtered);
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Nos Produits</h1>

      {/* Filtres et Tri */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filtre catégorie */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trier par
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Nom (A-Z)</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {/* Liste produits */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            Aucun produit trouvé dans cette catégorie
          </p>
          <Button
            variant="outline"
            onClick={() => setSelectedCategory('all')}
          >
            Voir tous les produits
          </Button>
        </div>
      )}
    </div>
  );
}


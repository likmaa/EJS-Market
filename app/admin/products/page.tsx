'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  sku: string;
  name: any; // JSON { fr: "...", en: "..." }
  brand: string;
  priceHT: number;
  stock: number;
  isActive: boolean;
  category: string;
  images: string[];
}

export default function AdminProductsPage() {
  const { permissions } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = new URLSearchParams();
        if (filterCategory !== 'all') params.append('category', filterCategory);
        if (filterStock !== 'all') params.append('stock', filterStock);
        if (searchTerm) params.append('search', searchTerm);

        const response = await fetch(`/api/admin/products?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchTerm, filterCategory, filterStock]);

  const getProductName = (name: any): string => {
    if (typeof name === 'string') return name;
    if (typeof name === 'object' && name !== null) {
      return name.fr || name.en || Object.values(name)[0] || 'Produit sans nom';
    }
    return 'Produit sans nom';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
          <p className="text-gray-600 mt-1">
            {products.length} produit(s) trouvé(s)
          </p>
        </div>
        <div className="flex gap-3">
          {permissions.canExportData && (
            <Button
              variant="outline"
              onClick={() => {
                window.open('/api/admin/export?type=products&format=csv', '_blank');
              }}
            >
              📥 Exporter CSV
            </Button>
          )}
          <Link href="/admin/products/new">
            <Button variant="primary" size="lg">
              <span className="mr-2">➕</span>
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <input
                type="text"
                placeholder="Nom, SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-electric focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-electric focus:border-transparent"
              >
                <option value="all">Toutes</option>
                <option value="electronics">Électronique</option>
                <option value="garden">Jardin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-electric focus:border-transparent"
              >
                <option value="all">Tous</option>
                <option value="low">Stock faible (&lt;5)</option>
                <option value="out">Rupture de stock</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      {isLoading ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-electric mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des produits...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix HT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        Aucun produit trouvé
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.images && product.images.length > 0 ? (
                                <Image
                                  src={product.images[0]}
                                  alt={getProductName(product.name)}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <span>📦</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {getProductName(product.name)}
                              </div>
                              <div className="text-sm text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 font-mono">
                            {product.sku}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {(product.priceHT / 100).toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm font-medium ${
                              product.stock === 0
                                ? 'text-red-600'
                                : product.stock < 5
                                ? 'text-orange-600'
                                : 'text-green-600'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.isActive ? (
                            <Badge variant="success">Actif</Badge>
                          ) : (
                            <Badge variant="error">Inactif</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-violet-electric hover:text-violet-700"
                            >
                              ✏️ Modifier
                            </Link>
                            {permissions.canDeleteProducts && (
                              <button
                                onClick={async () => {
                                  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
                                    try {
                                      const response = await fetch(`/api/admin/products/${product.id}`, {
                                        method: 'DELETE',
                                      });
                                      if (response.ok) {
                                        setProducts(products.filter((p) => p.id !== product.id));
                                      }
                                    } catch (error) {
                                      console.error('Erreur lors de la suppression:', error);
                                    }
                                  }
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                🗑️ Supprimer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


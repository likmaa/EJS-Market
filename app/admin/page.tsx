'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface Stats {
  revenue: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  orders: {
    today: number;
    week: number;
    month: number;
  };
  products: {
    total: number;
    lowStock: number;
  };
  pendingOrders: number;
  topProducts: Array<{
    productId: string;
    product: { id: string; name: any; priceHT: number } | null;
    sales: number;
    orders: number;
  }>;
}

export default function AdminDashboard() {
  const { permissions } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-electric mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Erreur lors du chargement des statistiques</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(stats.revenue.month / 100).toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.orders.month}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.pendingOrders} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produits</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.products.total}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.products.lowStock} en stock faible
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(stats.revenue.today / 100).toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.orders.today} commandes aujourd'hui
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center gap-3 p-3 rounded-lg bg-violet-electric text-white hover:bg-violet-700 transition-colors"
              >
                <span className="text-xl">➕</span>
                <span className="font-medium">Ajouter un produit</span>
              </Link>
              <Link
                href="/admin/orders?status=PENDING"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl">⏳</span>
                <span className="font-medium">
                  Voir les commandes en attente ({stats.pendingOrders})
                </span>
              </Link>
              <Link
                href="/admin/products?stock=low"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl">⚠️</span>
                <span className="font-medium">
                  Produits en stock faible ({stats.lowStock})
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Commandes Récentes
            </h3>
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((item, i) => (
                <div
                  key={item.productId || i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {typeof item.product?.name === 'object' 
                        ? item.product.name.fr || item.product.name.en || 'Produit'
                        : item.product?.name || 'Produit'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.sales} vente{item.sales > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {item.product?.priceHT 
                        ? ((item.product.priceHT * item.sales) / 100).toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
              {stats.topProducts.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aucune donnée disponible
                </p>
              )}
            </div>
            <Link
              href="/admin/orders"
              className="block mt-4 text-center text-sm text-violet-electric hover:underline"
            >
              Voir toutes les commandes →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


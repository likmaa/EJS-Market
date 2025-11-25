'use client';

import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

// Données mockées - à remplacer par des appels API
const stats = {
  totalRevenue: 125430,
  totalOrders: 342,
  totalProducts: 156,
  pendingOrders: 12,
  lowStock: 8,
  todayRevenue: 3420,
  todayOrders: 15,
};

export default function AdminDashboard() {
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
                  {(stats.totalRevenue / 100).toLocaleString('fr-FR', {
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
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalOrders}
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
                  {stats.totalProducts}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.lowStock} en stock faible
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(stats.todayRevenue / 100).toLocaleString('fr-FR', {
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
              {stats.todayOrders} commandes aujourd'hui
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
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">Commande #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Il y a {i} heure(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(Math.random() * 200 + 50).toFixed(2)} €
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Payée
                    </span>
                  </div>
                </div>
              ))}
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


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import {
  DashboardIcon,
  ProductsIcon,
  OrdersIcon,
  StatsIcon,
  ProfileIcon,
  UsersIcon,
  SettingsIcon,
  ContentIcon,
} from '@/components/admin/AdminIcons';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: DashboardIcon },
  { name: 'Produits', href: '/admin/products', icon: ProductsIcon },
  { name: 'Commandes', href: '/admin/orders', icon: OrdersIcon },
  { name: 'Statistiques', href: '/admin/stats', icon: StatsIcon },
  { name: 'Contenu', href: '/admin/content', icon: ContentIcon, adminOnly: true },
  { name: 'Utilisateurs', href: '/admin/users', icon: UsersIcon, adminOnly: true },
  { name: 'Paramètres', href: '/admin/settings', icon: SettingsIcon, adminOnly: true },
  { name: 'Profil', href: '/admin/profile', icon: ProfileIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, canAccessAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !canAccessAdmin) {
      router.push('/unauthorized');
    }
  }, [isLoading, canAccessAdmin, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <span className="text-xl font-bold text-violet-electric">
              Admin Panel
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              // Filtrer les éléments admin-only si l'utilisateur n'est pas admin
              if (item.adminOnly && user?.role !== 'ADMIN') {
                return null;
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-electric text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`flex-shrink-0 w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="eJS MARKET"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-sm font-semibold text-gray-500">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pt-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              // Filtrer les éléments admin-only si l'utilisateur n'est pas admin
              if (item.adminOnly && user?.role !== 'ADMIN') {
                return null;
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-electric text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`flex-shrink-0 w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-electric transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour au site
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">
              {navigation.find((item) => item.href === pathname)?.name || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || user?.email}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-violet-electric flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <Link
                href="/admin/profile"
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                aria-label="Profil"
                title="Profil"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                aria-label="Déconnexion"
                title="Déconnexion"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}


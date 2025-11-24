'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NewsBar } from './NewsBar';
import { MegaMenu } from './MegaMenu';
import { LanguageSelector } from './LanguageSelector';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const { itemsCount } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-off-white border-b border-gray-200 shadow-sm">
      {/* News Bar */}
      <NewsBar />

      {/* Main Navigation */}
      <div className="max-w-[1800px] mx-auto px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="eJS MARKET"
              width={140}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-10 mx-12">
            {/* Explorer Button */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-1 text-black-deep hover:text-violet-electric transition-colors font-medium text-base"
            >
              Explorer
              <svg
                className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Link href="/products" className="text-black-deep hover:text-violet-electric transition-colors font-medium text-base">
              Boutique
            </Link>
            <Link href="/blog" className="text-black-deep hover:text-violet-electric transition-colors font-medium text-base">
              Blog
            </Link>
          </nav>

          {/* Search Bar - Center (Large) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-16">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit, une référence..."
                className="w-full px-6 py-3 pl-12 bg-gray-soft rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-violet-electric text-base"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-black-deep hover:text-violet-electric transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-violet-electric text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* BE PRO Button */}
            <Link
              href="/be-pro"
              className="hidden lg:block px-5 py-2.5 bg-black-deep text-white rounded-lg hover:bg-black transition-colors font-medium text-sm"
            >
              Be Pro
            </Link>

            {/* Suivre Ma Commande */}
            <Link
              href="/tracking"
              className="hidden lg:block px-5 py-2.5 border border-violet-electric text-violet-electric rounded-lg hover:bg-violet-50 transition-colors font-medium text-sm"
            >
              Suivre ma commande
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black-deep"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Language Selector - Complètement à droite */}
          <div className="hidden lg:flex items-center ml-4">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Search */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-3 pl-12 bg-gray-soft rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-violet-electric"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsMegaMenuOpen(!isMegaMenuOpen);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-black-deep hover:text-violet-electric transition-colors font-medium"
              >
                Explorer
              </button>
              <Link href="/products" className="text-black-deep hover:text-violet-electric transition-colors font-medium">
                Boutique
              </Link>
              <Link href="/blog" className="text-black-deep hover:text-violet-electric transition-colors font-medium">
                Blog
              </Link>
              <Link href="/be-pro" className="text-black-deep hover:text-violet-electric transition-colors font-medium">
                Be Pro
              </Link>
              <Link href="/tracking" className="text-black-deep hover:text-violet-electric transition-colors font-medium">
                Suivre ma commande
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Mega Menu */}
      {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
    </header>
  );
}

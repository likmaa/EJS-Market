'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  const titles = ['eJS MARKET', 'Electrónica & Jardín'];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  // États pour les carrousels
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentJardinIndex, setCurrentJardinIndex] = useState(0);
  
  const techImages = [
    { id: 1, url: '/img1.jpg', name: 'Produit Tech 1' },
    { id: 2, url: '/img2.jpg', name: 'Produit Tech 2' },
    { id: 3, url: '/img3.jpg', name: 'Produit Tech 3' },
  ];
  
  const jardinImages = [
    { id: 1, url: '/jard1.jpg', name: 'Produit Jardin 1' },
    { id: 2, url: '/jard2.jpg', name: 'Produit Jardin 2' },
    { id: 3, url: '/jard3.jpg', name: 'Produit Jardin 3' },
  ];
  
  // Auto-play pour les carrousels
  useEffect(() => {
    const techInterval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techImages.length);
    }, 4000); // Change d'image toutes les 4 secondes
    
    const jardinInterval = setInterval(() => {
      setCurrentJardinIndex((prev) => (prev + 1) % jardinImages.length);
    }, 4000);
    
    return () => {
      clearInterval(techInterval);
      clearInterval(jardinInterval);
    };
  }, [techImages.length, jardinImages.length]);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 30 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentTitle.length) {
        setDisplayedText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentTitleIndex, titles]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white pt-4 pb-8">
        <div className="max-w-[1600px] mx-auto px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* 1. Barre de filtres en haut */}
          <div className="bg-gray-soft rounded-lg px-6 py-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white text-black-deep rounded-lg font-medium text-sm">
                Category
              </button>
              <button className="px-4 py-2 bg-transparent text-gray-600 rounded-lg font-medium text-sm hover:bg-white/50">
                Platform
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-black-deep text-sm font-medium">0</span>
              </div>
              <button className="px-4 py-2 bg-transparent text-gray-600 rounded-lg font-medium text-sm hover:bg-white/50 flex items-center gap-2">
                Reset filters
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3. Carte "Learn more about market" à droite - au-dessus du titre */}
          <div className="flex justify-end mb-8">
            <div className="bg-violet-electric rounded-lg px-5 py-3 max-w-xs">
              <p className="text-white font-medium mb-1 text-xs">
                Discover specially curated products.
              </p>
              <Link href="/about" className="text-white underline font-medium text-xs">
                Learn more about market
              </Link>
            </div>
          </div>

          {/* 2. Titre et description au centre */}
          <div className="text-center mb-16">
            {/* Avis Trustpilot */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-black-deep">4.8</span>
                <span className="text-sm text-gray-600">sur</span>
                <span className="text-sm font-semibold text-black-deep">Trustpilot</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">2,547 avis</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-violet-electric mb-6 min-h-[1.2em]">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Votre marketplace premium pour l&apos;électronique et le jardinage intelligent.{' '}
              <br className="hidden md:block" />
              Des milliers de produits sélectionnés, livrés rapidement partout en Europe.
            </p>
          </div>

          {/* 4. Deux grandes grilles avec carrousels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte 1 - Carrousel Tech */}
            <div className="h-[700px] overflow-hidden relative group bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:border-violet-electric/30">
              <div className="relative h-full w-full">
                <div className="overflow-hidden relative h-full w-full">
                  {techImages.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentTechIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={product.url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {techImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTechIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentTechIndex ? 'w-8 bg-violet-electric' : 'w-2 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 2 - Carrousel Jardin */}
            <div className="h-[700px] overflow-hidden relative group bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:border-green-garden/30">
              <div className="relative h-full w-full">
                <div className="overflow-hidden relative h-full w-full">
                  {jardinImages.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentJardinIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={product.url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {jardinImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentJardinIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentJardinIndex ? 'w-8 bg-green-garden' : 'w-2 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending (Produits Phares) */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder pour 8 produits - sera remplacé par des vraies données */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const isTopRow = i <= 4;
              const categoryLabel = isTopRow ? 'Univers Tech' : 'Univers Jardin';
              const productName = `Produit ${i} - Nom du Produit Template`;
              const creatorName = `Créateur ${i}`;
              
              return (
                <Card key={i} hover className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm">
                  <div className="h-80 bg-gray-soft rounded-t-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  </div>
                  <CardContent className="p-7 flex-1 flex flex-col justify-between min-h-[300px] bg-off-white">
                    {/* Section 1: Category + Title */}
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2 font-normal">{categoryLabel}</p>
                      <h3 className="font-bold text-black-deep text-xl leading-snug">{productName}</h3>
                    </div>
                    
                    {/* Section 2: By Creator + Price */}
                    <div className="border-b border-gray-200 pb-3 mb-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-sm text-gray-500 font-normal">By </span>
                        <span className="text-sm text-black-deep font-medium">{creatorName}</span>
                      </div>
                      <div className="text-right flex items-baseline">
                        <span className="text-sm text-black-deep font-normal">from </span>
                        <span className="text-4xl font-bold text-black-deep ml-1">79</span>
                        <span className="text-sm text-black-deep font-normal ml-1"> USD</span>
                      </div>
                    </div>
                    
                    {/* Section 3: View Product */}
                    <div className="pt-1">
                      <Link href={`/products/${i}`} className="text-sm text-violet-electric hover:underline font-normal">
                        View Product
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-gray-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black-deep">
            Ce que disent nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Marie L.', rating: 5, text: 'Livraison rapide et produit de qualité. Je recommande !' },
              { name: 'Jean D.', rating: 5, text: 'Excellent service client et robot tondeuse parfait.' },
              { name: 'Sophie M.', rating: 5, text: 'Très satisfaite de mon iPhone 15 Pro, merci !' },
            ].map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <p className="font-semibold text-black-deep">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires (Marques) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black-deep">
            Nos Partenaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Apple', 'Sony', 'Husqvarna', 'STIHL'].map((brand) => (
              <div key={brand} className="text-center">
                <div className="text-4xl font-bold text-black-deep">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

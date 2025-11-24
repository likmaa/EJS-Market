'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Disclosure } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

// Composant pour afficher un logo partenaire
function PartnerLogoItem({ brand }: { brand: { name: string; logo: React.ReactNode } }) {
  return (
    <div className="mx-16 flex items-center justify-center h-20 flex-shrink-0">
      <div className="relative opacity-40 hover:opacity-70 transition-opacity duration-300 filter grayscale">
        {brand.logo}
      </div>
    </div>
  );
}

// Logos SVG des partenaires intégrés directement
const partnerLogos = [
  {
    name: 'Apple',
    logo: (
      <svg viewBox="0 0 100 120" className="h-14 w-auto" fill="currentColor">
        <path d="M78.1 10.6c-1.2 1.4-3.1 2.4-4.8 2.4-4.6 0-8.4-3.8-11-3.8-2.7 0-6.8 3.7-11.2 3.7-4 0-9.2-5.1-15.3-5.1C23 8.8 14 18.3 14 32.3c0 10.3 4.4 21.3 10 28.7 5.2 7 11.5 14.8 20.1 14.8 4.6 0 8-1.5 13-1.5 5.3 0 8.2 1.5 13.3 1.5 8.5 0 14.3-7.2 19.4-14.1 4.3-6.2 6.1-12.2 6.2-12.5-.1-.1-11.8-4.5-11.8-17.1 0-10.8 8.8-16 9.5-16.5-5.2-7.7-13.3-8.6-16.1-8.8zm-16.1-9.1c3.2-3.8 5.4-9.1 4.8-14.5-4.6.2-10.2 3.1-13.5 6.9-3 3.5-5.6 9-4.9 14.3 5.1.4 10.3-2.6 13.6-6.7z"/>
      </svg>
    ),
  },
  {
    name: 'Sony',
    logo: (
      <svg viewBox="0 0 200 60" className="h-12 w-auto" fill="currentColor">
        <path d="M10 15h12v30H10V15zm18 0h12v30H28V15zm18 0h12v30H46V15zm18 0h12v30H64V15zm18 0h12v30H82V15zm18 0h12v30H100V15zm18 0h12v30H118V15zm18 0h12v30H136V15zm18 0h12v30H154V15zm18 0h12v30H172V15z"/>
        <path d="M88 35h24v6H88v-6zm0 12h20v6H88v-6z"/>
      </svg>
    ),
  },
  {
    name: 'Husqvarna',
    logo: (
      <svg viewBox="0 0 280 80" className="h-12 w-auto" fill="none">
        <path d="M 35 25 Q 35 15 45 15 Q 55 15 55 25" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 85 25 Q 85 15 95 15 Q 105 15 105 25" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 160 25 Q 160 15 170 15 Q 180 15 180 25" stroke="currentColor" strokeWidth="3" fill="none"/>
        <text x="30" y="55" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="currentColor" letterSpacing="2">HUSQVARNA</text>
        <line x1="25" y1="65" x2="255" y2="65" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'STIHL',
    logo: (
      <svg viewBox="0 0 180 60" className="h-14 w-auto" fill="none">
        <text x="5" y="45" fontFamily="'Arial Black', Arial, sans-serif" fontSize="38" fontWeight="900" fill="currentColor" letterSpacing="5">STIHL</text>
        <line x1="0" y1="50" x2="175" y2="50" stroke="currentColor" strokeWidth="3"/>
      </svg>
    ),
  },
];

// Questions FAQ
interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Quels sont les délais de livraison ?',
    answer: 'Nous livrons partout en Europe. Les délais varient selon la destination : 2-3 jours ouvrables pour la France, 3-5 jours pour le reste de l\'Europe. Les produits en stock sont expédiés sous 24h.',
  },
  {
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, virement bancaire, et les paiements en plusieurs fois via Klarna. Tous les paiements sont sécurisés et cryptés.',
  },
  {
    question: 'Puis-je retourner un produit ?',
    answer: 'Oui, vous disposez de 30 jours pour retourner un produit non utilisé et dans son emballage d\'origine. Les frais de retour sont à votre charge sauf en cas d\'erreur de notre part. Le remboursement est effectué sous 14 jours.',
  },
  {
    question: 'Les produits sont-ils garantis ?',
    answer: 'Tous nos produits bénéficient de la garantie constructeur (minimum 2 ans dans l\'UE). Nous proposons également une garantie prolongée sur la plupart des produits électroniques. Consultez les détails sur chaque fiche produit.',
  },
  {
    question: 'Comment suivre ma commande ?',
    answer: 'Dès l\'expédition, vous recevez un email avec votre numéro de suivi. Vous pouvez suivre votre colis en temps réel depuis votre compte ou en utilisant la page "Suivre ma commande" avec votre numéro de commande.',
  },
  {
    question: 'Proposez-vous des services après-vente ?',
    answer: 'Oui, notre équipe SAV est disponible du lundi au vendredi de 9h à 18h. Nous proposons l\'assistance technique, la réparation, et le remplacement des pièces détachées pour tous nos produits. Contactez-nous par email ou téléphone.',
  },
  {
    question: 'Les prix incluent-ils la TVA ?',
    answer: 'Oui, tous les prix affichés incluent la TVA (taux variable selon le pays de livraison). Le prix TTC est clairement indiqué sur chaque produit. Le prix HT est également visible dans le panier.',
  },
  {
    question: 'Proposez-vous des remises pour les professionnels ?',
    answer: 'Oui, nous avons un programme "Be Pro" spécialement conçu pour les professionnels. Inscrivez-vous pour bénéficier de remises allant jusqu\'à 20% selon les volumes, un service dédié, et des conditions de paiement adaptées.',
  },
];

export default function Home() {
  const titles = useMemo(() => ['eJS MARKET', 'Electrónica & Jardín'], []);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  // États pour les carrousels
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentJardinIndex, setCurrentJardinIndex] = useState(0);
  
  // Références pour les intervalles
  const techIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const jardinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // États pour la section immersive 3D
  const [currentImmersiveIndex, setCurrentImmersiveIndex] = useState(0);
  const immersiveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  
  // Motion values pour l'effet 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations pour les valeurs de la souris
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  // Transform pour la rotation 3D
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  
  // Transform pour la position de l'effet de lumière (glow) en pourcentage
  const glowXPercent = useTransform(smoothX, [-0.5, 0.5], [20, 80]);
  const glowYPercent = useTransform(smoothY, [-0.5, 0.5], [20, 80]);
  
  // Images immersives (produits tech uniquement)
  const immersiveImages = useMemo(() => [
    { 
      id: 1, 
      url: '/img1.jpg', 
      name: 'iPhone 15 Pro Max',
    },
    { 
      id: 2, 
      url: '/img2.jpg', 
      name: 'MacBook Pro M3',
    },
    { 
      id: 3, 
      url: '/img3.jpg', 
      name: 'PlayStation 5',
    },
  ], []);
  
  // Témoignages enrichis
  const testimonials = useMemo(() => [
    { 
      name: 'Marie L.', 
      initial: 'ML',
      rating: 5, 
      text: 'Livraison rapide et produit de qualité. Je recommande vivement !',
      product: 'iPhone 15 Pro',
      date: 'Il y a 2 semaines',
    },
    { 
      name: 'Jean D.', 
      initial: 'JD',
      rating: 5, 
      text: 'Excellent service client et robot tondeuse parfait. Mon jardin n\'a jamais été aussi beau !',
      product: 'Robot Tondeuse Automower',
      date: 'Il y a 1 mois',
    },
    { 
      name: 'Sophie M.', 
      initial: 'SM',
      rating: 5, 
      text: 'Très satisfaite de mon iPhone 15 Pro, merci pour ce service impeccable !',
      product: 'iPhone 15 Pro',
      date: 'Il y a 3 semaines',
    },
    { 
      name: 'Thomas B.', 
      initial: 'TB',
      rating: 5, 
      text: 'MacBook Pro M3 exceptionnel ! Livraison express et emballage soigné.',
      product: 'MacBook Pro M3',
      date: 'Il y a 5 jours',
    },
    { 
      name: 'Laura K.', 
      initial: 'LK',
      rating: 5, 
      text: 'PlayStation 5 enfin trouvée ici ! Commande facile et suivi parfait.',
      product: 'PlayStation 5',
      date: 'Il y a 1 semaine',
    },
  ], []);
  
  const techImages = useMemo(() => [
    { 
      id: 1, 
      url: '/img1.jpg', 
      name: 'iPhone 15 Pro Max',
      price: 1399,
      available: true
    },
    { 
      id: 2, 
      url: '/img2.jpg', 
      name: 'MacBook Pro M3',
      price: 2499,
      available: true
    },
    { 
      id: 3, 
      url: '/img3.jpg', 
      name: 'PlayStation 5',
      price: 499,
      available: false
    },
  ], []);
  
  const jardinImages = useMemo(() => [
    { 
      id: 1, 
      url: '/jard1.jpg', 
      name: 'Robot Tondeuse Automower 430X',
      price: 2499,
      available: true
    },
    { 
      id: 2, 
      url: '/jard2.jpg', 
      name: 'Tondeuse Robot Gardena',
      price: 899,
      available: true
    },
    { 
      id: 3, 
      url: '/jard3.jpg', 
      name: 'Tronçonneuse STIHL',
      price: 349,
      available: true
    },
  ], []);

  // Fonction pour obtenir l'index suivant dans un carrousel
  const getNextIndex = useCallback((current: number, length: number) => {
    return (current + 1) % length;
  }, []);
  
  // Auto-play pour les carrousels - Avec intervalles différents pour éviter la synchronisation
  useEffect(() => {
    // Nettoyer les intervalles précédents s'ils existent
    if (techIntervalRef.current) {
      clearInterval(techIntervalRef.current);
    }
    if (jardinIntervalRef.current) {
      clearInterval(jardinIntervalRef.current);
    }
    
    // Carrousel Tech - démarre immédiatement, change toutes les 8 secondes
    techIntervalRef.current = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techImages.length);
    }, 8000); // 8 secondes
    
    // Carrousel Jardin - démarre avec un délai initial de 2 secondes, puis change toutes les 8.5 secondes
    // Des intervalles différents (8s vs 8.5s) garantissent qu'ils ne se synchroniseront jamais
    setTimeout(() => {
      // Première transition après 2 secondes
      setCurrentJardinIndex((prev) => (prev + 1) % jardinImages.length);
      
      // Puis continue toutes les 8.5 secondes (différent de 8 secondes)
      jardinIntervalRef.current = setInterval(() => {
        setCurrentJardinIndex((prev) => (prev + 1) % jardinImages.length);
      }, 8500); // 8.5 secondes - différent de l'intervalle Tech
    }, 2000); // Délai initial de 2 secondes
    
    return () => {
      if (techIntervalRef.current) {
        clearInterval(techIntervalRef.current);
      }
      if (jardinIntervalRef.current) {
        clearInterval(jardinIntervalRef.current);
      }
    };
  }, [techImages.length, jardinImages.length]);
  
  // Auto-play pour la section immersive - change toutes les 11 secondes
  useEffect(() => {
    if (immersiveIntervalRef.current) {
      clearInterval(immersiveIntervalRef.current);
    }
    
    immersiveIntervalRef.current = setInterval(() => {
      setCurrentImmersiveIndex((prev) => (prev + 1) % immersiveImages.length);
    }, 11000); // 11 secondes
    
    return () => {
      if (immersiveIntervalRef.current) {
        clearInterval(immersiveIntervalRef.current);
      }
    };
  }, [immersiveImages.length]);
  
  
  // Gestion du mouvement de la souris pour l'effet 3D
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);
  
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (titles.length === 0) return;
    
    const currentTitle = titles[currentTitleIndex];
    if (!currentTitle) return;
    
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
              {displayedText || 'eJS MARKET'}
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
                  <div 
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentTechIndex * 100}%)` }}
                  >
                    {techImages.map((product, index) => {
                      const isVisible = index === currentTechIndex;
                      const isNext = index === getNextIndex(currentTechIndex, techImages.length);
                      // Charger seulement l'image visible et la suivante
                      const shouldLoad = isVisible || isNext;
                      
                      return (
                    <div
                      key={product.id}
                          className="min-w-full h-full relative flex-shrink-0"
                    >
                          <div className="relative w-full h-full bg-gray-200">
                            {shouldLoad && (
                        <Image
                          src={product.url}
                          alt={product.name}
                          fill
                          className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index === 0}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                quality={85}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Informations produit en bas */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-bold mb-2">
                          {techImages[currentTechIndex]?.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-white text-2xl font-bold">
                            {techImages[currentTechIndex]?.price ? formatPrice(techImages[currentTechIndex].price * 100) : ''}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            techImages[currentTechIndex]?.available 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {techImages[currentTechIndex]?.available ? 'En stock' : 'Rupture de stock'}
                          </span>
                        </div>
                        <Link 
                          href={`/products/${techImages[currentTechIndex]?.id}`}
                          className="inline-block text-sm text-violet-electric hover:underline font-normal"
                        >
                          Voir produit
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Indicateurs */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {techImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTechIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentTechIndex ? 'w-8 bg-violet-electric' : 'w-2 bg-white/50 hover:bg-white/75'
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
                  <div 
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentJardinIndex * 100}%)` }}
                  >
                    {jardinImages.map((product, index) => {
                      const isVisible = index === currentJardinIndex;
                      const isNext = index === getNextIndex(currentJardinIndex, jardinImages.length);
                      // Charger seulement l'image visible et la suivante
                      const shouldLoad = isVisible || isNext;
                      
                      return (
                    <div
                      key={product.id}
                          className="min-w-full h-full relative flex-shrink-0"
                    >
                          <div className="relative w-full h-full bg-gray-200">
                            {shouldLoad && (
                        <Image
                          src={product.url}
                          alt={product.name}
                          fill
                          className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index === 0}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                quality={85}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Informations produit en bas */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-bold mb-2">
                          {jardinImages[currentJardinIndex]?.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-white text-2xl font-bold">
                            {jardinImages[currentJardinIndex]?.price ? formatPrice(jardinImages[currentJardinIndex].price * 100) : ''}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            jardinImages[currentJardinIndex]?.available 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {jardinImages[currentJardinIndex]?.available ? 'En stock' : 'Rupture de stock'}
                          </span>
                        </div>
                        <Link 
                          href={`/products/${jardinImages[currentJardinIndex]?.id}`}
                          className="inline-block text-sm text-violet-electric hover:underline font-normal"
                        >
                          Voir produit
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Indicateurs */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {jardinImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentJardinIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentJardinIndex ? 'w-8 bg-green-garden' : 'w-2 bg-white/50 hover:bg-white/75'
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
            {/* Produits avec images de la boutique */}
            {[
              { id: 1, name: 'iPhone 15 Pro', creator: 'Apple', category: 'Univers Tech', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', price: 1199 },
              { id: 2, name: 'PlayStation 5', creator: 'Sony', category: 'Univers Tech', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500', price: 499 },
              { id: 3, name: 'Sony Alpha 7 IV', creator: 'Sony', category: 'Univers Tech', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500', price: 2799 },
              { id: 4, name: 'MacBook Pro M3', creator: 'Apple', category: 'Univers Tech', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', price: 1999 },
              { id: 5, name: 'Robot Tondeuse Automower 430X', creator: 'Husqvarna', category: 'Univers Jardin', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500', price: 2499 },
              { id: 6, name: 'Tondeuse Robot Gardena', creator: 'Gardena', category: 'Univers Jardin', image: '/jard2.jpg', price: 899 },
              { id: 7, name: 'Tronçonneuse STIHL', creator: 'STIHL', category: 'Univers Jardin', image: '/jard3.jpg', price: 349 },
              { id: 8, name: 'Aspirateur Robot Roomba', creator: 'iRobot', category: 'Univers Jardin', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', price: 599 },
            ].map((product) => {
              return (
                <Card key={product.id} hover className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm group">
                  <div className="h-80 bg-gray-soft rounded-t-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-125"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      loading="lazy"
                      quality={80}
                    />
                  </div>
                  <CardContent className="p-7 flex-1 flex flex-col justify-between min-h-[300px] bg-off-white">
                    {/* Section 1: Category + Title */}
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2 font-normal">{product.category}</p>
                      <h3 className="font-bold text-black-deep text-xl leading-snug">{product.name}</h3>
                    </div>
                    
                    {/* Section 2: By Creator + Price */}
                    <div className="border-b border-gray-200 pb-3 mb-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-sm text-gray-500 font-normal">By </span>
                        <span className="text-sm text-black-deep font-medium">{product.creator}</span>
                      </div>
                      <div className="text-right flex items-baseline">
                        <span className="text-sm text-black-deep font-normal">from </span>
                        <span className="text-4xl font-bold text-black-deep ml-1">{Math.floor(product.price)}</span>
                        <span className="text-sm text-black-deep font-normal ml-1"> €</span>
                      </div>
                    </div>
                    
                    {/* Section 3: View Product */}
                    <div className="pt-1">
                      <Link href={`/products/${product.id}`} className="text-sm text-violet-electric hover:underline font-normal">
                        View Product
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="text-base text-violet-electric hover:underline font-bold">
                Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Section Immersive 3D - Produits Tech */}
      <section 
        className="relative w-full h-[90vh] min-h-[700px] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Images avec transition fade */}
          <div className="absolute inset-0 w-full h-full">
            {immersiveImages.map((product, index) => {
              const isVisible = index === currentImmersiveIndex;
              const isNext = index === (currentImmersiveIndex + 1) % immersiveImages.length;
              
              return (
                <motion.div
                  key={product.id}
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 1.1,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    zIndex: isVisible ? 10 : isNext ? 5 : 1,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                      quality={90}
                      style={{
                        filter: 'brightness(0.7) contrast(1.1)',
                      }}
                    />
                    {/* Overlay gradient pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Effet de lumière/glow qui suit la souris */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: useTransform(glowXPercent, (v) => `${v}%`),
              top: useTransform(glowYPercent, (v) => `${v}%`),
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          
          {/* Indicateurs de position (points en bas) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {immersiveImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImmersiveIndex(index);
                  // Réinitialiser l'intervalle
                  if (immersiveIntervalRef.current) {
                    clearInterval(immersiveIntervalRef.current);
                  }
                  immersiveIntervalRef.current = setInterval(() => {
                    setCurrentImmersiveIndex((prev) => (prev + 1) % immersiveImages.length);
                  }, 11000);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentImmersiveIndex 
                    ? 'w-8 bg-violet-electric' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Voir ${immersiveImages[index].name}`}
              />
            ))}
          </div>
          
          {/* Call-to-action subtil au centre (optionnel - peut être retiré pour plus de minimalisme) */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 text-center"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Link
              href={`/products/${immersiveImages[currentImmersiveIndex]?.id}`}
              className="inline-block px-6 py-3 bg-violet-electric text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-violet-700 active:bg-violet-800"
            >
              Découvrir {immersiveImages[currentImmersiveIndex]?.name}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Témoignages - Défilement Horizontal */}
      <section className="py-20 bg-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black-deep">
            Ce que disent nos clients
          </h2>
          
          {/* Défilement continu des témoignages */}
          <div className="relative">
            <Marquee
              speed={40}
              gradient={true}
              gradientColor="#FAFAFA"
              gradientWidth={100}
              pauseOnHover={true}
              className="py-4"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="mx-4 w-[350px] flex-shrink-0">
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Avatar et nom */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-violet-electric/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-violet-electric font-bold text-lg">
                            {testimonial.initial}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-lg text-black-deep mb-1">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {testimonial.product}
                          </p>
                        </div>
                      </div>
                      
                      {/* Étoiles */}
                      <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                          <svg
                            key={j}
                            className="w-5 h-5 text-yellow-400 fill-current flex-shrink-0"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                    ))}
                  </div>
                      
                      {/* Commentaire */}
                      <p className="text-gray-700 mb-6 italic text-base leading-relaxed flex-1">
                        &quot;{testimonial.text}&quot;
                      </p>
                      
                      {/* Date */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          {testimonial.date}
                        </p>
                      </div>
                </CardContent>
              </Card>
                </div>
            ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Partenaires - Défilement Horizontal Infini */}
      <section className="py-12 bg-white overflow-hidden">
        <Marquee
          speed={50}
          direction="right"
          gradient={true}
          gradientColor="#FFFFFF"
          gradientWidth={100}
          pauseOnHover={true}
          className="py-6"
        >
          {/* Première passe des logos */}
          {partnerLogos.map((brand, index) => (
            <PartnerLogoItem
              key={`${brand.name}-1-${index}`}
              brand={brand}
            />
          ))}
          {/* Deuxième passe pour l'effet infini (hors écran initialement) */}
          {partnerLogos.map((brand, index) => (
            <PartnerLogoItem
              key={`${brand.name}-2-${index}`}
              brand={brand}
            />
          ))}
        </Marquee>
      </section>

      {/* FAQ et Newsletter - Sections avec gradient continu */}
      <div className="relative">
        {/* Gradient continu qui couvre les deux sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900 via-purple-900 to-indigo-950">
          {/* Effet de grain/texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />
          {/* Dégradé supplémentaire pour plus de profondeur sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>

        {/* FAQ - Questions Fréquentes */}
        <section className="pt-20 pb-12 relative">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Questions Fréquentes
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Disclosure key={index} as="div" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center px-6 py-5 text-left text-lg font-semibold text-white hover:bg-white/10 transition-colors duration-200 rounded-2xl">
                        <span>{item.question}</span>
                        <motion.svg
                          className="w-5 h-5 text-white transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </Disclosure.Button>
                      <Disclosure.Panel className="overflow-hidden">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-5 pt-2">
                            <p className="text-white/90 leading-relaxed">{item.answer}</p>
                          </div>
                        </motion.div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
            
            {/* Contact additionnel */}
            <div className="mt-12 text-center">
              <p className="text-white/80 mb-4">
                Vous ne trouvez pas la réponse à votre question ?
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-white/90 active:bg-white/80 hover:scale-105 shadow-lg"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="pt-12 pb-20 relative">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </div>
  );
}

// Composant Newsletter avec gestion d'état
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation basique
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      setIsSubmitting(false);
      return;
    }

    // Simulation d'envoi (à remplacer par un appel API réel)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous devriez appeler votre API pour enregistrer l'email
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      
      setIsSuccess(true);
      setEmail('');
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full px-5 py-4 rounded-lg bg-white/10 backdrop-blur-md border-2 border-white/20 focus:border-white/40 focus:outline-none transition-colors duration-200 text-white placeholder-white/60"
            disabled={isSubmitting}
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="whitespace-nowrap bg-white text-violet-700 hover:bg-white/90 active:bg-white/80 hover:scale-105 shadow-lg"
        >
          {isSubmitting ? 'Envoi...' : 'S\'inscrire'}
        </Button>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-red-300 text-sm"
        >
          {error}
        </motion.div>
      )}
      
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-green-300 text-sm font-medium"
        >
          ✅ Merci ! Vous êtes maintenant inscrit à notre newsletter.
        </motion.div>
      )}
      
      <p className="mt-4 text-center text-sm text-white/70">
        En vous inscrivant, vous acceptez notre{' '}
        <Link href="/privacy" className="text-white hover:underline font-medium">
          politique de confidentialité
        </Link>
        . Vous pouvez vous désinscrire à tout moment.
      </p>
    </form>
  );
}

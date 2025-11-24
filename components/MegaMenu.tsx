'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Désactiver les clics pendant un court instant après l'ouverture
    let isOpening = true;
    const openingTimeout = setTimeout(() => {
      isOpening = false;
    }, 300);

    const handleClickOutside = (event: MouseEvent) => {
      // Ignorer les clics pendant l'ouverture
      if (isOpening) {
        return;
      }

      const target = event.target as Node;
      
      // Ne pas fermer si le clic est dans le menu
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      
      // Ne pas fermer si le clic est dans le header (y compris le bouton Explorer)
      const header = document.querySelector('header');
      if (header && header.contains(target)) {
        return;
      }
      
      // Fermer si le clic est vraiment en dehors
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Attendre un peu avant d'ajouter l'écouteur
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 300);

    document.addEventListener('keydown', handleEscape);

    return () => {
      clearTimeout(openingTimeout);
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const categories = [
    {
      title: '📱 Apple & Mobile',
      items: [
        { name: 'iPhone & Smartphones', href: '/products?category=electronics&brand=Apple&type=smartphone' },
        { name: 'MacBook & iMac', href: '/products?category=electronics&brand=Apple&type=laptop' },
        { name: 'iPad & Tablettes', href: '/products?category=electronics&brand=Apple&type=tablet' },
        { name: 'Apple Watch & Accessoires', href: '/products?category=electronics&brand=Apple&type=watch' },
      ],
    },
    {
      title: '🎮 Gaming & Image',
      items: [
        { name: 'Consoles (PS5) & VR', href: '/products?category=electronics&type=gaming' },
        { name: 'PC Gaming & Écrans', href: '/products?category=electronics&type=pc' },
        { name: 'Photo (Sony, Canon) & Drones', href: '/products?category=photo' },
      ],
    },
    {
      title: '🛴 E-Mobilité',
      items: [
        { name: 'Trottinettes Électriques', href: '/products?category=mobility&type=scooter' },
        { name: 'Hoverboards & Gyropodes', href: '/products?category=mobility&type=hoverboard' },
        { name: 'Skateboards Électriques', href: '/products?category=mobility&type=skateboard' },
      ],
    },
    {
      title: '🌱 Jardin Tech',
      items: [
        { name: 'Robots Tondeuses (Husqvarna...)', href: '/products?category=garden&type=mower' },
        { name: 'Arrosage Connecté', href: '/products?category=garden&type=irrigation' },
        { name: 'Outils Motorisés & Main', href: '/products?category=tools' },
        { name: 'Robots Culinaires (Thermomix)', href: '/products?category=electronics&type=kitchen' },
      ],
    },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-[60] w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* 4 Colonnes de catégories */}
          {categories.map((category, index) => (
            <div key={index}>
              <h3 className="font-bold text-black-deep mb-4 text-lg">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-gray-600 hover:text-violet-electric transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Colonne 5 : En Vedette (Image) */}
          <div className="hidden lg:block">
            <h3 className="font-bold text-black-deep mb-4 text-lg">⭐️ En Vedette</h3>
            <Link href="/products/apple-vision-pro" onClick={onClose} className="block group">
              <div className="relative h-64 bg-gray-soft rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🥽</p>
                    <p className="font-semibold text-black-deep group-hover:text-violet-electric transition-colors">
                      Apple Vision Pro
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Découvrir</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


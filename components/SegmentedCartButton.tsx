'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function SegmentedCartButton() {
  const { cart, itemsCount, totalTTC } = useCart();
  
  // Récupérer la dernière image du dernier produit ajouté
  const lastAddedItem = cart.length > 0 ? cart[cart.length - 1] : null;
  const lastImage = lastAddedItem?.image;

  return (
    <div className="flex items-center gap-0 rounded-lg overflow-hidden shadow-lg max-w-fit">
      {/* Partie gauche - Panier (Noir) */}
      <div className="bg-black-deep text-white px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {/* Image du dernier produit ajouté */}
          {lastImage && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-black-deep overflow-hidden bg-white">
              <Image
                src={lastImage}
                alt="Dernier produit"
                width={24}
                height={24}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        {itemsCount > 0 && (
          <span className="text-sm font-medium">{itemsCount}</span>
        )}
      </div>

      {/* Partie droite - Commander (Orange) */}
      <div className="bg-orange-submit text-black-deep px-6 py-3 flex items-center gap-2 font-medium flex-shrink-0">
        <span>Commander</span>
        {itemsCount > 0 ? (
          <span className="font-bold">{formatPrice(totalTTC)}</span>
        ) : (
          <span className="text-sm opacity-75">0,00 €</span>
        )}
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

export function StickyCart() {
  const { cart, itemsCount, totalTTC, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (itemsCount === 0) return null;

  return (
    <>
      {/* Sticky Button - Desktop */}
      <div className="fixed bottom-4 right-4 z-50 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-violet-electric text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-violet-700 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{itemsCount} Articles | {formatPrice(totalTTC)}</span>
        </button>
      </div>

      {/* Sticky Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-violet-electric text-white">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-3 flex items-center justify-center gap-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{itemsCount} Articles | {formatPrice(totalTTC)}</span>
        </button>
      </div>

      {/* Cart Drawer */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Dialog.Panel className="w-screen max-w-md">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <Dialog.Title className="text-lg font-semibold text-black-deep">
                  Panier
                </Dialog.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Votre panier est vide</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const priceTTC = item.priceHT * (1 + item.vatRate);
                      return (
                        <div key={item.productId} className="flex gap-4 border-b border-gray-200 pb-4">
                          {item.image && (
                            <div className="relative w-20 h-20 bg-gray-soft rounded-lg flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                                sizes="80px"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-black-deep">{item.name}</h4>
                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                            <p className="text-violet-electric font-semibold mt-1">
                              {formatPrice(priceTTC)} × {item.quantity}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm"
                              >
                                -
                              </button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className="ml-auto text-red-500 text-sm hover:text-red-700"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-black-deep">Total</span>
                    <span className="text-xl font-bold text-violet-electric">{formatPrice(totalTTC)}</span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-violet-electric text-white text-center py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
                  >
                    Voir le panier complet
                  </Link>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}


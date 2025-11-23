'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice, calculateTTC } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

// Données mockées (à remplacer par API)
const mockProduct = {
  id: '1',
  sku: 'APP-IPH-0001',
  name: 'iPhone 15 Pro',
  description: {
    fr: 'Le dernier iPhone avec puce A17 Pro, écran Super Retina XDR de 6,1 pouces, et système de caméra Pro avancé.',
    en: 'The latest iPhone with A17 Pro chip, 6.1-inch Super Retina XDR display, and advanced Pro camera system.',
  },
  priceHT: 119900,
  vatRate: 0.20,
  brand: 'Apple',
  category: 'electronics',
  stock: 10,
  isActive: true,
  images: [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  ],
  attributes: {
    processor: 'A17 Pro',
    ram: '8Go',
    storage: '256Go',
    screenSize: '6.1 pouces',
    os: 'iOS 17',
  },
  weight: 0.187,
  dimensions: {
    length: 15.9,
    width: 7.6,
    height: 0.83,
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // TODO: Récupérer le produit depuis l'API avec productId
  const product = mockProduct;

  const priceTTC = calculateTTC(product.priceHT, product.vatRate);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        priceHT: product.priceHT,
        vatRate: product.vatRate,
        image: product.images[0],
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg mb-4">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          
          {/* Miniatures */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(priceTTC)}
              </p>
              <p className="text-sm text-gray-500">
                HT: {formatPrice(product.priceHT)} (TVA incl.)
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {product.stock > 0 ? (
                <Badge variant="success">En stock ({product.stock} disponibles)</Badge>
              ) : (
                <Badge variant="error">Rupture de stock</Badge>
              )}
              <Badge variant="info">SKU: {product.sku}</Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description.fr}
            </p>
          </div>

          {/* Attributs */}
          {product.attributes && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Caractéristiques</h3>
                <dl className="grid grid-cols-2 gap-3">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="font-medium">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}

          {/* Ajout au panier */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantité:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !product.isActive}
            >
              {product.stock > 0
                ? `Ajouter ${quantity > 1 ? `${quantity} × ` : ''}au panier`
                : 'Rupture de stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


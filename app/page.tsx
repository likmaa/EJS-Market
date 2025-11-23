import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  const categories = [
    {
      name: 'Électronique',
      description: 'iPhone, PS5, MacBook et plus',
      image: '📱',
      href: '/products?category=electronics',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Jardinage',
      description: 'Robots tondeuses, outils',
      image: '🌳',
      href: '/products?category=garden',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Photo & Vidéo',
      description: 'Caméras, objectifs',
      image: '📷',
      href: '/products?category=photo',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Mobilité',
      description: 'Trottinettes, hoverboards',
      image: '🛴',
      href: '/products?category=mobility',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const features = [
    {
      title: 'Livraison rapide',
      description: "Livraison en 24-48h dans toute l'Europe",
      icon: '🚚',
    },
    {
      title: 'Paiement sécurisé',
      description: 'Paiement 100% sécurisé avec 3D Secure',
      icon: '🔒',
    },
    {
      title: 'Support client',
      description: 'Service client disponible 7j/7',
      icon: '💬',
    },
    {
      title: 'Retours gratuits',
      description: 'Retours gratuits sous 30 jours',
      icon: '↩️',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur E&J Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Votre destination pour l&apos;électronique et le jardinage en Europe.
              Des produits de qualité, livrés rapidement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Découvrir nos produits
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20">
                  Voir les catégories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez nos catégories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`text-6xl mb-4 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}>
                      {category.image}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir E&J Store ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer vos achats ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Découvrez notre large sélection de produits de qualité
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              Voir tous les produits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

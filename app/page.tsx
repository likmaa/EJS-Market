import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-electric via-purple-700 to-green-600 text-white min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            La Technologie au service de votre Maison & Jardin
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Découvrez notre sélection premium d&apos;électronique et d&apos;équipements de jardinage connectés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Découvrir nos produits
              </Button>
            </Link>
            <Link href="/products?category=electronics">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20">
                Explorer la Tech
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories (2 Colonnes Artistiques) */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Univers Tech */}
            <Link href="/products?category=electronics">
              <Card hover className="h-full min-h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-electric to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="relative h-full flex flex-col items-center justify-center p-12 text-center text-white">
                  <div className="text-8xl mb-6">📱</div>
                  <h2 className="text-4xl font-extrabold mb-4">Univers Tech</h2>
                  <p className="text-xl mb-6 opacity-90">
                    iPhone, MacBook, PS5, Caméras et plus
                  </p>
                  <Button variant="secondary" size="lg">
                    Explorer
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Univers Jardin */}
            <Link href="/products?category=garden">
              <Card hover className="h-full min-h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="relative h-full flex flex-col items-center justify-center p-12 text-center text-white">
                  <div className="text-8xl mb-6">🌳</div>
                  <h2 className="text-4xl font-extrabold mb-4">Univers Jardin</h2>
                  <p className="text-xl mb-6 opacity-90">
                    Robots tondeuses, outils connectés, arrosage intelligent
                  </p>
                  <Button variant="secondary" size="lg">
                    Explorer
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending (Produits Phares) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-black-deep">
            Produits Phares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder pour 8 produits - sera remplacé par des vraies données */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} hover className="h-full">
                <div className="h-48 bg-gray-soft rounded-t-lg"></div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-black-deep mb-2">Produit {i}</h3>
                  <p className="text-violet-electric font-bold text-lg">999,00 €</p>
                </CardContent>
              </Card>
            ))}
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

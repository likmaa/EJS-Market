'use client';

import Marquee from 'react-fast-marquee';
import { LanguageSelector } from './LanguageSelector';

export function NewsBar() {
  const newsText = "Livraison Gratuite en Europe dès 100€ ⚡️ Nouveaux Robots Husqvarna en stock ⚡️ -10% sur Apple avec le code EJS10 ⚡️";

  return (
    <div className="bg-black-deep text-white py-2 overflow-hidden w-full relative">
      <Marquee speed={50} gradient={false} pauseOnHover={false} className="text-sm font-medium">
        <span className="mx-8 whitespace-nowrap">{newsText}</span>
        <span className="mx-8 whitespace-nowrap">{newsText}</span>
        <span className="mx-8 whitespace-nowrap">{newsText}</span>
      </Marquee>
      {/* Sélecteur de langue en haut à droite */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-4">
        <LanguageSelector variant="light" />
      </div>
    </div>
  );
}


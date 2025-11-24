'use client';

import { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';

const languageNames: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
};

const languageFlags: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  es: '🇪🇸',
  de: '🇩🇪',
  it: '🇮🇹',
};

interface LanguageSelectorProps {
  variant?: 'default' | 'light';
}

export function LanguageSelector({ variant = 'default' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('fr');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const isLight = variant === 'light';


  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Ne pas fermer si le clic est dans le dropdown
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return;
      }

      // Ne pas fermer si le clic est dans le header (pour ne pas bloquer les autres boutons)
      const header = document.querySelector('header');
      if (header && header.contains(target)) {
        return;
      }

      setIsOpen(false);
    }

    // Utiliser un délai pour éviter les conflits
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Récupérer la langue depuis localStorage ou navigator
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') || 
                     navigator.language.split('-')[0] || 
                     'fr';
    
    if (SUPPORTED_LANGUAGES.includes(savedLang as any)) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred-language', lang);
    setIsOpen(false);
    
    // TODO: Intégrer avec next-intl pour changer la langue
    // window.location.reload(); // Temporaire, à remplacer par le router de next-intl
  };

  console.log('LanguageSelector rendered, isOpen:', isOpen);

  return (
    <div className="relative z-[110] pointer-events-auto" ref={dropdownRef} style={{ pointerEvents: 'auto' }}>
      {/* Bouton sélecteur */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log('🟢 Language button clicked, current state:', isOpen);
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
          isLight 
            ? 'text-white hover:bg-white/10' 
            : 'text-black-deep hover:bg-gray-100'
        }`}
        aria-label="Choisir la langue"
        aria-expanded={isOpen}
      >
        {currentLang !== 'fr' && (
          <span className="text-lg">{languageFlags[currentLang] || '🌐'}</span>
        )}
        <span className="hidden sm:inline">{currentLang === 'fr' ? 'Fr' : languageNames[currentLang] || 'FR'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[70]">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                currentLang === lang ? 'bg-violet-50 text-violet-electric' : 'text-black-deep'
              }`}
            >
              <span className="text-xl">{languageFlags[lang]}</span>
              <span className="font-medium">{languageNames[lang]}</span>
              {currentLang === lang && (
                <svg
                  className="w-4 h-4 ml-auto text-violet-electric"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


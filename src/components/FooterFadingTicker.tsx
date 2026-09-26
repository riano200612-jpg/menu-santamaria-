import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Idioma } from '../types';

interface FooterFadingTickerProps {
  idioma: Idioma;
  darkMode?: boolean;
}

export function FooterFadingTicker({ idioma }: FooterFadingTickerProps) {
  const frases = [
    {
      es: "🏆 Tripadvisor Travellers' Choice 2023–2026 | Restaurant Guru Recommended",
      en: "🏆 Tripadvisor Travellers' Choice 2023–2026 | Restaurant Guru Recommended",
    },
    {
      es: '⚠️ Aviso: Informa a nuestro equipo sobre cualquier alergia antes de ordenar.',
      en: '⚠️ Notice: Please inform our staff of any allergies before ordering.',
    },
    {
      es: '📍 Plaza del Museo Naval · Centro Histórico, Cartagena',
      en: '📍 Plaza del Museo Naval · Historic Center, Cartagena',
    },
    {
      es: '💵 Conversión en USD basada en la TRM oficial certificada por el Banco de la República.',
      en: '💵 USD estimates calculated with the official TRM rate certified by the Central Bank of Colombia ($3,306.86 COP/USD).',
    },
    {
      es: '📞 Reservas: 315 055 4615 · 📸 @santamariadelmarctg',
      en: '📞 Reservations: 315 055 4615 · 📸 @santamariadelmarctg',
    },
  ];

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % frases.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [frases.length]);

  const fraseActual = frases[indice][idioma];

  return (
    <footer
      id="footer-fading-ticker"
      className="pt-10 pb-14 text-center max-w-2xl mx-auto px-4"
      aria-live="polite"
      aria-label={idioma === 'es' ? 'Información y reconocimientos' : 'Information and awards'}
    >
      <div className="min-h-[2.5rem] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${idioma}-${indice}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs sm:text-[13.5px] font-serif italic text-stone-700 tracking-wide select-none leading-relaxed transition-colors duration-300"
          >
            {fraseActual}
          </motion.p>
        </AnimatePresence>
      </div>
    </footer>
  );
}

// Compatibilidad con imports existentes
export { FooterFadingTicker as RestauranteHistoria };

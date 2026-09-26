import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Idioma } from '../types';

interface CabeceraCitasFadingProps {
  idioma: Idioma;
}

export function CabeceraCitasFading({ idioma }: CabeceraCitasFadingProps) {
  const citas = [
    {
      id: 'lety',
      texto: {
        es: '“Soy Lety Moreno. En Santa María del Mar comparto la cocina cartagenera que aprendí de mi familia y el legado gastronómico de mi tío Lacydes Moreno Blanco. Cada plato una tradición, Caribe y hospitalidad junto al Museo Naval.”',
        en: '“I am Lety Moreno. At Santa María del Mar, I share the Cartagena cuisine I learned from my family and the culinary legacy of my uncle Lacydes Moreno Blanco. Every dish is a tradition, Caribbean spirit, and hospitality beside the Naval Museum.”',
      },
      autor: null,
    },
    {
      id: 'lacydes',
      texto: {
        es: '“Esencialmente, la cocina, como el amor, es una forma de la contemplación y del sabio manejo del fuego.”',
        en: '“Essentially, cooking, like love, is a form of contemplation and the wise mastery of fire.”',
      },
      autor: '— LACYDES MORENO BLANCO',
    },
  ];

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % citas.length);
    }, 8000);

    return () => clearInterval(intervalo);
  }, [citas.length]);

  const citaActual = citas[indice];

  return (
    <section
      id="bloque-nuestra-historia"
      className="max-w-2xl mx-auto mt-4 px-4 text-center"
      aria-label={idioma === 'es' ? 'Nuestra Historia' : 'Our Story'}
    >
      {/* Contenedor con altura mínima fija para alternar citas sin saltos de layout */}
      <div className="min-h-[5.5rem] sm:min-h-[4rem] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${idioma}-${citaActual.id}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-[13px] sm:text-[14.5px] text-stone-600 italic leading-[1.8] font-serif max-w-xl select-none font-light">
              {citaActual.texto[idioma]}
              {citaActual.autor && (
                <span className="block mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8A0C13] font-serif font-medium not-italic">
                  {citaActual.autor}
                </span>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

import { Idioma } from '../types';
import { CabeceraCitasFading } from './CabeceraCitasFading';

interface PortadaBienvenidaProps {
  idioma: Idioma;
  setIdioma: (idioma: Idioma) => void;
}

export function PortadaBienvenida({ idioma, setIdioma }: PortadaBienvenidaProps) {
  return (
    <header className="relative w-full pt-8 sm:pt-14 pb-10 sm:pb-16 text-center select-none">
      {/* Selector de Idioma Minimalista en la esquina superior derecha */}
      <div className="flex justify-end w-full mb-8 sm:mb-12">
        <div
          id="selector-idioma-banderas"
          className="inline-flex items-center gap-1.5 p-1 rounded-full border border-stone-200/80 bg-white/80 backdrop-blur-xs transition-colors"
          role="group"
          aria-label={idioma === 'es' ? 'Seleccionar idioma' : 'Select language'}
        >
          <button
            type="button"
            id="btn-idioma-es"
            onClick={() => setIdioma('es')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer ${
              idioma === 'es'
                ? 'bg-[#8A0C13] text-white shadow-2xs font-bold'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
            title="Español"
            aria-label="Español"
            aria-pressed={idioma === 'es'}
          >
            <span>ES</span>
          </button>
          <span className="text-stone-300 text-xs select-none">·</span>
          <button
            type="button"
            id="btn-idioma-en"
            onClick={() => setIdioma('en')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer ${
              idioma === 'en'
                ? 'bg-[#8A0C13] text-white shadow-2xs font-bold'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
            title="English"
            aria-label="English"
            aria-pressed={idioma === 'en'}
          >
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Identidad Tipográfica Exclusiva Fine-Dining: Cero imágenes, respiro generoso */}
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto px-4">
        {/* Kicker editorial refinado */}
        <span className="text-[11px] sm:text-xs font-serif tracking-[0.35em] uppercase text-stone-500 mb-4 sm:mb-5 block">
          {idioma === 'es' ? 'Restaurante Bar · Cartagena de Indias' : 'Restaurant & Bar · Cartagena de Indias'}
        </span>

        {/* Título de la casa: Tipografía Serif imponente, elegante, espaciada */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-[0.14em] uppercase text-stone-900 leading-tight">
          Santa María <span className="text-[#8A0C13] font-normal italic lowercase tracking-normal">del</span> Mar
        </h1>

        {/* Subtítulo sobrio de alta gastronomía caribeña */}
        <p className="text-xs sm:text-[13px] font-serif tracking-[0.24em] uppercase text-stone-600 mt-4 sm:mt-5 max-w-lg leading-relaxed">
          {idioma === 'es'
            ? 'Cocina de Origen, Tradición & Herencia del Caribe'
            : 'Heritage Caribbean Cuisine, Seafood & Origin'}
        </p>

        {/* Separador fino minimalista de alta gama */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8A0C13]/60 to-transparent mx-auto mt-6 sm:mt-8 mb-4 sm:mb-6" aria-hidden="true" />

        {/* Citas y relato de la historia familiar con transición limpia */}
        <CabeceraCitasFading idioma={idioma} />
      </div>
    </header>
  );
}

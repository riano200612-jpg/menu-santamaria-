import { useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Idioma } from '../types';
import { formatearPrecio } from '../data/translations';
import {
  CATEGORIAS_BEBIDAS,
  CategoriaBebidaId,
  CategoriaBebidas,
} from '../data/bebidasData';

export interface BebidasMenuProps {
  /**
   * Idioma seleccionado ('es' | 'en')
   */
  idioma?: Idioma;
  /**
   * Si es true, inicia con todas las categorías colapsadas
   */
  iniciarColapsado?: boolean;
  /**
   * Búsqueda externa opcional (para sincronizar con el buscador general)
   */
  busquedaExterna?: string;
  /**
   * Clases adicionales para el contenedor principal
   */
  className?: string;
}

export function BebidasMenu({
  idioma = 'es',
  iniciarColapsado = true,
  busquedaExterna,
  className = '',
}: BebidasMenuProps) {
  // Por defecto todas las categorías inician cerradas (null) para una experiencia limpia de cero saturación
  const [categoriaAbiertaId, setCategoriaAbiertaId] = useState<CategoriaBebidaId | null>(null);

  const [busquedaInterna, setBusquedaInterna] = useState<string>('');
  const busquedaEfectiva = busquedaExterna !== undefined ? busquedaExterna : busquedaInterna;

  const categoriasFiltradas = useMemo(() => {
    const q = busquedaEfectiva.toLowerCase().trim();
    if (!q) return CATEGORIAS_BEBIDAS;

    return CATEGORIAS_BEBIDAS.map((cat) => {
      const itemsCoincidentes = cat.items.filter((item) => {
        const nombreEs = item.nombre.toLowerCase();
        const nombreEn = item.nombreEn?.toLowerCase() || '';
        const ingredEs = item.ingredientes.es.toLowerCase();
        const ingredEn = item.ingredientes.en?.toLowerCase() || '';
        const subtitulo = item.subtitulo?.toLowerCase() || '';
        const categoriaNombreEs = cat.nombre.es.toLowerCase();
        const categoriaNombreEn = cat.nombre.en.toLowerCase();

        return (
          nombreEs.includes(q) ||
          nombreEn.includes(q) ||
          ingredEs.includes(q) ||
          ingredEn.includes(q) ||
          subtitulo.includes(q) ||
          categoriaNombreEs.includes(q) ||
          categoriaNombreEn.includes(q)
        );
      });

      return {
        ...cat,
        items: itemsCoincidentes,
      };
    }).filter((cat) => cat.items.length > 0);
  }, [busquedaEfectiva]);

  const toggleCategoria = (catId: CategoriaBebidaId) => {
    setCategoriaAbiertaId((prev) => {
      const esApertura = prev !== catId;
      if (esApertura) {
        setTimeout(() => {
          const elemento = document.getElementById(`acordeon-bebida-${catId}`);
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return catId;
      }
      return null;
    });
  };

  return (
    <section
      id="seccion-bebidas-menu"
      className={`w-full max-w-3xl mx-auto space-y-6 ${className}`}
      aria-label={idioma === 'es' ? 'Carta de Bebidas' : 'Drinks Menu'}
    >
      {/* Buscador interno sobrio en caso de no proveerse búsqueda externa */}
      {busquedaExterna === undefined && (
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={busquedaInterna}
            onChange={(e) => setBusquedaInterna(e.target.value)}
            placeholder={
              idioma === 'es'
                ? 'Buscar por cóctel, vino, cerveza, whisky o café...'
                : 'Search cocktail, wine, beer, whisky, or coffee...'
            }
            className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs sm:text-sm bg-white/90 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#8A0C13] transition duration-200"
          />
          {busquedaInterna && (
            <button
              type="button"
              onClick={() => setBusquedaInterna('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-[#8A0C13] cursor-pointer"
              title={idioma === 'es' ? 'Limpiar búsqueda' : 'Clear search'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Lista de Categorías: Estilo Fine Dining sin cajas pesadas, separadores finos border-b */}
      <div className="divide-y divide-stone-200/80">
        {categoriasFiltradas.length === 0 ? (
          <div className="text-center py-16 px-4 text-stone-500 font-serif italic text-sm">
            <p>
              {idioma === 'es'
                ? `No se encontraron bebidas que coincidan con "${busquedaEfectiva}".`
                : `No drinks found matching "${busquedaEfectiva}".`}
            </p>
          </div>
        ) : (
          categoriasFiltradas.map((cat: CategoriaBebidas) => {
            const estaAbierta = categoriaAbiertaId === cat.id;
            const cantBebidas = cat.items.length;

            return (
              <div
                key={cat.id}
                id={`acordeon-bebida-${cat.id}`}
                className="scroll-mt-8 sm:scroll-mt-12 transition-colors duration-300"
              >
                {/* Encabezado: Línea limpia, tipografía serif sobria con tracking-widest */}
                <button
                  type="button"
                  id={`btn-acordeon-bebida-${cat.id}`}
                  onClick={() => toggleCategoria(cat.id)}
                  aria-expanded={estaAbierta}
                  aria-controls={`seccion-acordeon-bebida-${cat.id}`}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left cursor-pointer transition-colors duration-300 group select-none focus:outline-none"
                >
                  <div className="space-y-1.5 pr-4">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h2
                        className={`text-base sm:text-lg font-serif tracking-[0.16em] uppercase transition-colors duration-300 ${
                          estaAbierta
                            ? 'text-[#8A0C13] font-bold'
                            : 'text-stone-900 group-hover:text-[#8A0C13] font-medium'
                        }`}
                      >
                        {cat.nombre[idioma]}
                      </h2>

                      {/* Contador de elementos como metadato sobrio sin badges tipo píldora */}
                      <span className="text-[11px] font-serif tracking-wider text-stone-400">
                        ({cantBebidas})
                      </span>
                    </div>

                    {cat.subtitulo && (
                      <p className="text-xs text-stone-500 font-serif italic font-light tracking-wide">
                        {cat.subtitulo[idioma]}
                      </p>
                    )}
                  </div>

                  {/* Flecha minimalista con micro-animación sedosa */}
                  <div className="shrink-0 flex items-center pl-2 text-stone-400 group-hover:text-[#8A0C13] transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-500 ease-out ${
                        estaAbierta ? 'rotate-180 text-[#8A0C13]' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                </button>

                {/* Contenedor desplegable con animación pura y respiro generoso */}
                <div
                  id={`seccion-acordeon-bebida-${cat.id}`}
                  className={`transition-all duration-700 ease-in-out ${
                    estaAbierta
                      ? 'max-h-[5000px] opacity-100 pb-8 sm:pb-10'
                      : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
                  }`}
                >
                  <div className="space-y-6 pt-2 divide-y divide-stone-100/80">
                    {cat.items.map((item) => (
                      <article
                        key={item.id}
                        id={`item-bebida-${item.id}`}
                        className="pt-5 first:pt-0 flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-6 group"
                      >
                        {/* Nombre, subtítulo y receta descriptiva */}
                        <div className="space-y-1.5 flex-1 pr-2">
                          <div className="flex items-baseline gap-2.5 flex-wrap">
                            <h3 className="font-serif font-medium text-sm sm:text-base text-stone-900 tracking-wide group-hover:text-[#8A0C13] transition-colors">
                              {idioma === 'en' && item.nombreEn ? item.nombreEn : item.nombre}
                            </h3>

                            {item.subtitulo && (
                              <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#8A0C13]/80 font-medium">
                                · {item.subtitulo}
                              </span>
                            )}
                          </div>

                          {item.ingredientes && (item.ingredientes.es || item.ingredientes.en) && (
                            <p className="text-xs sm:text-[13px] text-stone-500 font-serif italic leading-relaxed font-light">
                              {item.ingredientes[idioma] || item.ingredientes.es}
                            </p>
                          )}
                        </div>

                        {/* Presentación de Precios Limpia (Cifras cerradas, sin botones de añadir) */}
                        <div className="shrink-0 text-left md:text-right">
                          {item.preciosDetalle && item.preciosDetalle.length > 0 ? (
                            <div className="flex flex-wrap md:flex-col md:items-end gap-1.5 sm:gap-2">
                              {item.preciosDetalle.map((det) => (
                                <div
                                  key={det.presentacion}
                                  className="inline-flex items-baseline gap-2 text-xs sm:text-sm font-serif"
                                >
                                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-light">
                                    {idioma === 'en' && det.presentacionEn
                                      ? det.presentacionEn
                                      : det.presentacion}:
                                  </span>
                                  <span className="font-serif font-medium text-stone-900">
                                    {formatearPrecio(det.precio, idioma)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="font-serif font-medium text-sm sm:text-base text-stone-900 tracking-wide">
                              {formatearPrecio(item.precio, idioma)}
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default BebidasMenu;

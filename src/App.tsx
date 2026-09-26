/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, Fragment } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Plus,
  Check,
  ShoppingBag,
  Info,
  X,
  Wine,
  Sparkles,
  Search,
  QrCode,
  Share2,
  Copy,
  ChevronDown,
} from 'lucide-react';
import {
  Idioma,
  PlatoEntrada,
  ItemPedido,
} from './types';
import { PLATOS_MENU } from './data/menu';
import {
  TEXTOS_UI,
  formatearPrecio,
  formatearTotal,
} from './data/translations';
import { ResumenPedido } from './components/ResumenPedido';
import { FooterFadingTicker } from './components/FooterFadingTicker';
import { PortadaBienvenida } from './components/PortadaBienvenida';
import { BebidasMenu } from './components/BebidasMenu';
import { RatingEstrellas } from './components/RatingEstrellas';
import { ToastNotificacion, ToastNotificacionData } from './components/ToastNotificacion';
import { DietaryBadgeGroup, DietaryIconBadge } from './components/EtiquetadoDietetico';

// Exportación de tipos y platos para compatibilidad con pruebas o extensiones
export * from './types';
export { PLATOS_MENU };
export const ENTRADAS = PLATOS_MENU;

export interface ItemVolando {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX: number;
  midY: number;
}

export function Entrada({
  plato,
  idioma,
  onOrdenar,
  onVerDetalles,
  darkMode = true,
}: {
  plato: PlatoEntrada;
  idioma: Idioma;
  onOrdenar?: (plato: PlatoEntrada, sourceElement?: HTMLElement) => void;
  onVerDetalles?: (plato: PlatoEntrada) => void;
  darkMode?: boolean;
}) {
  const [opcionSeleccionadaId, setOpcionSeleccionadaId] = useState<string>(() => {
    return plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0
      ? plato.opcionesPresentacion[0].id
      : '';
  });
  const t = TEXTOS_UI[idioma];

  const opcionSeleccionada =
    plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0
      ? plato.opcionesPresentacion.find((o) => o.id === opcionSeleccionadaId) ||
        plato.opcionesPresentacion[0]
      : null;

  const precioActual = opcionSeleccionada
    ? opcionSeleccionada.precioNumerico
    : plato.precioNumerico;

  const platoActualizado: PlatoEntrada = useMemo(() => {
    return {
      ...plato,
      precioNumerico: precioActual,
      presentacion: opcionSeleccionada
        ? {
            es: opcionSeleccionada.nombre.es,
            en: opcionSeleccionada.nombre.en,
          }
        : plato.presentacion,
    };
  }, [plato, precioActual, opcionSeleccionada]);

  const nombrePlato = plato.nombre[idioma];
  const descripcionPlato = plato.descripcion[idioma];
  const etiquetaPlato = plato.etiqueta[idioma];
  const precioFormateado = formatearPrecio(precioActual, idioma);

  return (
    <article
      id={`entrada-${plato.id}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') && !target.closest(`#nombre-${plato.id}`)) {
          return;
        }
        onVerDetalles?.(platoActualizado);
      }}
      className="group/card cursor-pointer py-5 sm:py-6 border-b border-stone-200/80 last:border-b-0 space-y-3 transition-colors duration-300 hover:bg-stone-100/40 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg"
    >
      <div className="flex justify-between items-baseline gap-4">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          {/* Clic en el nombre del plato */}
          <button
            type="button"
            id={`nombre-${plato.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onVerDetalles?.(platoActualizado);
            }}
            className="text-base sm:text-lg font-serif font-medium text-left cursor-pointer group flex items-baseline gap-1.5 focus:outline-none text-stone-900 group-hover/card:text-[#8A0C13] transition-colors duration-300"
            title={idioma === 'es' ? 'Haz clic para ver maridaje' : 'Click to view pairing'}
          >
            <span className="relative inline-block pb-0.5">
              <span>{nombrePlato}</span>
              <span
                className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#8A0C13] transition-all duration-300 ease-out group-hover/card:w-full pointer-events-none"
                aria-hidden="true"
              />
            </span>
            <Plus
              className="w-3.5 h-3.5 text-stone-400 group-hover/card:text-[#8A0C13] shrink-0 transition-all duration-300 ease-out transform group-hover/card:rotate-90 origin-center self-center"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </button>

          {/* Sistema de etiquetado dietético visual minimalista y monocromático */}
          <DietaryBadgeGroup plato={platoActualizado} idioma={idioma} />

          {plato.presentacion && (
            <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400">
              · {plato.presentacion[idioma]}
            </span>
          )}
        </div>

        <span
          id={`precio-${plato.id}`}
          className="text-sm sm:text-base font-serif font-medium text-stone-900 shrink-0 tracking-wide"
        >
          {precioFormateado}
        </span>
      </div>

      {/* Información descriptiva del plato con texto limpio en el idioma seleccionado */}
      <div className="space-y-1">
        <p
          id={`descripcion-${plato.id}`}
          className="text-xs sm:text-[13.5px] leading-relaxed font-serif text-stone-600 font-light max-w-2xl"
        >
          {descripcionPlato}
        </p>
      </div>

      {/* Selector de opciones de presentación si existen */}
      {plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0 && (
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400">
            {idioma === 'es' ? 'Presentación:' : 'Portion:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {plato.opcionesPresentacion.map((opcion) => {
              const esActiva = (opcionSeleccionada?.id || plato.opcionesPresentacion![0].id) === opcion.id;
              const nombreOpcion = opcion.nombre[idioma];
              return (
                <button
                  key={opcion.id}
                  type="button"
                  id={`btn-opcion-${plato.id}-${opcion.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpcionSeleccionadaId(opcion.id);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full font-serif transition-colors duration-200 cursor-pointer border ${
                    esActiva
                      ? 'bg-stone-900 text-white font-medium border-stone-900 shadow-2xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{nombreOpcion}</span>
                  <span className="ml-1.5 opacity-90">
                    {formatearPrecio(opcion.precioNumerico, idioma)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Calificación y Maridaje discretos */}
      <div className="flex items-center justify-between pt-1 gap-3 flex-wrap">
        <RatingEstrellas
          platoId={plato.id}
          nombrePlato={nombrePlato}
          idioma={idioma}
          darkMode={darkMode}
          tamanoEstrellas="sm"
        />

        <button
          type="button"
          id={`btn-detalles-${plato.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalles?.(platoActualizado);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-serif tracking-wider uppercase text-stone-500 hover:text-[#8A0C13] transition-colors duration-200 cursor-pointer"
        >
          <Wine className="w-3.5 h-3.5" />
          <span>{idioma === 'es' ? 'Maridaje' : 'Pairing'}</span>
        </button>
      </div>
    </article>
  );
}

export function ModalDetallePlato({
  plato,
  idioma,
  onCerrar,
  onOrdenar,
  darkMode = true,
}: {
  plato: PlatoEntrada;
  idioma: Idioma;
  onCerrar: () => void;
  onOrdenar?: (plato: PlatoEntrada, sourceElement?: HTMLElement) => void;
  darkMode?: boolean;
}) {
  const [opcionSeleccionadaId, setOpcionSeleccionadaId] = useState<string>(() => {
    return plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0
      ? plato.opcionesPresentacion[0].id
      : '';
  });
  const t = TEXTOS_UI[idioma];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCerrar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCerrar]);

  const opcionSeleccionada =
    plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0
      ? plato.opcionesPresentacion.find((o) => o.id === opcionSeleccionadaId) ||
        plato.opcionesPresentacion[0]
      : null;

  const precioActual = opcionSeleccionada
    ? opcionSeleccionada.precioNumerico
    : plato.precioNumerico;

  const nombrePlato = plato.nombre[idioma];
  const descripcionPlato = plato.descripcion[idioma];
  const etiquetaPlato = plato.etiqueta[idioma];
  const precioFormateado = formatearPrecio(precioActual, idioma);
  const maridaje = plato.maridaje;

  return (
    <div
      id="modal-backdrop-detalle"
      onClick={onCerrar}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo-plato"
    >
      <div
        id="modal-contenido-detalle"
        onClick={(e) => e.stopPropagation()}
        className={`border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 transition-colors duration-200 max-h-[90vh] overflow-y-auto ${
          darkMode
            ? 'bg-stone-900 border-[#8A0C13]/40 text-stone-100 shadow-black/40'
            : 'bg-white border-stone-200 text-stone-900 shadow-stone-900/15'
        }`}
      >
        {/* Cabecera del Modal */}
        <div
          className={`flex items-start justify-between border-b pb-4 ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-sm sm:text-base font-mono font-bold ${
                  darkMode ? 'text-rose-300' : 'text-[#8A0C13]'
                }`}
              >
                {precioFormateado}
              </span>
              <DietaryBadgeGroup plato={plato} idioma={idioma} />
            </div>
            <h2
              id="modal-titulo-plato"
              className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight"
            >
              {nombrePlato}
            </h2>
          </div>

          <button
            type="button"
            id="btn-cerrar-modal"
            onClick={onCerrar}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              darkMode
                ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label={t.cerrar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Descripción del plato en el idioma activo */}
        <div className="p-4 rounded-xl border bg-[#FBFBFB] border-stone-200">
          <p className="text-[16px] sm:text-[17.5px] leading-[1.75] italic text-[#374151] font-serif">
            "{descripcionPlato}"
          </p>
        </div>

        {/* Aviso de personalización si el plato cuenta con modificaciones */}
        {plato.modificacionesSeleccionadas && plato.modificacionesSeleccionadas.length > 0 && (
          <div
            id="modal-aviso-modificaciones"
            className="p-3.5 rounded-xl border border-[#8A0C13] bg-white text-xs sm:text-sm flex items-start gap-2.5 text-[#8A0C13]"
          >
            <Sparkles className="w-4 h-4 text-[#8A0C13] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-[#8A0C13]">{t.preparacionPersonalizada}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {plato.modificacionesSeleccionadas.map((mod, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border border-[#8A0C13] bg-white text-[#8A0C13]"
                  >
                    <Check className="w-3 h-3 text-[#8A0C13] stroke-[3]" />
                    <span>{mod}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selector de opciones de presentación en el Modal si existen */}
        {plato.opcionesPresentacion && plato.opcionesPresentacion.length > 0 && (
          <div
            className={`p-3.5 rounded-xl border space-y-2.5 ${
              darkMode
                ? 'bg-stone-950/40 border-stone-800/60'
                : 'bg-[#FBFBFB] border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  darkMode ? 'text-rose-300' : 'text-[#374151]'
                }`}
              >
                {idioma === 'es' ? 'Presentación / Porción:' : 'Portion / Size:'}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {plato.opcionesPresentacion.map((opcion) => {
                const esActiva =
                  (opcionSeleccionada?.id || plato.opcionesPresentacion![0].id) === opcion.id;
                const nombreOpcion = opcion.nombre[idioma];
                return (
                  <button
                    key={opcion.id}
                    type="button"
                    id={`btn-modal-opcion-${plato.id}-${opcion.id}`}
                    onClick={() => setOpcionSeleccionadaId(opcion.id)}
                    className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer border ${
                      esActiva
                        ? 'bg-[#8A0C13] text-white font-bold border-[#8A0C13] shadow-xs'
                        : 'bg-white text-[#374151] border-stone-300 hover:border-[#8A0C13]'
                    }`}
                  >
                    {nombreOpcion} • {formatearPrecio(opcion.precioNumerico, idioma)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Calificación interactiva dentro del modal */}
        <div
          className={`p-3 rounded-xl border ${
            darkMode
              ? 'bg-stone-950/40 border-stone-800/60'
              : 'bg-[#FBFBFB] border-stone-200'
          }`}
        >
          <RatingEstrellas
            platoId={plato.id}
            nombrePlato={nombrePlato}
            idioma={idioma}
            darkMode={darkMode}
          />
        </div>

        {/* Sección de Maridaje Recomendado */}
        <div
          id="seccion-maridaje"
          className="p-4 rounded-xl border border-[#8A0C13] bg-white space-y-2 text-stone-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8A0C13] uppercase tracking-wider">
              <Wine className="w-4 h-4" />
              <h3>{idioma === 'es' ? 'Maridaje Recomendado' : 'Recommended Pairing'}</h3>
            </div>
            <span className="text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border border-[#8A0C13] bg-white text-[#8A0C13]">
              {maridaje.tipo[idioma]}
            </span>
          </div>

          <p className="text-base sm:text-lg font-serif font-bold text-stone-900">
            {maridaje.bebida[idioma]}
          </p>
          <p className="text-sm sm:text-base leading-[1.65] text-[#374151]">
            {maridaje.descripcion[idioma]}
          </p>
        </div>

        {/* Botones de acción */}
        <div
          className={`flex items-center justify-end gap-3 pt-3 border-t ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          }`}
        >
          <button
            type="button"
            id="btn-modal-cerrar"
            onClick={onCerrar}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer bg-[#8A0C13] hover:bg-[#720a10] text-white shadow-xs"
          >
            {t.cerrar}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalCodigoQR({
  idioma,
  onCerrar,
  darkMode = true,
}: {
  idioma: Idioma;
  onCerrar: () => void;
  darkMode?: boolean;
}) {
  const [urlActual, setUrlActual] = useState<string>('');
  const [copiado, setCopiado] = useState<boolean>(false);
  const [compartido, setCompartido] = useState<boolean>(false);
  const t = TEXTOS_UI[idioma];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlActual(window.location.href);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCerrar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCerrar]);

  const handleCopiar = async () => {
    if (!urlActual) return;
    try {
      await navigator.clipboard.writeText(urlActual);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = urlActual;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const handleCompartir = async () => {
    if (!urlActual) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t.nombreRestaurante} - ${idioma === 'es' ? 'Carta Digital' : 'Digital Menu'}`,
          text: t.subtituloRestaurante,
          url: urlActual,
        });
        setCompartido(true);
        setTimeout(() => setCompartido(false), 2000);
      } catch {
        // En caso de cancelar o no soportado
      }
    } else {
      handleCopiar();
    }
  };

  return (
    <div
      id="modal-backdrop-qr"
      onClick={onCerrar}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo-qr"
    >
      <div
        id="modal-contenido-qr"
        onClick={(e) => e.stopPropagation()}
        className={`border rounded-2xl max-w-sm sm:max-w-md w-full p-6 shadow-2xl space-y-5 text-center transition-colors duration-200 ${
          darkMode
            ? 'bg-stone-900 border-[#8A0C13]/40 text-stone-100 shadow-black/40'
            : 'bg-white border-stone-200 text-stone-900 shadow-stone-900/15'
        }`}
      >
        {/* Cabecera */}
        <div
          className={`flex items-start justify-between border-b pb-4 ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          }`}
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="p-2 rounded-xl border border-[#8A0C13] bg-white text-[#8A0C13]">
              <QrCode className="w-5 h-5 text-[#8A0C13]" />
            </div>
            <div>
              <h2
                id="modal-titulo-qr"
                className={`text-lg sm:text-xl font-serif font-bold ${
                  darkMode ? 'text-stone-100' : 'text-stone-900'
                }`}
              >
                {t.tituloQRModal}
              </h2>
              <p
                className={`text-[11px] ${
                  darkMode ? 'text-stone-400' : 'text-[#374151]'
                }`}
              >
                {t.subtituloQRModal}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-cerrar-modal-qr"
            onClick={onCerrar}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              darkMode
                ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label={t.cerrar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenedor del Código QR */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <div
            id="contenedor-codigo-qr"
            className="p-3.5 bg-white rounded-2xl border-4 border-[#8A0C13]/70 shadow-lg inline-flex items-center justify-center"
          >
            {urlActual ? (
              <QRCodeSVG
                value={urlActual}
                size={190}
                level="M"
                includeMargin={false}
                fgColor="#1c1917"
                bgColor="#ffffff"
              />
            ) : (
              <div className="w-[190px] h-[190px] flex items-center justify-center text-xs text-stone-500">
                Generando QR...
              </div>
            )}
          </div>

          <p
            className={`text-xs px-2 leading-relaxed ${
              darkMode ? 'text-stone-300' : 'text-[#374151]'
            }`}
          >
            {t.instruccionesQR}
          </p>
        </div>

        {/* URL actual y botón para copiar */}
        <div
          className={`flex items-center gap-2 p-1.5 rounded-xl border ${
            darkMode
              ? 'bg-stone-950/80 border-stone-800'
              : 'bg-[#FBFBFB] border-stone-200'
          }`}
        >
          <span
            id="texto-url-menu"
            className={`text-xs font-mono truncate px-2 text-left flex-1 ${
              darkMode ? 'text-stone-300' : 'text-[#374151]'
            }`}
            title={urlActual}
          >
            {urlActual || 'https://restaurante-santamaria.com'}
          </span>
          <button
            type="button"
            id="btn-copiar-url-menu"
            onClick={handleCopiar}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 active:scale-95 ${
              copiado
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#8A0C13] hover:bg-[#720a10] text-white shadow-xs'
            }`}
            title={t.copiarEnlace}
          >
            {copiado ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.enlaceCopiado}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copiarEnlace}</span>
              </>
            )}
          </button>
        </div>

        {/* Acciones */}
        <div
          className={`flex items-center justify-between gap-2 pt-3 border-t ${
            darkMode ? 'border-stone-800' : 'border-stone-200'
          }`}
        >
          <button
            type="button"
            id="btn-compartir-menu"
            onClick={handleCompartir}
            className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors duration-300 cursor-pointer active:scale-95 border border-[#8A0C13] bg-white text-[#8A0C13] hover:bg-[#8A0C13] hover:text-white"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8A0C13] group-hover:text-white transition-colors duration-300" />
            <span>{compartido ? t.enlaceCompartido : t.compartirEnlace}</span>
          </button>

          <button
            type="button"
            id="btn-cerrar-qr-accion"
            onClick={onCerrar}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              darkMode
                ? 'text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700'
                : 'text-[#374151] hover:text-stone-950 bg-white hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {t.cerrar}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CategoriaAcordeonItem {
  id: string;
  nombre: Record<Idioma, string>;
  subtitulo?: Record<Idioma, string>;
}

const CATEGORIAS_ACORDEON: CategoriaAcordeonItem[] = [
  {
    id: 'desayunos',
    nombre: { es: 'Desayunos', en: 'Breakfast' },
    subtitulo: { es: 'Incluyen café colombiano y patacones o pan', en: 'Include Colombian coffee and patacones or bread' },
  },
  {
    id: 'empanadas-fritos',
    nombre: { es: 'Empanadas y Fritos', en: 'Empanadas & Bites' },
  },
  {
    id: 'ceviches-entradas',
    nombre: { es: 'Ceviches y Entradas', en: 'Ceviches & Starters' },
  },
  {
    id: 'sopas',
    nombre: { es: 'Sopas de la Casa', en: 'House Soups' },
    subtitulo: { es: 'Cada día ofrecemos dos', en: 'Two available daily' },
  },
  {
    id: 'del-mar',
    nombre: { es: 'Del Mar', en: 'From the Sea' },
  },
  {
    id: 'fuego-y-sabana',
    nombre: { es: 'Fuego y Sabana', en: 'Fuego y Sabana' },
    subtitulo: { es: 'Platos fuertes con dos acompañamientos a elección', en: 'Main courses including two sides of your choice' },
  },
  {
    id: 'ensaladas',
    nombre: { es: 'Ensaladas', en: 'Salads' },
  },
  {
    id: 'pastas',
    nombre: { es: 'Pastas', en: 'Pasta' },
  },
  {
    id: 'sandwiches',
    nombre: { es: 'Sándwiches', en: 'Sandwiches' },
  },
  {
    id: 'postres',
    nombre: { es: 'Postres', en: 'Desserts' },
  },
];

export default function App() {
  const [idioma, setIdioma] = useState<Idioma>(() => {
    if (typeof window !== 'undefined') {
      const guardado = localStorage.getItem('santamaria_idioma');
      if (guardado === 'es' || guardado === 'en') return guardado;
    }
    return 'es';
  });

  // Modo oscuro eliminado: diseño premium Blanco Marfil / Warm Stone (#FBFBFB) permanente
  const darkMode = false;

  const [seccionMenu, setSeccionMenu] = useState<'comida' | 'bebidas'>('comida');
  // Por defecto todas las categorías inician cerradas (null) para una experiencia limpia de cero saturación
  const [categoriaAbiertaId, setCategoriaAbiertaId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [platoDetalle, setPlatoDetalle] = useState<PlatoEntrada | null>(null);
  const [mostrarQR, setMostrarQR] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<Record<string, ItemPedido>>({});
  const [frecuenciaPedidos, setFrecuenciaPedidos] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const guardado = localStorage.getItem('santamaria_frecuencia_pedidos');
        if (guardado) return JSON.parse(guardado);
      } catch (e) {
        console.warn('Error al cargar frecuencia de pedidos', e);
      }
    }
    return {};
  });
  const [mostrarResumen, setMostrarResumen] = useState<boolean>(false);
  const [toastNotificacion, setToastNotificacion] = useState<ToastNotificacionData | null>(null);
  const [itemsVolando, setItemsVolando] = useState<ItemVolando[]>([]);
  const [badgeBump, setBadgeBump] = useState<boolean>(false);

  const t = TEXTOS_UI[idioma];

  const itemsPedido = useMemo(() => Object.values(pedidos), [pedidos]);
  const totalSeleccionados = useMemo(
    () => itemsPedido.reduce((acc, curr) => acc + curr.cantidad, 0),
    [itemsPedido]
  );
  const precioTotal = useMemo(
    () => itemsPedido.reduce((acc, curr) => acc + curr.plato.precioNumerico * curr.cantidad, 0),
    [itemsPedido]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('santamaria_tema');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('santamaria_idioma', idioma);
    }
  }, [idioma]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('santamaria_frecuencia_pedidos', JSON.stringify(frecuenciaPedidos));
      } catch (e) {
        console.warn('Error al persistir frecuencia de pedidos', e);
      }
    }
  }, [frecuenciaPedidos]);

  const handleOrdenar = (plato: PlatoEntrada, sourceElement?: HTMLElement) => {
    const key =
      plato.modificacionesSeleccionadas && plato.modificacionesSeleccionadas.length > 0
        ? `${plato.id}__custom__${plato.modificacionesSeleccionadas.join('_')}`
        : plato.id;
    const platoConKey: PlatoEntrada = {
      ...plato,
      id: key,
    };

    const cantActual = pedidos[key]?.cantidad ?? 0;
    const nuevaCantidad = cantActual + 1;

    setPedidos((prev) => {
      const actual = prev[key];
      return {
        ...prev,
        [key]: {
          plato: platoConKey,
          cantidad: (actual ? actual.cantidad : 0) + 1,
        },
      };
    });

    // Registrar e incrementar frecuencia de adición para recomendaciones inteligentes usando baseId
    const baseId = plato.id.split('__custom__')[0];
    setFrecuenciaPedidos((prev) => ({
      ...prev,
      [baseId]: (prev[baseId] || 0) + 1,
    }));

    // Confirmación visual mediante notificación tipo toast
    setToastNotificacion({
      id: `toast-${key}-${Date.now()}`,
      plato: platoConKey,
      cantidad: nuevaCantidad,
      timestamp: Date.now(),
    });

    if (sourceElement && typeof window !== 'undefined') {
      const badgeElem = document.getElementById('badge-total-seleccionados');
      if (badgeElem) {
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = badgeElem.getBoundingClientRect();

        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        const deltaX = endX - startX;
        const midX = startX + deltaX * 0.45 + (deltaX > 0 ? -25 : 25);
        const midY = Math.max(15, Math.min(startY, endY) - 55);

        const nuevoItem: ItemVolando = {
          id: `fly-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          startX,
          startY,
          endX,
          endY,
          midX,
          midY,
        };

        setItemsVolando((prev) => [...prev, nuevoItem]);
      }
    }
  };

  const handleIncrementarItem = (plato: PlatoEntrada) => {
    const key = plato.id;
    const cantActual = pedidos[key]?.cantidad ?? 0;
    const nuevaCantidad = cantActual + 1;

    setPedidos((prev) => {
      const actual = prev[key];
      return {
        ...prev,
        [key]: {
          plato,
          cantidad: (actual ? actual.cantidad : 0) + 1,
        },
      };
    });

    // Incrementar frecuencia de adición para recomendaciones inteligentes
    const baseId = plato.id.split('__custom__')[0];
    setFrecuenciaPedidos((prev) => ({
      ...prev,
      [baseId]: (prev[baseId] || 0) + 1,
    }));

    setToastNotificacion({
      id: `toast-${key}-${Date.now()}`,
      plato,
      cantidad: nuevaCantidad,
      timestamp: Date.now(),
    });
  };

  const handleDecrementarItem = (platoId: string) => {
    setPedidos((prev) => {
      const actual = prev[platoId];
      if (!actual) return prev;
      if (actual.cantidad <= 1) {
        const copia = { ...prev };
        delete copia[platoId];
        return copia;
      }
      return {
        ...prev,
        [platoId]: {
          ...actual,
          cantidad: actual.cantidad - 1,
        },
      };
    });
  };

  const handleEliminarItem = (platoId: string) => {
    setPedidos((prev) => {
      const copia = { ...prev };
      delete copia[platoId];
      return copia;
    });
  };

  const handleVaciarPedido = () => {
    setPedidos({});
  };

  const handleAnimacionCompletada = (id: string) => {
    setItemsVolando((prev) => prev.filter((item) => item.id !== id));
    setBadgeBump(true);
    setTimeout(() => {
      setBadgeBump(false);
    }, 450);
  };

  const toggleCategoria = (catId: string) => {
    setCategoriaAbiertaId((prev) => {
      const esApertura = prev !== catId;
      if (esApertura) {
        // Auto-Scroll inteligente: desplaza suavemente la vista para anclar el encabezado en la parte superior
        setTimeout(() => {
          const elemento = document.getElementById(`acordeon-item-${catId}`);
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
        return catId;
      }
      return null;
    });
  };

  const coincideBusqueda = (plato: PlatoEntrada, query: string) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      plato.nombre[idioma].toLowerCase().includes(q) ||
      plato.descripcion[idioma].toLowerCase().includes(q) ||
      plato.etiqueta[idioma].toLowerCase().includes(q) ||
      plato.maridaje.bebida[idioma].toLowerCase().includes(q) ||
      (plato.presentacion?.[idioma]?.toLowerCase().includes(q) ?? false) ||
      plato.nombre.es.toLowerCase().includes(q) ||
      plato.nombre.en.toLowerCase().includes(q) ||
      plato.descripcion.es.toLowerCase().includes(q) ||
      plato.descripcion.en.toLowerCase().includes(q)
    );
  };

  const totalCoincidencias = useMemo(() => {
    if (!busqueda.trim()) return 0;
    return PLATOS_MENU.filter((p) => coincideBusqueda(p, busqueda)).length;
  }, [busqueda, idioma]);

  useEffect(() => {
    if (busqueda.trim()) {
      const primeraConResultados = CATEGORIAS_ACORDEON.find((cat) =>
        PLATOS_MENU.some((p) => p.categoria === cat.id && coincideBusqueda(p, busqueda))
      );
      if (primeraConResultados) {
        setCategoriaAbiertaId(primeraConResultados.id);
        setTimeout(() => {
          const elemento = document.getElementById(`acordeon-item-${primeraConResultados.id}`);
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setCategoriaAbiertaId(null);
      }
    }
  }, [busqueda]);

  return (
    <div className="min-h-screen py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] text-stone-900 selection:bg-[#8A0C13] selection:text-white">
      <div className="max-w-3xl mx-auto space-y-10 sm:space-y-14">
        {/* Sección de Bienvenida y Portada Superior (Identidad Tipográfica Fine-Dining, Sin Logo) */}
        <PortadaBienvenida idioma={idioma} setIdioma={setIdioma} />

        {/* Barra superior de controles minimalista y refinada */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <span className="font-serif text-xs sm:text-sm uppercase tracking-[0.2em] text-stone-500 font-medium">
              {idioma === 'es' ? 'Carta General' : 'Menu Selection'}
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {/* Botón para generar y mostrar el Código QR del menú */}
              <button
                type="button"
                id="btn-abrir-qr"
                onClick={() => setMostrarQR(true)}
                className="group inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-stone-600 hover:text-[#8A0C13] transition-colors duration-200 cursor-pointer"
                title={t.verQR}
                aria-label={t.verQR}
              >
                <QrCode className="w-3.5 h-3.5 transition-colors duration-200" />
                <span>{t.verQR}</span>
              </button>

              {/* Separador sutil */}
              {(totalSeleccionados > 0 || precioTotal > 0) && (
                <span className="text-stone-300 text-xs">·</span>
              )}

              {/* Botón con selección de platos */}
              {totalSeleccionados > 0 && (
                <motion.button
                  type="button"
                  id="badge-total-seleccionados"
                  onClick={() => setMostrarResumen(true)}
                  animate={
                    badgeBump
                      ? {
                          scale: [1, 1.15, 0.96, 1.04, 1],
                        }
                      : { scale: 1 }
                  }
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-flex items-center gap-1.5 text-xs font-serif text-[#8A0C13] font-medium hover:underline cursor-pointer"
                  title={t.verResumenPedido}
                  aria-label={t.verResumenPedido}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {totalSeleccionados}{' '}
                    {totalSeleccionados === 1 ? t.platoSingular : t.platoPlural}
                  </span>
                </motion.button>
              )}

              {/* Etiqueta con el precio total acumulado */}
              {precioTotal > 0 && (
                <button
                  type="button"
                  id="badge-precio-total"
                  onClick={() => setMostrarResumen(true)}
                  className="inline-flex items-baseline gap-1 text-xs font-serif text-stone-900 font-medium hover:text-[#8A0C13] transition-colors cursor-pointer"
                  title={t.verResumenPedido}
                  aria-label={t.verResumenPedido}
                >
                  <span className="text-[11px] uppercase tracking-wider text-stone-400">Total:</span>
                  <span>{formatearTotal(precioTotal, idioma)}</span>
                </button>
              )}
            </div>
          </div>

          {/* Barra de búsqueda interactiva estilizada con borde sutil */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-busqueda-platos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder={t.placeholderBuscar}
              className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs sm:text-sm bg-white/90 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#8A0C13] transition duration-200"
            />
            {busqueda && (
              <button
                type="button"
                id="btn-limpiar-busqueda"
                onClick={() => setBusqueda('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-[#8A0C13] cursor-pointer"
                title={t.limpiarBusqueda}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Selector de Sección: Pestañas de alta gama minimalistas (Cocina vs. Bar) */}
        <div className="flex items-center justify-center pt-2">
          <div
            id="selector-seccion-menu"
            className="inline-flex items-center gap-8 border-b border-stone-200/80 px-4"
            role="tablist"
            aria-label={idioma === 'es' ? 'Secciones del menú' : 'Menu sections'}
          >
            <button
              type="button"
              role="tab"
              id="tab-comida"
              aria-selected={seccionMenu === 'comida'}
              aria-controls="menu-acordeon"
              onClick={() => setSeccionMenu('comida')}
              className={`pb-3 text-xs sm:text-sm font-serif uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer relative ${
                seccionMenu === 'comida'
                  ? 'text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-700 font-normal'
              }`}
            >
              <span>{idioma === 'es' ? 'Cocina & Platos' : 'Food & Kitchen'}</span>
              {seccionMenu === 'comida' && (
                <motion.div
                  layoutId="indicador-seccion"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8A0C13]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>

            <button
              type="button"
              role="tab"
              id="tab-bebidas"
              aria-selected={seccionMenu === 'bebidas'}
              aria-controls="seccion-bebidas-menu"
              onClick={() => setSeccionMenu('bebidas')}
              className={`pb-3 text-xs sm:text-sm font-serif uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer relative ${
                seccionMenu === 'bebidas'
                  ? 'text-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-700 font-normal'
              }`}
            >
              <span>{idioma === 'es' ? 'Bar & Bebidas' : 'Bar & Drinks'}</span>
              {seccionMenu === 'bebidas' && (
                <motion.div
                  layoutId="indicador-seccion"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8A0C13]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Vista Condicional: Carta de Bar & Bebidas o Carta de Cocina */}
        {seccionMenu === 'bebidas' ? (
          <BebidasMenu
            idioma={idioma}
            busquedaExterna={busqueda}
          />
        ) : (
          <>
          {/* Indicador de resultados activos de búsqueda */}
          {busqueda && (
            <div
              id="indicador-busqueda"
              className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 border-b border-stone-200 text-stone-600 font-serif"
            >
              <span>
                {t.resultadosPara} <strong>"{busqueda}"</strong> ({totalCoincidencias}{' '}
                {totalCoincidencias === 1 ? t.platoSingular : t.platoPlural})
              </span>
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="text-xs uppercase tracking-wider text-[#8A0C13] hover:underline cursor-pointer ml-2"
              >
                {t.limpiar}
              </button>
            </div>
          )}

          {/* Guía visual minimalista de dietética discreta */}
          <div
            id="guia-dietetica"
            className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500 font-serif select-none py-1"
          >
            <div className="inline-flex items-center gap-1.5">
              <DietaryIconBadge tipo="recomendacion" idioma={idioma} />
              <span className="text-[11px] uppercase tracking-wider text-stone-500">
                {idioma === 'es' ? 'Recomendación' : 'Chef Pick'}
              </span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="inline-flex items-center gap-1.5">
              <DietaryIconBadge tipo="mariscos" idioma={idioma} />
              <span className="text-[11px] uppercase tracking-wider text-stone-500">
                {idioma === 'es' ? 'Mariscos' : 'Seafood'}
              </span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="inline-flex items-center gap-1.5">
              <DietaryIconBadge tipo="vegetariano" idioma={idioma} />
              <span className="text-[11px] uppercase tracking-wider text-stone-500">
                {idioma === 'es' ? 'Vegetariano' : 'Vegetarian'}
              </span>
            </div>
          </div>

          {/* Menú en Acordeón: Lista vertical con separadores limpios border-b (Estilo Fine Dining) */}
          <section id="menu-acordeon" className="divide-y divide-stone-200/80" aria-label={idioma === 'es' ? 'Menú por categorías' : 'Menu by categories'}>
            {CATEGORIAS_ACORDEON.map((cat) => {
              const platosDeEstaCategoria = PLATOS_MENU.filter((p) => p.categoria === cat.id);
              const platosVisibles = busqueda.trim()
                ? platosDeEstaCategoria.filter((p) => coincideBusqueda(p, busqueda))
                : platosDeEstaCategoria;

              if (busqueda.trim() && platosVisibles.length === 0) {
                return null;
              }

              const estaAbierta = categoriaAbiertaId === cat.id;

              return (
                <div
                  key={cat.id}
                  id={`acordeon-item-${cat.id}`}
                  className="scroll-mt-8 sm:scroll-mt-12 transition-colors duration-300"
                >
                  {/* Encabezado del Acordeón con tipografía serif y tracking amplio */}
                  <button
                    type="button"
                    id={`btn-acordeon-${cat.id}`}
                    onClick={() => toggleCategoria(cat.id)}
                    aria-expanded={estaAbierta}
                    aria-controls={`seccion-acordeon-${cat.id}`}
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
                        <span className="text-[11px] font-serif tracking-wider text-stone-400">
                          ({platosVisibles.length})
                        </span>
                      </div>
                      {cat.subtitulo && (
                        <p className="text-xs text-stone-500 font-serif italic font-light tracking-wide">
                          {cat.subtitulo[idioma]}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center pl-2 text-stone-400 group-hover:text-[#8A0C13] transition-colors">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-500 ease-out ${
                          estaAbierta ? 'rotate-180 text-[#8A0C13]' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </button>

                  {/* Contenedor de platos con respiro generoso y sin cajas pesadas */}
                  <div
                    id={`seccion-acordeon-${cat.id}`}
                    className={`transition-all duration-700 ease-in-out ${
                      estaAbierta
                        ? 'max-h-[5000px] opacity-100 pb-8 sm:pb-10'
                        : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
                    }`}
                  >
                    <div className="space-y-1 pt-1">
                      {platosVisibles.map((plato) => (
                        <Fragment key={plato.id}>
                          <Entrada
                            plato={plato}
                            idioma={idioma}
                            darkMode={darkMode}
                            onOrdenar={handleOrdenar}
                            onVerDetalles={(p) => setPlatoDetalle(p)}
                          />

                          {/* Nota oficial sobre acompañamientos de carnes */}
                          {plato.id === 'cordero-lechal-en-salsa-criolla' && (
                            <div
                              id="nota-acompanamientos-carnes"
                              className="my-5 p-4 rounded-xl border border-stone-200 bg-stone-50/70 text-stone-600 font-serif"
                            >
                              <div className="flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-[#8A0C13] shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                  <span className="font-serif uppercase tracking-widest text-[11px] text-[#8A0C13] font-bold block">
                                    {idioma === 'es' ? 'Acompañamientos Incluidos' : 'Sides Included'}
                                  </span>
                                  <p className="text-xs sm:text-[13px] leading-relaxed font-light text-stone-600">
                                    {idioma === 'es'
                                      ? 'Cada plato fuerte incluye dos acompañamientos a elección: patacones, papas fritas, arroz blanco, arroz con coco o ensalada de estación. Adición $18.000.'
                                      : 'Each main course includes two sides of your choice: patacones, French fries, white rice, coconut rice, or seasonal salad. Additional side $18.000.'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {busqueda.trim() && totalCoincidencias === 0 && (
              <div className="text-center py-16 px-4 text-stone-500 space-y-2">
                <p className="font-serif text-sm italic">
                  {t.sinResultadosBusqueda(busqueda)}
                </p>
                <button
                  type="button"
                  onClick={() => setBusqueda('')}
                  className="text-xs font-serif uppercase tracking-widest text-[#8A0C13] underline hover:text-[#720a10] cursor-pointer"
                >
                  {t.limpiarBusqueda}
                </button>
              </div>
            )}
          </section>
          </>
        )}

        {/* Pie de página dinámico tipo Ticker con tipografía sobria */}
        <FooterFadingTicker idioma={idioma} darkMode={darkMode} />
      </div>

      {/* Modal interactivo con Información Nutricional y Maridaje */}
      {platoDetalle && (
        <ModalDetallePlato
          plato={platoDetalle}
          idioma={idioma}
          darkMode={darkMode}
          onCerrar={() => setPlatoDetalle(null)}
          onOrdenar={handleOrdenar}
        />
      )}

      {/* Modal con Código QR del Menú */}
      {mostrarQR && (
        <ModalCodigoQR
          idioma={idioma}
          darkMode={darkMode}
          onCerrar={() => setMostrarQR(false)}
        />
      )}

      {/* Modal con Resumen Detallado del Pedido y Subtotal Final Calculado */}
      <AnimatePresence>
        {mostrarResumen && (
          <ResumenPedido
            items={itemsPedido}
            idioma={idioma}
            darkMode={darkMode}
            onCerrar={() => setMostrarResumen(false)}
            onIncrementar={handleIncrementarItem}
            onDecrementar={handleDecrementarItem}
            onEliminar={handleEliminarItem}
            onVaciar={handleVaciarPedido}
          />
        )}
      </AnimatePresence>

      {/* Contenedor de partículas y animación de platos volando hacia badge-total-seleccionados */}
      <div
        id="contenedor-animaciones-vuelo"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence>
          {itemsVolando.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                x: item.startX - 18,
                y: item.startY - 18,
                scale: 0.6,
                opacity: 0.9,
                rotate: 0,
              }}
              animate={{
                x: [item.startX - 18, item.midX - 18, item.endX - 18],
                y: [item.startY - 18, item.midY - 18, item.endY - 18],
                scale: [0.6, 1.28, 0.85, 0.35],
                opacity: [0.9, 1, 1, 0.75],
                rotate: [0, -15, 12, 0],
              }}
              exit={{
                opacity: 0,
                scale: 0.1,
              }}
              transition={{
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={() => handleAnimacionCompletada(item.id)}
              className="fixed top-0 left-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#8A0C13] text-white font-bold shadow-xl shadow-stone-900/30 border-2 border-white ring-2 ring-[#8A0C13]"
            >
              <span className="absolute inset-0 rounded-full border border-[#8A0C13] animate-ping opacity-60 pointer-events-none" />
              <div className="relative flex items-center justify-center gap-0.5">
                <ShoppingBag className="w-3.5 h-3.5 fill-white/30 text-white" />
                <span className="text-[10px] font-black leading-none">+1</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Notificación Toast interactiva de confirmación de plato añadido */}
      <ToastNotificacion
        toast={toastNotificacion}
        idioma={idioma}
        darkMode={darkMode}
        onCerrar={() => setToastNotificacion(null)}
        onVerPedido={() => setMostrarResumen(true)}
      />
    </div>
  );
}

'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function PieceGallery({ fotos, alt, badge, estado }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  const goTo = useCallback((i) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % fotos.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, fotos.length]);

  useEffect(() => setZoom(false), [index]);

  const moveOrigin = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const vendida = estado === 'vendida';

  return (
    <div className="md:flex md:gap-4">
      {/* miniaturas desktop */}
      {fotos.length > 1 && (
        <div className="hidden w-20 shrink-0 flex-col gap-3 md:flex">
          {fotos.map((f, i) => (
            <button
              key={f}
              onClick={() => goTo(i)}
              className={`relative aspect-[4/5] overflow-hidden border transition ${
                i === index ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-90'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image src={f} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1">
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {fotos.map((f, i) => (
            <button
              key={f}
              onClick={() => {
                setIndex(i);
                setLightbox(true);
              }}
              className="relative aspect-[4/5] w-full shrink-0 snap-center cursor-zoom-in bg-carbon"
              aria-label="Ampliar foto"
            >
              <Image
                src={f}
                alt={`${alt} — foto ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                className={`object-cover ${vendida ? 'opacity-50 grayscale' : ''}`}
              />
            </button>
          ))}
        </div>

        {badge && !vendida && (
          <span className="pointer-events-none absolute left-4 top-4 border border-gold/60 bg-ink/70 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.25em] text-gold backdrop-blur-sm">
            {badge}
          </span>
        )}

        {fotos.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {fotos.map((f, i) => (
              <span
                key={f}
                className={`h-px transition-all duration-500 ${i === index ? 'w-8 bg-gold' : 'w-4 bg-ivory/40'}`}
              />
            ))}
          </div>
        )}
        <span className="pointer-events-none absolute bottom-3 right-4 text-[10px] tracking-[0.2em] text-ivory/60">
          {index + 1} / {fotos.length}
        </span>
      </div>

      {/* Lightbox con zoom */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink" role="dialog" aria-label="Fotos ampliadas">
          <div className="flex items-center justify-between px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-stone">
            <span>
              {index + 1} / {fotos.length} · {zoom ? 'Tocá para alejar' : 'Tocá para ampliar'}
            </span>
            <button onClick={() => setLightbox(false)} aria-label="Cerrar" className="p-2 text-ivory">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div
            className={`relative flex-1 overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={(e) => {
              moveOrigin(e);
              setZoom((z) => !z);
            }}
            onMouseMove={zoom ? moveOrigin : undefined}
          >
            <Image
              src={fotos[index]}
              alt={`${alt} — foto ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain transition-transform duration-300 ease-out"
              style={{ transform: zoom ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}
            />
          </div>
          {fotos.length > 1 && (
            <div className="flex items-center justify-between px-5 py-5">
              <button
                onClick={() => setIndex((i) => (i - 1 + fotos.length) % fotos.length)}
                className="btn-ghost px-5 py-3"
              >
                Anterior
              </button>
              <button onClick={() => setIndex((i) => (i + 1) % fotos.length)} className="btn-ghost px-5 py-3">
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

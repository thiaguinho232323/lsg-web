'use client';
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Visor 360°: muestra una secuencia de fotos (01.jpg, 02.jpg, …) y la gira al arrastrar o con la barra.
// Configuración por pieza en data/pieces.json → "vista360": { "carpeta": "...", "cuadros": 36, "extension": "jpg" }
export default function Viewer360({ carpeta, cuadros = 36, extension = 'jpg', alt = '' }) {
  const frames = useMemo(
    () => Array.from({ length: cuadros }, (_, i) => `${carpeta}/${String(i + 1).padStart(2, '0')}.${extension}`),
    [carpeta, cuadros, extension]
  );
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [touched, setTouched] = useState(false);
  const drag = useRef(null);
  const box = useRef(null);
  const spin = useRef(null);

  // Precarga de todos los cuadros
  useEffect(() => {
    let alive = true;
    let count = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        count += 1;
        if (alive) setLoaded(count);
      };
      img.src = src;
    });
    return () => {
      alive = false;
    };
  }, [frames]);

  const ready = loaded >= frames.length;

  // Giro de presentación: una vuelta completa al terminar de cargar
  useEffect(() => {
    if (!ready || touched) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    spin.current = setInterval(() => {
      i += 1;
      setFrame(i % frames.length);
      if (i >= frames.length) clearInterval(spin.current);
    }, 55);
    return () => clearInterval(spin.current);
  }, [ready, touched, frames.length]);

  const stopSpin = () => {
    clearInterval(spin.current);
    setTouched(true);
  };

  const onPointerDown = (e) => {
    if (!ready) return;
    stopSpin();
    drag.current = { x: e.clientX, frame };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = useCallback(
    (e) => {
      if (!drag.current || !box.current) return;
      const width = box.current.clientWidth;
      const dx = e.clientX - drag.current.x;
      // Arrastrar todo el ancho = una vuelta completa
      const delta = Math.round((dx / width) * frames.length);
      const n = frames.length;
      setFrame((((drag.current.frame - delta) % n) + n) % n);
    },
    [frames.length]
  );

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div className="select-none">
      <div
        ref={box}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`relative aspect-square w-full overflow-hidden bg-ink ${
          ready ? 'cursor-grab active:cursor-grabbing' : 'cursor-progress'
        }`}
        style={{ touchAction: 'pan-y' }}
        aria-label={`Vista 360° de ${alt}. Arrastrá para girar.`}
        role="img"
      >
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${
              i === frame ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <span className="pointer-events-none absolute left-4 top-4 border border-ivory/25 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.3em] text-ivory/80">
          360°
        </span>

        {!ready && (
          <div className="pointer-events-none absolute inset-x-8 bottom-8 md:inset-x-16">
            <div className="h-px w-full bg-ivory/15">
              <div
                className="h-px bg-gold transition-all duration-300"
                style={{ width: `${Math.round((loaded / frames.length) * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-center text-[9px] uppercase tracking-[0.3em] text-stone">
              Cargando vista 360° · {Math.round((loaded / frames.length) * 100)}%
            </p>
          </div>
        )}

        {ready && !touched && (
          <p className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 text-[9.5px] uppercase tracking-[0.3em] text-ivory/70">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
            </svg>
            Arrastrá para girar
          </p>
        )}
      </div>

      {/* Barra de giro, como un dial */}
      <div className="mx-auto mt-5 flex max-w-sm items-center gap-4 px-6 md:px-0">
        <span className="text-[9px] uppercase tracking-[0.25em] text-stone">0°</span>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          value={frame}
          onChange={(e) => {
            stopSpin();
            setFrame(Number(e.target.value));
          }}
          disabled={!ready}
          aria-label="Girar la pieza"
          className="range-360 flex-1"
        />
        <span className="text-[9px] uppercase tracking-[0.25em] text-stone">360°</span>
      </div>
    </div>
  );
}

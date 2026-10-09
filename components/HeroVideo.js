'use client';
import { useEffect, useRef, useState } from 'react';

// Video de fondo del hero. Para cambiarlo, reemplazá los archivos en public/media/
// o cambiá las rutas en data/site.json (heroVideo y heroVideoMobile).
export default function HeroVideo({ src, srcMobile }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    v.src = mobile && srcMobile ? srcMobile : src;
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [src, srcMobile]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      onPlaying={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-opacity duration-[2000ms] ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

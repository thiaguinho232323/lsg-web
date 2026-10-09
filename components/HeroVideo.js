'use client';
import { useEffect, useRef, useState } from 'react';

// Video de fondo del hero: reproduce una lista de clips en secuencia, con fundido entre uno y otro.
// Para cambiarlos, editá "heroVideos" en data/site.json (cada clip tiene versión para computadora y para celular).
export default function HeroVideo({ clips = [] }) {
  const a = useRef(null);
  const b = useRef(null);
  const [active, setActive] = useState(0); // 0 = video A visible, 1 = video B visible
  const [ready, setReady] = useState(false);
  const state = useRef({ index: 0, mobile: false, active: 0 });

  const srcFor = (i) => {
    const clip = clips[i % clips.length];
    return state.current.mobile && clip.mobile ? clip.mobile : clip.desktop;
  };

  useEffect(() => {
    if (!clips.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    state.current.mobile = window.matchMedia('(max-width: 767px)').matches;
    const va = a.current;
    const vb = b.current;
    va.src = srcFor(0);
    va.load();
    va.play()?.catch?.(() => {});
    if (clips.length > 1) {
      vb.src = srcFor(1);
      vb.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnded = (which) => {
    if (clips.length < 2) return;
    if (which !== state.current.active) return;
    const current = which === 0 ? a.current : b.current;
    const next = which === 0 ? b.current : a.current;
    next.currentTime = 0;
    next.play()?.catch?.(() => {});
    const nextActive = which === 0 ? 1 : 0;
    state.current.active = nextActive;
    state.current.index += 1;
    setActive(nextActive);
    // precargar el clip siguiente en el video que queda oculto
    setTimeout(() => {
      current.src = srcFor(state.current.index + 1);
      current.load();
    }, 1200);
  };

  const cls = (visible) =>
    `absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] transition-opacity duration-1000 ${
      ready && visible ? 'opacity-100' : 'opacity-0'
    }`;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <video
        ref={a}
        muted
        playsInline
        preload="auto"
        loop={clips.length < 2}
        onPlaying={() => setReady(true)}
        onEnded={() => handleEnded(0)}
        className={cls(active === 0)}
      />
      <video
        ref={b}
        muted
        playsInline
        preload="auto"
        onEnded={() => handleEnded(1)}
        className={cls(active === 1)}
      />
    </div>
  );
}

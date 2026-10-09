'use client';
import { useState } from 'react';
import PieceGallery from './PieceGallery';
import Viewer360 from './Viewer360';

// Muestra la vista 360° (si la pieza la tiene) y las fotos, con un selector entre ambas.
export default function PieceMedia({ fotos, alt, badge, estado, vista360 }) {
  const tiene360 = Boolean(vista360?.carpeta && vista360?.cuadros);
  const [modo, setModo] = useState(tiene360 ? '360' : 'fotos');

  if (!tiene360) return <PieceGallery fotos={fotos} alt={alt} badge={badge} estado={estado} />;

  return (
    <div>
      {modo === '360' ? (
        <Viewer360 carpeta={vista360.carpeta} cuadros={vista360.cuadros} extension={vista360.extension} alt={alt} />
      ) : (
        <PieceGallery fotos={fotos} alt={alt} badge={badge} estado={estado} />
      )}
      <div className="mt-5 flex items-center justify-center gap-2 px-6 md:px-0">
        {[
          ['360', 'Vista 360°'],
          ['fotos', `Fotos (${fotos.length})`],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setModo(id)}
            aria-pressed={modo === id}
            className={`border px-4 py-2 text-[9.5px] uppercase tracking-[0.28em] transition duration-300 ${
              modo === id ? 'border-gold text-gold' : 'border-line text-ivory/60 hover:border-ivory/40 hover:text-ivory'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

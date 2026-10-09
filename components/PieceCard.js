import Link from 'next/link';
import Image from 'next/image';
import { formatUSD, pieceNumber } from '@/lib/pieces';

export default function PieceCard({ piece, priority = false, sizes = '(max-width: 768px) 50vw, 25vw' }) {
  const vendida = piece.estado === 'vendida';
  const reservada = piece.estado === 'reservada';
  const [foto1, foto2] = piece.fotos;

  return (
    <Link href={`/pieza/${piece.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
        <Image
          src={foto1}
          alt={`${piece.marca} ${piece.nombre}`}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04] ${
            foto2 ? 'md:group-hover:opacity-0' : ''
          } ${vendida ? 'opacity-40 grayscale' : ''}`}
        />
        {foto2 && !vendida && (
          <Image
            src={foto2}
            alt=""
            fill
            sizes={sizes}
            className="hidden object-cover opacity-0 transition duration-700 md:block md:group-hover:opacity-100"
          />
        )}

        {piece.badge && !vendida && (
          <span className="absolute left-2.5 top-2.5 border border-gold/60 bg-ink/70 px-2 py-1 text-[8.5px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm md:left-3 md:top-3 md:text-[9px]">
            {piece.badge}
          </span>
        )}
        {(vendida || reservada) && (
          <span className="absolute right-2.5 top-2.5 bg-ivory/90 px-2 py-1 text-[8.5px] uppercase tracking-[0.22em] text-ink md:right-3 md:top-3 md:text-[9px]">
            {vendida ? 'Vendida' : 'Reservada'}
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-gold/30" />
      </div>

      <div className="mt-3.5 space-y-1 md:mt-4">
        <div className="flex items-center justify-between gap-2 text-[9.5px] uppercase tracking-[0.22em] md:text-[10px]">
          <span className="truncate text-stone">{piece.marca}</span>
          <span className="shrink-0 text-gold/80">{pieceNumber(piece.numero)}</span>
        </div>
        <h3 className="font-serif text-[18px] leading-snug tracking-[0.01em] text-ivory md:text-[21px]">{piece.nombre}</h3>
        <div className="flex items-baseline justify-between gap-2 pt-0.5">
          <span className={`text-[12.5px] tracking-[0.04em] ${vendida ? 'text-stone line-through' : 'text-ivory/90'}`}>
            {formatUSD(piece.precio)}
          </span>
          <span className="text-[10px] text-stone">
            {piece.talle !== 'Único' ? `Talle ${piece.talle}` : 'Talle único'}
          </span>
        </div>
      </div>
    </Link>
  );
}

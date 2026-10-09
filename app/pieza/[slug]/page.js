import Link from 'next/link';
import { notFound } from 'next/navigation';
import PieceMedia from '@/components/PieceMedia';
import PieceCard from '@/components/PieceCard';
import { ArrowIcon, WhatsAppIcon } from '@/components/Icons';
import { allPieces, formatUSD, getPiece, pieceNumber, relatedPieces, waPieceLink } from '@/lib/pieces';

export function generateStaticParams() {
  return allPieces.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPiece(params.slug);
  if (!p) return {};
  return {
    title: `${p.marca} ${p.nombre}`,
    description: `${pieceNumber(p.numero)} · ${p.marca} ${p.nombre} · ${p.condicion} · ${formatUSD(p.precio)}`,
    openGraph: { images: p.fotos?.[0] ? [p.fotos[0]] : [] },
  };
}

const ESTADO_TEXTO = {
  disponible: 'Disponible',
  reservada: 'Reservada',
  vendida: 'Vendida',
};

const CONDICION_TEXTO = {
  Nueva: 'Sin uso, con etiquetas o en su caja original.',
  Impecable: 'Usada muy pocas veces. Sin detalles visibles.',
  'Con uso': 'Uso visible y honesto. Consultanos por fotos de detalle.',
};

export default function PiezaPage({ params }) {
  const p = getPiece(params.slug);
  if (!p) notFound();

  const vendida = p.estado === 'vendida';
  const reservada = p.estado === 'reservada';
  const related = relatedPieces(p);
  const wa = waPieceLink(p);
  const ctaTexto = vendida ? 'Consultar por algo similar' : 'Consultar por WhatsApp';

  return (
    <>
      <div className="pt-16 md:pt-28">
        <div className="mx-auto max-w-7xl md:px-10">
          <nav className="hidden items-center gap-3 pb-8 text-[10px] uppercase tracking-[0.25em] text-stone md:flex">
            <Link href="/galeria" className="hover:text-gold">Selección</Link>
            <span>/</span>
            <Link href={`/galeria?marca=${encodeURIComponent(p.marca)}`} className="hover:text-gold">{p.marca}</Link>
            <span>/</span>
            <span className="text-ivory/70">{pieceNumber(p.numero)}</span>
          </nav>

          <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="md:col-span-7">
              <PieceMedia
                fotos={p.fotos}
                alt={`${p.marca} ${p.nombre}`}
                badge={p.badge}
                estado={p.estado}
                vista360={p.vista360}
              />
            </div>

            {/* Cartela */}
            <div className="px-5 pt-8 md:col-span-5 md:px-0 md:pt-0">
              <div className="md:sticky md:top-28">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
                  <span className="text-gold">{pieceNumber(p.numero)}</span>
                  <span className={vendida ? 'text-stone' : reservada ? 'text-ivory/80' : 'text-ivory/60'}>
                    <span
                      className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                        vendida ? 'bg-stone' : reservada ? 'bg-ivory/70' : 'bg-gold'
                      }`}
                    />
                    {ESTADO_TEXTO[p.estado] || p.estado}
                  </span>
                </div>

                <p className="mt-8 text-[11px] uppercase tracking-luxe text-stone">{p.marca}</p>
                <h1 className="serif-title mt-4 text-[2.6rem] md:text-5xl">{p.nombre}</h1>

                <p className={`mt-6 font-serif text-3xl ${vendida ? 'text-stone line-through' : 'text-ivory'}`}>
                  {formatUSD(p.precio)}
                </p>
                <p className="mt-1 text-xs text-stone">Precio en dólares. Consultanos por pago en pesos.</p>

                <dl className="mt-8 border-t border-line">
                  {[
                    ['Talle', p.talle],
                    ['Condición', p.condicion],
                    ['Categoría', p.categoria],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between border-b border-line py-4">
                      <dt className="text-[10px] uppercase tracking-[0.3em] text-stone">{k}</dt>
                      <dd className="text-sm text-ivory">{v}</dd>
                    </div>
                  ))}
                </dl>
                {CONDICION_TEXTO[p.condicion] && (
                  <p className="mt-3 text-xs text-stone">{CONDICION_TEXTO[p.condicion]}</p>
                )}

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-8 hidden w-full md:flex"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {ctaTexto}
                </a>
                {reservada && (
                  <p className="mt-3 text-center text-xs text-stone">
                    Esta pieza está reservada. Escribinos para quedar en lista de espera.
                  </p>
                )}

                {p.descripcion && (
                  <div className="mt-10">
                    <p className="kicker mb-3">Sobre la pieza</p>
                    <p className="text-[15px] leading-relaxed text-ivory/80">{p.descripcion}</p>
                  </div>
                )}
                {p.detalles?.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {p.detalles.map((d) => (
                      <li key={d} className="flex items-baseline gap-3 text-sm text-ivory/70">
                        <span className="h-px w-3 shrink-0 translate-y-[-3px] bg-gold/70" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-10 grid grid-cols-3 gap-px border border-line bg-line text-center text-[9px] uppercase leading-relaxed tracking-[0.2em] text-stone">
                  <span className="bg-ink px-2 py-4">Autenticidad<br />verificada</span>
                  <span className="bg-ink px-2 py-4">Envíos a<br />todo el país</span>
                  <span className="bg-ink px-2 py-4">Atención<br />personal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionadas */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-line/70 py-16 md:mt-32 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="flex items-end justify-between">
              <h2 className="serif-title text-3xl md:text-5xl">
                Otras <span className="text-gold">piezas</span>
              </h2>
              <Link href="/galeria" className="link-underline mb-1 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ivory/80">
                Ver todas <ArrowIcon />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((r) => (
                <PieceCard key={r.slug} piece={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Barra fija mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="truncate text-[9px] uppercase tracking-[0.25em] text-stone">{p.marca}</p>
            <p className={`font-serif text-xl leading-tight ${vendida ? 'text-stone line-through' : ''}`}>{formatUSD(p.precio)}</p>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold ml-auto flex-1 px-4 py-3.5 text-[10px] tracking-[0.2em]">
            <WhatsAppIcon className="h-4 w-4" /> {vendida ? 'Algo similar' : 'Consultar'}
          </a>
        </div>
      </div>
      <div className="h-20 md:hidden" />
    </>
  );
}

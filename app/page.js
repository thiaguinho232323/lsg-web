import Link from 'next/link';
import PieceCard from '@/components/PieceCard';
import Reveal from '@/components/Reveal';
import Monogram from '@/components/Monogram';
import { ArrowIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/Icons';
import { allPieces, brandIndex, featuredPieces, generalWaLink, site } from '@/lib/pieces';

export default function Home() {
  const featured = featuredPieces();
  const brands = brandIndex();
  const enSala = allPieces.filter((p) => p.estado !== 'vendida').length;

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        {/* luz de sala */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-[90vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(198,166,100,0.16),rgba(198,166,100,0.04)_55%,transparent)] md:w-[80vw]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* monograma gigante de fondo */}
        <div
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[46vw] font-light leading-none tracking-[0.04em] md:text-[34vw]"
        >
          LSG
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-28 md:px-10 md:pt-32">
          <p className="kicker rise" style={{ animationDelay: '150ms' }}>
            Galería privada · Argentina · Solo online
          </p>

          <h1 className="mt-7 font-serif font-light leading-[0.92] tracking-[-0.01em]">
            <span className="rise block text-[19vw] md:text-[9.5rem]" style={{ animationDelay: '300ms' }}>
              Una pieza.
            </span>
            <span
              className="rise gold-sheen block pl-[8vw] text-[19vw] italic md:pl-40 md:text-[9.5rem]"
              style={{ animationDelay: '550ms' }}
            >
              Una vez.
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-md text-[15px] leading-relaxed text-ivory/70 md:mt-10 md:text-base"
            style={{ animationDelay: '800ms' }}
          >
            Diseño de autor elegido a mano. Cada pieza existe una sola vez en la galería: cuando encuentra
            dueño, no vuelve.
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '1000ms' }}
          >
            <Link href="/galeria" className="btn-gold">
              Recorrer la galería <ArrowIcon />
            </Link>
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-4 w-4" /> Hablemos
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-5 pb-8 text-[10px] uppercase tracking-[0.3em] text-stone md:px-10">
          <span>
            <span className="text-gold">{String(enSala).padStart(2, '0')}</span> piezas en sala
          </span>
          <span className="flex flex-col items-center gap-3">
            <span className="hidden md:inline">Descubrir</span>
            <span className="relative block h-12 w-px overflow-hidden bg-line">
              <span className="scroll-line absolute inset-0 bg-gold" />
            </span>
          </span>
          <span>Precios en USD</span>
        </div>
      </section>

      {/* ───────────── EN SALA ───────────── */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">Sala 01 — Destacadas</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
                En sala <em className="text-gold">ahora</em>
              </h2>
            </div>
            <Link
              href="/galeria"
              className="link-underline mb-2 hidden shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ivory/80 md:inline-flex"
            >
              Ver toda la galería <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-10 md:mt-14">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:gap-8 md:scroll-px-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            {featured.map((p, i) => (
              <div key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[23vw] xl:w-[300px]">
                <PieceCard piece={p} priority={i < 2} sizes="(max-width: 768px) 72vw, 300px" />
              </div>
            ))}
            <Link
              href="/galeria"
              className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center border border-line text-center transition hover:border-gold/50 sm:w-[36vw] md:w-[22vw] xl:w-[240px]"
            >
              <span className="font-serif text-3xl font-light italic text-ivory/90 group-hover:text-gold">
                Toda la
                <br />
                galería
              </span>
              <span className="mt-4 text-gold">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────────── MANIFIESTO ───────────── */}
      <section className="border-y border-line/60 py-20 md:py-32">
        <Reveal className="mx-auto max-w-5xl px-5 text-center md:px-10">
          <Monogram size="sm" className="opacity-80" />
          <p className="mt-10 font-serif text-[2rem] font-light leading-[1.15] md:text-6xl">
            No exhibimos todo lo que existe.
            <br />
            <span className="italic text-gold">Exhibimos lo que vale la pena.</span>
          </p>
        </Reveal>
      </section>

      {/* ───────────── MARCAS ───────────── */}
      <section id="marcas" className="scroll-mt-20 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Índice de casas</p>
              <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">Las marcas</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              Trabajamos con pocas casas y las conocemos a fondo. Tocá una para ver sus piezas en sala.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-line/70 md:mt-16">
            {brands.map(({ marca, count }, i) => (
              <Reveal as="li" key={marca} delay={i * 60}>
                <Link
                  href={`/galeria?marca=${encodeURIComponent(marca)}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-line/70 py-5 md:py-7"
                >
                  <span className="flex items-baseline gap-4 md:gap-8">
                    <span className="w-6 text-[10px] tracking-[0.2em] text-stone">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-[2.1rem] font-light leading-none text-ivory transition duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-gold md:text-7xl">
                      {marca}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-stone">
                    <span className="hidden sm:inline">{count === 1 ? '1 pieza' : `${count} piezas`}</span>
                    <span className="sm:hidden text-gold">{count}</span>
                    <ArrowIcon className="h-3 w-3 text-gold opacity-0 transition duration-500 group-hover:opacity-100" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── CURADURÍA ───────────── */}
      <section id="curaduria" className="scroll-mt-20 bg-carbon py-20 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-10">
          <Reveal className="md:col-span-5">
            <p className="kicker">Sobre la curaduría</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] md:text-6xl">
              Elegimos menos para que cada pieza <em className="text-gold">diga más.</em>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/70">
              Hace cuatro años que buscamos, revisamos y seleccionamos diseño de autor. LSG nace de esa
              mirada: una galería chica, sin vidriera ni local, donde cada pieza entra porque la elegimos
              nosotros, y sale directo a manos de alguien que la estaba buscando.
            </p>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            {[
              {
                n: 'I',
                t: 'Origen verificado',
                d: 'Cada pieza se revisa en detalle antes de entrar a la galería. Si no estamos seguros, no entra.',
              },
              {
                n: 'II',
                t: 'Estado declarado',
                d: 'Nueva, impecable o con uso: lo decimos tal cual es, con fotos reales y sin letra chica.',
              },
              {
                n: 'III',
                t: 'Una sola vez',
                d: 'No reponemos. Lo que ves en sala es lo que hay, y cuando se va pasa al archivo.',
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 120} className="flex gap-6 border-t border-line py-8 md:gap-10">
                <span className="w-8 shrink-0 font-serif text-2xl italic text-gold">{item.n}</span>
                <div>
                  <h3 className="font-serif text-2xl text-ivory md:text-3xl">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone md:text-[15px]">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CÓMO ADQUIRIR ───────────── */}
      <section id="como-adquirir" className="scroll-mt-20 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <p className="kicker">Sin carrito. Con conversación.</p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-6xl">Cómo adquirir una pieza</h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-line md:mt-16 md:grid-cols-3">
            {[
              { n: '01', t: 'Elegís', d: 'Recorrés la galería y abrís la ficha de la pieza que te interesa.' },
              {
                n: '02',
                t: 'Conversamos',
                d: 'Tocás “Consultar por WhatsApp” y nos llega tu consulta con la pieza ya indicada. Te respondemos personalmente.',
              },
              {
                n: '03',
                t: 'La recibís',
                d: 'Coordinamos el pago y el envío a cualquier punto del país, con seguimiento.',
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className="bg-ink p-8 md:p-10">
                <span className="font-serif text-5xl font-light text-gold/80 md:text-6xl">{s.n}</span>
                <h3 className="mt-6 font-serif text-3xl text-ivory">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone md:text-[15px]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CIERRE ───────────── */}
      <section className="grain relative overflow-hidden border-t border-line/60 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,166,100,0.12),transparent_60%)]" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-10">
          <p className="kicker">Encargos</p>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] md:text-7xl">
            ¿Buscás algo que <em className="text-gold">no está en sala?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70">
            Contanos qué pieza tenés en mente, tu talle y tu estilo. Si existe, la buscamos.
          </p>
          <div className="mt-10 flex flex-col items-center gap-8">
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
              <WhatsAppIcon className="h-4 w-4" /> Escribinos por WhatsApp
            </a>
            <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-stone">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                <InstagramIcon /> Instagram
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                <TikTokIcon /> TikTok
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

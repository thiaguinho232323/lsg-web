import Link from 'next/link';
import PieceCard from '@/components/PieceCard';
import Reveal from '@/components/Reveal';
import Monogram from '@/components/Monogram';
import HeroVideo from '@/components/HeroVideo';
import { ArrowIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/Icons';
import { allPieces, brandIndex, featuredPieces, generalWaLink, site } from '@/lib/pieces';

export default function Home() {
  const featured = featuredPieces();
  const brands = brandIndex();
  const disponibles = allPieces.filter((p) => p.estado !== 'vendida').length;

  return (
    <>
      {/* ───────────── HERO CON VIDEO ───────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        <HeroVideo clips={site.heroVideos} />
        {/* velos para que el texto siempre se lea */}
        <div className="pointer-events-none absolute inset-0 bg-ink/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.7)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-32 pt-28 text-center md:px-10">
          <p className="kicker rise" style={{ animationDelay: '300ms' }}>
            Luxury Selection Gallery · Argentina
          </p>

          <span
            className="rise mt-9 block h-px w-12 bg-gold/60 md:mt-11"
            style={{ animationDelay: '500ms' }}
            aria-hidden="true"
          />

          <h1 className="serif-title mt-9 md:mt-11">
            <span className="rise block font-light text-[17vw] text-ivory md:text-[7.5rem]" style={{ animationDelay: '650ms' }}>
              Elegido
            </span>
            <span
              className="rise gold-sheen block font-light text-[17vw] md:text-[7.5rem]"
              style={{ animationDelay: '900ms' }}
            >
              para pocos.
            </span>
          </h1>

          <p
            className="rise mt-9 max-w-sm text-[14px] leading-[1.9] tracking-[0.02em] text-ivory/75 md:mt-11 md:max-w-md md:text-[15px]"
            style={{ animationDelay: '1150ms' }}
          >
            Piezas de diseñador seleccionadas una a una. Originales, únicas y disponibles en Argentina.
          </p>

          <div
            className="rise mt-11 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
            style={{ animationDelay: '1350ms' }}
          >
            <Link href="/galeria" className="btn-gold">
              Ver la selección <ArrowIcon />
            </Link>
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-3.5 w-3.5" /> Consultar
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-6 pb-8 text-[9.5px] uppercase tracking-[0.32em] text-ivory/55 md:px-10">
          <span>
            <span className="text-gold">{String(disponibles).padStart(2, '0')}</span> piezas disponibles
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/15">
            <span className="scroll-line absolute inset-0 bg-gold" />
          </span>
          <span>Precios en USD</span>
        </div>
      </section>

      {/* ───────────── DESTACADAS ───────────── */}
      <section className="relative py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">La selección</p>
              <h2 className="serif-title mt-5 text-[2.6rem] md:text-6xl">
                Piezas <span className="text-gold">destacadas</span>
              </h2>
            </div>
            <Link
              href="/galeria"
              className="link-underline mb-2 hidden shrink-0 items-center gap-2 text-[10.5px] uppercase tracking-[0.3em] text-ivory/75 md:inline-flex"
            >
              Ver todas <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-12 md:mt-16">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 md:gap-8 md:scroll-px-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            {featured.map((p, i) => (
              <div key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[23vw] xl:w-[300px]">
                <PieceCard piece={p} priority={i < 2} sizes="(max-width: 768px) 72vw, 300px" />
              </div>
            ))}
            <Link
              href="/galeria"
              className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center border border-line/80 text-center transition duration-500 hover:border-gold/40 sm:w-[36vw] md:w-[22vw] xl:w-[240px]"
            >
              <span className="serif-title text-3xl text-ivory/90 transition group-hover:text-gold">
                Toda la
                <br />
                selección
              </span>
              <span className="mt-5 text-gold">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────────── FRASE ───────────── */}
      <section className="border-y border-line/50 py-24 md:py-36">
        <Reveal className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <Monogram size="sm" className="opacity-70" />
          <p className="serif-title mt-12 text-[2.1rem] leading-[1.2] md:text-[3.6rem]">
            Cada pieza fue elegida.
            <br />
            <span className="text-gold">Ninguna está por casualidad.</span>
          </p>
        </Reveal>
      </section>

      {/* ───────────── MARCAS ───────────── */}
      <section id="marcas" className="scroll-mt-20 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Casas seleccionadas</p>
              <h2 className="serif-title mt-5 text-[2.6rem] md:text-6xl">Marcas</h2>
            </div>
            <p className="max-w-xs text-[13.5px] leading-[1.8] text-stone">
              Trabajamos con pocas casas y las conocemos en detalle. Elegí una para ver sus piezas disponibles.
            </p>
          </Reveal>

          <ul className="mt-14 border-t border-line/60 md:mt-20">
            {brands.map(({ marca, count }, i) => (
              <Reveal as="li" key={marca} delay={i * 60}>
                <Link
                  href={`/galeria?marca=${encodeURIComponent(marca)}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-line/60 py-6 md:py-8"
                >
                  <span className="flex items-baseline gap-5 md:gap-10">
                    <span className="w-6 text-[9.5px] tracking-[0.25em] text-stone">{String(i + 1).padStart(2, '0')}</span>
                    <span className="serif-title text-[2.2rem] text-ivory/90 transition duration-700 group-hover:translate-x-2 group-hover:text-gold md:text-7xl">
                      {marca}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-[9.5px] uppercase tracking-[0.3em] text-stone">
                    <span>{count === 1 ? '1 pieza' : `${count} piezas`}</span>
                    <ArrowIcon className="hidden h-3 w-3 text-gold opacity-0 transition duration-500 group-hover:opacity-100 md:block" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── CRITERIO (con imagen de fondo) ───────────── */}
      <section id="criterio" className="relative scroll-mt-20 overflow-hidden py-28 md:py-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center grayscale md:bg-fixed"
          style={{ backgroundImage: `url("${site.imagenCriterio}")` }}
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:gap-10 md:px-10">
          <Reveal className="md:col-span-5">
            <p className="kicker">Nuestro criterio</p>
            <h2 className="serif-title mt-6 text-[2.6rem] md:text-6xl">
              Elegimos menos para que cada pieza <span className="text-gold">diga más.</span>
            </h2>
            <p className="mt-9 max-w-md text-[14.5px] leading-[1.9] text-ivory/75">
              Hace cuatro años que buscamos, revisamos y seleccionamos piezas de diseñador. LSG nace de esa
              mirada: una selección reducida, donde cada pieza entra porque la elegimos y llega directo a
              quien la estaba buscando.
            </p>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            {[
              {
                n: 'I',
                t: 'Autenticidad verificada',
                d: 'Cada pieza se revisa en detalle antes de formar parte de la selección. Si hay dudas, no entra.',
              },
              {
                n: 'II',
                t: 'Estado declarado',
                d: 'Nueva, impecable o con uso: lo indicamos tal cual es, con fotos reales y sin letra chica.',
              },
              {
                n: 'III',
                t: 'Unidades únicas',
                d: 'No reponemos. Cada pieza es irrepetible y, cuando encuentra dueño, pasa al archivo.',
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 120} className="flex gap-7 border-t border-ivory/10 py-9 md:gap-12">
                <span className="w-8 shrink-0 font-serif text-2xl text-gold">{item.n}</span>
                <div>
                  <h3 className="serif-title text-[1.7rem] text-ivory md:text-3xl">{item.t}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.8] text-ivory/60 md:text-[14.5px]">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CÓMO ADQUIRIR ───────────── */}
      <section id="como-adquirir" className="scroll-mt-20 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="kicker">Atención personalizada</p>
            <h2 className="serif-title mt-5 text-[2.6rem] md:text-6xl">Cómo adquirir una pieza</h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-line/60 md:mt-20 md:grid-cols-3">
            {[
              { n: '01', t: 'Elegís', d: 'Recorrés la selección y abrís la pieza que te interesa para ver fotos, talle y estado.' },
              {
                n: '02',
                t: 'Consultás',
                d: 'Con un toque nos escribís por WhatsApp, con la pieza ya indicada. Te respondemos personalmente.',
              },
              {
                n: '03',
                t: 'La recibís',
                d: 'Coordinamos el pago y el envío a cualquier punto del país, con seguimiento.',
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className="bg-ink p-9 md:p-12">
                <span className="font-serif text-5xl text-gold/80 md:text-6xl">{s.n}</span>
                <h3 className="serif-title mt-7 text-3xl text-ivory">{s.t}</h3>
                <p className="mt-4 text-[13.5px] leading-[1.8] text-stone md:text-[14.5px]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ENCARGOS (con imagen de fondo) ───────────── */}
      <section className="relative overflow-hidden py-32 md:py-48">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center grayscale md:bg-fixed"
          style={{ backgroundImage: `url("${site.imagenEncargos}")` }}
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="kicker">Encargos</p>
          <span className="mx-auto mt-8 block h-px w-12 bg-gold/60" aria-hidden="true" />
          <h2 className="serif-title mt-8 text-[2.6rem] md:text-7xl">
            ¿Buscás una pieza <span className="text-gold">en particular?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-[14.5px] leading-[1.9] text-ivory/75">
            Contanos cuál, en qué talle, y la buscamos para vos.
          </p>
          <div className="mt-12 flex flex-col items-center gap-9">
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
              <WhatsAppIcon className="h-3.5 w-3.5" /> Consultar por WhatsApp
            </a>
            <div className="flex items-center gap-9 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-gold">
                <InstagramIcon className="h-3.5 w-3.5" /> Instagram
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-gold">
                <TikTokIcon className="h-3.5 w-3.5" /> TikTok
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

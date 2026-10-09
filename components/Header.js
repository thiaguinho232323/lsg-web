'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Monogram from './Monogram';
import { generalWaLink, site } from '@/lib/pieces';
import { InstagramIcon, TikTokIcon } from './Icons';

const links = [
  { href: '/galeria', label: 'Selección' },
  { href: '/#marcas', label: 'Marcas' },
  { href: '/#criterio', label: 'Criterio' },
  { href: '/#como-adquirir', label: 'Cómo adquirir' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled || open ? 'bg-ink/85 backdrop-blur-md border-b border-line/60' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="LSG — Inicio" className="relative z-50">
            <Monogram size="sm" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline text-[10.5px] uppercase tracking-[0.3em] text-ivory/75 hover:text-ivory"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a
            href={generalWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border border-gold/50 px-5 py-2.5 text-[9.5px] uppercase tracking-[0.32em] text-gold transition hover:bg-gold hover:text-ink md:inline-block"
          >
            Contacto
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`block h-px w-6 bg-ivory transition duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-ivory transition duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Menú mobile a pantalla completa */}
      <div
        className={`fixed inset-0 z-30 flex flex-col bg-ink px-6 pb-10 pt-28 transition-opacity duration-500 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <p className="kicker mb-10">Menú</p>
        <nav className="flex flex-col gap-5">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-[2.6rem] leading-tight text-ivory"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="mr-4 align-middle font-sans text-[10px] tracking-[0.3em] text-gold">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-6">
          <a
            href={generalWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full"
          >
            Escribinos por WhatsApp
          </a>
          <div className="flex items-center justify-center gap-8 text-stone">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs">
              <InstagramIcon /> {site.handle}
            </a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs">
              <TikTokIcon /> {site.handle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

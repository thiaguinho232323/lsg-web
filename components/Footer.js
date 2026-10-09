import Link from 'next/link';
import Monogram from './Monogram';
import { site, generalWaLink } from '@/lib/pieces';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Monogram full size="md" />
            <p className="mt-6 max-w-xs font-serif text-xl text-stone">
              Elegido para pocos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-ivory/70">
            <Link href="/galeria" className="hover:text-gold">Selección</Link>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
              <InstagramIcon className="h-3.5 w-3.5" /> Instagram
            </a>
            <Link href="/#criterio" className="hover:text-gold">Criterio</Link>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
              <TikTokIcon className="h-3.5 w-3.5" /> TikTok
            </a>
            <Link href="/#como-adquirir" className="hover:text-gold">Cómo adquirir</Link>
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 border-t border-line/60 pt-8 text-[10px] uppercase tracking-[0.25em] text-stone md:flex-row md:justify-between">
          <span>Solo online · Envíos a todo el país · Precios en USD</span>
          <span>© {new Date().getFullYear()} Luxury Selection Gallery</span>
        </div>
      </div>
    </footer>
  );
}

import { Italiana, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const serif = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'LSG — Luxury Selection Gallery',
    template: '%s · LSG',
  },
  description:
    'Galería curada de piezas de diseñador en Argentina. Louis Vuitton, Balenciaga, Amiri, Off-White, Loewe, Supreme. Elegido para pocos.',
  openGraph: {
    title: 'LSG — Luxury Selection Gallery',
    description: 'Elegido para pocos. Selección curada de piezas de diseñador en Argentina.',
    locale: 'es_AR',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

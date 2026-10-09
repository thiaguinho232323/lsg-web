import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Jost:wght@300;400;500&display=swap"
        />
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

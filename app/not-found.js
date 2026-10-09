import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="kicker">Sala vacía</p>
      <h1 className="mt-6 font-serif text-5xl font-light md:text-7xl">
        Esta pieza <em className="text-gold">ya no está.</em>
      </h1>
      <p className="mt-5 max-w-sm text-sm text-stone">Puede que haya encontrado dueño. Mirá lo que sigue en sala.</p>
      <Link href="/galeria" className="btn-ghost mt-10">Volver a la galería</Link>
    </div>
  );
}

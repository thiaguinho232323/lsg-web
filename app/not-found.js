import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="kicker">Pieza no disponible</p>
      <h1 className="serif-title mt-6 text-5xl md:text-7xl">
        Esta pieza <span className="text-gold">ya no está.</span>
      </h1>
      <p className="mt-5 max-w-sm text-sm text-stone">Puede que ya haya encontrado dueño. Mirá las piezas disponibles.</p>
      <Link href="/galeria" className="btn-ghost mt-10">Ver la selección</Link>
    </div>
  );
}

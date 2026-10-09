import Catalog from '@/components/Catalog';
import { allPieces } from '@/lib/pieces';

export const metadata = {
  title: 'Galería',
  description: 'Todas las piezas en sala: filtrá por marca, categoría y talle.',
};

export default function GaleriaPage({ searchParams }) {
  const marca = typeof searchParams?.marca === 'string' ? searchParams.marca : null;
  const enSala = allPieces.filter((p) => p.estado !== 'vendida').length;

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="kicker">La galería</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-5xl font-light leading-none md:text-8xl">
            Piezas <em className="text-gold">en sala</em>
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-stone">
            {enSala} piezas disponibles hoy. Cada una es única: lo que ves es lo que hay.
          </p>
        </div>
      </div>
      <Catalog pieces={allPieces} initialMarca={marca} />
    </div>
  );
}

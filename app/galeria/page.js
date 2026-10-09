import Catalog from '@/components/Catalog';
import { allPieces } from '@/lib/pieces';

export const metadata = {
  title: 'Selección',
  description: 'Todas las piezas disponibles: filtrá por marca, categoría y talle.',
};

export default function GaleriaPage({ searchParams }) {
  const marca = typeof searchParams?.marca === 'string' ? searchParams.marca : null;
  const enSala = allPieces.filter((p) => p.estado !== 'vendida').length;

  return (
    <div className="pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="kicker">La selección</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="serif-title text-5xl md:text-8xl">
            Piezas <span className="text-gold">disponibles</span>
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-stone">
            {enSala} piezas disponibles. Cada una es única y la selección se renueva con cada ingreso.
          </p>
        </div>
      </div>
      <Catalog pieces={allPieces} initialMarca={marca} />
    </div>
  );
}

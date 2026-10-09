'use client';
import { useEffect, useMemo, useState } from 'react';
import PieceCard from './PieceCard';

const ORDENES = [
  { id: 'recientes', label: 'Más recientes' },
  { id: 'precio-asc', label: 'Precio: menor a mayor' },
  { id: 'precio-desc', label: 'Precio: mayor a menor' },
];

const CATEGORIA_ORDEN = ['Calzado', 'Buzos', 'Remeras', 'Tejidos', 'Pantalones', 'Abrigos', 'Bolsos', 'Accesorios'];

function sortTalles(a, b) {
  const letras = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const ia = letras.indexOf(a);
  const ib = letras.indexOf(b);
  if (a === 'Único') return 1;
  if (b === 'Único') return -1;
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return parseFloat(a) - parseFloat(b);
}

function uniq(arr) {
  return [...new Set(arr)];
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3.5 py-2 text-[11px] tracking-[0.12em] transition duration-300 ${
        active ? 'border-gold bg-gold text-ink' : 'border-line text-ivory/80 hover:border-ivory/40'
      }`}
    >
      {children}
    </button>
  );
}

export default function Catalog({ pieces, initialMarca = null }) {
  const [marcas, setMarcas] = useState(initialMarca ? [initialMarca] : []);
  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [orden, setOrden] = useState('recientes');
  const [verArchivo, setVerArchivo] = useState(false);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    document.body.style.overflow = panel ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [panel]);

  const opciones = useMemo(
    () => ({
      marcas: uniq(pieces.map((p) => p.marca)).sort(),
      categorias: uniq(pieces.map((p) => p.categoria)).sort(
        (a, b) => (CATEGORIA_ORDEN.indexOf(a) + 99) % 99 - (CATEGORIA_ORDEN.indexOf(b) + 99) % 99
      ),
      talles: uniq(pieces.map((p) => p.talle)).sort(sortTalles),
    }),
    [pieces]
  );

  const toggle = (setter) => (value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const resultado = useMemo(() => {
    let r = pieces.filter(
      (p) =>
        (verArchivo || p.estado !== 'vendida') &&
        (!marcas.length || marcas.includes(p.marca)) &&
        (!categorias.length || categorias.includes(p.categoria)) &&
        (!talles.length || talles.includes(p.talle))
    );
    if (orden === 'precio-asc') r = [...r].sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') r = [...r].sort((a, b) => b.precio - a.precio);
    return r;
  }, [pieces, marcas, categorias, talles, orden, verArchivo]);

  const activos = marcas.length + categorias.length + talles.length;
  const limpiar = () => {
    setMarcas([]);
    setCategorias([]);
    setTalles([]);
  };

  const grupos = [
    { titulo: 'Marca', opciones: opciones.marcas, sel: marcas, fn: toggle(setMarcas) },
    { titulo: 'Categoría', opciones: opciones.categorias, sel: categorias, fn: toggle(setCategorias) },
    { titulo: 'Talle', opciones: opciones.talles, sel: talles, fn: toggle(setTalles) },
  ];

  return (
    <>
      {/* Barra de filtros */}
      <div className="sticky top-16 z-20 mt-10 border-y border-line/70 bg-ink/90 backdrop-blur-md md:top-20 md:mt-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-10">
          <button
            type="button"
            onClick={() => setPanel(true)}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ivory"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M3 6h18M7 12h10M10 18h4" />
            </svg>
            Filtrar
            {activos > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center bg-gold px-1.5 text-[10px] tracking-normal text-ink">
                {activos}
              </span>
            )}
          </button>

          <div className="hidden flex-1 flex-wrap gap-2 lg:flex">
            {opciones.marcas.map((m) => (
              <Chip key={m} active={marcas.includes(m)} onClick={() => toggle(setMarcas)(m)}>
                {m}
              </Chip>
            ))}
          </div>

          <label className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone">
            <span className="sr-only">Ordenar</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent pr-5 text-right text-[11px] uppercase tracking-[0.2em] text-ivory focus:outline-none"
            >
              {ORDENES.map((o) => (
                <option key={o.id} value={o.id} className="bg-carbon normal-case tracking-normal">
                  {o.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-0 h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-10 md:pb-32 md:pt-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-stone">
          <span>
            <span className="text-gold">{resultado.length}</span> {resultado.length === 1 ? 'pieza' : 'piezas'}
          </span>
          <div className="flex items-center gap-5">
            {activos > 0 && (
              <button onClick={limpiar} className="link-underline uppercase tracking-[0.25em] text-ivory/80">
                Limpiar filtros
              </button>
            )}
            <button
              onClick={() => setVerArchivo((v) => !v)}
              className="flex items-center gap-2 uppercase tracking-[0.25em]"
              aria-pressed={verArchivo}
            >
              <span className={`relative h-3.5 w-7 rounded-full border transition ${verArchivo ? 'border-gold' : 'border-line'}`}>
                <span
                  className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-all ${
                    verArchivo ? 'left-[15px] bg-gold' : 'left-[3px] bg-stone'
                  }`}
                />
              </span>
              Ver archivo
            </button>
          </div>
        </div>

        {resultado.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
            {resultado.map((p, i) => (
              <PieceCard key={p.slug} piece={p} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="font-serif text-3xl font-light italic text-ivory/90">Nada en sala con esos filtros.</p>
            <p className="mt-3 text-sm text-stone">Probá con otra combinación o escribinos: quizás la podemos conseguir.</p>
            <button onClick={limpiar} className="btn-ghost mt-8">
              Ver todo
            </button>
          </div>
        )}
      </div>

      {/* Panel de filtros (abajo en mobile, lateral en desktop) */}
      <div
        className={`fixed inset-0 z-50 transition ${panel ? 'visible' : 'invisible'}`}
        aria-hidden={!panel}
      >
        <div
          onClick={() => setPanel(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity duration-500 ${panel ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          role="dialog"
          aria-label="Filtros"
          className={`absolute inset-x-0 bottom-0 flex max-h-[85svh] flex-col border-t border-line bg-carbon transition-transform duration-500 ease-out md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[420px] md:border-l md:border-t-0 ${
            panel ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full md:translate-y-0'
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <span className="font-serif text-2xl">Filtrar</span>
            <button onClick={() => setPanel(false)} aria-label="Cerrar filtros" className="p-1 text-ivory/80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-7">
            {grupos.map((g) => (
              <div key={g.titulo}>
                <p className="kicker mb-4">{g.titulo}</p>
                <div className="flex flex-wrap gap-2">
                  {g.opciones.map((o) => (
                    <Chip key={o} active={g.sel.includes(o)} onClick={() => g.fn(o)}>
                      {o}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 border-t border-line px-6 py-5">
            <button onClick={limpiar} className="btn-ghost flex-1 px-4">
              Limpiar
            </button>
            <button onClick={() => setPanel(false)} className="btn-gold flex-[1.4] px-4">
              Ver {resultado.length}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

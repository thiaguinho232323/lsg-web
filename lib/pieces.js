import pieces from '@/data/pieces.json';
import site from '@/data/site.json';

export { site };

// Orden de exhibición: disponibles y reservadas primero, vendidas (archivo) al final.
const estadoOrden = { disponible: 0, reservada: 1, vendida: 2 };

export const allPieces = [...pieces].sort(
  (a, b) => (estadoOrden[a.estado] ?? 0) - (estadoOrden[b.estado] ?? 0) || b.numero - a.numero
);

export function getPiece(slug) {
  return pieces.find((p) => p.slug === slug);
}

export function featuredPieces() {
  return allPieces.filter((p) => p.destacada && p.estado !== 'vendida');
}

export function relatedPieces(piece, n = 4) {
  const others = allPieces.filter((p) => p.slug !== piece.slug && p.estado !== 'vendida');
  const sameBrand = others.filter((p) => p.marca === piece.marca);
  const rest = others.filter((p) => p.marca !== piece.marca);
  return [...sameBrand, ...rest].slice(0, n);
}

export function brandIndex() {
  const map = {};
  for (const p of pieces) {
    if (p.estado === 'vendida') continue;
    map[p.marca] = (map[p.marca] || 0) + 1;
  }
  return Object.entries(map)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([marca, count]) => ({ marca, count }));
}

export function formatUSD(n) {
  return 'USD ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function pieceNumber(n) {
  return 'Nº ' + String(n).padStart(3, '0');
}

export function waLink(text) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function waPieceLink(p) {
  if (p.estado === 'vendida') {
    return waLink(
      `Hola LSG. Vi la pieza ${pieceNumber(p.numero)} — ${p.marca} ${p.nombre}, que ya no está disponible. ¿Tienen algo similar?`
    );
  }
  const talle = p.talle && p.talle !== 'Único' ? ` (talle ${p.talle})` : '';
  return waLink(
    `Hola LSG. Me interesa la pieza ${pieceNumber(p.numero)} — ${p.marca} ${p.nombre}${talle}. ¿Sigue disponible?`
  );
}

export const generalWaLink = () =>
  waLink('Hola LSG. Estoy buscando una pieza y quería consultarles.');

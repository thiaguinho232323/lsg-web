export default function Monogram({ full = false, size = 'md', className = '' }) {
  const text = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  const bar = size === 'lg' ? 'w-8' : 'w-4';
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="flex items-center gap-2.5">
        <span className={`h-px ${bar} bg-gold/70`} />
        <span className={`font-serif ${text} tracking-[0.24em] pl-[0.24em] text-ivory`}>LSG</span>
        <span className={`h-px ${bar} bg-gold/70`} />
      </span>
      {full && (
        <span className="mt-2 text-[8.5px] uppercase tracking-luxe pl-[0.35em] text-stone">
          Luxury Selection Gallery
        </span>
      )}
    </span>
  );
}

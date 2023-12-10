export default function toReal(value: number, options?: Intl.NumberFormatOptions) {
  const f = Intl.NumberFormat(
    'pt-br',
    options || {
      style: 'currency',
      currency: 'BRL',
    },
  );
  return f.format(value);
}

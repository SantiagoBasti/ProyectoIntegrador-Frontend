export function FormatPrice({ price }) {
  const formattedPrice = price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  });

  return <>{formattedPrice}</>;
}
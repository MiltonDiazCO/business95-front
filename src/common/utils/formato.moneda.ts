export const formatoDecimal = () => {
  return Intl.NumberFormat('es-Co', {
    style: 'decimal',
    minimumFractionDigits: 2,
  });
};

export const formatoMoneda = (moneda: string) => {
  return Intl.NumberFormat('es-Co', {
    style: 'currency',
    currency: moneda,
    minimumFractionDigits: 2,
  });
};

export function formatCurrency(priceCents) {
  const rupees = (Math.round(priceCents) / 100);

  return rupees.toLocaleString('en-IN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}

export default formatCurrency;
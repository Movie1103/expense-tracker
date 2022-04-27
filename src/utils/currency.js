function formatThaiCurrency(value) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    currencyDisplay: 'narrowSymbol',
  }).format(value);
}
export { formatThaiCurrency };

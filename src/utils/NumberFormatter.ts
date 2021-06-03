const currencyFormatter = (num: number) => new Intl.NumberFormat(
  'pt-BR',
  { style: 'currency', currency: 'BRL' },
).format(num);

export default currencyFormatter;

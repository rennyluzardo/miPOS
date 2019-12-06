
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const moneyToCents = (qty = 0) => qty * 100;

const centsToMoney = (qty = 0) => qty / 100;

const percentaje = (qty = 0) => `${qty}%`;

const money = (qty = 0) => {
  let str = formatter.format(qty);
  let commaNumber = (str.split(',')).length - 1;
  if (commaNumber > 1) {
    str = str.replace(',', '\'');
  }

  str = str
    .replace('-', '*')
    .replace(',', '-')
    .replace('.', ',')
    .replace('-', '.')
    .replace('*', '-');
  return str;
};

const moneyQuantity = (qty = 0) => `${parseFloat(Math.round(qty * 100) / 100).toFixed(2)}`;

export {
  moneyToCents,
  centsToMoney,
  percentaje,
  money,
  moneyQuantity
}
const formatNumber = (value) => {
  const num = Number(value);

  if (Number.isNaN(num)) return '0';

  return new Intl.NumberFormat('en-US').format(num);
};

export default formatNumber;

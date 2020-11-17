export default [
  { name: 'lb / ounce', value: 'english', key: 'english' },
  { name: 'kg / gram', value: 'metric', key: 'metric' },
];

export const unitData = {
  english: {
    name: 'english',
    lg: 'lb',
    sm: 'oz',
    perUnit: 16, // 16 oz per lb
    per1000kCal: 19, // oz per 1000 kcal
  },
  metric: {
    name: 'metric',
    lg: 'kg',
    sm: 'g',
    perUnit: 1000, // 1000 g per kg
    per1000kCal: 538, // g per 1000 kcal
  }
};

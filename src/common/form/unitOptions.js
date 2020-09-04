export default [
  { name: 'lb / ounce', value: 'english', key: 'english' },
  { name: 'kg / gram', value: 'metric', key: 'metric' },
];

export const unitData = {
  english: {
    name: 'english',
    lg: 'lb',
    sm: 'oz',
    perUnit: 16,
  },
  metric: {
    name: 'metric',
    lg: 'kg',
    sm: 'g',
    perUnit: 1000,
  }
};

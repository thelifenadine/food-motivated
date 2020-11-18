const validateInteger = (value) => {
  const parsed = parseInteger(value);
  return isNaN(parsed) ? 0 : parsed;
};

export default validateFloat;

import mapValues from 'lodash/mapValues';
import { essentialNutrients } from '../constants/essentialNutrients';

// CHECK THE MATH
// https://www.facebook.com/notes/raw-feeding-university-rfu/raw-feeding-math-nutrient-calculations/3327244683985780/
const getEssentialNutrientAmounts = (estimatedCalories, lifestage) => {
  const nutrientPercentage = estimatedCalories / 1000;

  return mapValues(essentialNutrients, (nutrientItem) => {
    const nutrientAmount = nutrientItem[lifestage];

    return {
      name: nutrientItem.name,
      amount: nutrientAmount * nutrientPercentage,
      unit: nutrientItem.unit,
    };
  });
};

export default getEssentialNutrientAmounts;

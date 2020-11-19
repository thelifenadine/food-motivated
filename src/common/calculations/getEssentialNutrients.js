import mapValues from 'lodash/mapValues';
import { essentialNutrients } from '../constants/essentialNutrients';

const getEssentialNutrients = (estimatedCalories) => {
  const nutrientPercentage = estimatedCalories / 1000;

  return mapValues(essentialNutrients, (nutrientItem) => {
    const newValues = {
      ...nutrientItem,
      adult: nutrientItem['adult'] * nutrientPercentage,
      puppy: nutrientItem['puppy'] * nutrientPercentage,
    };

    if (nutrientItem.min) {
      newValues.min = {
        // there is only an adult option currently
        adult: nutrientItem.min.adult * nutrientPercentage,
      };
    }

    return newValues;
  });
};

export default getEssentialNutrients;

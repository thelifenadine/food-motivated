import mapValues from 'lodash/mapValues';
import { essentialNutrients } from '../constants/essentialNutrients';

export const mapCalculatedNutrients = (nutrientList, increaseAmount) => {
  return mapValues(nutrientList, (nutrientItem) => {
    const newValues = {
      ...nutrientItem,
      adult: nutrientItem['adult'] * increaseAmount,
      puppy: nutrientItem['puppy'] * increaseAmount,
    };

    if (nutrientItem.min) {
      newValues.min = {
        // there is only an adult option currently
        adult: nutrientItem.min.adult * increaseAmount,
      };
    }

    return newValues;
  });
};

const getEssentialNutrients = (estimatedCalories) => {
  const nutrientPercentage = estimatedCalories / 1000;
  return mapCalculatedNutrients(essentialNutrients, nutrientPercentage);
};

export default getEssentialNutrients;

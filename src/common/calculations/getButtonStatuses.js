import some from 'lodash/some';
import { percentageDefaults } from '../form/percentageDefaultOptions';

/*
  This function determines whether the percentages match the default selections for
  a particular age group, and if so, that button is set to active
  should extract to a util file?
*/
const getButtonStatuses = (mealType, bonePercentage, otherPercentages, ) => {
  if (percentageDefaults[mealType]['adult'].bone === bonePercentage) {
    const isAdultInvalid = some(percentageDefaults[mealType]['adult'].other, (value, key) => {
      return otherPercentages[key] !== value; // as soon as you find a mismatch return
    });

    if (!isAdultInvalid) {
      return {
        isAdult: true,
        isPuppy: false,
      };
    }
  }

  if (percentageDefaults[mealType]['puppy'].bone === bonePercentage) {
    const isPuppyInvalid = some(percentageDefaults[mealType]['puppy'].other, (value, key) => {
      return otherPercentages[key] !== value; // as soon as you find a mismatch return
    });

    if (!isPuppyInvalid) {
      return {
        isAdult: false,
        isPuppy: true,
      };
    }
  }

  return {
    isAdult: false,
    isPuppy: false,
  };
};

export default getButtonStatuses;

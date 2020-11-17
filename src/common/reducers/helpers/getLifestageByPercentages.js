import some from 'lodash/some';
import { percentageDefaults } from '../../constants/percentageDefaultOptions';
import { adult, puppy } from '../../constants/lifestage';

/*
  This function determines whether the percentages match the default selections for
  a particular age group, and if so, that button is set to active
  TODO: write tests for this file
*/
const getLifestageByPercentages = (mealType, bonePercentage, otherPercentages, ) => {
  if (percentageDefaults[mealType][adult].bone === bonePercentage) {
    const isAdultInvalid = some(percentageDefaults[mealType][adult].other, (value, key) => {
      return otherPercentages[key] !== value; // as soon as you find a mismatch return
    });

    if (!isAdultInvalid) {
      return adult;
    }
  }

  if (percentageDefaults[mealType][puppy].bone === bonePercentage) {
    const isPuppyInvalid = some(percentageDefaults[mealType][puppy].other, (value, key) => {
      return otherPercentages[key] !== value; // as soon as you find a mismatch return
    });

    if (!isPuppyInvalid) {
      return puppy;
    }
  }

  return undefined;
};

export default getLifestageByPercentages;

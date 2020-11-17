import { percentageDefaults } from '../../constants/percentageDefaultOptions';

export const getPresetPercentages = (mealType, lifestagePreset) => {
  const { muscle, bone, other } = percentageDefaults[mealType][lifestagePreset];

  return {
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
  };
};

export default getPresetPercentages;

import presetMealPercentages from '../../constants/presetMealPercentages';

export const getPresetPercentages = (mealType, lifestagePreset = 'adult') => {
  const { muscle, bone, other } = presetMealPercentages[mealType][lifestagePreset];

  return {
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
  };
};

export default getPresetPercentages;

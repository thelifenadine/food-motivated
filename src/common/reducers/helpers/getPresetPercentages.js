import presetMealPercentages from '../../constants/presetMealPercentages';

export const getPresetPercentages = (mealType, lifestagePreset) => {
  const { muscle, bone, other } = presetMealPercentages[mealType][lifestagePreset];

  return {
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
  };
};

export default getPresetPercentages;

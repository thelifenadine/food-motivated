import {
  UPDATE_OPTIONS,
  UPDATE_BONE_PERCENTAGE,
  UPDATE_OTHER_PERCENTAGE,
  UPDATE_RMB_PERCENT,
  UPDATE_CUSTOM_RMB_PERCENT,
  SET_LIFESTAGE_PRESET,
  SET_MEAL_TYPE,
} from '../actions/calculator';

// utils
import { saveState, loadState } from '../localStorage/calculatorState';
import createMappedReducer from './utils/createMappedReducer';

// constants
import presetMealPercentages from '../constants/presetMealPercentages';
import { adult } from '../constants/lifestage';
import { rmbLookup } from '../constants/rawMeatyBoneOptions';
import { unitData } from '../constants/unitOptions';

// calculations
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { getMusclePercentage } from '../calculations/getMuscleAmount';
import getAmounts from '../calculations/getAmounts';
import getEssentialNutrients from '../calculations/getEssentialNutrients';
import getEstimatedCalories from '../calculations/getEstimatedCalories';

// reducer helpers
import getLifestageByPercentages from './helpers/getLifestageByPercentages';
import getNewPercentagesAndAmounts from './helpers/getNewPercentagesAndAmounts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INITIAL STATE
export const getDefaultState = () => {
  const rmbPercent = 44;
  const weight = 50;
  const maintenance = 2.5;
  const unitDetails = unitData['english'];
  const mealType = 'barf';
  const lifestagePreset = adult;
  const { muscle, bone, other } = presetMealPercentages[mealType][lifestagePreset];

  const totalDailyAmount = getTotalDailyAmount(weight, maintenance, unitDetails.perUnit);
  const estimatedCalories = getEstimatedCalories(unitDetails.per1000kCal, totalDailyAmount);

  return {
    unitDetails,
    mealType,
    lifestagePreset,
    lastSavedLifestage: lifestagePreset,
    weight,
    maintenance,
    totalDailyAmount,
    rmbPercent,
    rmbKey: rmbLookup['chicken-back'],
    isCustomRmb: false,
    musclePercentage: muscle,
    bonePercentage: bone,
    otherPercentages: other,
    estimatedCalories,
    essentialNutrients: getEssentialNutrients(estimatedCalories, lifestagePreset),
    ...getAmounts(totalDailyAmount, rmbPercent, { bonePercentage: bone, otherPercentages: other }),
  };
};

const getInitialState = () => loadState() || getDefaultState();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  BasicOptions

  The BasicOptions component allows the user to modify:
    - units (metric vs english)
    - dog weight
    - maintenance percentage (activity level of the dog) typically 2.0 - 3.0

  These three properties allow us to calculate the total daily amount of food to feed.
  This is then used to calculate the estimated calories, the amount of each essenential nutrient,
  and the breakdown of each portion (bone, muscle meat, organ, veggies, etc)
  --> indicates the properties that are affected/changed

  unitDetails: (english or metric)
    --> totalDailyAmount, estimatedCalories
      totalDailyAmount --> getAmounts, estimatedCalories
                                          (--> essentialNutrients)
  weight (number)
    --> totalDailyAmount
    totalDailyAmount --> getAmounts, estimatedCalories
                                      (--> essentialNutrients)

  maintenance (number)
    --> totalDailyAmount
    totalDailyAmount --> getAmounts, estimatedCalories
                                      (--> essentialNutrients)

*/
export const updateOptions = (state, action) => {
  const { otherPercentages, bonePercentage, rmbPercent } = state;
  const { weight, maintenance, unitName } = action;

  const newUnitDetails = unitData[unitName];
  const newDailyAmount = getTotalDailyAmount(weight, maintenance, newUnitDetails.perUnit);
  const newEstimatedCalories = getEstimatedCalories(newUnitDetails.per1000kCal, newDailyAmount);

  const updatedState = {
    ...state,
    weight,
    maintenance,
    unitDetails: newUnitDetails,
    totalDailyAmount: newDailyAmount,
    estimatedCalories: newEstimatedCalories,
    essentialNutrients: getEssentialNutrients(newEstimatedCalories),
    ...getAmounts(newDailyAmount, rmbPercent, { bonePercentage, otherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  PercentageOptions

  The PercentageOptions component allows the user to modify:
  - mealType (barf, pmr, etc)
  - lifestagePreset (puppy vs adult)
  - the individual percentages for each mealType

  mealType (barf, pmr, etc)
  -  this resets the percentages for that mealtype and the existing lifestage

  lifestagePreset (adult, puppy)
  - this resets the percentages for that lifestage and the existing mealtype

  bonePercentage
  - when increased or decreased, the musclePercentage changes to rebalance the ratios
  - the lifestagePreset is also evaluated here to see if it matches adult, puppy, or none

  otherPercentage
  - when increased or decreased, the musclePercentage changes to rebalance the ratios
  - the lifestagePreset is also evaluated here to see if it matches adult, puppy, or none

  for every property change:
    - The amounts (in weight) of each portion are recalculated based on the new percentages

*/
// updatedLifestage updates the lifestage, percentages, amounts
export const setLifestagePreset = (state, { updatedLifestage }) => {
  const { mealType } = state;

  const updatedState = {
    ...state,
    lifestagePreset: updatedLifestage,
    lastSavedLifestage: updatedLifestage,
    ...getNewPercentagesAndAmounts(state, mealType, updatedLifestage),
  };

  saveState(updatedState);
  return updatedState;
};

// setMealType updates the mealType, percentages, and amounts
export const setMealType = (state, { updatedMealType }) => {
  const updatedState = {
    ...state,
    mealType: updatedMealType,
    ...getNewPercentagesAndAmounts(state, updatedMealType, state.lastSavedLifestage)
  };

  saveState(updatedState);
  return updatedState;
};

export const updateOtherPercentages = (state, { updatedProperty, updatedValue }) => {
  const { totalDailyAmount, otherPercentages, bonePercentage, rmbPercent, mealType, lastSavedLifestage } = state;

  const newOtherPercentages = {
    ...otherPercentages,
    [updatedProperty]: updatedValue,
  };

  const updatedMusclePercentage = getMusclePercentage(bonePercentage, newOtherPercentages);
  const lifestagePreset = getLifestageByPercentages(mealType, bonePercentage, newOtherPercentages);

  const updatedState = {
    ...state,
    otherPercentages: newOtherPercentages,
    musclePercentage: updatedMusclePercentage,
    lifestagePreset, // can be set to undefined
    lastSavedLifestage: lifestagePreset || lastSavedLifestage, // must always be a value
    ...getAmounts(
      totalDailyAmount, rmbPercent, { bonePercentage, otherPercentages: newOtherPercentages },
    ),
  };

  saveState(updatedState);
  return updatedState;
};

export const updateBonePercentage = (state, action) => {
  const { totalDailyAmount, otherPercentages, rmbPercent, mealType, lastSavedLifestage } = state;
  const { updatedBonePercentage } = action;
  const updatedMusclePercentage = getMusclePercentage(updatedBonePercentage, otherPercentages);
  const lifestagePreset = getLifestageByPercentages(mealType, updatedBonePercentage, otherPercentages);

  const updatedState = {
    ...state,
    bonePercentage: updatedBonePercentage,
    musclePercentage: updatedMusclePercentage,
    lifestagePreset, // can be undefined
    lastSavedLifestage: lifestagePreset || lastSavedLifestage, // cannot be undefined
    ...getAmounts(
      totalDailyAmount, rmbPercent, { bonePercentage: updatedBonePercentage, otherPercentages },
    ),
  };

  saveState(updatedState);
  return updatedState;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  RawMeatyBone

  The RawMeatyBone component allows the user to modify:
  - rmbKey
    - if a string - corresponds with a number which updates the rmbPercent value
      - the rmbPercent is updated based on the rmbLookup table
      - isCustomRmb is set to true
    - if the key = "custom", then isCustomRmb is set to false and the form allows
      - the rmbPercent numeric value to be manually entered

  - the rmbPercent affects the portions of muscle & bone amounts,
    so those amounts must be recalculated
*/
export const updateRMB = (state, action) => {
  const { totalDailyAmount, bonePercentage, otherPercentages } = state;
  const { rmbKey, isCustomRmb } = action;

  const rmbPercent = isCustomRmb ? 0 : rmbLookup[rmbKey];
  const updatedState = {
    ...state,
    rmbKey,
    rmbPercent: rmbPercent,
    isCustomRmb: isCustomRmb,
    ...getAmounts(totalDailyAmount, rmbPercent, { bonePercentage, otherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

export const updateCustomRMB = (state, action) => {
  const { totalDailyAmount, bonePercentage, otherPercentages } = state;
  const { rmbPercent } = action;

  const updatedState = {
    ...state,
    rmbPercent,
    ...getAmounts(totalDailyAmount, rmbPercent, { bonePercentage, otherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

// ---------------------- exports -------------------------
export default createMappedReducer(getInitialState(), {
  [UPDATE_OPTIONS]: updateOptions,
  [UPDATE_BONE_PERCENTAGE]: updateBonePercentage,
  [UPDATE_OTHER_PERCENTAGE]: updateOtherPercentages,
  [UPDATE_RMB_PERCENT]: updateRMB,
  [UPDATE_CUSTOM_RMB_PERCENT]: updateCustomRMB,
  [SET_LIFESTAGE_PRESET]: setLifestagePreset,
  [SET_MEAL_TYPE]: setMealType,
});

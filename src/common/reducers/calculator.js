import { saveState, loadState } from '../localStorage/calculatorState';

import {
  UPDATE_OPTIONS,
  UPDATE_BONE_PERCENTAGE,
  UPDATE_OTHER_PERCENTAGE,
  UPDATE_RMB_PERCENT,
  UPDATE_CUSTOM_RMB_PERCENT,
  SET_LIFESTAGE_PRESET,
  SET_MEAL_TYPE,
} from '../actions/calculator';

import createMappedReducer from './utils/createMappedReducer';

// constants
import { percentageDefaults } from '../constants/percentageDefaultOptions';
import { adult } from '../constants/lifestage';
import { rmbLookup } from '../constants/rawMeatyBoneOptions';
import { unitData } from '../constants/unitOptions';

// calculations
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { getMusclePercentage } from '../calculations/getMuscleAmount';
import getAmounts from '../calculations/getAmounts';
import getEssentialNutrientAmounts from '../calculations/getEssentialNutrientAmounts';
import getEstimatedCalories from '../calculations/getEstimatedCalories';

// reducer helpers
import getLifestageByPercentages from './helpers/getLifestageByPercentages';
import getPercentagesAndAmounts from './helpers/getPercentagesAndAmounts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INITIAL STATE
export const getDefaultState = () => {
  const defaultRMB = 44;
  const defaultWeight = 50;
  const defaultMaintenance = 2.5;
  const defaultUnit = unitData['english'];
  const defaultMealType = 'barf';
  const defaultLifestage = adult;
  const { muscle, bone, other } = percentageDefaults[defaultMealType][defaultLifestage];

  const totalDailyAmount = getTotalDailyAmount(defaultWeight, defaultMaintenance, defaultUnit.perUnit);
  const defaultCalorieEstimate = getEstimatedCalories(defaultUnit.default1000kCal, totalDailyAmount);
  const defaultNutrientAmounts = getEssentialNutrientAmounts(defaultCalorieEstimate, defaultLifestage);

  return {
    unitDetails: defaultUnit,
    mealType: defaultMealType,
    lifestagePreset: defaultLifestage,
    weight: defaultWeight,
    maintenance: defaultMaintenance,
    totalDailyAmount,
    rmbPercent: defaultRMB,
    rmbKey: rmbLookup['chicken-back'],
    isCustomRmb: false,
    musclePercentage: muscle,
    bonePercentage: bone,
    otherPercentages: other,
    estimatedCalories: defaultCalorieEstimate,
    essentialNutrients: defaultNutrientAmounts,
    ...getAmounts(totalDailyAmount, defaultRMB, { bonePercentage: bone, otherPercentages: other }),
  };
};

const getInitialState = () => loadState() || getDefaultState();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// BasicOptions

/*  effects
unitDetails: (english vs metric)
  --> totalDailyAmount, estimatedCalories
    totalDailyAmount --> getAmounts, estimatedCalories
                                        (--> essentialNutrients)
weight
  --> totalDailyAmount
  totalDailyAmount --> getAmounts, estimatedCalories
                                    (--> essentialNutrients)

maintenance
  --> totalDailyAmount
  totalDailyAmount --> getAmounts, estimatedCalories
                                    (--> essentialNutrients)

*/
export const updateOptions = (state, action) => {
  const { otherPercentages, bonePercentage, rmbPercent, lifestagePreset } = state;
  const { weight, maintenance, unitName } = action;

  const updatedUnitDetails = unitData[unitName];
  const updatedDailyAmount = getTotalDailyAmount(weight, maintenance, updatedUnitDetails.perUnit);
  const updatedEstimatedCalories = getEstimatedCalories(updatedUnitDetails.default1000kCal, updatedDailyAmount);

  const updatedState = {
    ...state,
    weight,
    maintenance,
    unitDetails: updatedUnitDetails,
    totalDailyAmount: updatedDailyAmount,
    estimatedCalories: updatedEstimatedCalories,
    essentialNutrients: getEssentialNutrientAmounts(updatedEstimatedCalories, lifestagePreset),
    ...getAmounts(updatedDailyAmount, rmbPercent, { bonePercentage, otherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// PercentageOptions

// updatedLifestage updates the percentages, amounts, and essential nutrients
export const setLifestagePreset = (state, { updatedLifestage }) => {
  const { mealType, estimatedCalories } = state;

  const updatedState = {
    ...state,
    lifestagePreset: updatedLifestage,
    essentialNutrients: getEssentialNutrientAmounts(estimatedCalories, updatedLifestage),
    ...getPercentagesAndAmounts(state, mealType, updatedLifestage),
  };

  saveState(updatedState);
  return updatedState;
};

// setMealType updates the percentages, and amounts
export const setMealType = (state, { updatedMealType }) => {
  const { lifestagePreset } = state;

  const updatedState = {
    ...state,
    mealType: updatedMealType,
    ...getPercentagesAndAmounts(state, updatedMealType, lifestagePreset)
  };

  saveState(updatedState);
  return updatedState;
};

export const updateOtherPercentages = (state, { updatedProperty, updatedValue }) => {
  const { totalDailyAmount, otherPercentages, bonePercentage, rmbPercent, mealType } = state;

  const updatedOtherPercentages = {
    ...otherPercentages,
    [updatedProperty]: updatedValue,
  };

  const updatedMusclePercentage = getMusclePercentage(bonePercentage, updatedOtherPercentages);

  const updatedState = {
    ...state,
    otherPercentages: updatedOtherPercentages,
    musclePercentage: updatedMusclePercentage,
    lifestagePreset: getLifestageByPercentages(mealType, bonePercentage, updatedOtherPercentages),
    ...getAmounts(totalDailyAmount, rmbPercent, { bonePercentage, otherPercentages: updatedOtherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

export const updateBonePercentage = (state, action) => {
  const { totalDailyAmount, otherPercentages, rmbPercent, mealType } = state;
  const { updatedBonePercentage } = action;
  const updatedMusclePercentage = getMusclePercentage(updatedBonePercentage, otherPercentages);

  const updatedState = {
    ...state,
    bonePercentage: updatedBonePercentage,
    musclePercentage: updatedMusclePercentage,
    lifestagePreset: getLifestageByPercentages(mealType, updatedBonePercentage, otherPercentages),
    ...getAmounts(totalDailyAmount, rmbPercent, { bonePercentage: updatedBonePercentage, otherPercentages }),
  };

  saveState(updatedState);
  return updatedState;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// RawMeatyBone
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

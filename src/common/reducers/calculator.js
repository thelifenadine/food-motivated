import { saveState } from '../localStorage/calculatorState';
import mapValues from 'lodash/mapValues';

import {
  UPDATE_OPTIONS,
  UPDATE_BONE_PERCENTAGE,
  UPDATE_OTHER_PERCENTAGE,
  UPDATE_RMB_PERCENT,
  UPDATE_CUSTOM_RMB_PERCENT,
  SET_AGE,
  SET_MEAL_TYPE,
} from '../actions/calculator';

import createMappedReducer from './utils/createMappedReducer';
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { percentageDefaults } from '../form/percentageDefaultOptions';
import { essentialNutrients } from '../form/essentialNutrients';
import { rmbLookup } from '../form/rawMeatyBoneOptions';
import { unitData } from '../form/unitOptions';
import { getMusclePercentage } from '../calculations/getMuscleAmount';

import getAmounts from '../calculations/getAmounts';

// these are reducer helpers... should maybe move to a new folder
import getButtonStatuses from '../calculations/getButtonStatuses';
import getPresetPercentages from '../calculations/getPresetPercentages';

// TODO export and test
const getEstimatedCalories = (amountPer1000kCal, totalAmount) => {
  const calPerUnit = 1000 / amountPer1000kCal;
  return calPerUnit * totalAmount;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INITIAL STATE
const initialRMB = 44;
const weight = 50;
const maintenance = 2.5;
const initialUnit = 'english';
const initialAge = 'adult';
const initialMealPlan = 'barf';


const totalDailyAmount = getTotalDailyAmount(weight, maintenance, unitData[initialUnit].perUnit);
const { muscle, bone, other } = percentageDefaults[initialMealPlan][initialAge];

const initialCalorieEstimate = getEstimatedCalories(unitData[initialUnit].default1000kCal, totalDailyAmount);

const initialNutrientAmounts = mapValues(essentialNutrients, (nutrientInfo) => {
  const nutrientAmount = nutrientInfo[initialAge];
  const nutrientPercentage = initialCalorieEstimate / 1000;

  return {
    name: nutrientInfo.name,
    amount: nutrientAmount * nutrientPercentage,
    unit: nutrientInfo.unit,
  };
});

// TODO, if there is a new property that is not in the loaded state, use initial state instead?
export const initialState = {
  unitDetails: unitData[initialUnit],
  isAdult: true,
  isPuppy: false,
  mealType: initialMealPlan,
  age: initialAge,
  weight,
  maintenance,
  totalDailyAmount,
  rmbPercent: initialRMB,
  isCustomRmb: false,
  musclePercentage: muscle,
  bonePercentage: bone,
  otherPercentages: other,
  ...getAmounts(totalDailyAmount, bone, initialRMB, other),
  estimatedCalories: initialCalorieEstimate,
  essentialNutrients: initialNutrientAmounts,
};

//const getInitialState = () => loadState() || initialState;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// BasicOptions
export const updateOptions = (state, action) => {
  const { otherPercentages, bonePercentage, rmbPercent, unitDetails } = state;
  const { weight, maintenance, unitName } = action;

  const updatedUnitDetails = unitName ? unitData[unitName] : { ...unitDetails };
  const updatedDailyAmount = getTotalDailyAmount(weight, maintenance, updatedUnitDetails.perUnit);
  const updatedEstimatedCalories = getEstimatedCalories(updatedUnitDetails.default1000kCal, updatedDailyAmount);

  const updatedState = {
    ...state,
    estimatedCalories: updatedEstimatedCalories,
    weight,
    maintenance,
    unitDetails: updatedUnitDetails,
    totalDailyAmount: updatedDailyAmount,
    ...getAmounts(updatedDailyAmount, bonePercentage, rmbPercent, otherPercentages),
  };

  saveState(updatedState);
  return updatedState;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// PercentageOptions
export const setAge = (state, { isPuppy, isAdult }) => {
  const { mealType } = state;
  const age = isPuppy ? 'puppy' : 'adult';

  const updatedState = {
    ...state,
    isPuppy,
    isAdult,
    age,
    ...getPresetPercentages(state, mealType, age),
  };

  saveState(updatedState);
  return updatedState;
};

export const setMealType = (state, { mealType }) => {
  const { age } = state;

  const updatedState = {
    ...state,
    isPuppy: (age === 'puppy'),
    isAdult: (age === 'adult'),
    mealType,
    ...getPresetPercentages(state, mealType, age),
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
    ...getButtonStatuses(mealType, bonePercentage, updatedOtherPercentages),
    ...getAmounts(totalDailyAmount, bonePercentage, rmbPercent, updatedOtherPercentages),
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
    ...getButtonStatuses(mealType, updatedBonePercentage, otherPercentages),
    ...getAmounts(totalDailyAmount, updatedBonePercentage, rmbPercent, otherPercentages),
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
    ...getAmounts(totalDailyAmount, bonePercentage, rmbPercent, otherPercentages),
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
    ...getAmounts(totalDailyAmount, bonePercentage, rmbPercent, otherPercentages),
  };

  saveState(updatedState);
  return updatedState;
};

export default createMappedReducer(initialState, {
  [UPDATE_OPTIONS]: updateOptions,
  [UPDATE_BONE_PERCENTAGE]: updateBonePercentage,
  [UPDATE_OTHER_PERCENTAGE]: updateOtherPercentages,
  [UPDATE_RMB_PERCENT]: updateRMB,
  [UPDATE_CUSTOM_RMB_PERCENT]: updateCustomRMB,
  [SET_AGE]: setAge,
  [SET_MEAL_TYPE]: setMealType,
});

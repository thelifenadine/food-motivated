import { loadState, saveState } from '../localStorage/calculatorState';

import {
  UPDATE_OPTIONS,
  UPDATE_BONE_PERCENTAGE,
  UPDATE_OTHER_PERCENTAGE,
  UPDATE_RMB_PERCENT,
  SET_AGE,
  SET_MEAL_TYPE,
} from '../actions/calculator';

import createMappedReducer from './utils/createMappedReducer';
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { percentageDefaults } from '../form/percentageDefaultOptions';
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
const totalDailyAmount = getTotalDailyAmount(weight, maintenance, unitData[initialUnit].perUnit);
const { muscle, bone, other } = percentageDefaults['barf']['adult'];

// TODO, if there is a new property that is not in the loaded state, use initial state instead?
const initialState = loadState() || {
  unitDetails: unitData[initialUnit],
  isAdult: true,
  isPuppy: false,
  mealType: 'barf',
  age: 'adult',
  weight,
  maintenance,
  totalDailyAmount,
  rmbPercent: initialRMB,
  isCustomRmb: false,
  musclePercentage: muscle,
  bonePercentage: bone,
  otherPercentages: other,
  ...getAmounts(totalDailyAmount, bone, initialRMB, other),
  estimatedCalories: getEstimatedCalories(unitData[initialUnit].default1000kCal, totalDailyAmount),
};

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

  const updatedState = {
    ...state,
    rmbPercent: action.rmbPercent,
    isCustomRmb: action.isCustomRmb,
    ...getAmounts(totalDailyAmount, bonePercentage, action.rmbPercent, otherPercentages),
  };

  saveState(updatedState);
  return updatedState;
};

export default createMappedReducer(initialState, {
  [UPDATE_OPTIONS]: updateOptions,
  [UPDATE_BONE_PERCENTAGE]: updateBonePercentage,
  [UPDATE_OTHER_PERCENTAGE]: updateOtherPercentages,
  [UPDATE_RMB_PERCENT]: updateRMB,
  [SET_AGE]: setAge,
  [SET_MEAL_TYPE]: setMealType,
});

import some from 'lodash/some';
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INITIAL STATE
const initialRMB = 44;
const weight = 50;
const maintenance = 2.5;
const initialUnit = 'english';
const totalDailyAmount = getTotalDailyAmount(weight, maintenance, initialUnit.perUnit);
const { muscle, bone, other } = percentageDefaults['barf']['adult'];

export const initialState = loadState() || {
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
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// BasicOptions
const updateOptions = (state, action) => {
  const { otherPercentages, bonePercentage, rmbPercent, unitDetails } = state;
  const { weight, maintenance, unitName } = action;

  const updatedUnitDetails = unitName ? unitData[unitName] : { ...unitDetails };
  const updatedDailyAmount = getTotalDailyAmount(weight, maintenance, updatedUnitDetails.perUnit);

  const updatedState = {
    ...state,
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
const getPresetPercentages = (state, mealType, age) => {
  const { totalDailyAmount, rmbPercent } = state;
  const { muscle, bone, other } = percentageDefaults[mealType][age];

  const updatedState = {
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
    ...getAmounts(totalDailyAmount, bone, rmbPercent, other),
  };
  saveState(updatedState);
  return updatedState;
};

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
  console.log('age', age);

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

const validatePresetAgeSettings = (mealType, bonePercentage, otherPercentages, ) => {
  if (percentageDefaults[mealType]['adult'].bone === bonePercentage) {
    const adultHasMismatch = some(percentageDefaults[mealType]['adult'].other, (value, key) => {
      return otherPercentages[key] !== value;
    });

    if (!adultHasMismatch) {
      return {
        isAdult: true,
        isPuppy: false,
      };
    }
  }

  if (percentageDefaults[mealType]['puppy'].bone === bonePercentage) {
    const puppyHasMismatch = some(percentageDefaults[mealType]['puppy'].other, (value, key) => {
      return otherPercentages[key] !== value; // as soon as you find a mismatch return
    });

    if (!puppyHasMismatch) {
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

export const updateOtherPercentages = (state, { updatedProperty, updatedValue }) => {
  const { totalDailyAmount, otherPercentages, bonePercentage, rmbPercent, mealType } = state;

  const updatedOtherPercentages = {
    ...otherPercentages,
    [updatedProperty]: updatedValue,
  };

  const updatedMusclePercentage = getMusclePercentage(bonePercentage, updatedOtherPercentages);

  const updatedState = {
    ...state,
    ...validatePresetAgeSettings(mealType, bonePercentage, updatedOtherPercentages),
    otherPercentages: updatedOtherPercentages,
    musclePercentage: updatedMusclePercentage,
    ...getAmounts(totalDailyAmount, bonePercentage, rmbPercent, updatedOtherPercentages),
  };

  saveState(updatedState);
  return updatedState;
};

const updateBonePercentage = (state, action) => {
  const { totalDailyAmount, otherPercentages, rmbPercent, mealType } = state;
  const { updatedBonePercentage } = action;
  const updatedMusclePercentage = getMusclePercentage(updatedBonePercentage, otherPercentages);

  const updatedState = {
    ...state,
    ...validatePresetAgeSettings(mealType, updatedBonePercentage, otherPercentages),
    bonePercentage: updatedBonePercentage,
    musclePercentage: updatedMusclePercentage,
    ...getAmounts(totalDailyAmount, updatedBonePercentage, rmbPercent, otherPercentages),
  };

  saveState(updatedState);
  return updatedState;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// RawMeatyBone
const updateRMB = (state, action) => {
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

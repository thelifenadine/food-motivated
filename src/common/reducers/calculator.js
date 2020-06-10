import { 
  UPDATE_OPTIONS,
  UPDATE_BONE_PERCENTAGE,
  UPDATE_OTHER_PERCENTAGE,
  RESET_PERCENTAGE_DEFAULTS,
  UPDATE_RMB_PERCENT,
} from '../actions/calculator';

import createMappedReducer from './utils/createMappedReducer';
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { percentageDefaults } from '../form/ratioDefaultOptions';
import { unitData } from '../form/unitOptions';
import { getMusclePercentage } from '../calculations/getMuscleAmount';
import getAmounts from '../calculations/getAmounts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INITIAL STATE
const initialRMB = 44;
const weight = 68;
const maintenance = 3.0;
const initialUnit = 'english';
const totalDailyAmount = getTotalDailyAmount(weight, maintenance, initialUnit.perUnit);
const { muscle, bone, other } = percentageDefaults['barfAdult'];

export const initialState = {
  unitDetails: unitData[initialUnit],
  weight,
  maintenance,
  totalDailyAmount,
  rmbPercent: initialRMB,
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

  return {
    ...state,
    weight: weight,
    maintenance: maintenance,
    unitDetails: updatedUnitDetails,
    totalDailyAmount: updatedDailyAmount,
    ...getAmounts(updatedDailyAmount, bonePercentage, rmbPercent, otherPercentages),
  };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// PercentageOptions
export const updateOtherPercentages = (state, { updatedProperty, updatedValue }) => {
  const { totalDailyAmount, otherPercentages, bonePercentage, rmbPercent } = state;

  const updatedOtherPercentages = {
    ...otherPercentages,
    [updatedProperty]: updatedValue,
  };

  const updatedMusclePercentage = getMusclePercentage(bonePercentage, updatedOtherPercentages);

  return {
    ...state,
    otherPercentages: updatedOtherPercentages,
    musclePercentage: updatedMusclePercentage,
    ...getAmounts(totalDailyAmount, bonePercentage, rmbPercent, updatedOtherPercentages),
  };
};

const updateBonePercentage = (state, action) => {
  const { totalDailyAmount, otherPercentages, rmbPercent } = state;
  const { updatedBonePercentage } = action;
  const updatedMusclePercentage = getMusclePercentage(updatedBonePercentage, otherPercentages);

  return {
    ...state,
    bonePercentage: updatedBonePercentage,
    musclePercentage: updatedMusclePercentage,
    ...getAmounts(totalDailyAmount, updatedBonePercentage, rmbPercent, otherPercentages),
  };
};

const resetPercentages = (state, action) => {
  const { totalDailyAmount, rmbPercent } = state;
  const { muscle, bone, other } = percentageDefaults[action.defaultsKey];

  return {
    ...state,
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
    ...getAmounts(totalDailyAmount, bone, rmbPercent, other),
  };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// RawMeatyBone
const updateRMB = (state, action) => {
  const { totalDailyAmount, bonePercentage, otherPercentages } = state;

  return {
    ...state,
    rmbPercent: action.rmbPercent,
    ...getAmounts(totalDailyAmount, bonePercentage, action.rmbPercent, otherPercentages),
  };
};

export default createMappedReducer(initialState, {
  [UPDATE_OPTIONS]: updateOptions,
  [UPDATE_BONE_PERCENTAGE]: updateBonePercentage,
  [UPDATE_OTHER_PERCENTAGE]: updateOtherPercentages,
  [RESET_PERCENTAGE_DEFAULTS]: resetPercentages,
  [UPDATE_RMB_PERCENT]: updateRMB,
});
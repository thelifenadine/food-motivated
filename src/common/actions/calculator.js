export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';
export const UPDATE_BONE_PERCENTAGE = 'UPDATE_BONE_PERCENTAGE';
export const UPDATE_OTHER_PERCENTAGE = 'UPDATE_OTHER_PERCENTAGE';
export const RESET_PERCENTAGE_DEFAULTS = 'RESET_PERCENTAGE_DEFAULTS';
export const UPDATE_RMB_PERCENT = 'UPDATE_RMB_PERCENT';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// BasicOptions
export function updateOptions(weight, maintenance, unitName) {
  return {
    type: UPDATE_OPTIONS,
    weight,
    maintenance,
    unitName,
  };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// PercentageOptions
export function updateBonePercentage (updatedBonePercentage)  {
  return {
    type: UPDATE_BONE_PERCENTAGE, 
    updatedBonePercentage,
  };
}
export function updateOtherPercentage(updatedValue, propertyName)  {
  return {
    type: UPDATE_OTHER_PERCENTAGE,
    updatedProperty: propertyName,
    updatedValue,
  };
}
export function resetDefaultPercentages (defaultsKey) {
  return {
    type: RESET_PERCENTAGE_DEFAULTS,
    defaultsKey,
  };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// RawMeatyBone
export function updateRMB(rmbPercent) {
  return {
    type: UPDATE_RMB_PERCENT,
    rmbPercent,
  };
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

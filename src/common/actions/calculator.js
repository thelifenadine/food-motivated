export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';
export const UPDATE_BONE_PERCENTAGE = 'UPDATE_BONE_PERCENTAGE';
export const UPDATE_OTHER_PERCENTAGE = 'UPDATE_OTHER_PERCENTAGE';
export const UPDATE_RMB_PERCENT = 'UPDATE_RMB_PERCENT';
export const UPDATE_CUSTOM_RMB_PERCENT = 'UPDATE_CUSTOM_RMB_PERCENT';
export const SET_MEAL_TYPE = 'SET_MEAL_TYPE';
export const SET_LIFESTAGE_PRESET = 'SET_LIFESTAGE_PRESET';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// BasicOptions
export function updateOptions(weight, maintenance, unitName) {
  return {
    type: UPDATE_OPTIONS,
    weight: Number(weight),
    maintenance: Number(maintenance),
    unitName,
  };
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// PercentageOptions
export function setMealType(updatedMealType) {
  return {
    type: SET_MEAL_TYPE,
    updatedMealType,
  };
}

export function setLifestagePreset(updatedLifestage) {
  return {
    type: SET_LIFESTAGE_PRESET,
    updatedLifestage,
  };
}

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// RawMeatyBone
export function updateRMB(rmbKey, isCustomRmb) {
  return {
    type: UPDATE_RMB_PERCENT,
    rmbKey,
    isCustomRmb,
  };
}

export function updateCustomRMB(rmbPercent) {
  return {
    type: UPDATE_CUSTOM_RMB_PERCENT,
    rmbPercent: +rmbPercent,
  };
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

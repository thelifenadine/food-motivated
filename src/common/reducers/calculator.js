import createMappedReducer from './utils/createMappedReducer';
import getTotalAmount from '../calculations/getTotalAmount';
import { ratioDefaultData } from '../form/ratioDefaultOptions';
import { unitData } from '../form/unitOptions';
import getMuscleAmount from '../calculations/getMuscleAmount';

const initialWeight = 68;
const initialMaintenance = 3.0;
const initialUnit = 'english';
const initialDailyAmount = getTotalAmount(initialWeight, initialMaintenance, initialUnit.perUnit);

const initialState = {
  unitDetails: unitData[initialUnit],
  weight: initialWeight,
  maintenancePercentage: initialMaintenance,
  totalDailyAmount: initialDailyAmount,
  rmbPercent: 44,
  percentages: {
    ...ratioDefaultData['barfAdult'],
  },
  dailyAmounts: {},
  bulkAmounts: {},
};

export default createMappedReducer(initialState, {
  ['UPDATE_PERCENTAGES'](state, action) {
    const updatedPercentages = {
      ...state.percentages,
      [action.updatedProperty]: action.updatedValue,
    };

    const { bone, organ, liver, veggie, fruit, seed } = updatedPercentages;
    const updatedMuscle = getMuscleAmount(100, [bone, liver, organ, veggie, fruit, seed]);

    return {
      ...state,
      percentages: {
        ...updatedPercentages,
        muscle: updatedMuscle,
      },
    };
  },
  ['RESET_PERCENTAGE_DEFAULTS'](state, action) {
    return {
      ...state,
      percentages: ratioDefaultData[action.defaultsKey],
    };
  },
  ['UPDATE_RMB_PERCENT'](state, action) {
    return {
      ...state,
      rmbPercent: action.rmbPercent,
    };
  },
  ['UPDATE_UNIT_DETAILS'](state, action) {
    return {
      ...state,
      unitDetails: unitData[action.key],
    };
  },
  ['UPDATE_DAILY_AMOUNT'](state, action) {
    const { weight, maintenance, perUnit } = action;
    const updatedAmount = getTotalAmount(weight, maintenance, perUnit);

    return {
      ...state,
      totalDailyAmount: updatedAmount,
    };
  },
});
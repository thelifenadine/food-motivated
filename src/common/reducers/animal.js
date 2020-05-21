import createMappedReducer from './utils/createMappedReducer';

const initialState = {
  default: {
    unitOfMeasurement: 'english',
    weight: 68,
    maintenancePercentage: 2.5,
    muscleRatio: 70,
    boneRatio: 10,
    liverRatio: 5,
    organRatio: 5,
    vegetableRatio: 7,
    seedRatio: 2,
    fruitRatio: 1,
    lastRMBRatio: 50,
  }
};

export default createMappedReducer(initialState, {
  ['CREATE_RECIPE'](state) {
    return state;
  },
});
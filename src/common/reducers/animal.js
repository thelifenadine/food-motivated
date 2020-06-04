import createMappedReducer from './utils/createMappedReducer';

const initialState = {
  default: {
    unitOfMeasurement: 'english',
    weight: 68,
    maintenancePercentage: 2.5,
    musclePercentage: 70,
    bonePercentage: 10,
    liverPercentage: 5,
    organPercentage: 5,
    vegetablePercentage: 7,
    seedPercentage: 2,
    fruitPercentage: 1,
    lastRMBPercentage: 50,
  }
};

export default createMappedReducer(initialState, {
  ['ADD_DOG'](state, action) {
    return state;
  },
});
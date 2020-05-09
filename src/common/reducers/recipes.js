import createMappedReducer from './utils/createMappedReducer';

const initialState = {
  list: [],
};

export default createMappedReducer(initialState, {
  ['CREATE_RECIPE'](state) {
    return state;
  },
});
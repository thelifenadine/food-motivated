export const UPDATE_PERCENTAGES = 'UPDATE_PERCENTAGES';

export function updatePercentages() {
  return (dispatch, action) => {
    dispatch({
      type: UPDATE_PERCENTAGES,
      percentages: action.percentages,
    });
  };
}
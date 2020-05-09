export const APP_INIT = 'APP_INIT';

export function appInit() {
  return {
    type: APP_INIT,
  };
}

export function appInitOnce() {
  return (dispatch, getState) => {
    const { app } = getState();
    
    if (!app.isInitialized) {
      dispatch({
        type: APP_INIT,
      });
    } 
  };
}
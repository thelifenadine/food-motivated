export function loadState() {
  try {
    const serializedState = localStorage.getItem('dogfood');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dogfood', serializedState);
  } catch {
    // ignore write errors
  }
}

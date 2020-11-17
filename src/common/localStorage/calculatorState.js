import isStoreValid from './isStoreValid';

export function loadState() {
  try {
    const serializedState = localStorage.getItem('dogfood_v0.1');
    if (serializedState === null) {
      return undefined;
    }

    const json = JSON.parse(serializedState);

    if (isStoreValid(json)) {
      // alternately - instead of doing this, you could find the new items and add to the store
      // or name the store with a version and compare and update the new one
      // what we want to avoid is updating the website and it not being backwards compatible with
      // whatever the person has saved in their local storage
      // we also don't need to save everything in the local state... just the main settings
      return json;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dogfood_v0.1', serializedState);
  } catch {
    // ignore write errors
  }
}

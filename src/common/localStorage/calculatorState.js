import keys from 'lodash/keys';
import { initialState } from '../reducers/calculator';


function isStoreValid(json) {
  let index = 0;
  let isValid = true;

  const properties = keys(initialState);
  while (index < properties.length && isValid) {
    if (typeof json[properties[index]] === 'undefined') {
      isValid = false;
    }

    index++;
  }

  return isValid;
}

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

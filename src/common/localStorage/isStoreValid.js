import keys from 'lodash/keys';
import { getDefaultState } from '../reducers/calculator';
/*
  Goal with this is to have some way to prevent the whole site breaking
  if an update is shipped that includes new items in the store
*/
const isStoreValid = (json) => {
  let index = 0;
  let isValid = true;

  const properties = keys(getDefaultState());
  while (index < properties.length && isValid) {
    if (typeof json[properties[index]] === 'undefined') {
      isValid = false;
    }

    index++;
  }

  return isValid;
};

export default isStoreValid;

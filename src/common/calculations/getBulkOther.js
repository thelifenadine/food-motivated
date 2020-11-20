import mapValues from 'lodash/mapValues';

// loop through the otherAmounts collection and update each value multipled by number of days
const getBulkOther = (otherAmounts, numDays) => mapValues(otherAmounts, value => value * numDays);

export default getBulkOther;

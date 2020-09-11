import proxyquire from 'proxyquire';
import { should } from "chai";
import { unitData } from '../form/unitOptions';
import getAmounts from '../calculations/getAmounts';
import getTotalDailyAmount from '../calculations/getTotalDailyAmount';
import { percentageDefaults } from '../form/percentageDefaultOptions';

should();

describe('reducers/calculator', () => {
  let file;
  // INITIAL STATE
  const initialRMB = 44;
  const weight = 68;
  const maintenance = 3.0;
  const initialUnit = 'english';
  const totalDailyAmount = getTotalDailyAmount(weight, maintenance, initialUnit.perUnit);
  const { muscle, bone, other } = percentageDefaults['barf']['adult'];


  const initialState = {
    unitDetails: unitData[initialUnit],
    isAdult: true,
    isPuppy: false,
    mealType: 'barf',
    age: 'adult',
    weight,
    maintenance,
    totalDailyAmount,
    rmbPercent: initialRMB,
    musclePercentage: muscle,
    bonePercentage: bone,
    otherPercentages: other,
    ...getAmounts(totalDailyAmount, bone, initialRMB, other),
  };

  before(() => {
    file = proxyquire.noCallThru().load('./calculator', {});
  });

  it('should update the muscle and organ percentages but all of the amounts', () => {
    const result = file.updateOtherPercentages(initialState, {
      updatedProperty: 'organ',
      updatedValue: 6,
    });

    result.should.eql({
      ...initialState,
      isAdult: false,
      musclePercentage: 69,
      otherPercentages: {
        ...initialState.otherPercentages,
        organ: 6,
      },
      boneAmount: initialState.boneAmount,
      muscleAmount: 18.36741818181818, // test against spreadsheet values
      otherAmounts: {
        ...initialState.otherAmounts,
        organ: 1.9584,
      },
    });
  });
});

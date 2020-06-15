import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('reducers/calculator', () => {
  let file;

  before(() => {
    file = proxyquire.noCallThru().load('./calculator', {});
  });

  it('should update the muscle and organ percentages but all of the amounts', () => {
    const { initialState, updateOtherPercentages } = file; 

    const result = updateOtherPercentages(initialState, {
      updatedProperty: 'organ',
      updatedValue: 6,
    });

    result.should.eql({
      ...initialState,
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

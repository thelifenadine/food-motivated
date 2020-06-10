import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getBoneAmount(amount, bonePercentage, boneType)', () => {
  let instance;

  before(() => {
    instance = proxyquire.noCallThru().load('./calculator', {});
  });

  it('should update the muscle and organ while the rest stays the same', () => {
    const { initialState, updateOtherPercentage } = instance; 

    const result = updateOtherPercentage(initialState, {
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
      dailyMuscle: 22.5216,
      dailyOther: {
        ...initialState.dailyOther,
        organ: 1.9584,
      },
    });
  });
});

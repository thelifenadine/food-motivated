import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getAmounts(totalDailyAmount, bonePercentage, rmbPercent, otherPercentages)', () => {
  let setupStubs;
  let getAmounts;
  const getMuscleAmountStub = sinon.stub();
  const getBoneAmountStub = sinon.stub();
  const getAmountsByPercentsStub = sinon.stub();
  
  before(() => {
    getAmounts = proxyquire.noCallThru().load('./getAmounts', {
      './getMuscleAmount': getMuscleAmountStub,
      './getBoneAmount': getBoneAmountStub,
      './getAmountsByPercents': getAmountsByPercentsStub,
    }).default;

    setupStubs = (muscleAmount, boneAmount, otherAmounts ) => {
      getMuscleAmountStub.returns(muscleAmount);
      getBoneAmountStub.returns(boneAmount);
      getAmountsByPercentsStub.returns(otherAmounts);
    };
  });

  describe('test function calls and return values', () => {
    let result;

    before(() => {
      setupStubs(21, 5.3, { fruit: 2 } );
      result = getAmounts(32, 10, 60, { other: 'stuff' });
    });

    it('should return an object with the associated amounts', () => {
      result.should.eql({
        otherAmounts: { fruit: 2 },
        boneAmount: 5.3,
        muscleAmount: 21,
      });
    });

    it('getMuscleAmount should be invoked with the correct args', () => {
      sinon.assert.calledWith(getMuscleAmountStub, 32, 5.3, { fruit: 2 });
    });

    it('getBoneAmount should be invoked with the correct args', () => {
      sinon.assert.calledWith(getBoneAmountStub, 32, 10, 60);
    });

    it('getAmountsByPercents should be invoked with the correct args', () => {
      sinon.assert.calledWith(getAmountsByPercentsStub, 32, { other: 'stuff' });
    });
  });
});

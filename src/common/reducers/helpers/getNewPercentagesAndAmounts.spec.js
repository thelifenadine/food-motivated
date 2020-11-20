import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();


describe('getNewPercentagesAndAmounts(state, mealType, lifestage)', () => {
  let getNewPercentagesAndAmounts;

  const getPresetPercentagesStub = sinon.stub();
  const getAmountsStub = sinon.stub();

  before(() => {
    getNewPercentagesAndAmounts = proxyquire.noCallThru()
      .load('./getNewPercentagesAndAmounts', {
        './getPresetPercentages': getPresetPercentagesStub,
        '../../calculations/getAmounts': getAmountsStub,
      }).default;
  });

  describe('test case 1: barf, adult', () => {
    let result;

    const samplePercentages = {
      new: 'percentages',
    };

    const sampleAmounts = {
      huge: 'amounts',
      more: 'things',
    };

    const store = {
      totalDailyAmount: 32,
      rmbPercent: 50,
    };

    before(() => {
      getPresetPercentagesStub.returns(samplePercentages);
      getAmountsStub.returns(sampleAmounts);
      result = getNewPercentagesAndAmounts(store, 'barf', 'adult');
    });

    after(() => {
      getPresetPercentagesStub.reset();
      getAmountsStub.reset();
    });

    it('should invoke getPresetPercentages w/ mealtype & lifestage', () => {
      sinon.assert.calledWith(getPresetPercentagesStub, 'barf', 'adult');
    });

    it('should invoke getAmounts w/ totalAmount, rmbPercent, updatedPercentages', () => {
      sinon.assert.calledWith(getAmountsStub, 32, 50, samplePercentages);
    });

    it('should return the amounts and percentages', () => {
      result.should.eql({
        ...samplePercentages,
        ...sampleAmounts,
      });
    });
  });

  describe('test case 2: pmr, puppy', () => {
    let result;

    const samplePercentages = {
      cool: 'percentages',
    };
    const sampleAmounts = {
      one: 'two',
      skip: 'a few',
    };

    const store = {
      totalDailyAmount: 20,
      rmbPercent: 46,
    };

    before(() => {
      getPresetPercentagesStub.returns(samplePercentages);
      getAmountsStub.returns(sampleAmounts);
      result = getNewPercentagesAndAmounts(store, 'pmr', 'puppy');
    });

    after(() => {
      getPresetPercentagesStub.reset();
      getAmountsStub.reset();
    });

    it('should invoke getPresetPercentages w/ mealtype & lifestage', () => {
      sinon.assert.calledWith(getPresetPercentagesStub, 'pmr', 'puppy');
    });

    it('should invoke getAmounts w/ totalAmount, rmbPercent, updatedPercentages', () => {
      sinon.assert.calledWith(getAmountsStub, 20, 46, samplePercentages);
    });

    it('should return the amounts and percentages', () => {
      result.should.eql({
        ...samplePercentages,
        ...sampleAmounts,
      });
    });
  });
});

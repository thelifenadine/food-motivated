import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { should } from "chai";
import { unitData } from '../constants/unitOptions';

should();

describe('reducers/calculator', () => {
  let file;

  const getTotalDailyAmountStub = sinon.stub();
  const getAmountsStub = sinon.stub();
  const getMusclePercentageStub = sinon.stub();
  const getLifestageByPercentagesStub = sinon.stub();
  const getPercentagesAndAmountsStub = sinon.stub();

  const getEssentialNutrientAmountsStub = sinon.stub();

  getEssentialNutrientAmountsStub.returns([{
    name: 'ALA',
    amount: 110,
    unit: 'mg',
  }]);

  const getEstimatedCaloriesStub = sinon.stub();

  const englishBarfState = {
    unitDetails: unitData['english'],
    mealType: 'barf',
    weight: 68,
    maintenance: 3.0,
    totalDailyAmount: 32.6,
    rmbPercent: 44,
    musclePercentage: 70,
    bonePercentage: 10,
    otherPercentages: {
      fruit: 1,
      liver: 5,
      organ: 5,
      seed: 2,
      veggie: 7,
    },
    muscleAmount: 18.7,
    boneAmount: 7.4,
    otherAmounts: {
      fruit: 0.3,
      liver: 1.6,
      organ: 1.6,
      seed: 0.7,
      veggie: 2.9,
    },
    essentialNutrients: [{
      name: 'ALA',
      amount: 110,
      unit: 'mg',
    }],
  };

  before(() => {
    file = proxyquire.noCallThru().load('./calculator', {
      '../localStorage/calculatorState': {
        loadState: () => {}, // TODO: add tests
        saveState: () => {}, // TODO: add tests
      },
      '../calculations/getTotalDailyAmount': getTotalDailyAmountStub,
      '../calculations/getAmounts': getAmountsStub,
      '../calculations/getMuscleAmount': {
        getMusclePercentage: getMusclePercentageStub,
      },
      './helpers/getLifestageByPercentages': getLifestageByPercentagesStub,
      './helpers/getPercentagesAndAmounts': getPercentagesAndAmountsStub,
      '../calculations/getEstimatedCalories': getEstimatedCaloriesStub,
      '../calculations/getEssentialNutrientAmounts': getEssentialNutrientAmountsStub,
    });
  });

  // TODO: test getDefaultState and getInitialState

  describe('UPDATE_OPTIONS : updateOptions()', () => {
    describe('when the unitDetails is updated', () => {
      let result;
      const dailyAmount = 2040;
      const testWeight = 50;
      const testMaint = 2.5;
      const { bonePercentage, rmbPercent, otherPercentages } = englishBarfState;

      before(() => {
        getEstimatedCaloriesStub.returns(1700);
        getTotalDailyAmountStub.returns(dailyAmount);
        getAmountsStub.returns({
          muscleAmount: 18,
          boneAmount: 7,
          otherAmounts: {
            liver: 1.1,
            organ: 1.1,
            veggie: 3.0,
            fruit: 1.1,
            seed: 1.4,
          }
        });
        result = file.updateOptions(englishBarfState, {
          unitName: 'metric', // or english
          weight: 50,
          maintenance: 2.5,
        });
      });

      after(() => {
        getTotalDailyAmountStub.reset();
        getAmountsStub.reset();
      });

      it('should invoke getTotalDailyAmount with correct args', () => {
        sinon.assert
          .calledWith(getTotalDailyAmountStub, testWeight, testMaint, 1000);
      });

      it('should invoke getAmounts', () => {
        sinon.assert
          .calledWith(getAmountsStub, dailyAmount, rmbPercent, { bonePercentage, otherPercentages });
      });

      it('should update the basic options and the amounts', () => {
        result.should.eql({
          ...englishBarfState,
          unitDetails: {
            name: 'metric',
            lg: 'kg',
            sm: 'g',
            perUnit: 1000,
            default1000kCal: 538,
          },
          estimatedCalories: 1700,
          weight: testWeight,
          maintenance: testMaint,
          totalDailyAmount: dailyAmount,
          muscleAmount: 18,
          boneAmount: 7,
          otherAmounts: {
            liver: 1.1,
            organ: 1.1,
            veggie: 3.0,
            fruit: 1.1,
            seed: 1.4,
          },
        });
      });
    });
  });

  describe('UPDATE_BONE_PERCENTAGE : updateBonePercentage()', () => {
    describe('when the updatedBonePercentage is updated', () => {
      let result;
      const testMusclePerc = 68;
      const testNewBonePerc = 33;

      const { totalDailyAmount, otherPercentages, rmbPercent, mealType } = englishBarfState;

      before(() => {
        getMusclePercentageStub.returns(testMusclePerc);
        getAmountsStub.returns({
          muscleAmount: 15,
          boneAmount: 9,
          otherAmounts: {
            liver: 1.3,
            organ: 1.3,
            veggie: 2.9,
            fruit: 0.9,
            seed: 0.8,
          }
        });
        getLifestageByPercentagesStub.returns(undefined);
        result = file.updateBonePercentage(englishBarfState, {
          updatedBonePercentage: testNewBonePerc,
        });
      });

      after(() => {
        getMusclePercentageStub.reset();
        getAmountsStub.reset();
        getLifestageByPercentagesStub.reset();
      });

      it('should invoke getMusclePercentage with correct args', () => {
        sinon.assert
          .calledWith(getMusclePercentageStub, testNewBonePerc, otherPercentages);
      });

      it('should invoke getAmounts with correct args', () => {
        sinon.assert
          .calledWith(getAmountsStub, totalDailyAmount, rmbPercent, { bonePercentage: testNewBonePerc, otherPercentages });
      });

      it('should invoke getLifestageByPercentages with correct args', () => {
        sinon.assert
          .calledWith(getLifestageByPercentagesStub, mealType, testNewBonePerc, otherPercentages);
      });

      it('should update the percentages and amounts', () => {
        result.should.eql({
          ...englishBarfState,
          musclePercentage: testMusclePerc,
          bonePercentage: testNewBonePerc,
          muscleAmount: 15,
          boneAmount: 9,
          otherAmounts: {
            liver: 1.3,
            organ: 1.3,
            veggie: 2.9,
            fruit: 0.9,
            seed: 0.8,
          },
          lifestagePreset: undefined,
        });
      });
    });
  });

  describe('UPDATE_OTHER_PERCENTAGE : updateOtherPercentages()', () => {
    describe('when the updatedBonePercentage is updated', () => {
      let result;
      const testMusclePerc = 50;

      const {
        totalDailyAmount, otherPercentages, bonePercentage, rmbPercent, mealType,
      } = englishBarfState;

      before(() => {
        getMusclePercentageStub.returns(testMusclePerc);
        getAmountsStub.returns({
          muscleAmount: 20,
          boneAmount: 6,
          otherAmounts: {
            liver: 2.0,
            organ: 2.1,
            veggie: 3.0,
            fruit: 5.9,
            seed: 9,
          },
        });
        getLifestageByPercentagesStub.returns('puppy');
        result = file.updateOtherPercentages(englishBarfState, {
          updatedProperty: 'liver',
          updatedValue: 10,
        });
      });

      after(() => {
        getMusclePercentageStub.reset();
        getAmountsStub.reset();
        getLifestageByPercentagesStub.reset();
      });

      it('should invoke getMusclePercentage with correct args', () => {
        sinon.assert
          .calledWith(getMusclePercentageStub, bonePercentage, {
            ...otherPercentages,
            liver: 10,
          });
      });

      it('should invoke getAmounts with correct args', () => {
        sinon.assert
          .calledWith(getAmountsStub, totalDailyAmount, rmbPercent, {
            bonePercentage,
            otherPercentages: {
              ...otherPercentages,
              liver: 10,
            }
          });
      });

      it('should invoke getLifestageByPercentages with correct args', () => {
        sinon.assert
          .calledWith(getLifestageByPercentagesStub, mealType, bonePercentage, {
            ...otherPercentages,
            liver: 10,
          });
      });

      it('should update the percentages and amounts', () => {
        result.should.eql({
          ...englishBarfState,
          musclePercentage: testMusclePerc,
          bonePercentage: bonePercentage,
          otherPercentages: {
            ...englishBarfState.otherPercentages,
            liver: 10,
          },
          muscleAmount: 20,
          boneAmount: 6,
          otherAmounts: {
            liver: 2.0,
            organ: 2.1,
            veggie: 3.0,
            fruit: 5.9,
            seed: 9,
          },
          lifestagePreset: 'puppy',
        });
      });
    });
  });

  describe('UPDATE_RMB_PERCENT : updateRMB()', () => {
    describe('when the raw meaty bone percentage is updated', () => {
      let result;
      const testRMB = 75;
      const testKeyRMB = 'rabbit-heads';

      const { totalDailyAmount, bonePercentage, otherPercentages } = englishBarfState;

      before(() => {
        getAmountsStub.returns({
          muscleAmount: 70,
          boneAmount: 15,
          otherAmounts: {
            liver: 4.0,
            organ: 5,
            veggie: 2,
            fruit: 1.1,
            seed: 0.9,
          },
        });

        result = file.updateRMB(englishBarfState, {
          rmbKey: testKeyRMB,
          isCustomRmb: false,
        });
      });

      after(() => {
        getAmountsStub.reset();
      });

      it('should invoke getAmounts with correct args', () => {
        sinon.assert
          .calledWith(getAmountsStub, totalDailyAmount, testRMB, { bonePercentage, otherPercentages });
      });

      it('should update the rmbPercent, isCustom, and amounts', () => {
        result.should.eql({
          ...englishBarfState,
          rmbKey: testKeyRMB,
          rmbPercent: testRMB,
          isCustomRmb: false,
          muscleAmount: 70,
          boneAmount: 15,
          otherAmounts: {
            liver: 4.0,
            organ: 5,
            veggie: 2,
            fruit: 1.1,
            seed: 0.9,
          },
        });
      });
    });
  }); // updateRmb

  describe('SET_LIFESTAGE_PRESET : setLifestagePreset()', () => {
    describe('when the age is adult', () => {
      let result;
      const testAge = 'adult';

      const { mealType } = englishBarfState;

      before(() => {
        getPercentagesAndAmountsStub.returns({
          whatever: 'it does',
        });

        result = file.setLifestagePreset(englishBarfState, {
          updatedLifestage: testAge,
        });
      });

      after(() => {
        getPercentagesAndAmountsStub.reset();
      });

      it('should invoke getPercentagesAndAmounts with correct args', () => {
        sinon.assert
          .calledWith(getPercentagesAndAmountsStub, englishBarfState, mealType, testAge);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          lifestagePreset: testAge,
          whatever: 'it does',
        });
      });
    });

    describe('when the age is puppy', () => {
      let result;
      const testAge = 'puppy';

      const { mealType } = englishBarfState;

      before(() => {
        getPercentagesAndAmountsStub.returns({
          whatever: 'it does not',
        });

        result = file.setLifestagePreset(englishBarfState, {
          updatedLifestage: testAge,
        });
      });

      after(() => {
        getPercentagesAndAmountsStub.reset();
      });

      it('should invoke getPercentagesAndAmounts with correct args', () => {
        sinon.assert
          .calledWith(getPercentagesAndAmountsStub, englishBarfState, mealType, testAge);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          lifestagePreset: 'puppy',
          whatever: 'it does not',
        });
      });
    });
  }); // setLifestagePreset

  describe('SET_LIFESTAGE_PRESET : setLifestagePreset()', () => {
    describe('when the mealtype is barf', () => {
      let result;
      const testMealType = 'barf';
      const { lifestagePreset } = englishBarfState;

      before(() => {
        getPercentagesAndAmountsStub.returns({
          whatever: 'something interesting',
        });

        result = file.setMealType(englishBarfState, {
          updatedMealType: testMealType,
        });
      });

      after(() => {
        getPercentagesAndAmountsStub.reset();
      });

      it('should invoke getPercentagesAndAmounts with correct args', () => {
        sinon.assert
          .calledWith(getPercentagesAndAmountsStub, englishBarfState, testMealType, lifestagePreset);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          mealType: testMealType,
          whatever: 'something interesting',
        });
      });
    });

    describe('when the mealType is pmr', () => {
      let result;
      const { lifestagePreset } = englishBarfState;
      const testMealType = 'pmr';

      before(() => {
        getPercentagesAndAmountsStub.returns({
          whatever: 'you want',
        });

        result = file.setMealType(englishBarfState, {
          updatedMealType: testMealType,
        });
      });

      after(() => {
        getPercentagesAndAmountsStub.reset();
      });

      it('should invoke getPercentagesAndAmounts with correct args', () => {
        sinon.assert
          .calledWith(getPercentagesAndAmountsStub, englishBarfState, testMealType, lifestagePreset);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          mealType: testMealType,
          whatever: 'you want',
        });
      });
    });
  }); // setLifestagePreset
}); // end main describe

import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { should } from "chai";
import { unitData } from '../form/unitOptions';

should();

describe('reducers/calculator', () => {
  let file;

  const getTotalDailyAmountStub = sinon.stub();
  const getAmountsStub = sinon.stub();
  const getMusclePercentageStub = sinon.stub();
  const getButtonStatusesStub = sinon.stub();
  const getPresetPercentagesStub = sinon.stub();

  const englishBarfState = {
    unitDetails: unitData['english'],
    isAdult: true,
    isPuppy: false,
    mealType: 'barf',
    age: 'adult',
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
      '../calculations/getButtonStatuses': getButtonStatusesStub,
      '../calculations/getPresetPercentages': getPresetPercentagesStub,
    });
  });

  describe('UPDATE_OPTIONS : updateOptions()', () => {
    describe('when the unitDetails is updated', () => {
      let result;
      const dailyAmount = 2040;
      const testWeight = 50;
      const testMaint = 2.5;
      const { bonePercentage, rmbPercent, otherPercentages } = englishBarfState;

      before(() => {
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
          .calledWith(getAmountsStub, dailyAmount, bonePercentage, rmbPercent, otherPercentages);
      });

      it('should update the basic options and the amounts', () => {
        result.should.eql({
          ...englishBarfState,
          unitDetails: {
            name: 'metric',
            lg: 'kg',
            sm: 'g',
            perUnit: 1000,
            default1000kCal: 510,
          },
          estimatedCalories: 4000,
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
        getButtonStatusesStub.returns({
          isAdult: false,
          isPuppy: false,
        });
        result = file.updateBonePercentage(englishBarfState, {
          updatedBonePercentage: testNewBonePerc,
        });
      });

      after(() => {
        getMusclePercentageStub.reset();
        getAmountsStub.reset();
        getButtonStatusesStub.reset();
      });

      it('should invoke getMusclePercentage with correct args', () => {
        sinon.assert
          .calledWith(getMusclePercentageStub, testNewBonePerc, otherPercentages);
      });

      it('should invoke getAmounts with correct args', () => {
        sinon.assert
          .calledWith(getAmountsStub, totalDailyAmount, testNewBonePerc, rmbPercent, otherPercentages);
      });

      it('should invoke getButtonStatuses with correct args', () => {
        sinon.assert
          .calledWith(getButtonStatusesStub, mealType, testNewBonePerc, otherPercentages);
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
          isAdult: false,
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
        getButtonStatusesStub.returns({
          isAdult: false,
          isPuppy: true,
        });
        result = file.updateOtherPercentages(englishBarfState, {
          updatedProperty: 'liver',
          updatedValue: 10,
        });
      });

      after(() => {
        getMusclePercentageStub.reset();
        getAmountsStub.reset();
        getButtonStatusesStub.reset();
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
          .calledWith(getAmountsStub, totalDailyAmount, bonePercentage, rmbPercent, {
            ...otherPercentages,
            liver: 10,
          });
      });

      it('should invoke getButtonStatuses with correct args', () => {
        sinon.assert
          .calledWith(getButtonStatusesStub, mealType, bonePercentage, {
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
          isAdult: false,
          isPuppy: true,
        });
      });
    });
  });

  describe('UPDATE_RMB_PERCENT : updateRMB()', () => {
    describe('when the raw meaty bone percentage is updated', () => {
      let result;
      const testRMB = 61;

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
          rmbPercent: testRMB,
          isCustomRmb: false,
        });
      });

      after(() => {
        getAmountsStub.reset();
      });

      it('should invoke getAmounts with correct args', () => {
        sinon.assert
          .calledWith(getAmountsStub, totalDailyAmount, bonePercentage, testRMB, otherPercentages);
      });

      it('should update the rmbPercent, isCustom, and amounts', () => {
        result.should.eql({
          ...englishBarfState,
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

  describe('SET_AGE : setAge()', () => {
    describe('when the age is adult', () => {
      let result;
      const testAge = 'adult';

      const { mealType } = englishBarfState;

      before(() => {
        getPresetPercentagesStub.returns({
          whatever: 'it does',
        });

        result = file.setAge(englishBarfState, {
          isPuppy: false,
          isAdult: true,
        });
      });

      after(() => {
        getPresetPercentagesStub.reset();
      });

      it('should invoke getPresetPercentages with correct args', () => {
        sinon.assert
          .calledWith(getPresetPercentagesStub, englishBarfState, mealType, testAge);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          isPuppy: false,
          isAdult: true,
          age: 'adult',
          whatever: 'it does',
        });
      });
    });

    describe('when the age is puppy', () => {
      let result;
      const testAge = 'puppy';

      const { mealType } = englishBarfState;

      before(() => {
        getPresetPercentagesStub.returns({
          whatever: 'it does not',
        });

        result = file.setAge(englishBarfState, {
          isPuppy: true,
          isAdult: false,
        });
      });

      after(() => {
        getPresetPercentagesStub.reset();
      });

      it('should invoke getPresetPercentages with correct args', () => {
        sinon.assert
          .calledWith(getPresetPercentagesStub, englishBarfState, mealType, testAge);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          isPuppy: true,
          isAdult: false,
          age: 'puppy',
          whatever: 'it does not',
        });
      });
    });
  }); // setAge

  describe('SET_AGE : setAge()', () => {
    describe('when the mealtype is barf', () => {
      let result;
      const testMealType = 'barf';
      const { age } = englishBarfState;

      before(() => {
        getPresetPercentagesStub.returns({
          whatever: 'something interesting',
        });

        result = file.setMealType(englishBarfState, {
          mealType: testMealType,
        });
      });

      after(() => {
        getPresetPercentagesStub.reset();
      });

      it('should invoke getPresetPercentages with correct args', () => {
        sinon.assert
          .calledWith(getPresetPercentagesStub, englishBarfState, testMealType, age);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          isPuppy: false,
          isAdult: true,
          mealType: testMealType,
          whatever: 'something interesting',
        });
      });
    });

    describe('when the mealType is pmr', () => {
      let result;
      const { age } = englishBarfState;
      const testMealType = 'pmr';

      before(() => {
        getPresetPercentagesStub.returns({
          whatever: 'you want',
        });

        result = file.setMealType(englishBarfState, {
          mealType: testMealType,
        });
      });

      after(() => {
        getPresetPercentagesStub.reset();
      });

      it('should invoke getPresetPercentages with correct args', () => {
        sinon.assert
          .calledWith(getPresetPercentagesStub, englishBarfState, testMealType, age);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...englishBarfState,
          isPuppy: false,
          isAdult: true,
          mealType: testMealType,
          whatever: 'you want',
        });
      });
    });
  }); // setAge
}); // end main describe

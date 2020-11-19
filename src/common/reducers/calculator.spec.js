import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { should } from "chai";
import { unitData } from '../constants/unitOptions';
import presetMealPercentages from '../constants/presetMealPercentages';
import { rmbLookup } from '../constants/rawMeatyBoneOptions';

should();

describe('reducers/calculator', () => {
  let file;

  const getTotalDailyAmountStub = sinon.stub();
  const getAmountsStub = sinon.stub();
  const getMusclePercentageStub = sinon.stub();
  const getLifestageByPercentagesStub = sinon.stub();
  const getNewPercentagesAndAmtsStub = sinon.stub();
  const getEssentialNutrientsStub = sinon.stub();
  const getEstimatedCaloriesStub = sinon.stub();

  const sampleState = {
    unitDetails: unitData['english'],
    mealType: 'barf',
    weight: 68,
    maintenance: 3.0,
    totalDailyAmount: 32.6,
    lifestagePreset: 'adult',
    lastSavedLifestage: 'adult',
    rmbPercent: 44,
    musclePercentage: 70,
    bonePercentage: 10,
    otherPercentages: { fruit: 1, liver: 5, organ: 5, seed: 2, veggie: 7 },
    muscleAmount: 18.7,
    boneAmount: 7.4,
    otherAmounts: { fruit: 0.3, liver: 1.6, organ: 1.6, seed: 0.7, veggie: 2.9 },
    essentialNutrients: [
      { name: 'ALA', adult: 110, puppy: 115, unit: 'mg' },
      { name: 'Manganese', adult: 2, puppy: 2, unit: 'mg' },
    ],
  };

  before(() => {
    file = proxyquire.noCallThru().load('./calculator', {
      '../localStorage/calculatorState': {
        loadState: () => {}, // TODO: add tests
        saveState: () => {}, // TODO: add tests
      },
      '../calculations/getTotalDailyAmount': getTotalDailyAmountStub,
      '../calculations/getAmounts': getAmountsStub,
      '../calculations/getEstimatedCalories': getEstimatedCaloriesStub,
      '../calculations/getEssentialNutrients': getEssentialNutrientsStub,
      '../calculations/getMuscleAmount': {
        getMusclePercentage: getMusclePercentageStub,
      },
      './helpers/getLifestageByPercentages': getLifestageByPercentagesStub,
      './helpers/getNewPercentagesAndAmounts': getNewPercentagesAndAmtsStub,
    });
  });

  describe('getDefaultState()', () => {
    let result;
    const { bone, muscle, other } = presetMealPercentages['barf']['adult'];

    before(() => {
      getTotalDailyAmountStub.returns(21);
      getEstimatedCaloriesStub.returns(1290);
      getEssentialNutrientsStub.returns([
        { name: 'rando', adult: 11, unit: 'mcg' },
        { name: 'v. important nutrient', adult: 1001, unit: 'mg' },
      ]);
      getAmountsStub.returns({
        muscleAmount: 60,
        boneAmount: 20,
        otherAmounts: { liver: 13, organ: 1.9, veggie: 4, fruit: 0.2, seed: 2.7 },
      });
      result = file.getDefaultState();
    });

    after(() => {
      getTotalDailyAmountStub.reset();
      getEstimatedCaloriesStub.reset();
      getEssentialNutrientsStub.reset();
      getAmountsStub.reset();
    });

    it('should return the default state object', () => {
      result.should.eql({
        unitDetails: unitData['english'],
        mealType: 'barf',
        lifestagePreset: 'adult',
        lastSavedLifestage: 'adult',
        weight: 50,
        maintenance: 2.5,
        totalDailyAmount: 21,
        rmbPercent: 44,
        rmbKey: rmbLookup['chicken-back'],
        isCustomRmb: false,
        musclePercentage: muscle,
        bonePercentage: bone,
        otherPercentages: other,
        estimatedCalories: 1290,
        essentialNutrients: [
          { name: 'rando', adult: 11, unit: 'mcg' },
          { name: 'v. important nutrient', adult: 1001, unit: 'mg' },
        ],
        muscleAmount: 60,
        boneAmount: 20,
        otherAmounts: { liver: 13, organ: 1.9, veggie: 4, fruit: 0.2, seed: 2.7 },
      });
    });

    describe('should invoke the following functions', () => {
      it('should invoke getTotalDailyAmount with weight, maintenance, perUnit', () => {
        sinon.assert.calledWith(getTotalDailyAmountStub, 50, 2.5, 16);
      });

      it('should invoke getEstimatedCalories with per1000kCal, totalDailyAmount', () => {
        sinon.assert.calledWith(getEstimatedCaloriesStub, 19, 21);
      });

      it('should invoke getEssentialNutrientAmounts with estimatedCalories', () => {
        sinon.assert.calledWith(getEssentialNutrientsStub, 1290);
      });

      it('should invoke getAmounts with totalDailyAmount, rmbPercent, percentages', () => {
        sinon.assert.calledWith(getAmountsStub, 21, 44, {
          bonePercentage: bone, otherPercentages: other,
        });
      });
    });
  });

  describe('UPDATE_OPTIONS : updateOptions()', () => {
    let result;
    const dailyAmount = 2040;
    const { bonePercentage, rmbPercent, otherPercentages } = sampleState;

    before(() => {
      getEssentialNutrientsStub.returns([
        { name: 'ALA', puppy: 190, unit: 'mg' },
        { name: 'Manganese', puppy: 4, unit: 'mg' },
      ]);
      getEstimatedCaloriesStub.returns(1700);
      getTotalDailyAmountStub.returns(2040);
      getAmountsStub.returns({
        muscleAmount: 18,
        boneAmount: 7,
        otherAmounts: { liver: 1.1, organ: 1.1, veggie: 3.0, fruit: 1.1, seed: 1.4 }
      });
      result = file.updateOptions(sampleState, {
        unitName: 'metric', // or english
        weight: 51,
        maintenance: 2.7,
      });
    });

    after(() => {
      getEssentialNutrientsStub.reset();
      getTotalDailyAmountStub.reset();
      getAmountsStub.reset();
    });

    it('should update the basic options and the amounts', () => {
      result.should.eql({
        ...sampleState,
        unitDetails: unitData['metric'],
        estimatedCalories: 1700,
        weight: 51,
        maintenance: 2.7,
        totalDailyAmount: dailyAmount,
        muscleAmount: 18,
        boneAmount: 7,
        otherAmounts: { liver: 1.1, organ: 1.1, veggie: 3.0, fruit: 1.1, seed: 1.4 },
        essentialNutrients: [
          { name: 'ALA', puppy: 190, unit: 'mg' },
          { name: 'Manganese', puppy: 4, unit: 'mg' },
        ],
      });
    });

    describe('should invoke the following functions', () => {
      it('should invoke getEstimatedCalories with per1000kCal, totalDailyAmount', () => {
        sinon.assert.calledWith(getEstimatedCaloriesStub, 538, 2040);
      });

      it('should invoke getEssentialNutrientAmounts with estimatedCalories', () => {
        sinon.assert.calledWith(getEssentialNutrientsStub, 1700);
      });


      it('should invoke getTotalDailyAmount with weight, main, perUnit', () => {
        sinon.assert.calledWith(getTotalDailyAmountStub, 51, 2.7, 1000);
      });

      it('should invoke getAmounts with totalDailyAmount, rmbPercent, percentages', () => {
        sinon.assert.calledWith(getAmountsStub, dailyAmount, rmbPercent, {
          bonePercentage, otherPercentages,
        });
      });
    });
  });

  describe('UPDATE_BONE_PERCENTAGE : updateBonePercentage()', () => {
    let result;
    const { totalDailyAmount, otherPercentages, rmbPercent, mealType } = sampleState;

    before(() => {
      getLifestageByPercentagesStub.returns(undefined);
      getMusclePercentageStub.returns(68);
      getAmountsStub.returns({
        muscleAmount: 15,
        boneAmount: 9,
        otherAmounts: { liver: 1.3, organ: 1.3, veggie: 2.9, fruit: 0.9, seed: 0.8 },
      });

      result = file.updateBonePercentage(sampleState, { updatedBonePercentage: 33 });
    });

    after(() => {
      getMusclePercentageStub.reset();
      getAmountsStub.reset();
      getLifestageByPercentagesStub.reset();
    });

    it('should update the percentages and amounts', () => {
      result.should.eql({
        ...sampleState,
        musclePercentage: 68,
        bonePercentage: 33,
        muscleAmount: 15,
        boneAmount: 9,
        otherAmounts: { liver: 1.3, organ: 1.3, veggie: 2.9, fruit: 0.9, seed: 0.8 },
        lifestagePreset: undefined,
        lastSavedLifestage: 'adult',
      });
    });

    describe('should invoke the following functions', () => {
      it('should invoke getMusclePercentage with bonePercentage, otherPercentages', () => {
        sinon.assert.calledWith(getMusclePercentageStub, 33, otherPercentages);
      });

      it('should invoke getAmounts with totalDailyAmount, rmbPercent, percentages', () => {
        sinon.assert.calledWith(getAmountsStub, totalDailyAmount, rmbPercent, {
          bonePercentage: 33,
          otherPercentages,
        });
      });

      it('should invoke getLifestageByPercentages with mealType, bonePercentage, otherPerc', () => {
        sinon.assert.calledWith(getLifestageByPercentagesStub, mealType, 33, otherPercentages);
      });
    });
  });

  describe('UPDATE_OTHER_PERCENTAGE : updateOtherPercentages()', () => {
    let result;
    const {
      totalDailyAmount, otherPercentages, bonePercentage, rmbPercent, mealType,
    } = sampleState;

    before(() => {
      getMusclePercentageStub.returns(50);
      getAmountsStub.returns({
        muscleAmount: 20,
        boneAmount: 6,
        otherAmounts: { liver: 2.0, organ: 2.1, veggie: 3.0, fruit: 5.9, seed: 9 },
      });
      getLifestageByPercentagesStub.returns('puppy');
      result = file.updateOtherPercentages(sampleState, {
        updatedProperty: 'liver',
        updatedValue: 10,
      });
    });

    after(() => {
      getMusclePercentageStub.reset();
      getAmountsStub.reset();
      getLifestageByPercentagesStub.reset();
    });

    it('should update the percentages and amounts', () => {
      result.should.eql({
        ...sampleState,
        musclePercentage: 50,
        bonePercentage: bonePercentage,
        otherPercentages: {
          ...sampleState.otherPercentages,
          liver: 10,
        },
        muscleAmount: 20,
        boneAmount: 6,
        otherAmounts: { liver: 2.0, organ: 2.1, veggie: 3.0, fruit: 5.9, seed: 9 },
        lifestagePreset: 'puppy',
        lastSavedLifestage: 'puppy',
      });
    });

    describe('should invoke the following functions', () => {
      it('should invoke getMusclePercentage with bonePercentage, otherPercentages', () => {
        sinon.assert.calledWith(getMusclePercentageStub, bonePercentage, {
          ...otherPercentages,
          liver: 10,
        });
      });

      it('should invoke getAmounts with totalDailyAmount, rmbPercent, percentages', () => {
        sinon.assert.calledWith(getAmountsStub, totalDailyAmount, rmbPercent, {
          bonePercentage,
          otherPercentages: {
            ...otherPercentages,
            liver: 10,
          },
        });
      });

      it('should invoke getLifestageByPercentages with mealtype, bonePerc, otherPerc', () => {
        sinon.assert.calledWith(getLifestageByPercentagesStub, mealType, bonePercentage, {
          ...otherPercentages,
          liver: 10,
        });
      });
    });
  });

  describe('UPDATE_RMB_PERCENT : updateRMB()', () => {
    let result;
    const { totalDailyAmount, bonePercentage, otherPercentages } = sampleState;

    before(() => {
      getAmountsStub.returns({
        muscleAmount: 70,
        boneAmount: 15,
        otherAmounts: { liver: 4.0, organ: 5, veggie: 2, fruit: 1.1, seed: 0.9 },
      });

      result = file.updateRMB(sampleState, { rmbKey: 'rabbit-heads', isCustomRmb: false });
    });

    after(() => {
      getAmountsStub.reset();
    });

    it('should invoke getAmounts with totalDailyAmount, rmbPercent, percentages', () => {
      sinon.assert
        .calledWith(getAmountsStub, totalDailyAmount, 75, { bonePercentage, otherPercentages });
    });

    it('should update the rmbPercent, isCustom, and amounts', () => {
      result.should.eql({
        ...sampleState,
        rmbKey: 'rabbit-heads',
        rmbPercent: 75,
        isCustomRmb: false,
        muscleAmount: 70,
        boneAmount: 15,
        otherAmounts: { liver: 4.0, organ: 5, veggie: 2, fruit: 1.1, seed: 0.9 },
      });
    });
  }); // updateRmb

  describe('SET_LIFESTAGE_PRESET : setLifestagePreset()', () => {
    describe('when the age is adult', () => {
      let result;
      const { mealType } = sampleState;

      before(() => {
        getNewPercentagesAndAmtsStub.returns({ whatever: 'it does' });
        result = file.setLifestagePreset(sampleState, { updatedLifestage: 'adult' });
      });

      after(() => {
        getNewPercentagesAndAmtsStub.reset();
      });

      it('should invoke getNewPercentagesAndAmounts with state, mealType, lifestage', () => {
        sinon.assert.calledWith(getNewPercentagesAndAmtsStub, sampleState, mealType, 'adult');
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...sampleState,
          lifestagePreset: 'adult',
          lastSavedLifestage: 'adult',
          whatever: 'it does',
        });
      });
    });

    describe('when the age is puppy', () => {
      let result;
      const { mealType } = sampleState;

      before(() => {
        getNewPercentagesAndAmtsStub.returns({ whatever: 'it does not' });
        result = file.setLifestagePreset(sampleState, { updatedLifestage: 'puppy' });
      });

      after(() => {
        getNewPercentagesAndAmtsStub.reset();
      });

      it('should invoke getNewPercentagesAndAmounts with state, mealType, lifestage', () => {
        sinon.assert.calledWith(getNewPercentagesAndAmtsStub, sampleState, mealType);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...sampleState,
          lifestagePreset: 'puppy',
          lastSavedLifestage: 'puppy',
          whatever: 'it does not',
        });
      });
    });
  }); // setLifestagePreset

  describe('SET_MEAL_TYPE : setMealType()', () => {
    describe('when the mealtype is barf', () => {
      let result;
      const { lifestagePreset } = sampleState;

      before(() => {
        getNewPercentagesAndAmtsStub.returns({ whatever: 'something interesting' });
        result = file.setMealType(sampleState, { updatedMealType: 'barf' });
      });

      after(() => {
        getNewPercentagesAndAmtsStub.reset();
      });

      it('should invoke getNewPercentagesAndAmounts with state, mealType, lifestage', () => {
        sinon.assert
          .calledWith(getNewPercentagesAndAmtsStub, sampleState, 'barf', lifestagePreset);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...sampleState,
          mealType: 'barf',
          whatever: 'something interesting',
        });
      });
    });

    describe('when the mealType is pmr', () => {
      let result;
      const { lifestagePreset } = sampleState;

      before(() => {
        getNewPercentagesAndAmtsStub.returns({ whatever: 'you want' });
        result = file.setMealType(sampleState, { updatedMealType: 'pmr' });
      });

      after(() => {
        getNewPercentagesAndAmtsStub.reset();
      });

      it('should invoke getNewPercentagesAndAmounts with state, mealType, lifestage', () => {
        sinon.assert
          .calledWith(getNewPercentagesAndAmtsStub, sampleState, 'pmr', lifestagePreset);
      });

      it('should update the age and PresetPercentages', () => {
        result.should.eql({
          ...sampleState,
          mealType: 'pmr',
          whatever: 'you want',
        });
      });
    });
  }); // setMealType
}); // end main describe

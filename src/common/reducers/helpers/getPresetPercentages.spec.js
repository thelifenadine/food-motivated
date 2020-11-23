import { should } from "chai";
should();

import getPresetPercentages from "./getPresetPercentages";
/*
  This test really only needed to test that the function mapped
  the muscle, bone, and other properties to their new names, but
  it was an easy way to also test the presetMealPercentages file
*/
describe('getPresetPercentages(mealType, lifestagePreset)', () => {
  it('when arguments match the `barf` adult recipe', () => {
    getPresetPercentages('barf', 'adult')
      .should.eql({
        musclePercentage: 70,
        bonePercentage: 10,
        otherPercentages: {
          liver: 5,
          organ: 5,
          veggie: 7,
          seed: 2,
          fruit: 1,
        },
      });
  });

  it('when arguments match the `barf` puppy recipe', () => {
    getPresetPercentages('barf', 'puppy')
      .should.eql({
        musclePercentage: 58,
        bonePercentage: 17,
        otherPercentages: {
          liver: 7,
          organ: 7,
          veggie: 7,
          seed: 3,
          fruit: 1,
        },
      });
  });

  it('when arguments match the `barf-traditional` adult recipe', () => {
    getPresetPercentages('barf-traditional', 'adult')
      .should.eql({
        musclePercentage: 70,
        bonePercentage: 10,
        otherPercentages: {
          liver: 5,
          organ: 5,
          veggie: 10,
        },
      });
  });

  it('when arguments match the `barf-traditional` puppy recipe', () => {
    getPresetPercentages('barf-traditional', 'puppy')
      .should.eql({
        musclePercentage: 58,
        bonePercentage: 17,
        otherPercentages: {
          liver: 7,
          organ: 7,
          veggie: 10,
        },
      });
  });

  it('when arguments match the `pmr` adult recipe', () => {
    getPresetPercentages('pmr', 'adult')
      .should.eql({
        musclePercentage: 78,
        bonePercentage: 10,
        otherPercentages: {
          liver: 5,
          organ: 5,
          fibre: 2,
        },
      });
  });

  it('when arguments match the `pmr` puppy recipe', () => {
    getPresetPercentages('pmr', 'puppy')
      .should.eql({
        musclePercentage: 67,
        bonePercentage: 17,
        otherPercentages: {
          liver: 7,
          organ: 7,
          fibre: 2,
        },
      });
  });

  it('when arguments match the `pmr-traditional` adult recipe', () => {
    getPresetPercentages('pmr-traditional', 'adult')
      .should.eql({
        musclePercentage: 80,
        bonePercentage: 10,
        otherPercentages: {
          liver: 5,
          organ: 5,
        },
      });
  });

  it('when arguments match the `pmr-traditional` puppy recipe', () => {
    getPresetPercentages('pmr-traditional', 'puppy')
      .should.eql({
        musclePercentage: 69,
        bonePercentage: 17,
        otherPercentages: {
          liver: 7,
          organ: 7,
        },
      });
  });
});

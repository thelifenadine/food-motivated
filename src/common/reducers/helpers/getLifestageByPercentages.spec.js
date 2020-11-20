import { should } from "chai";
should();

import getLifestageByPercentages from "./getLifestageByPercentages";

describe('getLifestageByPercentages(mealType, bonePercentage, otherPercentages)', () => {
  describe('should return adult ', () => {
    it('when arguments match the `barf-traditional` adult recipe', () => {
      getLifestageByPercentages('barf-traditional', 10, {
        liver: 5,
        organ: 5,
        veggie: 10,
      }).should.equal('adult');
    });

    it('when arguments match `barf` adult recipe', () => {
      getLifestageByPercentages('barf', 10, {
        liver: 5,
        organ: 5,
        veggie: 7,
        seed: 2,
        fruit: 1,
      }).should.equal('adult');
    });

    it('when arguments match `pmr` adult recipe', () => {
      getLifestageByPercentages('pmr', 10, {
        liver: 5,
        organ: 5,
        fibre: 2,
      }).should.equal('adult');
    });

    it('when arguments match `pmr-traditional` adult recipe', () => {
      getLifestageByPercentages('pmr-traditional', 10, {
        liver: 5,
        organ: 5,
      }).should.equal('adult');
    });
  });

  describe('should return puppy ', () => {
    it('when arguments match the `barf-traditional` puppy recipe', () => {
      getLifestageByPercentages('barf-traditional', 17, {
        liver: 7,
        organ: 7,
        veggie: 10,
      }).should.equal('puppy');
    });

    it('when arguments match `barf` puppy recipe', () => {
      getLifestageByPercentages('barf', 17, {
        liver: 7,
        organ: 7,
        veggie: 7,
        seed: 3,
        fruit: 1,
      }).should.equal('puppy');
    });

    it('when arguments match `pmr` puppy recipe', () => {
      getLifestageByPercentages('pmr', 17, {
        liver: 7,
        organ: 7,
        fibre: 2,
      }).should.equal('puppy');
    });

    it('when arguments match `pmr-traditional` puppy recipe', () => {
      getLifestageByPercentages('pmr-traditional', 17, {
        liver: 7,
        organ: 7,
      }).should.equal('puppy');
    });
  });

  describe('should return undefined ', () => {
    it('when arguments match anything else', () => {
      const result = getLifestageByPercentages('barf-traditional', 17, {
        liver: 7,
        organ: 8,
        veggie: 10,
      });

      should(result).equal(undefined);
    });

    it('when arguments match anything else', () => {
      const result = getLifestageByPercentages('barf', 11, {
        liver: 4,
        organ: 5,
        veggie: 7,
        seed: 2,
        fruit: 1,
      });

      should(result).equal(undefined);
    });

    it('when arguments match anything else', () => {
      const result = getLifestageByPercentages('pmr', 10, {
        liver: 5,
        organ: 50,
        fibre: 2,
      });

      should(result).equal(undefined);
    });

    it('when arguments match anything else', () => {
      const result = getLifestageByPercentages('pmr-traditional', 17, {
        liver: 7,
        organ: 1,
      });

      should(result).equal(undefined);
    });
  });

});

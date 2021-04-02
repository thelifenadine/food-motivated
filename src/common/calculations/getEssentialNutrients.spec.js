import proxyquire from 'proxyquire';
import { should } from "chai";
import { essentialNutrients } from '../constants/essentialNutrients';

should();

describe('getEssentialNutrients(estimatedCalories)', () => {
  let getEssentialNutrients;

  before(() => {
    getEssentialNutrients = proxyquire.noCallThru()
      .load('./getEssentialNutrients', {})
      .default;
  });

  it('should calculate correctly 1000kcal', () => {
    getEssentialNutrients(1000).should.eql(essentialNutrients);
  });

  it('should double the nutrient amounts', () => {
    getEssentialNutrients(2000).should.eql({
      ala: {
        name: 'ALA',
        adult: 110 * 2,
        puppy: 200 * 2,
        unit: 'mg',
      },
      'epa-plus-dha': {
        name: 'EPA + DHA',
        adult: 110 * 2,
        puppy: 130 * 2,
        unit: 'mg',
      },
      iodine: {
        name: 'Iodine',
        min: {
          adult: 175 * 2,
        },
        adult: 220 * 2,
        puppy: 220 * 2,
        unit: 'mcg',
      },
      manganese: {
        name: 'Manganese',
        adult: 1.2 * 2,
        puppy: 1.4 * 2,
        unit: 'mg',
      },
      vitaminD: {
        name: 'Vitamin D',
        adult: 3.4 * 2,
        puppy: 3.4 * 2,
        unit: 'mcg',
      },
      vitaminE: {
        name: 'Vitamin E',
        adult: 7.5 * 2,
        puppy: 7.5 * 2,
        unit: 'mg',
      },
      zinc: {
        name: 'Zinc',
        adult: 15 * 2,
        puppy: 25 * 2,
        unit: 'mg',
      },
    });
  });

  it('should calculate correctly 1050kcal', () => {
    getEssentialNutrients(1050).should.eql({
      ala: {
        name: 'ALA',
        adult: 115.5,
        puppy: 210,
        unit: 'mg',
      },
      'epa-plus-dha': {
        name: 'EPA + DHA',
        adult: 115.5,
        puppy: 136.5,
        unit: 'mg',
      },
      iodine: {
        name: 'Iodine',
        min: {
          adult: 183.75,
        },
        adult: 231,
        puppy: 231,
        unit: 'mcg',
      },
      manganese: {
        name: 'Manganese',
        adult: 1.26,
        puppy: 1.47,
        unit: 'mg',
      },
      vitaminD: {
        name: 'Vitamin D',
        adult: 3.57,
        puppy: 3.57,
        unit: 'mcg',
      },
      vitaminE: {
        name: 'Vitamin E',
        adult: 7.875,
        puppy: 7.875,
        unit: 'mg',
      },
      zinc: {
        name: 'Zinc',
        adult: 15.75,
        puppy: 26.25,
        unit: 'mg',
      },
    });
  });

  it('should calculate correctly 1050kcal', () => {
    getEssentialNutrients(1718).should.eql({
      ala: {
        name: 'ALA',
        adult: 188.98,
        puppy: 343.6,
        unit: 'mg',
      },
      'epa-plus-dha': {
        name: 'EPA + DHA',
        adult: 188.98,
        puppy: 223.34,
        unit: 'mg',
      },
      iodine: {
        name: 'Iodine',
        min: {
          adult: 300.65,
        },
        adult: 377.96,
        puppy: 377.96,
        unit: 'mcg',
      },
      manganese: {
        name: 'Manganese',
        adult: 2.0616,
        puppy: 2.4052,
        unit: 'mg',
      },
      vitaminD: {
        name: 'Vitamin D',
        adult: 5.8412,
        puppy: 5.8412,
        unit: 'mcg',
      },
      vitaminE: {
        name: 'Vitamin E',
        adult: 12.885,
        puppy: 12.885,
        unit: 'mg',
      },
      zinc: {
        name: 'Zinc',
        adult: 25.77,
        puppy: 42.95,
        unit: 'mg',
      },
    });
  });
});

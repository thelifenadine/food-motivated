export default [
  { name: 'BARF Adult', value: 'barfAdult', key: 'barf-adult' },
  { name: 'BARF Puppy', value: 'barfPuppy', key: 'barf-puppy' },
  { name: 'PMR Adult', value: 'pmrAdult', key: 'pmr-adult' },
  { name: 'PMR Puppy', value: 'pmrPuppy', key: 'pmr-puppy' },
];

export const percentageDefaults = {
  barfAdult: {
    muscle: 70,
    bone: 10,
    other: {
      liver: 5,
      organ: 5,
      veggie: 7,
      seed: 2,
      fruit: 1,
    }
  },
  barfPuppy: {
    muscle: 58,
    bone: 17,
    other: {
      liver: 7,
      organ: 7,
      veggie: 7,
      seed: 2,
      fruit: 1,
    },
  },
  pmrAdult: {
    muscle: 80,
    bone: 10,
    other: {
      liver: 5,
      organ: 5,
    },
  },
  pmrPuppy: {
    muscle: 69,
    bone: 17,
    other: {
      liver: 7,
      organ: 7,
      fibre: 1,
    },
  },
};


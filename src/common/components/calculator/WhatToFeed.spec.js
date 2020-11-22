import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const MockAmountsTable = sinon.stub().returns(<div />);
const MockBulkTable = sinon.stub().returns(<div />);
const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);

const MockButton = sinon.stub().returns(<div />);
const MockTextField = sinon.stub().returns(<div />);
const MockInputAdornment = sinon.stub().returns(<div />);

const useStylesStub = sinon.stub();
useStylesStub.returns({
  numericLarge: {
    margin: 1,
    width: 110,
  },
});

const useSelectorStub = sinon.stub();

describe('components/calculator/WhatToFeed', () => {
  /*
    To Test
    - each component is rendered with correct props, values, styles
    - prop changes
    - state
    - effects
  */

  let WhatToFeed;
  before(() => {
    WhatToFeed = proxyquire.noCallThru().load('./WhatToFeed', {
      './AmountsTable': MockAmountsTable,
      './BulkTable': MockBulkTable,
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
      '@material-ui/core': {
        makeStyles: () => useStylesStub,
        Button: MockButton,
        TextField: MockTextField,
        InputAdornment: MockInputAdornment,
      },
      'react-redux': {
        useSelector: useSelectorStub,
        shallowEqual: sinon.stub(),
      },
    }).default;
  });

  describe('expected behavior', () => {
    let mainComponent;

    before(() => {
      useSelectorStub.returns({
        totalDailyAmount: 30,
        unitDetails: { my: 'unit' },
        boneAmount: 10,
        muscleAmount: 50,
        otherAmounts: { fruit: 4, liver: 7 },
        rmbPercent: 33,
        essentialNutrients: {},
        lastSavedLifestage: 'puppy',
      });

      mainComponent = shallow(<WhatToFeed />);
    });

    it('the BulkTable should NOT be rendered', () => {
      expect(mainComponent.find(MockBulkTable)).to.have.lengthOf(0);
    });

    it('Section should be rendered', () => {
      expect(mainComponent.find(MockSection)).to.have.lengthOf(1);
    });

    it('Header2 should be rendered with title', () => {
      let component = mainComponent.find(MockHeader2);
      expect(component).to.have.lengthOf(1);
      expect(component.props().children).to.eql('Bulk Helper');
    });

    describe('the TextField component', () => {
      let component;
      let props;

      before(() => {
        component = mainComponent.find(MockTextField);
        props = component.props();
      });

      it('should be rendered with correct props & values', () => {
        expect(component).to.have.lengthOf(1);
        expect(props.className).to.eql({ margin: 1, width: 110 });
        expect(props.helperText).to.eql('minimum of 2 days');
        expect(props.label).to.eql('How long');
        expect(props.value).to.eql(7); // numDays from state
        expect(props.InputProps.endAdornment.props.children).to.eql('days');
        expect(props.InputProps.endAdornment.props.position).to.eql('end');
        // TODO onChange
      });
    });

    it('Button should be rendered with correct props & values', () => {
      let component = mainComponent.find(MockButton);
      let props = component.props();
      expect(component).to.have.lengthOf(1);
      expect(props.size).to.eql('small');
      expect(props.variant).to.eql('outlined');
      expect(props.color).to.eql('secondary');
      expect(props.children).to.eql('Generate');
      // TODO onClick
    });

    describe('the AmountsTable component', () => {
      let amountsTableComponent;
      let amountProps;

      before(() => {
        amountsTableComponent = mainComponent.find(MockAmountsTable);
        amountProps = amountsTableComponent.props();
      });

      it('the AmountsTable should be rendered', () => {
        expect(amountsTableComponent).to.have.lengthOf(1);
      });

      it('the title should include numDays', () => {
        amountProps.title.should.eql('What to feed each day');
      });

      it('the totalDailyAmount should be multiplied by numDays', () => {
        amountProps.totalDailyAmount.should.eql(30);
      });

      it('the muscleAmount should be multiplied by numDays', () => {
        amountProps.muscleAmount.should.eql(50);
      });

      it('the boneAmount should be multiplied by numDays', () => {
        amountProps.boneAmount.should.eql(10);
      });

      it('the otherAmounts should be multiplied by numDays', () => {
        amountProps.otherAmounts.should
          .eql({ fruit: 4, liver: 7 });
      });

      it('the unitDetails should be passed as is', () => {
        amountProps.unitDetails.should
          .eql({ my: 'unit' });
      });

      it('the rmbPercent should be passed as is', () => {
        amountProps.rmbPercent.should.eql(33);
      });
    });

    // TODO when state changes
    // describe('the BulkTable component', () => {
    //   let bulkTableComponent;
    //   let bulkProps;

    //   before(() => {
    //     // can't call setState on a functional component
    //     // need an alternate way to test
    //     mainComponent.setState('shouldShowBulkTable', true);
    //     bulkTableComponent = mainComponent.find(MockBulkTable);
    //     bulkProps = bulkTableComponent.props();
    //   });

    //   it('the BulkTable should be rendered', () => {
    //     expect(bulkTableComponent).to.have.lengthOf(1);
    //   });

    //   it('the title should include numDays', () => {
    //     bulkProps.title.should.eql('What to feed each day');
    //   });

    //   it('the totalDailyAmount should be multiplied by numDays', () => {
    //     bulkProps.totalDailyAmount.should.eql(30);
    //   });

    //   it('the muscleAmount should be multiplied by numDays', () => {
    //     bulkProps.muscleAmount.should.eql(50);
    //   });

    //   it('the boneAmount should be multiplied by numDays', () => {
    //     bulkProps.boneAmount.should.eql(10);
    //   });

    //   it('the otherAmounts should be multiplied by numDays', () => {
    //     bulkProps.otherAmounts.should
    //       .eql({ fruit: 4, liver: 7 });
    //   });

    //   it('the unitDetails should be passed as is', () => {
    //     bulkProps.unitDetails.should
    //       .eql({ my: 'unit' });
    //   });

    //   it('the rmbPercent should be passed as is', () => {
    //     bulkProps.rmbPercent.should.eql(33);
    //   });
    // });
  });
});

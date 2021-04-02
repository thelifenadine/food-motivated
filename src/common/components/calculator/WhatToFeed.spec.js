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
const translateStub = sinon.stub();

describe('components/calculator/WhatToFeed', () => {
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

      mainComponent = shallow(<WhatToFeed />)
        .renderProp('children')({ translate: translateStub });
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
        // expect(props.helperText).to.eql('minimum of 2 days');
        // expect(props.label).to.eql('How long');
        expect(props.value).to.eql(7); // numDays from state
        // expect(props.InputProps.endAdornment.props.children).to.eql('days');
        // expect(props.InputProps.endAdornment.props.position).to.eql('end');
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
     //  expect(props.children).to.eql('Generate');
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

      // it('with the title prop', () => {
      //   amountProps.title.should.eql('What to feed each day');
      // });

      it('with the totalDailyAmount prop', () => {
        amountProps.totalDailyAmount.should.eql(30);
      });

      it('with the muscleAmount prop', () => {
        amountProps.muscleAmount.should.eql(50);
      });

      it('with the boneAmount prop', () => {
        amountProps.boneAmount.should.eql(10);
      });

      it('with the otherAmounts prop', () => {
        amountProps.otherAmounts.should
          .eql({ fruit: 4, liver: 7 });
      });

      it('with the unitDetails prop', () => {
        amountProps.unitDetails.should
          .eql({ my: 'unit' });
      });

      it('with the rmbPercent prop', () => {
        amountProps.rmbPercent.should.eql(33);
      });

      it('with the essentialNutrients prop', () => {
        amountProps.essentialNutrients.should.eql({});
      });

      it('with the lastSavedLifestage prop', () => {
        amountProps.lastSavedLifestage.should.eql('puppy');
      });
    });

    describe('the BulkTable component should show when button is clicked', () => {
      let bulkTableComponent;
      let bulkProps;

      before(() => {
        mainComponent.find({ 'data-testid': 'showBulkTableButton' }).simulate('click');
        bulkTableComponent = mainComponent.find(MockBulkTable);
        //bulkProps = bulkTableComponent.props();
      });

      it('the mainc component should be rendered', () => {
        expect(bulkTableComponent).to.have.lengthOf(1);
      });

      // it('with the totalDailyAmount prop', () => {
      //   bulkProps.totalDailyAmount.should.eql(30);
      // });

      // it('with the muscleAmount prop', () => {
      //   bulkProps.muscleAmount.should.eql(50);
      // });

      // it('with the boneAmount prop', () => {
      //   bulkProps.boneAmount.should.eql(10);
      // });

      // it('with the otherAmounts prop', () => {
      //   bulkProps.otherAmounts.should
      //     .eql({ fruit: 4, liver: 7 });
      // });

      // it('with the unitDetails prop', () => {
      //   bulkProps.unitDetails.should
      //     .eql({ my: 'unit' });
      // });

      // it('with the rmbPercent prop', () => {
      //   bulkProps.rmbPercent.should.eql(33);
      // });

      // it('with the numDays prop as a number', () => {
      //   bulkProps.numDays.should.eql(7);
      // });

      // it('with the essentialNutrients prop', () => {
      //   bulkProps.essentialNutrients.should.eql({});
      // });

      // it('with the lastSavedLifestage prop', () => {
      //   bulkProps.lastSavedLifestage.should.eql('puppy');
      // });
    });
  });
});

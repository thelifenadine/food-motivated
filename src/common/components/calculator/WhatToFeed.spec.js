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
        expect(props.value).to.eql(7); // numDays from state
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
      // TODO onClick
    });

    describe('the AmountsTable component', () => {
      let amountsTableComponent;

      before(() => {
        amountsTableComponent = mainComponent.find(MockAmountsTable);
      });

      it('the AmountsTable should be rendered', () => {
        expect(amountsTableComponent).to.have.lengthOf(1);
      });
    });

    // broken after adding translations
    // describe('the BulkTable component should show when button is clicked', () => {
    //   let bulkTableComponent;

    //   before(() => {
    //     mainComponent.find({ 'data-testid': 'showBulkTableButton' }).simulate('click');
    //     mainComponent.update();
    //     bulkTableComponent = mainComponent.find(MockBulkTable);
    //   });

    //   it('the bulkTable component should be rendered', () => {
    //     expect(bulkTableComponent).to.have.lengthOf(1);
    //   });
    // });
  });
});

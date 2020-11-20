import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const MockAmountsTable = sinon.stub().returns(<div />);

describe('components/calculator/BulkTable', () => {
  let BulkTable;
  before(() => {
    BulkTable = proxyquire.noCallThru().load('./BulkTable', {
      './AmountsTable': MockAmountsTable,
    }).default;
  });

  describe('when the component is rendered', () => {
    let myComponent;
    let amountsTableComponent;
    let amountProps;

    const props = {
      totalDailyAmount: 32,
      muscleAmount: 15,
      boneAmount: 11,
      rmbPercent: 60,
      otherAmounts: {
        fruit: 1.5,
        liver: 3.0,
        organ: 2.0,
        seed: 1,
        veggie: 2.5,
      },
      unitDetails: { a: 'detail' },
      numDays: 3,
      essentialNutrients: {},
      lastSavedLifestage: 'adult',
    };

    before(() => {
      myComponent = shallow(<BulkTable {...props} />);
      amountsTableComponent = myComponent.find(MockAmountsTable);
      amountProps = amountsTableComponent.props();
    });

    it('the AmountsTable should be rendered', () => {
      expect(amountsTableComponent).to.have.lengthOf(1);
    });

    it('the title should include numDays', () => {
      amountProps.title.should.eql('Bulk Amounts for 3 days');
    });

    it('the totalDailyAmount should be multiplied by numDays', () => {
      amountProps.totalDailyAmount.should.eql(96);
    });

    it('the muscleAmount should be multiplied by numDays', () => {
      amountProps.muscleAmount.should.eql(45);
    });

    it('the boneAmount should be multiplied by numDays', () => {
      amountProps.boneAmount.should.eql(33);
    });

    it('the otherAmounts should be multiplied by numDays', () => {
      amountProps.otherAmounts.should
        .eql({ fruit: 4.5, liver: 9, organ: 6, seed: 3, veggie: 7.5 });
    });

    it('the unitDetails should be passed as is', () => {
      amountProps.unitDetails.should
        .eql({ a: 'detail' });
    });

    it('the rmbPercent should be passed as is', () => {
      amountProps.rmbPercent.should.eql(60);
    });
  });
});

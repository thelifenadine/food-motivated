import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);
const MockTable = sinon.stub().returns(<div />);
const MockTableBody = sinon.stub().returns(<div />);
const MockTableRow = sinon.stub().returns(<div />);
const MockTableCell = sinon.stub().returns(<div />);
const MockTranslate = sinon.stub().returns(<div />);
import { unitData } from '../../constants/unitOptions';

describe('components/calculator/AmountsTable', () => {
  let AmountsTable;
  const useStylesStub = sinon.stub();
  useStylesStub.returns({
    firstRow: {
      fontWeight: 600,
    },
    table: {
      margin: 1,
      '& > tbody tr td': {
        borderBottom: '1px solid #eee',
        paddingLeft: 0,
        paddingRight: 1,
        paddingBottom: 0.5,
        paddingTop: 0.5,
      },
    },
    capitalize: {
      textTransform: 'capitalize',
    },
  });

  before(() => {
    AmountsTable = proxyquire.noCallThru().load('./AmountsTable', {
      '@material-ui/core': {
        makeStyles: () => useStylesStub,
        Table: MockTable,
        TableBody: MockTableBody,
        TableRow: MockTableRow,
        TableCell: MockTableCell,
      },
      'react-localize-redux': {
        Translate: MockTranslate,
      },
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
    }).default;
  });

  describe('when the component is rendered', () => {
    let myComponent;

    const props = {
      totalDailyAmount: 32,
      muscleAmount: 15,
      boneAmount: 11,
      rmbPercent: 60,
      otherAmounts: {
        fruit: 1.5,
        liver: 3.0,
      },
      unitDetails: unitData['english'],
      title: 'some title',
      lastSavedLifestage: 'adult',
      essentialNutrients: {
        ala: {
          name: 'ALA',
          adult: 110,
          puppy: 200,
          unit: 'mg',
        },
        'epa-plus-dha': {
          name: 'EPA + DHA',
          adult: 111,
          puppy: 130,
          unit: 'mg',
        },
      },
    };

    before(() => {
      myComponent = shallow(<AmountsTable {...props} />);
    });

    it('the Section component should be rendered', () => {
      expect(myComponent.find(MockSection)).to.have.lengthOf(1);
    });

    it('the Table component should be rendered', () => {
      expect(myComponent.find(MockTable)).to.have.lengthOf(1);
    });

    it('the TableBody component should be rendered', () => {
      expect(myComponent.find(MockTableBody)).to.have.lengthOf(1);
    });

    it('the TableCell should be rendered 2x for every TableRow', () => {
      expect(myComponent.find(MockTableCell)).to.have
        .lengthOf(myComponent.find(MockTableRow).length * 2);
    });

    describe('Translate', () => {
      let translateComponent;

      before(() => {
        translateComponent = myComponent.find(MockTranslate);
      });

      it('Translate should be rendered', () => {
        expect(translateComponent).to.have.lengthOf(1);
      });
    });

    describe('Header2', () => {
      let header2;

      before(() => {
        header2 = myComponent.find(MockHeader2);
      });

      it('the Header2 should be rendered', () => {
        expect(header2).to.have.lengthOf(1);
      });

      it('the Header2 should contain the title prop as its child', () => {
        header2.props().children.should.eql('some title');
      });
    });

    describe('amounts should populate as expected', () => {
      it('total amount', () => {
        myComponent.find({ 'data-testid': 'totalAmount' }).props().children
          .should.eql('2 lb / 32 oz');
      });

      it('total amount label', () => {
        myComponent.find({ 'data-testid': 'totalAmountLabel' }).props().children
          .should.eql('Total Amount');
      });

      it('muscle amount', () => {
        myComponent.find({ 'data-testid': 'muscleAmount' }).props().children
          .should.eql('15 oz');
      });

      it('muscle amount label', () => {
        myComponent.find({ 'data-testid': 'muscleAmountLabel' }).props().children
          .should.eql('Boneless Meat');
      });

      it('bone amount', () => {
        myComponent.find({ 'data-testid': 'boneAmount' }).props().children
          .should.eql('11 oz');
      });

      it('bone amount label', () => {
        myComponent.find({ 'data-testid': 'boneAmountLabel' }).props().children
          .should.eql([ 'Raw Meaty Bone at ', 60, '%' ]);
      });

      it('other amounts 1', () => {
        myComponent.find({ 'data-testid': 'fruitAmount' }).props().children
          .should.eql('1.5 oz');
      });

      it('other amounts label 1', () => {
        myComponent.find({ 'data-testid': 'fruitAmountLabel' }).props().children
          .should.eql('fruit');
      });

      it('other amounts 2', () => {
        myComponent.find({ 'data-testid': 'liverAmount' }).props().children
          .should.eql('3 oz');
      });

      it('other amounts label 2', () => {
        myComponent.find({ 'data-testid': 'liverAmountLabel' }).props().children
          .should.eql('liver');
      });

      it('essential nutrient amounts 1', () => {
        myComponent.find({ 'data-testid': 'alaAmount' }).props().children
          .should.eql('110 mg');
      });

      it('essential nutrient amounts label 1', () => {
        myComponent.find({ 'data-testid': 'alaLabel' }).props().children
          .should.eql('ALA');
      });

      it('essential nutrient amounts 2', () => {
        myComponent.find({ 'data-testid': 'epa-plus-dhaAmount' }).props().children
          .should.eql('111 mg');
      });

      it('essential nutrient amounts label 2', () => {
        myComponent.find({ 'data-testid': 'epa-plus-dhaLabel' }).props().children
          .should.eql('EPA + DHA');
      });
    });

    describe('when props change', () => {
      before(() => {
        myComponent.setProps({
          title: 'new title',
          lastSavedLifestage: 'puppy'
        });
        myComponent.update();
      });

      it('the Header2 should update', () => {
        myComponent.find(MockHeader2).props().children.should.eql('new title');
      });

      it('essential nutrient amounts 1 should update to puppy value', () => {
        myComponent.find({ 'data-testid': 'alaAmount' }).props().children
          .should.eql('200 mg');
      });

      it('essential nutrient amounts 2 should update to puppy value', () => {
        myComponent.find({ 'data-testid': 'epa-plus-dhaAmount' }).props().children
          .should.eql('130 mg');
      });
    });
  });
});

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
      unitDetails: { a: 'detail' },
      title: 'some title',
      lastSavedLifestage: 'adult',
      essentialNutrients: {
        ala: {
          name: 'ALA',
          adult: 110,
          puppy: 200,
          unit: 'mg',
        },
        epa_dha: {
          name: 'EPA + DHA',
          adult: 110,
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

    describe('Header2', () => {
      let header2;

      before(() => {
        header2 = myComponent.find(MockHeader2);
      });

      it('the Header2 should be rendered', () => {
        expect(header2).to.have.lengthOf(1);
      });

      // TODO: find out why this test is slow
      it('the Header2 should contain the title prop as its child', () => {
        header2.props().children.should.eql('some title');
      });
    });

    // TODO:
    /*
      test that each row renders the correct content
        - each amount with correct units, etc

      test that the otherAmounts are all mapped

      test that the essentialNutrients are all mapped and updated correctly

      test what happens when the props change
    */

  });
});

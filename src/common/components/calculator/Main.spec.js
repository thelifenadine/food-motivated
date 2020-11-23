import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);
const MockGrid = sinon.stub().returns(<div />);

const MockContact = sinon.stub().returns(<div />);
const MockPercentageOptions = sinon.stub().returns(<div />);
const MockBasicOptions = sinon.stub().returns(<div />);
const MockRawMeatyBone = sinon.stub().returns(<div />);
const MockWhatToFeed = sinon.stub().returns(<div />);

describe('components/calculator/Main', () => {
  let Main;

  before(() => {
    Main = proxyquire.noCallThru().load('./Main', {
      '@material-ui/core': {
        Grid: MockGrid,
      },
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
      '../footer/Contact': MockContact,
      './WhatToFeed': MockWhatToFeed,
      './RawMeatyBone': MockRawMeatyBone,
      './BasicOptions': MockBasicOptions,
      './PercentageOptions': MockPercentageOptions,
    }).default;
  });

  describe('when the component is rendered', () => {
    let myComponent;

    before(() => {
      myComponent = shallow(<Main />);
    });

    it('the Grid component should be rendered 3 times', () => {
      expect(myComponent.find(MockGrid)).to.have.lengthOf(3);
    });

    it('the Section component should be rendered', () => {
      expect(myComponent.find(MockSection)).to.have.lengthOf(1);
    });

    it('the Contact component should be rendered', () => {
      expect(myComponent.find(MockContact)).to.have.lengthOf(1);
    });

    it('the BasicOptions component should be rendered', () => {
      expect(myComponent.find(MockBasicOptions)).to.have.lengthOf(1);
    });

    it('the PercentageOptions component should be rendered', () => {
      expect(myComponent.find(MockPercentageOptions)).to.have.lengthOf(1);
    });

    it('the RawMeatyBone component should be rendered', () => {
      expect(myComponent.find(MockRawMeatyBone)).to.have.lengthOf(1);
    });

    it('the WhatToFeed component should be rendered', () => {
      expect(myComponent.find(MockWhatToFeed)).to.have.lengthOf(1);
    });

    describe('Header2', () => {
      let header2;

      before(() => {
        header2 = myComponent.find(MockHeader2);
      });

      it('the Header2 should be rendered', () => {
        expect(header2).to.have.lengthOf(1);
      });

      it('the Header2 should contain the title', () => {
        header2.props().children.should
          .eql('Raw Dog Food Calculator - Meal Prep Assistant');
      });
    });
  });
});

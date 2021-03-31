import get from 'lodash/get';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import globalTranslations from '../../translations/global.json';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);
const MockGrid = sinon.stub().returns(<div />);

const MockContact = sinon.stub().returns(<div />);
const MockPercentageOptions = sinon.stub().returns(<div />);
const MockBasicOptions = sinon.stub().returns(<div />);
const MockRawMeatyBone = sinon.stub().returns(<div />);
const MockWhatToFeed = sinon.stub().returns(<div />);
const MockTranslate = sinon.stub().returns(<div />);

describe('components/calculator/Main', () => {
  let Main;

  before(() => {
    Main = proxyquire.noCallThru().load('./Main', {
      '@material-ui/core': {
        Grid: MockGrid,
      },
      'react-localize-redux': {
        Translate: MockTranslate,
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
      let translateComponent;
      let translationId;

      before(() => {
        header2 = myComponent.find(MockHeader2);
        translateComponent = myComponent.find(MockTranslate);
        translationId = translateComponent.props().id;
      });

      it('Header2 should be rendered', () => {
        expect(header2).to.have.lengthOf(1);
      });

      it('Translate should be rendered', () => {
        expect(translateComponent).to.have.lengthOf(1);
      });

      it('Translate should be passed the correct translation id', () => {
        expect(translationId).to.eql('main.header');
      });

      it('the translation id should look up expected strings', () => {
        const translationList = get(globalTranslations, translationId);

        const english = translationList[0];
        const hebrew = translationList[1];

        expect(english).to.eql('Raw Dog Food Calculator - Meal Prep Assistant');
        expect(hebrew).to.eql('מחשבון האכלה טבעית לכלבים- עזרה להכנת ארוכה');
      });
    });
  });
});

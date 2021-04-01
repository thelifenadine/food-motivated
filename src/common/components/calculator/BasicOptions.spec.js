import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import { unitData } from '../../constants/unitOptions';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);
const translateStub = sinon.stub();

const useStylesStub = sinon.stub();
useStylesStub.returns({
  formControl: {
    margin: 1,
  },
  rmbOption: {
    margin: 1,
    width: 115,
  },
  rmbCustom: {
    margin: 1,
    width: 135,
  },
});

const useSelectorStub = sinon.stub();
const dispatchStub = sinon.stub();
const updateOptionsStub = sinon.stub();

describe('components/calculator/BasicOptions', () => {
  let BasicOptions;

  before(() => {
    BasicOptions = proxyquire.noCallThru().load('./BasicOptions', {
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
      'react-redux': {
        useSelector: useSelectorStub,
        useDispatch: () => dispatchStub,
        shallowEqual: sinon.stub(),
      },
      '../../actions/calculator': {
        updateOptions: updateOptionsStub,
      },
    }).default;
  });

  describe('expected behavior', () => {
    let mainComponent;

    before(() => {
      useSelectorStub.returns({
        weight: 31,
        unitDetails: unitData['metric'],
        maintenance: 2.2,
        totalDailyAmount: 682,
        estimatedCalories: 1268,
      });

      mainComponent = shallow(<BasicOptions />)
        .renderProp('children')({ translate: translateStub });
    });

    after(() => {
      useSelectorStub.reset();
    });

    it('Section should be rendered', () => {
      expect(mainComponent.find(MockSection)).to.have.lengthOf(1);
    });

    it('Header2 should be rendered with title', () => {
      const header2 = mainComponent.find(MockHeader2);
      expect(header2).to.have.lengthOf(1);
    });

    it('the unit type dropdown should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'unit' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().value).to.eql('metric');
    });

    it('the weight input should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'weight' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().value).to.eql(31);
    });

    it('the maintenance input should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'maintenance' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().value).to.eql(2.2);
    });

    it('the totalDailyAmount input should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'totalDailyAmount' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().disabled).to.eql(true);
    });

    it('the estimatedCalories input should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'estimatedCalories' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().disabled).to.eql(true);
    });

    describe('when the unit drop down changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'unit' })
          .simulate('change', { target: { value: 'english' } });
      });

      it('should invoke updateOptions action creator with correct values', () => {
        sinon.assert.calledWith(updateOptionsStub, 31, 2.2, 'english');
      });
    });

    describe('when the weight textfield changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'weight' })
          .simulate('change', { target: { value: '80' } });
      });

      it('should invoke updateOptions action creator with correct values', () => {
        sinon.assert.calledWith(updateOptionsStub, 80, 2.2, 'metric');
      });
    });

    describe('when the maintenance textfield changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'maintenance' })
          .simulate('change', { target: { value: '2.5' } });
      });

      it('should invoke updateOptions action creator with correct values', () => {
        sinon.assert.calledWith(updateOptionsStub, 31, 2.5, 'metric');
      });
    });

    describe('tranlate is invoked with the expected keys', () => {
      it('basicOptions keys', () => {
        sinon.assert.calledWith(translateStub, 'basicOptions.options');
        sinon.assert.calledWith(translateStub, 'basicOptions.unit');
        sinon.assert.calledWith(translateStub, 'basicOptions.dog-weight');
        sinon.assert.calledWith(translateStub, 'basicOptions.maintenance');
        sinon.assert.calledWith(translateStub, 'basicOptions.start-at');
        sinon.assert.calledWith(translateStub, 'basicOptions.daily-amount');
        sinon.assert.calledWith(translateStub, 'basicOptions.estimated-calories');
        sinon.assert.calledWith(translateStub, 'basicOptions.used-to-calculate-essential-nutrients');
      });
    });
  });
});

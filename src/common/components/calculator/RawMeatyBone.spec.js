import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';
// import { updateRMB, updateCustomRMB } from '../../actions/calculator';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);

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
const updateRMBStub = sinon.stub();
const updateCustomRMBStub = sinon.stub();

describe('components/calculator/RawMeatyBone', () => {
  let RawMeatyBone;

  before(() => {
    RawMeatyBone = proxyquire.noCallThru().load('./RawMeatyBone', {
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
      'react-redux': {
        useSelector: useSelectorStub,
        useDispatch: () => dispatchStub,
        shallowEqual: sinon.stub(),
      },
      '../../actions/calculator': {
        updateRMB: updateRMBStub,
        updateCustomRMB: updateCustomRMBStub,
      },
    }).default;
  });

  describe('expected behavior', () => {
    let mainComponent;

    before(() => {
      useSelectorStub.returns({
        rmbPercent: 60,
        rmbKey: 'chicken-feet',
        isCustomRmb: false,
      });

      mainComponent = shallow(<RawMeatyBone />);
    });

    after(() => {
      useSelectorStub.reset();
    });

    it('Section should be rendered', () => {
      expect(mainComponent.find(MockSection)).to.have.lengthOf(1);
    });

    it('Header2 should be rendered with title', () => {
      let component = mainComponent.find(MockHeader2);
      expect(component).to.have.lengthOf(1);
      expect(component.props().children).to.eql('Raw Meaty Bone');
    });

    it('the bone type dropdown should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'boneType' })).to.have.lengthOf(1);
    });

    it('the readonly rmb textfield should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'rmbOption' })).to.have.lengthOf(1);
    });

    it('the custom rmb textfield should not show', () => {
      expect(mainComponent.find({ 'data-testid': 'customRMB' })).to.have.lengthOf(0);
    });

    describe('when the drop down changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'boneType' })
          .simulate('change', { target: { value: 'custom' } });
      });

      it('should invoke updateRMB action creator with correct values', () => {
        sinon.assert.calledWith(updateRMBStub, 'custom', true);
      });
    });

    describe('when the state changes to custom', () => {
      before(() => {
        useSelectorStub.returns({
          rmbPercent: 0,
          rmbKey: 'custom',
          isCustomRmb: true,
        });
        mainComponent = shallow(<RawMeatyBone />);
      });

      it('the bone type dropdown should be rendered', () => {
        expect(mainComponent.find({ 'data-testid': 'boneType' })).to.have.lengthOf(1);
      });

      it('the readonly rmb textfield should not be rendered', () => {
        expect(mainComponent.find({ 'data-testid': 'rmbOption' })).to.have.lengthOf(0);
      });

      it('the custom rmb textfield should now show', () => {
        expect(mainComponent.find({ 'data-testid': 'customRMB' })).to.have.lengthOf(1);
      });


      describe('when the custom textfield changes', () => {
        before(() => {
          mainComponent.find({ 'data-testid': 'customRMB' })
            .simulate('change', { target: { value: '77' } });
        });

        it('should invoke updateCustomRMBStub action creator with numeric value', () => {
          sinon.assert.calledWith(updateCustomRMBStub, 77);
        });
      });
    });
  });
});

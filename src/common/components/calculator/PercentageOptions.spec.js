import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const MockHeader2 = sinon.stub().returns(<div />);
const MockSection = sinon.stub().returns(<div />);

const useStylesStub = sinon.stub();
useStylesStub.returns({
  numericSmall: {
    margin: 1,
    width: 55,
  },
  radioWrapper: {
    margin: 1,
    marginTop: 2,
  },
  radio: {
    paddingTop: 0.5,
    paddingBottom: 0.5,
  },
  radioLabel: {
    fontSize: 14,
    marginRight: 1,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 1,
  },
  buttonWrapper: {
    '& > *': {
      margin: 1,
      marginRight: 0.5,
    },
  },
});

const useSelectorStub = sinon.stub();
const dispatchStub = sinon.stub();

const updateBonePercentageStub = sinon.stub();
const updateOtherPercentageStub = sinon.stub();
const setLifestagePresetStub = sinon.stub();
const setMealTypeStub = sinon.stub();
const translateStub = sinon.stub();

describe('components/calculator/PercentageOptions', () => {
  let PercentageOptions;

  before(() => {
    PercentageOptions = proxyquire.noCallThru().load('./PercentageOptions', {
      '../layout/Header2': MockHeader2,
      '../layout/Section': MockSection,
      'react-redux': {
        useSelector: useSelectorStub,
        useDispatch: () => dispatchStub,
        shallowEqual: sinon.stub(),
      },
      '../../actions/calculator': {
        updateBonePercentage: updateBonePercentageStub,
        updateOtherPercentage: updateOtherPercentageStub,
        setLifestagePreset: setLifestagePresetStub,
        setMealType: setMealTypeStub,
      },
    }).default;
  });

  describe('expected behavior', () => {
    let mainComponent;

    before(() => {
      useSelectorStub.returns({
        otherPercentages: {
          organ: 5,
          liver: 6,
        },
        musclePercentage: 59,
        bonePercentage: 10,
        lifestagePreset: 'adult',
        mealType: 'barf',
      });

      mainComponent = shallow(<PercentageOptions />)
        .renderProp('children')({ translate: translateStub });
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
    });

    it('the meal type radio group should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'mealTypeRadioGroup' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().value).to.eql('barf');
    });


    it('the four meal type radio options should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'mealTypeBarf' })).to.have.lengthOf(1);
      expect(mainComponent.find({ 'data-testid': 'mealTypePmr' })).to.have.lengthOf(1);
      expect(mainComponent.find({ 'data-testid': 'mealTypeTradBarf' })).to.have.lengthOf(1);
      expect(mainComponent.find({ 'data-testid': 'mealTypeTradPmr' })).to.have.lengthOf(1);
    });


    it('the lifestagePresetAdult button should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'lifestagePresetAdult' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().variant).to.eql('contained');
    });

    it('the lifestagePresetPuppy button should be rendered', () => {
      let component = mainComponent.find({ 'data-testid': 'lifestagePresetPuppy' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().variant).to.eql('outlined');
    });

    it('the musclePercentage input should be rendered and disabled', () => {
      let component = mainComponent.find({ 'data-testid': 'musclePercentage' });
      expect(component).to.have.lengthOf(1);
      expect(component.props().disabled).to.eql(true);
    });

    it('the bonePercentage input should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'bonePercentage' })).to.have.lengthOf(1);
    });

    it('the organPercentage input should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'organPercentage' })).to.have.lengthOf(1);
    });

    it('the liverPercentage input should be rendered', () => {
      expect(mainComponent.find({ 'data-testid': 'liverPercentage' })).to.have.lengthOf(1);
    });

    describe('when the mealTypeRadioGroup selection changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'mealTypeRadioGroup' })
          .simulate('change', { target: { value: 'PMR' } });
      });

      it('should invoke setMealType action creator with correct values', () => {
        sinon.assert.calledWith(setMealTypeStub, 'PMR');
      });
    });

    describe('when the lifestagePresetAdult button is clicked', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'lifestagePresetAdult' }).simulate('click');
      });

      it('should invoke setLifestagePreset action creator with correct values', () => {
        sinon.assert.calledWith(setLifestagePresetStub, 'adult');
      });
    });

    describe('when the lifestagePresetPuppy button is clicked', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'lifestagePresetPuppy' }).simulate('click');
      });

      it('should invoke setLifestagePreset action creator with correct values', () => {
        sinon.assert.calledWith(setLifestagePresetStub, 'puppy');
      });
    });

    describe('when the bonePercentage textfield changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'bonePercentage' })
          .simulate('change', { target: { value: '16' } });
      });

      it('should invoke updateBonePercentage action creator with correct values', () => {
        sinon.assert.calledWith(updateBonePercentageStub, 16);
      });
    });

    describe('when the organPercentage textfield changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'organPercentage' })
          .simulate('change', { target: { value: '8' } });
      });

      it('should invoke updateOtherPercentage action creator with correct values', () => {
        sinon.assert.calledWith(updateOtherPercentageStub, 8, 'organ');
      });
    });

    describe('when the liverPercentage textfield changes', () => {
      before(() => {
        mainComponent.find({ 'data-testid': 'liverPercentage' })
          .simulate('change', { target: { value: '8' } });
      });

      it('should invoke updateOtherPercentage action creator with correct values', () => {
        sinon.assert.calledWith(updateOtherPercentageStub, 8, 'liver');
      });
    });
  });
});

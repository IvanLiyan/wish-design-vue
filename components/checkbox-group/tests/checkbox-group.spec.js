import { mount } from '@vue/test-utils';
import CheckboxGroup from '../checkbox-group.vue';

const Checkbox = {
  name: 'TestCheckbox',
  inject: ['checkboxGroup'],
  render (h) {
    const on = {
      click: () => {
        this.checkboxGroup.$emit('checkboxChange', true, this.value);
      }
    };
    return h('div', {
      on,
    });
  }
}

describe('CheckboxGroup', function () {
  it('create', () => {
    const wrapper = mount(CheckboxGroup);
    expect(wrapper.vm).to.exist;
  });

  it('should provide checkboxGroup to child component', function () {
    const props = {
      value: ['xxx'],
      disabled: true,
      name: 'somename'
    };
    const wrapper = mount(CheckboxGroup, {
      propsData: props,
      slots: {
        default: [Checkbox]
      },
    });

    const checkbox = wrapper.find(Checkbox);
    expect(checkbox.vm.checkboxGroup).to.be.include(props);
    expect(checkbox.vm.checkboxGroup.$emit).to.be.an('function');
  });

  it('should lisenter checkboxGroup event and $emit input event', function () {
    const wrapper = mount(CheckboxGroup, {
      slots: {
        default: [Checkbox]
      },
    });
    const checkbox = wrapper.find(Checkbox);
    checkbox.trigger('click');

    expect(wrapper.emitted().checkboxChange.length).to.be.equal(1);
    expect(wrapper.emitted().input.length).to.be.equal(1);
  });
});

import {
  mount
} from '@vue/test-utils';
import withCheckboxGroup from '../with';
import CheckboxGroup from '../checkbox-group.vue';
import SlotDemo from './demo/slot.vue';

const TestCheckboxComponent = {
  name: 'TestCheckboxComponent',
  props: {
    value: [String, Number],
    disabled: Boolean,
    checked: Boolean,
    name: String,
  },
  methods: {
    handleClick (v) {
      this.$emit('input', !this.checked);
    },
  },
  render (h) {
    return h('div', {
      on: {
        click: this.handleClick,
      },
    });
  },
};

describe('withCheckboxGroup', function () {
  const TestCheckbox = withCheckboxGroup('TestCheckbox', TestCheckboxComponent);

  it('inject props from current element attrs if not has CheckboxGroup context',
  function () {
    const props = {
      name: 'name1',
      value: 'value1',
      disabled: true,
      checked: true,
    };

    const wrapper = mount(TestCheckbox, {
      propsData: props,
    });

    const checkbox = wrapper.find(TestCheckboxComponent)
    expect(checkbox.vm).to.be.include(props);

    checkbox.trigger('click');
    expect(wrapper.emitted().input.length).to.be.equal(1);
    expect(wrapper.emitted().input[0][0]).to.be.false;
  });

  it('inject props from CheckboxGroup context', function () {
    const props = {
      value: ['1', '2'],
      disabled: false,
      name: 'xxxx'
    };
    const wrapper = mount(SlotDemo, {
      attrs: props,
    });
    // const checkboxs = wrapper.findAll({ name: 'Checkbox' });
    const dumbCheckboxs = wrapper.findAll({ name: 'DumbCheckbox' });

    expect(dumbCheckboxs.at(0).vm.checked, 'expect checked').to.be.true;
    expect(dumbCheckboxs.at(1).vm.checked, 'expect checked').to.be.true;

    expect(dumbCheckboxs.at(1).vm.name, 'expect name').to.be.equal(props.name);

    expect(dumbCheckboxs.at(1).vm.disabled, 'expect enabled').to.be.false;
    expect(dumbCheckboxs.at(2).vm.disabled, 'expect disabled').to.be.true;

    expect(dumbCheckboxs.at(3).vm.checked, 'expect unchecked').to.be.false;

    const item = dumbCheckboxs.at(2);
    item.trigger('click');
    const group = wrapper.find(CheckboxGroup)
    expect(group.emitted().input.length).to.be.equal(1);
    expect(group.emitted().input[0][0]).to.be.eql(['1', '2', '3']);

  });
});

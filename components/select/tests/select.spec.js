import { mount } from '@vue/test-utils';
import Select from '../select.vue';
import { createDemoTest, createTest, destroyVM, findVM, triggerEvent } from '@test/util';
const DemoContexts = require.context('./demo', true, /\.vue$/);

import DemoValueKey from './demo/object-value/value-key.vue';
import DemoObjectValue from './demo/object-value/base.vue';
import DemoFormatterWithObjectValue from './demo/object-value/formatter.vue';

describe('Select', function () {
  let vm;
  afterEach(() => {
    destroyVM(vm);
    vm = undefined;
  });

  it('create', () => {
    const wrapper = mount(Select);
    expect(wrapper.vm).to.exist;
  });

  describe('value is Object', function () {
    it('create', (done) => {
      const obj = {};
      vm = createTest(DemoObjectValue);
      const input = vm.$el.querySelector('.wt-input');
      setTimeout(() => {
        expect(input.value).to.be.eql(obj.toString());
        vm.value = vm.options[0];
        setTimeout(() => {
          expect(input.value).to.be.eql(vm.options[0].name);
          done();
        });
      }, 0);
    });

    it('Presents formatter results if the value has no corresponding option', function (done) {
      vm = createTest(DemoFormatterWithObjectValue);
      const input = vm.$el.querySelector('.wt-input');
      const value = { id: -1, name: '测试用例1' };
      vm.value = value;

      setTimeout(() => {
        expect(input.value).to.be.eql(vm.formatter({ value }));
        done();
      }, 0);
    });

    it('Presents option.label if the value has corresponding option', function (done) {
      vm = createTest(DemoFormatterWithObjectValue);
      const input = vm.$el.querySelector('.wt-input');
      const value = { ...vm.options[0], name: '其他文案' };
      vm.value = value;

      setTimeout(() => {
        expect(input.value).to.be.not.eql(value.name);
        expect(input.value).to.be.eql(vm.formatter({ value: vm.options[0] }));
        done();
      }, 0);
    });

    it('should be displayed option.label when focused and filterable', function (done) {
      vm = createTest(DemoFormatterWithObjectValue);
      const input = vm.$el.querySelector('.wt-input');
      const select = findVM(vm, { name: 'Select' });
      const value = vm.options[0];
      vm.value = value;
      setTimeout(() => {
        triggerEvent(input, 'click', { bubbles: true });
        // triggerEvent(input, 'focus', { bubbles: true });
        setTimeout(() => {
          expect(select.focused).to.be.true;
          expect(input.value).to.be.eql(value.name);
          done();
        }, 100);
      }, 0);
    });

    it('should be displayed formatter result when focused and filterable', function (done) {
      vm = createTest(DemoFormatterWithObjectValue);
      const input = vm.$el.querySelector('.wt-input');
      const select = findVM(vm, { name: 'Select' });
      const value = { id: -1, name: '未有测试' };
      vm.value = value;
      setTimeout(() => {
        triggerEvent(input, 'click', { bubbles: true });
        triggerEvent(input, 'focus', { bubbles: true });
        setTimeout(() => {
          expect(select.focused).to.be.true;
          expect(input.value).to.be.eql(vm.formatter({ value: value }));
          done();
        }, 0);
      }, 0);
    });

    it('value-key should no impact on final input value', (done) => {
      const propsData = {
        value: { value: 0, label: '测试1' },
        valueKey: 'value',
      };
      const wrapper = mount(Select, {
        propsData: propsData,
      });
      expect(wrapper.vm).to.exist;
      wrapper.vm.$nextTick(() => {
        const inputWrapper = wrapper.find({ name: 'MtdSelectInput' });
        expect(inputWrapper.props('value')).to.be.eql(propsData.value.toString());
        done();
      });
    });
  });

  createDemoTest(DemoContexts);
});

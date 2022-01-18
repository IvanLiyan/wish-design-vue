import { mount } from '@vue/test-utils';
import FormItem from '../form-item.vue';

describe('FormItem', function () {
  xit('create', () => {
    // need form provide
    const wrapper = mount(FormItem);
    expect(wrapper.vm).to.exist;
  });
});

import { mount } from '@vue/test-utils';
import Cascader from '../index';

describe('Cascader', function () {
  it('create', () => {
    const wrapper = mount(Cascader);
    expect(wrapper.vm).to.exist;
  });
});

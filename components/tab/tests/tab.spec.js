import { mount } from '@vue/test-utils';
import Tab from '../index';

describe('Tab', function () {
  it('create', () => {
    const wrapper = mount(Tab);
    expect(wrapper.vm).to.exist;
  });
});

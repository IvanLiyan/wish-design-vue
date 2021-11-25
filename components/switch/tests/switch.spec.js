import { mount } from '@vue/test-utils';
import Switch from '../index';

describe('Switch', function () {
  it('create', () => {
    const wrapper = mount(Switch);
    expect(wrapper.vm).to.exist;
  });
});

import { mount } from '@vue/test-utils';
import Dropdown from '../index';

describe('Dropdown', function () {
  it('create', () => {
    const wrapper = mount(Dropdown);
    expect(wrapper.vm).to.exist;
  });
});

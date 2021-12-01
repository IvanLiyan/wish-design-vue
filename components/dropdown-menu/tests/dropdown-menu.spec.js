import { mount } from '@vue/test-utils';
import DropdownMenu from '../dropdown-menu.vue';

describe('DropdownMenu', function () {
  it('create', () => {
    const wrapper = mount(DropdownMenu);
    expect(wrapper.vm).to.exist;
  });
});

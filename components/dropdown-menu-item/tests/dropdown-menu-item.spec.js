import { mount } from '@vue/test-utils';
import DropdownMenuItem from '../dropdown-menu-item.vue';

describe('DropdownMenuItem', function () {
  it('create', () => {
    const wrapper = mount(DropdownMenuItem);
    expect(wrapper.vm).to.exist;
  });
});

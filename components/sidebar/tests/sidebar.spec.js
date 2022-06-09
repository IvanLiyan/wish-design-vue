import { mount } from '@vue/test-utils';
import WtSidebar from '../index';

describe('sidebar', function () {
  it('create', () => {
    const wrapper = mount(WtSidebar);
    expect(wrapper.vm).to.exist;
  });
});

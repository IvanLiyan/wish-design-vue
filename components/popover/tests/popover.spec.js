import { mount } from '@vue/test-utils';
import Popover from '../index';

describe('Popover', function () {
  it('create', () => {
    const wrapper = mount(Popover);
    expect(wrapper.vm).to.exist;
  });
});

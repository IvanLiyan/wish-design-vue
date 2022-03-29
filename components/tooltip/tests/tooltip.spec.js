import { mount } from '@vue/test-utils';
import Tooltip from '../tooltip.vue';

describe('Tooltip', function () {
  it('create', () => {
    const wrapper = mount(Tooltip);
    expect(wrapper.vm).to.exist;
  });
});

import { mount } from '@vue/test-utils';
import IconButton from '../icon-button.vue';

describe('IconButton', function () {
  it('create', () => {
    const wrapper = mount(IconButton);
    expect(wrapper.vm).to.exist;
  });
});

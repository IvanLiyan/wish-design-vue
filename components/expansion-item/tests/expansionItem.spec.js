import { mount } from '@vue/test-utils';
import expansion-item from '../index';

describe('expansion-item', function () {
  it('create', () => {
    const wrapper = mount(expansion-item);
    expect(wrapper.vm).to.exist;
  });
});

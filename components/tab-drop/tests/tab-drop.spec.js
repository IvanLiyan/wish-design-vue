import { mount } from '@vue/test-utils';
import TabDrop from '../index';

describe('TabDrop', function () {
  it('create', () => {
    const wrapper = mount(TabDrop);
    expect(wrapper.vm).to.exist;
  });
});

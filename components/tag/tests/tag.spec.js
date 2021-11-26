import { mount } from '@vue/test-utils';
import Tag from '../index';

describe('Tag', function () {
  it('create', () => {
    const wrapper = mount(Tag);
    expect(wrapper.vm).to.exist;
  });
});

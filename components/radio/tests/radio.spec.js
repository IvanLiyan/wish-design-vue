import { mount } from '@vue/test-utils';
import Radio from '../index';

describe('Radio', function () {
  it('create', () => {
    const wrapper = mount(Radio);
    expect(wrapper.vm).to.exist;
  });
});

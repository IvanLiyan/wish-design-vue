import { mount } from '@vue/test-utils';
import Expansion from '../index';

describe('Expansion', function () {
  it('create', () => {
    const wrapper = mount(Expansion);
    expect(wrapper.vm).to.exist;
  });
});

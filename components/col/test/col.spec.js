import { mount } from '@vue/test-utils';
import Col from '../index';

describe('Col', function () {
  it('create', () => {
    const wrapper = mount(Col);
    expect(wrapper.vm).to.exist;
  });
});

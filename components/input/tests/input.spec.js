import { mount } from '@vue/test-utils';
import Input from '../index';

describe('Input', function () {
  it('create', () => {
    const wrapper = mount(Input);
    expect(wrapper.vm).to.exist;
  });
});

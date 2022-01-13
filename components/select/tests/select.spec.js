import { mount } from '@vue/test-utils';
import Select from '../index';

describe('Select', function () {
  it('create', () => {
    const wrapper = mount(Select);
    expect(wrapper.vm).to.exist;
  });
});

import { mount } from '@vue/test-utils';
import Checkbox from '../index';

describe('Checkbox', function () {
  it('create', () => {
    const wrapper = mount(Checkbox);
    expect(wrapper.vm).to.exist;
  });
});

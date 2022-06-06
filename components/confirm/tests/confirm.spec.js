import { mount } from '@vue/test-utils';
import Confirm from '../index';

describe('Confirm', function () {
  it('create', () => {
    const wrapper = mount(Confirm);
    expect(wrapper.vm).to.exist;
  });
});

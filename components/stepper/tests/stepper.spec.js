import { mount } from '@vue/test-utils';
import Stepper from '../index';

describe('Stepper', function () {
  it('create', () => {
    const wrapper = mount(Stepper);
    expect(wrapper.vm).to.exist;
  });
});

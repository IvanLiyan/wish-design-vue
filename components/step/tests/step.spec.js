import { mount } from '@vue/test-utils';
import Step from '../index';

describe('Step', function () {
  it('create', () => {
    const wrapper = mount(Step);
    expect(wrapper.vm).to.exist;
  });
});

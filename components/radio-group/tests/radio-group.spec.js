import { mount } from '@vue/test-utils';
import RadioGroup from '../index';

describe('RadioGroup', function () {
  it('create', () => {
    const wrapper = mount(RadioGroup);
    expect(wrapper.vm).to.exist;
  });
});

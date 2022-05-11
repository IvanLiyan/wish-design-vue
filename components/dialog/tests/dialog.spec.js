import { mount } from '@vue/test-utils';
import Dialog from '../index';

describe('Dialog', function () {
  it('create', () => {
    const wrapper = mount(Dialog);
    expect(wrapper.vm).to.exist;
  });
});

import { mount } from '@vue/test-utils';
import Alert from '../index';

describe('Alert', function () {
  it('create', () => {
    const wrapper = mount(Alert);
    expect(wrapper.vm).to.exist;
  });
});

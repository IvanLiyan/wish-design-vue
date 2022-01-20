import { mount } from '@vue/test-utils';
import Notification from '../index';

describe('Notification', function () {
  it('create', () => {
    const wrapper = mount(Notification);
    expect(wrapper.vm).to.exist;
  });
});

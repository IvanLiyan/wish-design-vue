import { mount } from '@vue/test-utils';
import Loading from '../index';

describe('Loading', function () {
  it('create', () => {
    const wrapper = mount(Loading);
    expect(wrapper.vm).to.exist;
  });
});

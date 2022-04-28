import { mount } from '@vue/test-utils';
import Breadcrumb from '../index';

describe('Breadcrumb', function () {
  it('create', () => {
    const wrapper = mount(Breadcrumb);
    expect(wrapper.vm).to.exist;
  });
});

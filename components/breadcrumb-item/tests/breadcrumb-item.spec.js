import { mount } from '@vue/test-utils';
import BreadcrumbItem from '../index';

describe('BreadcrumbItem', function () {
  it('create', () => {
    const wrapper = mount(BreadcrumbItem);
    expect(wrapper.vm).to.exist;
  });
});

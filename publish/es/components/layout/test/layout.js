import { mount } from '@vue/test-utils';
import Layout from '../index';

describe('Layout', function () {
  it('create', function () {
    var wrapper = mount(Layout);
    expect(wrapper.vm).to.exist;
  });
});
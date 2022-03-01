import { mount } from '@vue/test-utils';
import Col from '../index';

describe('Col', function () {
  it('create', function () {
    var wrapper = mount(Col);
    expect(wrapper.vm).to.exist;
  });
});
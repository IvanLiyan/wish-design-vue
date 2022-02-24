import { mount } from '@vue/test-utils';
import TabPane from '../index';

describe('TabPane', function () {
  it('create', () => {
    const wrapper = mount(TabPane);
    expect(wrapper.vm).to.exist;
  });
});

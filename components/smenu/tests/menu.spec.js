import { mount } from '@vue/test-utils';
import Menu from '../index';
import { createDemoTest, wait, waitImmediate } from '@test/util';
const DemoContexts = require.context('../doc', true, /\.vue$/);

describe('Menu', function () {
  it('create', () => {
    const wrapper = mount(Menu);
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DemoContexts);
});

import { mount } from '@vue/test-utils';
import Table from '../src/table.vue';
import { createDemoTest } from '@test/util';
const DemoContexts = require.context('./demo', true, /\.vue$/);
describe('Table', function () {
  it('create', () => {
    const wrapper = mount(Table);
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DemoContexts);
});

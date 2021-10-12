import { mount } from '@vue/test-utils';
import Row from '../index';
import { createDemoTest } from '@test/util';
const DocContexts = require.context('../doc', true, /\.vue$/);
describe('Row', function () {
  it('create', () => {
    const wrapper = mount(Row);
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DocContexts);
});

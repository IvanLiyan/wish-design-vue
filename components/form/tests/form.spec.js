import { mount } from '@vue/test-utils';
import Form from '../form.vue';
import { createDemoTest } from '@test/util';

const DocContexts = require.context('../doc', true, /\.vue$/);
const DemoContexts = require.context('./demo', true, /\.vue$/);


describe('Form', function () {
  it('create', () => {
    const wrapper = mount(Form);
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DocContexts, 'example doc');
  createDemoTest(DemoContexts);
});

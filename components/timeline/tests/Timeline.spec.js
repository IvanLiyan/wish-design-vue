import { mount } from '@vue/test-utils';
import Timeline from '../index';
import { createDemoTest } from '@test/util';
const DocContexts = require.context('../doc', true, /\.vue$/);

describe('Timeline', function () {
  it('create', () => {
    const wrapper = mount(Timeline);
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DocContexts);
});

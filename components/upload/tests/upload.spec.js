import { mount } from '@vue/test-utils';
import Upload from '../index';
import { createDemoTest, wait, waitImmediate } from '@test/util';
const DemoContexts = require.context('../doc', true, /\.vue$/);

describe('Upload', function () {
  it('create', () => {
    const wrapper = mount(Upload, {
      propsData: {
        action: '',
      },
    });
    expect(wrapper.vm).to.exist;
  });
  createDemoTest(DemoContexts);
});

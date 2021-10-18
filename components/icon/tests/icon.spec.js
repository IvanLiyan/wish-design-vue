import { mount } from '@vue/test-utils';
import Icon from '../icon.vue';

describe('Icon', function () {
  it('create', () => {
    const wrapper = mount(Icon, {
      propsData: {
        name: 'add'
      }
    });
    expect(wrapper.find('.wdicon-add').exists()).to.be.true;
  });
});
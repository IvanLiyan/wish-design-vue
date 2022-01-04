import {mount, shallowMount} from '@vue/test-utils';
import Card from '../index';

describe('Card', function () {
  it('create', () => {
    const wrapper = mount(Card);
    expect(wrapper.vm).to.exist;
  });
  it('card header attribute', () => {
    const wrapper = shallowMount(Card, {
      attrs: {
        header: 'This is title'
      }
    });
    expect(wrapper.find('.wt-card-header')).to.exist;
  });
  it('card header slot', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        header: 'This is title'
      }
    });
    expect(wrapper.find('.wt-card-header')).to.exist;
  });
  it('card extra slot', () => {
    const wrapper = shallowMount(Card, {
      attrs: {
        extra: 'This is title'
      }
    });
    expect(wrapper.find('.wt-card-extra')).to.exist;
  });
});

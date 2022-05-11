import { mount } from '@vue/test-utils';
import Badge from '../badge.vue';

describe('Badge', function () {
  it('create', () => {
    const wrapper = mount(Badge);
    expect(wrapper.vm).to.exist;
  });
  it('test value', () => {
    const wrapper = mount(Badge, {
      propsData: {
        value: 10,
      },
    });
    expect(wrapper.find('.mtd-badge-text').text()).to.equal('10');
  });
  it('test max', () => {
    const wrapper = mount(Badge, {
      propsData: {
        value: 1000,
        max: 999
      },
    });
    expect(wrapper.find('.mtd-badge-text').text()).to.equal('999+');
  });
  it('test value string', () => {
    const wrapper = mount(Badge, {
      propsData: {
        value: '1000',
        max: 999
      },
    });
    expect(wrapper.find('.mtd-badge-text').text()).to.equal('1000');
  });
  it('test dot', () => {
    const wrapper = mount(Badge, {
      propsData: {
        value: 10,
        dot: true
      },
    });
    expect(wrapper.find('.mtd-badge-text').text()).to.equal('');
    expect(wrapper.find('.mtd-badge-dot').exists()).to.be.true;
  });
  it('test hidden', () => {
    const wrapper = mount(Badge, {
      propsData: {
        hidden: true
      },
    });
    expect(wrapper.find('.mtd-badge-hidden').exists()).to.be.true;
  });
});

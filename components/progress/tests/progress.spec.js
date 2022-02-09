import { mount } from '@vue/test-utils';
import Progress from '../progress.vue';

describe('Progress', function () {
  it('percentage', function () {
    const wrapper = mount(Progress, {
      propsData: {
        percentage: 50
      }
    });
    expect(wrapper.find('.mtd-progress-bar-inner').attributes().style).include('width: 50%')
  });
  it('status', function () {
    const wrapper = mount(Progress, {
      propsData: {
        percentage: 50,
        status: 'success'
      }
    });
    expect(wrapper.classes()).to.contain(`mtd-progress-success`)
  });
  it('type', function () {
    const wrapper = mount(Progress, {
      propsData: {
        percentage: 50,
        type: 'line'
      }
    });
    expect(wrapper.classes()).to.contain(`mtd-progress-line`)
  });
  it('color', function () {
    const wrapper = mount(Progress, {
      propsData: {
        percentage: 50,
      },
      attrs: {
        color: '#ccc'
      }
    });
    expect(wrapper.find('.mtd-progress-bar-inner').attributes().style).include('background: rgb(204, 204, 204)')
  });
  it('stroke-width', function () {
    const wrapper = mount(Progress, {
      propsData: {
        percentage: 50,
      },
      attrs: {
        strokeWidth: 50,
      }
    });
    expect(wrapper.find('.mtd-progress-bar').attributes().style).include('height: 50px')
  });
});

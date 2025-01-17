import Button from '../index';
import { mount } from '@vue/test-utils';

describe('Button', function () {
  it('disabled', function () {
    const wrapper = mount(Button, {
      propsData: {
        disabled: true,
      },
    });
    expect(wrapper.attributes().disabled).to.equal('disabled');

    wrapper.trigger('click');
    expect(wrapper.emitted().click).to.not.be.ok;
  });

  it('size', function () {
    const sizes = ['small', 'large'];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        propsData: {
          size,
        },
      });
      expect(wrapper.classes()).to.include(`wt-btn-${size}`);
    });
  });

  it('htmlType', function () {
    const btn = mount(Button);
    expect(btn.attributes().type, 'default is button').to.equal('button');

    const types = ['submit', 'reset', 'button'];

    types.forEach((type) => {
      const sbBtn = mount(Button, {
        propsData: {
          htmlType: type,
        },
      });
      expect(sbBtn.attributes().type).to.equal(type);
    });
  });

  it('loading', function () {
    const wrapper = mount(Button, {
      propsData: {
        loading: true,
      },
    });
    expect(wrapper.classes()).to.include('wt-btn-loading');
    expect(wrapper.classes()).to.not.include('wt-btn-disabled');
    expect(wrapper.attributes().disabled).to.equal('disabled');

    wrapper.trigger('click');
    expect(wrapper.emitted().click).to.not.be.ok;

    // todo 添加 loading 元素判断
  });

  it('icon', function () {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'wticon-settings',
      },
    });
    expect(wrapper.find('.wticon-settings').exists()).to.be.true;
  });

  it('should replace icon to loading when loading and has icon', function () {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'wticon-settings',
        loading: true,
      },
    });
    expect(wrapper.find('.wticon-settings').exists()).to.not.be.true;
    // todo 判断 loading 元素加载
  });

  it('type', function () {
    function createButton(type) {
      return mount(Button, {
        propsData: {
          type,
        },
      });
    }
    function createIt(type) {
      const btn = createButton(type);
      expect(btn.classes()).to.include(`wt-btn-${type}`);
    }
    ['primary', 'text', 'text-secondary', 'success', 'warning', 'error'].map(createIt);
  });

  it('dashed', function () {
    const wrapper = mount(Button, {
      propsData: {
        dashed: true,
      },
    });
    expect(wrapper.classes()).to.include('wt-btn-dashed');
  });
});

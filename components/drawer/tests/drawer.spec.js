import { mount, createLocalVue } from '@vue/test-utils';
import Drawer from '../index';

const drawerClass = '.mtd-drawer';

describe('Drawer', function () {
  it('create', () => {
    const wrapper = mount(Drawer);
    expect(wrapper.vm).to.exist;
  });

  it('visible', () => {
    const wrapper = mount(Drawer);
    const wrapper2 = mount(Drawer, {
      propsData: {
        visible: true,
      },
    })
    expect(wrapper.find(drawerClass).exists()).to.be.false;
    expect(wrapper2.find(drawerClass).element.style.display).to.be.eql('');
  });

  it('width', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
        width: '300px',
      },
    });
    expect(/width: 300px/.test(wrapper.find(drawerClass).attributes().style)).to.be.true;
  });

  it('title', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
        title: 'test',
      },
    });
    expect(wrapper.find(`${drawerClass}-header`).text()).to.be.equal('test');
  });

  it('closable', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
        closable: false,
      },
    });
    expect(wrapper.find(`${drawerClass}-close`).exists()).to.be.false;
  });

  it('mask', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
      },
    });
    const wrapper2 = mount(Drawer, {
      propsData: {
        visible: true,
        mask: false,
      },
    });
    expect(wrapper.find(`${drawerClass}-mask`).exists()).to.be.true;
    expect(wrapper2.find(`${drawerClass}-mask`).exists()).to.be.false;
  });


  it('mask-closable', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
      },
    });
    const mask = wrapper.find(`${drawerClass}-mask`);
    expect(wrapper.vm.visible).to.be.true;
  });

  it('placement', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
        placement: 'top',
      },
    });
    expect(wrapper.find(`${drawerClass}-top`).exists()).to.be.true;
  });

  it('get-popup-container', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        visible: true,
        getPopupContainer: () => document.body,
      },
    });
    expect(wrapper.props().getPopupContainer().tagName === 'BODY').to.be.true;
  });
});

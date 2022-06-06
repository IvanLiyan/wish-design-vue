import { mount } from '@vue/test-utils';
import Pager from '../pager.vue';

describe('Pagination', function () {
  it('create', () => {
    const wrapper = mount(Pager);
    expect(wrapper.vm).to.exist;
  });

  it('pager prev event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 3,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-prev').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.be.ok;
    expect(change).to.length(1);
    expect(change[0][0]).equal(2);
  });

  // 第一页时，上一页按钮disabled不可点击
  it('pager prev event: current-change when currentPage is first', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 1,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-prev').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.not.be.ok;
  });

  it('pager next event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 3,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-next').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.be.ok;
    expect(change).to.length(1);
    expect(change[0][0]).equal(4);
  });

  it('pager next event: current-change when currentPage is last', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 10,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-next').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.not.be.ok;
  });

  it('pager number active event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 3,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-active').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.not.be.ok;
  });

  it('pager number event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 3,
        pageCount: 10,
      },
    });
    wrapper.find('.mtd-pager-number').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.be.ok;
    expect(change[0]).to.length(1);
    expect(change[0][0]).equal(1);
  });

  // 点击icon 《
  it('pager quickprev event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 8,
        pageCount: 20,
        pagerCount: 7,
      },
    });
    wrapper.find('.mtd-pager-quickprev').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.be.ok;
    expect(change).to.length(1);
    expect(change[0][0]).equal(3);
  });

  // 点击icon 》
  it('pager quicknext event: current-change', () => {
    const wrapper = mount(Pager, {
      propsData: {
        currentPage: 8,
        pageCount: 20,
        pagerCount: 7,
      },
    });
    wrapper.find('.mtd-pager-quicknext').trigger('click');
    const change = wrapper.emitted().change;
    expect(change).to.be.ok;
    expect(change).to.length(1);
    expect(change[0][0]).equal(13);
  });
});

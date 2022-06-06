import { mount } from '@vue/test-utils';
import Pagination from '../pagination.vue';
// import Pager from '../pager.vue';

describe('Pagination', function () {
  it('create', () => {
    const wrapper = mount(Pagination);
    expect(wrapper.vm).to.exist;
  });

  it('size', function () {
    const size = 'small';
    const wrapper = mount(Pagination, {
      propsData: {
        size,
      }
    });
    expect(wrapper.classes()).to.include(`mtd-pagination-${size}`);
    expect(wrapper.find('.mtd-pager').classes()).to.include(`mtd-pager-${size}`);
  });

  it('unborder', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        unborder: true,
      }
    });
    expect(wrapper.find('.mtd-pager').classes()).to.include('mtd-pager-unborder');
  });

  it('simple', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        simple: true,
      },
    });
    expect(wrapper.classes()).to.include(`mtd-pagination-simple`);
  });

  it('simple: event jumper blur: change', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        simple: true,
        currentPage: 2,
        total: 60,
      }
    });
    const input = wrapper.find('.mtd-pager-simple-input');
    input.element.value = 5;
    input.trigger('blur');
    const current = wrapper.emitted()['change'];
    const update = wrapper.emitted()['update:currentPage'];
    expect(current).to.be.ok;
    expect(update).to.be.ok;
    expect(current[0]).eql([5, 10]);
    expect(update[0]).eql([5]);
  });

  it('simple: simpleReadonly', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        simple: true,
        simpleReadonly: true,
        total: 60,
        currentPage: 3,
      },
    });
    const input = wrapper.find('.mtd-pagination-jumper-input');
    const span = wrapper.findAll('.mtd-pager-simple-item-span');
    expect(input.exists()).to.be.false;
    expect(span).length(3);
    expect(span.at(0).text()).to.equal('3');
  });

  it('pageSize', function () {
    const pageSize = [
      {
        pageSize: 10,
        total: 100
      },
      {
        total: 100
      },
    ];
    pageSize.forEach((item) => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...item
        }
      });
      expect(wrapper.findAll('.mtd-pager-number')).to.length(7);
    });
  });

  // pageSizeOptions不包含
  it('pageSize: pageSizeOptions uninclude', function () {
    const wrapper = mount(Pagination, {
      propsData: {
        pageSize: 15,
        total: 200
      }
    });
    expect(wrapper.vm.defaultPageSizeOptions).to.include(15);
    expect(wrapper.findAll('.mtd-pager-number')).to.length(7);
  });

  it('pageSizeOptions', function () {
    const options = [10, 20, 30, 40];
    const wrapper = mount(Pagination, {
      propsData: {
        pageSizeOptions: options,
        total: 200
      }
    });
    expect(wrapper.vm.defaultPageSizeOptions).to.equal(options);
    // options.forEach((item) => {
    //   expect(wrapper.vm.defaultPageSizeOptions).to.include(item);
    // })
  });

  it('showSizeChanger', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        showSizeChanger: true,
        total: 100
      }
    });
    expect(wrapper.find('.mtd-pagination-options').exists()).to.be.true;
  });

  it('showTotal', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 100,
        showTotal: true,
      }
    });
    expect(wrapper.find('.mtd-pagination-total').exists()).to.be.true;
  });

  it('total', () => {
    const total = 100;
    const wrapper = mount(Pagination, {
      propsData: {
        total,
        showTotal: true,
      }
    });
    expect(wrapper.find('.mtd-pagination-total').text()).equal(`共${total}条`);
  });

  it('showQuickJumper', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        showQuickJumper: true,
        total: 100
      }
    });
    expect(wrapper.find('.mtd-pagination-jumper').exists()).to.be.true;
  });

  it('selectClass', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        showSizeChanger: true,
        selectClass: 'xxx',
        total: 100
      }
    });
    expect(wrapper.find('.mtd-pagination-options').classes()).to.include(`xxx`);
  });

  it('pageConut', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 30,
      }
    });
    expect(wrapper.findAll('.mtd-pager-number')).to.length(3);
  });

  it('currentPage', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 100,
        currentPage: 3
      }
    });
    expect(wrapper.find('li.mtd-pager-item.mtd-pager-active').text()).equal('3');
  });

  // 不符合规则的 currentPage
  it('currentPage: currentPage > pageCount', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 100,
        currentPage: 20
      }
    });
    expect(wrapper.find('li.mtd-pager-item.mtd-pager-active').exists()).to.be.false;
    // const current = wrapper.emitted()['change'];
    // const update = wrapper.emitted()['update:currentPage'];
    // expect(current).to.be.ok;
    // expect(update).to.be.ok;
    // expect(current[0]).eql([10, 10]);
    // expect(update[0]).eql([10]);
  });

  // 不符合规则的 currentPage < 1
  it('currentPage: currentPage < 1', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 100,
        currentPage: -2
      }
    });
    expect(wrapper.find('li.mtd-pager-item.mtd-pager-active').text()).equal('1');
    const current = wrapper.emitted()['change'];
    const update = wrapper.emitted()['update:currentPage'];
    expect(current).to.be.ok;
    expect(update).to.be.ok;
    expect(current[0]).eql([1, 10]);
    expect(update[0]).eql([1]);
  });

  it('pagerCount', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 300,
        pagerCount: 21
      }
    });
    expect(wrapper.findAll('li.mtd-pager-number')).to.length(21);
  });

  it('event pager: change', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        total: 100,
      }
    });
    wrapper.find('.mtd-pager-number').trigger('click');
    const current = wrapper.emitted()['change'];
    const update = wrapper.emitted()['update:currentPage'];
    expect(current).to.be.ok;
    expect(update).to.be.ok;
    expect(current[0]).eql([1, 10]);
    expect(update[0]).eql([1]);
  });

  // jumper 失去焦点
  it('event jumper blur: change', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        showQuickJumper: true,
        total: 100,
      }
    });
    const input = wrapper.find('.mtd-pagination-jumper-input');
    input.element.value = 6;
    input.trigger('blur');
    const current = wrapper.emitted()['change'];
    const update = wrapper.emitted()['update:currentPage'];
    expect(current).to.be.ok;
    expect(update).to.be.ok;
    expect(current[0]).eql([6, 10]);
    expect(update[0]).eql([6]);
  });

  // jumper enter
  it('event jumper keyup enter: change', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        showQuickJumper: true,
        total: 100,
      }
    });
    const input = wrapper.find('.mtd-pagination-jumper-input');
    input.element.value = 6;
    input.trigger('keyup.enter');
    const current = wrapper.emitted()['change'];
    const update = wrapper.emitted()['update:currentPage'];
    expect(current).to.be.ok;
    expect(update).to.be.ok;
    expect(current[0]).eql([6, 10]);
    expect(update[0]).eql([6]);
  });

   // jumper enter blur, 当输入的值大于最大pagecount时
  it('event jumper max: change', () => {
    const values = ['keyup.enter', 'blur'];
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        showQuickJumper: true,
        total: 100,
      }
    });
    values.forEach((item) => {
      const input = wrapper.find('.mtd-pagination-jumper-input');
      input.element.value = 30;
      input.trigger(item);
      const current = wrapper.emitted()['change'];
      const update = wrapper.emitted()['update:currentPage'];
      expect(current).to.be.ok;
      expect(update).to.be.ok;
      expect(current[0]).eql([10, 10]);
      expect(update[0]).eql([10]);
    });
  });

   // jumper enter blur, 当输入的值大于最大pagecount时
  it('event jumper min: change', () => {
    const values = ['keyup.enter', 'blur'];
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        showQuickJumper: true,
        total: 100,
      }
    });
    values.forEach((item) => {
      const input = wrapper.find('.mtd-pagination-jumper-input');
      input.element.value = 0;
      input.trigger(item);
      const current = wrapper.emitted()['change'];
      const update = wrapper.emitted()['update:currentPage'];
      expect(current).to.be.ok;
      expect(update).to.be.ok;
      expect(current[0]).eql([1, 10]);
      expect(update[0]).eql([1]);
    });
  });
  // jumper decimal, 当输入的值为小数时，应该跳到舍弃小数点的整数页
  it('jumper decimal', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 3,
        showQuickJumper: true,
        total: 100,
      }
    });
    const input = wrapper.find('.mtd-pagination-jumper-input');
    input.element.value = 4.5;
    input.trigger('blur');
    const update = wrapper.emitted()['update:currentPage'];
    expect(update[0]).eql([4]);
  });

  it('update:pageSize', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 1,
        showSizeChanger: true,
        total: 100,
        pageSize: 10,
      },
    });
    const options = wrapper.find({ name: 'PaginationOptions' });
    options.vm.$emit('change', 20);
    const updateEvent = wrapper.emitted()['update:pageSize'];
    expect(updateEvent, 'expect trigger update:pageSize event').to.be.ok;
    expect(updateEvent[0][0]).eql(20);
    expect(wrapper.emitted().change[0],
      'expect trigger change event').to.be.eql([1, 20]);

    expect(wrapper.emitted()['update:currentPage']).to.be.not.true;
    expect(wrapper.emittedByOrder().length).to.be.eql(2); // update:pageSize, change
  });

  // 当页数从小值改成大值时，当前页数可能会超过总页数，此时需要将当前页数更改为总页数
  it('should update currentPage When the maximum number of pages is greater than the current number of pages due to page number changes', function () {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 10,
        showSizeChanger: true,
        total: 100,
        pageSize: 10,
      },
    });

    const options = wrapper.find({ name: 'PaginationOptions' });
    options.vm.$emit('change', 20);

    expect(wrapper.emitted()['update:currentPage']).to.be.ok;
    expect(wrapper.emitted()['update:currentPage'][0]).to.eql([5]);
    expect(wrapper.emitted().change[0]).to.eql([5, 20]);
    const eventOrder = wrapper.emittedByOrder();
    const names = eventOrder.map((event) => event.name);
    expect(names).to.be.eql(['update:pageSize', 'update:currentPage', 'change']);
  });

  it('should update currentPage when total number dynamic change to small value', function () {
    const wrapper = mount(Pagination, {
      propsData: {
        currentPage: 10,
        showSizeChanger: true,
        total: 100,
        pageSize: 10,
      },
    });
    wrapper.setProps({ total: 50 });

    expect(wrapper.emitted()['update:currentPage'][0], 'should update currentPage').to.eql([5]);
  })
});

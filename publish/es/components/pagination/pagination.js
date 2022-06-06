import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';

import WtPage from './pager';
import WtOptions from './options';

import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

export default {
  name: 'WtPagination',
  components: {
    WtPage: WtPage,
    WtOptions: WtOptions
  },
  props: {
    size: {
      type: String
    },
    unborder: Boolean,
    simple: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOptions: {
      type: Array,
      default: function _default() {
        return [10, 20, 50, 100];
      }
    },
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    pagerCount: Number,
    selectClass: String,
    selectProps: Object,
    simpleReadonly: Boolean
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('pagination');
    },
    defaultPageCount: function defaultPageCount() {
      var pageCount = Math.ceil(Number(this.total) / Number(this.pageSize));
      if (!isNaN(pageCount) && pageCount > 0) {
        return pageCount;
      }
      return 1;
    },
    defaultCurrentPage: function defaultCurrentPage() {
      if (isNaN(this.currentPage) || this.currentPage < 1) {
        this.handleCurrentChange(1);
        return 1;
      } else if (this.currentPage > this.defaultPageCount) {
        this.handleCurrentChange(this.defaultPageCount);
        return this.defaultPageCount;
      }
      return this.currentPage;
    },
    defaultPageSizeOptions: function defaultPageSizeOptions() {
      var psizeOptions = this.pageSizeOptions;
      if (this.pageSizeOptions.indexOf(this.pageSize) === -1) {
        psizeOptions.unshift(this.pageSize);
      }
      return psizeOptions;
    }
  },

  methods: {
    handleChange: function handleChange(e) {
      e.target.value = ~~e.target.value;
      this.handleCurrentChange(Number(e.target.value));
    },
    handleKeyup: function handleKeyup(e) {
      e.keyCode === 13 && this.handleCurrentChange(Number(e.target.value));
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var page = ~~(val > this.defaultPageCount ? this.defaultPageCount : val > 1 ? val : 1);
      if (page !== this.currentPage) {
        this.$emit('update:currentPage', page);
        this.$emit('change', page, this.pageSize);
      }
    },
    handlePageSizeChange: function handlePageSizeChange(val) {
      var pageCount = Math.max(1, Math.ceil(Number(this.total) / Number(val)));
      this.$emit('update:pageSize', val);
      var currentPage = pageCount < this.defaultCurrentPage ? pageCount : this.defaultCurrentPage;

      if (currentPage !== this.defaultCurrentPage) {
        this.$emit('update:currentPage', currentPage);
      }
      this.$emit('change', currentPage, val);

      // (pageCount >= this.defaultCurrentPage) &&
      //   this.$emit('change', this.currentPage, val);
    }
  },
  render: function render(h) {
    var size = this.size,
        simple = this.simple,
        prefix = this.prefix;

    var simpleClass = simple ? prefix + '-simple' : '';
    var sizeClass = size ? prefix + '-' + size : '';
    return h(
      'div',
      { 'class': prefix + ' ' + simpleClass + ' ' + sizeClass },
      [h(WtPage, _mergeJSXProps([this.$attr, {
        attrs: {
          unborder: this.unborder,
          size: size,
          simple: simple,
          currentPage: this.defaultCurrentPage,
          pageCount: this.defaultPageCount,
          pagerCount: this.pagerCount,
          simpleReadonly: this.simpleReadonly
        },
        on: {
          'change': this.handleCurrentChange
        }
      }])), this.showQuickJumper && h(
        'span',
        { 'class': prefix + '-jumper' },
        [h('span', ['\u524D\u5F80']), h('input', {
          'class': prefix + '-jumper-input',
          attrs: { type: 'number'
          },
          domProps: {
            'value': this.defaultCurrentPage
          },
          on: {
            'keyup': this.handleKeyup,
            'blur': this.handleChange
          }
        })]
      ), this.showSizeChanger && h(WtOptions, {
        attrs: { size: size,
          selectProps: this.selectProps,
          pageSizeOptions: this.defaultPageSizeOptions,
          pageSize: this.pageSize
        },
        'class': this.selectClass || '',
        on: {
          'change': this.handlePageSizeChange
        }
      }), this.showTotal && h(
        'span',
        { 'class': prefix + '-total' },
        ['\u5171', this.total, '\u6761']
      )]
    );
  }
};
<script>
import WtPage from './pager';
import WtOptions from './options';

import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtPagination',
  components: {
    WtPage,
    WtOptions,
  },
  props: {
    size: {
      type: String,
    },
    unborder: Boolean,
    simple: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizeOptions: {
      type: Array,
      default () {
        return [10, 20, 50, 100];
      },
    },
    showSizeChanger: {
      type: Boolean,
      default: false,
    },
    showQuickJumper: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    showTotal: {
      type: Boolean,
      default: false,
    },
    pagerCount: Number,
    selectClass: String,
    selectProps: Object,
    simpleReadonly: Boolean,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('pagination');
    },
    defaultPageCount () {
      const pageCount = Math.ceil(Number(this.total) /
      Number(this.pageSize));
      if (!isNaN(pageCount) && pageCount > 0) {
        return pageCount;
      }
      return 1;
    },
    defaultCurrentPage () {
      if (isNaN(this.currentPage) || this.currentPage < 1) {
        this.handleCurrentChange(1);
        return 1;
      } else if (this.currentPage > this.defaultPageCount) {
        this.handleCurrentChange(this.defaultPageCount);
        return this.defaultPageCount;
      }
      return this.currentPage;
    },
    defaultPageSizeOptions () {
      const psizeOptions = this.pageSizeOptions;
      if (this.pageSizeOptions.indexOf(this.pageSize) === -1) {
        psizeOptions.unshift(this.pageSize);
      }
      return psizeOptions;
    },
  },

  methods: {
    handleChange (e) {
      e.target.value = ~~(e.target.value);
      this.handleCurrentChange(Number(e.target.value));
    },
    handleKeyup (e) {
      (e.keyCode === 13) && this.handleCurrentChange(Number(e.target.value));
    },
    handleCurrentChange (val) {
      const page = ~~(val > this.defaultPageCount
        ? this.defaultPageCount : (val > 1 ? val : 1));
      if (page !== this.currentPage) {
        this.$emit('update:currentPage', page);
        this.$emit('change', page, this.pageSize);
      }
    },
    handlePageSizeChange (val) {
      const pageCount = Math.max(1, Math.ceil(Number(this.total) / Number(val)));
      this.$emit('update:pageSize', val);
      const currentPage = pageCount < this.defaultCurrentPage
        ? pageCount : this.defaultCurrentPage;

      if (currentPage !== this.defaultCurrentPage) {
        this.$emit('update:currentPage', currentPage);
      }
      this.$emit('change', currentPage, val);

      // (pageCount >= this.defaultCurrentPage) &&
      //   this.$emit('change', this.currentPage, val);
    },
  },
  render (h) {
    const { size, simple, prefix } = this;
    const simpleClass = simple ? `${prefix}-simple` : '';
    const sizeClass = size ? `${prefix}-${size}` : '';
    return (
      <div class={`${prefix} ${simpleClass} ${sizeClass}`}>
        <WtPage
          {...this.$attr}
          unborder={this.unborder}
          size={size}
          simple={simple}
          currentPage={this.defaultCurrentPage}
          pageCount={this.defaultPageCount}
          pagerCount={this.pagerCount}
          simpleReadonly={this.simpleReadonly}
          onChange={ this.handleCurrentChange } />
        {this.showSizeChanger && <WtOptions size={size}
          selectProps={this.selectProps}
          pageSizeOptions={this.defaultPageSizeOptions}
          pageSize={this.pageSize}
          class={this.selectClass || ''}
          onChange={ this.handlePageSizeChange } />}
        {this.showQuickJumper && <span class={`${prefix}-jumper`}>
          <span>前往</span>
          <input
            class={`${prefix}-jumper-input`}
            type="number"
            value={this.defaultCurrentPage}
            onKeyup={this.handleKeyup}
            onBlur={this.handleChange} />
        </span>}
        {this.showTotal &&
        <span class={`${prefix}-total`}>共{this.total}条</span>}
      </div>
    );
  },
};
</script>

<template>
  <div
    :class="[prefix, {
      [`${prefix}-fit`]: fit,
      [`${prefix}-striped`]: striped,
      [`${prefix}-border`]: bordered || isGroup,
      [`${prefix}-hidden`]: isHidden,
      [`${prefix}-group`]: isGroup,
      [`${prefix}-fluid-height`]: maxHeight,
      [`${prefix}-scrollable-x`]: layout.scrollX,
      [`${prefix}-scrollable-y`]: layout.scrollY,
      [`${prefix}-${size}`]: size,
      [`${prefix}-empty`]: isEmpty,
      [`${prefix}-loading`]: loading,
    }]"
    @mouseleave="handleMouseLeave($event)">
    <div :class="`${prefix}-hidden-columns`" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      :class="`${prefix}-header-wrapper`"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :store="store"
        :border="bordered"
        :fixed="false"
        :prefix="prefix"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }" />
    </div>
    <div
      ref="bodyWrapper"
      :class="[`${prefix}-body-wrapper`,
        layout.scrollX
          ? `${prefix}-scrolling-${scrollPosition}` : `${prefix}-scrolling-none`
      ]"
      :style="[bodyHeight]">
      <table-body
        :highlight="highlightCurrentRow"
        :context="context"
        :store="store"
        :striped="striped"
        :row-class="rowClass"
        :row-style="rowStyle"
        :prefix="prefix"
        :disable-mouse-event="disableMouseEvent"
        :style="{
           width: bodyWidth
        }" />
      <div
        v-if="isEmpty"
        :class="`${prefix}-empty-block`"
        :style="{
          width: bodyWidth
        }">
        <span :class="`${prefix}-empty-text`">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <div :class="`${prefix}-loading-block`" v-if="loading">
        <slot name="loading">
          <wt-loading :message="loadingMessage" />
        </slot>
      </div>
      <div
        v-if="$slots.append"
        :class="`${prefix}-append-wrapper`"
        ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      :class="`${prefix}-footer-wrapper`"
      ref="footerWrapper">
      <table-footer
        :store="store"
        :border="bordered"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :prefix="prefix"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }" />
    </div>
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      :class="`${prefix}-fixed`"
      ref="fixedWrapper"
      :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
        v-if="showHeader"
        :class="`${prefix}-fixed-header-wrapper`"
        ref="fixedHeaderWrapper">
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="bordered"
          :store="store"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
      </div>
      <div
        :class="`${prefix}-fixed-body-wrapper`"
        ref="fixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          :highlight="highlightCurrentRow"
          fixed="left"
          :store="store"
          :striped="striped"
          :row-class="rowClass"
          :row-style="rowStyle"
          :disable-mouse-event="disableMouseEvent"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
        <div
          v-if="$slots.append"
          :class="`${prefix}-append-gutter`"
          :style="{
            height: layout.appendHeight + 'px'
          }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        :class="`${prefix}-fixed-footer-wrapper`"
        ref="fixedFooterWrapper">
        <table-footer
          fixed="left"
          :border="bordered"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          :store="store"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      :class="`${prefix}-fixed-right`"
      ref="rightFixedWrapper"
      :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY
          ? (bordered
            ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
        :class="`${prefix}-fixed-header-wrapper`"
        ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="bordered"
          :store="store"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
      </div>
      <div
        :class="`${prefix}-fixed-body-wrapper`"
        ref="rightFixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          :highlight="highlightCurrentRow"
          fixed="right"
          :store="store"
          :striped="striped"
          :row-class="rowClass"
          :row-style="rowStyle"
          :disable-mouse-event="disableMouseEvent"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        :class="`${prefix}-fixed-footer-wrapper`"
        ref="rightFixedFooterWrapper">
        <table-footer
          fixed="right"
          :border="bordered"
          :sum-text="sumText"
          :summary-method="summaryMethod"
          :store="store"
          :prefix="prefix"
          :style="{
            width: bodyWidth
          }" />
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      :class="`${prefix}-fixed-right-patch`"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"></div>
    <div
      :class="`${prefix}-column-resize-proxy`"
      ref="resizeProxy"
      v-show="resizeProxyVisible"></div>
    <wt-tooltip v-bind="tooltipProps"
      placement="top"
      ref="tooltip"
      trigger="custom"
      :popper-class="[tooltipClass, `${prefix}-overflow-tooltip`]"
      :visible="tooltipVisible"
      :content="tooltipContent"
    />
    <wt-pagination
      :class="`${prefix}-integ-pagination`"
      v-if="pagination"
      :total="pagination.total"
      :current-page.sync="pagination.currentPage"
      :page-size.sync="pagination.pageSize"
      :show-quick-jumper="pagination.showQuickJumper"
      :show-size-changer="pagination.showSizeChanger"
      :show-total="pagination.showTotal"
      @change="pagination.onChange"
      :unborder="pagination.unborder"
      :page-size-options="pagination.pageSizeOptions"
      :pager-count="pagination.pagerCount"
    />
    <wt-pagination
      :class="`${prefix}-integ-pagination`"
      v-if="autoPaging && data.length !== 0"
      :total="data.length"
      :current-page.sync="autoPagination.currentPage"
      :page-size.sync="autoPagination.pageSize"
      :show-quick-jumper="true"
      :show-size-changer="true"
      :show-total="true"
      @change="autoPaginationChange"
      :unborder="false"
      :page-size-options="autoPagination.pageSizeOptions"
      :pager-count="autoPagination.pagerCount"
    />
  </div>
</template>

<script>
import WtLoading from '@components/loading';
import WtTooltip from '@components/tooltip';
import debounce from 'throttle-debounce/debounce';
import WtPagination from '@components/pagination';
import {
  addResizeListener,
  removeResizeListener,
} from '@/utils/resize-event';
import Mousewheel from './utils/mousewheel';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import { createStore, mapStates, syncStates } from './store/index';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

let tableIdSeed = 1;

export default {
  name: 'Table',

  directives: {
    Mousewheel,
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody,
    WtLoading,
    WtTooltip,
    WtPagination,
  },

  // mixins: [Locale, Migrating],

  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true,
    },

    striped: Boolean,

    bordered: Boolean,

    pagination: [Boolean, Object],

    rowKey: [String, Function],

    context: Object,

    showHeader: {
      type: Boolean,
      default: true,
    },

    showSummary: Boolean,

    sumText: {
      type: String,
      default: '合计',
    },

    summaryMethod: Function,

    rowClass: [String, Function],

    rowStyle: [Object, Function],

    cellClass: [String, Function],

    cellStyle: [Object, Function],

    headerRowClass: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClass: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],

    loading: Boolean,
    loadingMessage: String,

    emptyText: {
      type: String,
      default: '暂无数据',
    },

    expandable: Function,
    expandRowKeys: {
      type: Array,
      default () {
        return [];
      },
    },
    checkboxable: Function,
    selectable: Function,
    selection: {
      type: Array,
      default () {
        return [];
      },
    },
    reserveSelection: Boolean,
    indexOfSelection: {
      // required when has selection column
      type: Function,
      default (row, selection) {
        return selection.indexOf(row);
      },
    },

    sortOrder: Object,

    rowColSpan: Function,
    showOverflowTooltip: Boolean,
    overflowSelector: String,
    tooltipProps: Object,
    tooltipClass: [String, Object, Array],
    disableMouseEvent: Boolean,

    // tree
    tree: Boolean,
    treeFieldNames: Object,
    indent: {
      type: Number,
      default: 24,
    },
    loadData: {
      type: Function,
    },
    loadedKeys: {
      type: Array,
      default () {
        return [];
      },
    },
    findTreeColumnIndex: {
      type: Function,
    },
    expandOnClickTr: Boolean,
    resizeImmediate: { // 暂时保留，后期去除
      type: Boolean,
      default: true,
    },
    autoPaging: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },

  data () {
    const layout = new TableLayout({
      table: this,
      fit: this.fit,
      showHeader: this.showHeader,
    });

    const store = createStore(this, [{
      mutations: {
        'updateColumns': (state) => {
          this.$nextTick(this.doReflow);
        },
      },
    }]);
    return {
      store,
      layout,
      hoverRow: undefined,
      hoverState: undefined, // use in mouse event
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null,
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left',

      CheckboxPropsCache: {},
      // use in table-body
      tooltipContent: '',
      tooltipVisible: false,
      autoPagination: {
        currentPage: 1,
        pageSize: this.$props.itemsPerPage,
        pagerCount: 5,
        pageSizeOptions: [20, 50, 100],
      },
    };
  },

  computed: {
    prefix () {
      return this.config.getPrefixCls('table');
    },
    ...mapStates({
      columns: 'columns',
      fixedColumns: 'fixedColumns',
      rightFixedColumns: 'rightFixedColumns',
    }),

    bodyWrapper () {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight () {
      return this.height ||
          this.maxHeight ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
    },

    bodyWidth () {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },

    bodyHeight () {
      if (this.height) {
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight - 50 + 'px' : '',
        };
      } else if (this.maxHeight) {
        return {
          'max-height': (
            this.showHeader ? this.maxHeight -
              this.layout.headerHeight - this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + 'px',
        };
      }
      return {};
    },

    fixedBodyHeight () {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight
            ? this.layout.fixedBodyHeight + 'px' : '',
        };
      } else if (this.maxHeight) {
        let maxHeight = this.layout.scrollX
          ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        maxHeight -= this.layout.footerHeight;

        return {
          'max-height': maxHeight + 'px',
        };
      }

      return {};
    },

    fixedHeight () {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0,
          };
        }
        const { data } = this.store.states;
        return {
          bottom: (this.layout.scrollX && data)
            ? this.layout.gutterWidth + 'px' : '',
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight
              ? this.layout.tableHeight + 'px' : '',
          };
        }
        return {
          height: this.layout.viewportHeight
            ? this.layout.viewportHeight + 'px' : '',
        };
      }
    },

    isEmpty () {
      const { data } = this.store.states;
      return !this.loading && (!data || !data.length);
    },
    _selectable () {
      return this.checkboxable || this.selectable;
    },
  },

  watch: {
    ...syncStates({
      tree: 'treeEnabled',
      reserveSelection: 'reserveSelection',
      indexOfSelection: 'indexOfSelection',
      _selectable: 'selectable',
      selection: 'selection',
      sortOrder: 'sortOrder',
      rowKey: 'rowKey',
      currentRowKey: 'currentRowKey',
      loadedKeys: 'loadedKeys',
      treeFieldNames: 'treeFieldNames',
      loadData: 'loadData',
    }),
    height: {
      immediate: true,
      handler (value) {
        this.layout.setHeight(value);
      },
    },

    maxHeight: {
      immediate: true,
      handler (value) {
        this.layout.setMaxHeight(value);
      },
    },

    data: {
      immediate: true,
      handler (value) {
        this.store.setData(this.data);
        if (this.$ready) {
          this.$nextTick(() => {
            this.doReflow();
          });
        }
      },
    },
    expandRowKeys: {
      immediate: true,
      handler: function (val) {
        const fn = this.store[`setExpandRowKeys`];
        fn && fn(val);
        if (this.shouldUpdateHeight) {
          this.$nextTick(() => {
            this.layout.updateElsHeight();
          });
        }
      },
    },
  },

  created () {
    this.tableId = `${this.prefix}_` + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doReflow());
    this.debounceResizeListener = debounce(50, this.resizeListener);
    if (this.$props.autoPaging) {
      this.store.setData(this.$props.data.slice(0, this.$props.itemsPerPage));
    }
  },

  destroyed () {
    if (this.debounceResizeListener) {
      removeResizeListener(this.$el, this.debounceResizeListener);
    }
  },

  mounted () {
    this.bindEvents();

    this.$ready = true;
    this.store.setReady(this.$ready);

    this.doReflow();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
    };
    this.fixSafariLayout();
  },

  activated () {
    this.fixSafariLayout();
  },

  deactivated () {
    this.hideTooltip();
  },

  methods: {
    fixSafariLayout () {
      if (/chrome/i.test(navigator.userAgent) || !/safari/i.test(navigator.userAgent)) {
        return;
      }
      // see https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7533564
      if (this.$el) {
        // 不走 vue 的生命周期
        const tables = [...this.$el.querySelectorAll('table')];
        tables.forEach((table) => {
          table.style['table-layout'] = 'auto';
        });
        setTimeout(() => {
          tables.forEach((table) => {
            table.style['table-layout'] = '';
          });
        }, 20);
      }
    },
    scheduleLayout (updateColumns) {
      if (updateColumns) {
        this.store.updateColumns();
      }
      this.debouncedUpdateLayout();
    },
    // dom event handle
    handleMouseLeave () {
      this.store.setHoverRow(null);
      if (this.hoverState) this.hoverState = null;
    },

    updateScrollY () {
      this.layout.updateScrollY();
      this.layout.updateColumnsWidth();
    },

    handleFixedMousewheel (event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 &&
          bodyWrapper.scrollHeight - bodyWrapper.clientHeight >
            currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },

    handleHeaderFooterMousewheel (event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },

    bindEvents () {
      const { headerWrapper, footerWrapper } = this.$refs;
      const refs = this.$refs;
      const self = this;

      this.bodyWrapper.addEventListener('scroll', function () {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper) {
          refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        }
        if (refs.rightFixedBodyWrapper) {
          refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        }
        const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        const scrollLeft = this.scrollLeft;
        // todo 可优化，目前会引起 table 的重新渲染
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      });

      if (this.fit) {
        addResizeListener(this.$el, this.debounceResizeListener);
      }
    },

    resizeListener () {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;

      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doReflow();
      }
    },

    doReflow () {
      this.layout.updateColumnsWidth();
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
    },

    scrollTo (px) {
      this.$refs.bodyWrapper.scrollTop = px;
    },

    getPopper () {
      return this.$refs.tooltip.getPopper();
    },
    showTooltip (reference, content) {
      // 需要销毁才能更新 reference
      const popper = this.getPopper();
      if (!popper) {
        return;
      }
      popper.destroy();
      this.tooltipVisible = true;
      this.tooltipContent = content;
      popper.reference = reference;
      popper.updatePopper();
    },
    hideTooltip () {
      this.tooltipVisible = false;
    },
    autoPaginationChange (current, size) {
      this.autoPagination.pageSize = size;
      this.autoPagination.currentPage = current;
      const startIndex = (current - 1) * size;
      const endIndex = startIndex + size;
      const currentData = this.$props.data.slice(startIndex, endIndex);
      this.store.setData(currentData);
    },
  },
};
</script>

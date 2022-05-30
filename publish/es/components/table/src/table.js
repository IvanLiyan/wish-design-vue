import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import MtdLoading from '@wish/wt-vue/es/components/loading';
import MtdTooltip from '@wish/wt-vue/es/components/tooltip';
import debounce from 'throttle-debounce/debounce';
import { addResizeListener, removeResizeListener } from '@wish/wt-vue/es/utils/resize-event';
import Mousewheel from './utils/mousewheel';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import { createStore, mapStates, syncStates } from './store/index';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var tableIdSeed = 1;

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-fit"] = _vm.fit, _obj[_vm.prefix + "-striped"] = _vm.striped, _obj[_vm.prefix + "-border"] = _vm.bordered || _vm.isGroup, _obj[_vm.prefix + "-hidden"] = _vm.isHidden, _obj[_vm.prefix + "-group"] = _vm.isGroup, _obj[_vm.prefix + "-fluid-height"] = _vm.maxHeight, _obj[_vm.prefix + "-scrollable-x"] = _vm.layout.scrollX, _obj[_vm.prefix + "-scrollable-y"] = _vm.layout.scrollY, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj[_vm.prefix + "-empty"] = _vm.isEmpty, _obj[_vm.prefix + "-loading"] = _vm.loading, _obj)], on: { "mouseleave": function mouseleave($event) {
        return _vm.handleMouseLeave($event);
      } } }, [_c('div', { ref: "hiddenColumns", class: _vm.prefix + "-hidden-columns" }, [_vm._t("default")], 2), _vm._v(" "), _vm.showHeader ? _c('div', { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleHeaderFooterMousewheel, expression: "handleHeaderFooterMousewheel" }], ref: "headerWrapper", class: _vm.prefix + "-header-wrapper" }, [_c('table-header', { ref: "tableHeader", style: {
      width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : ''
    }, attrs: { "store": _vm.store, "border": _vm.bordered, "fixed": false, "prefix": _vm.prefix } })], 1) : _vm._e(), _vm._v(" "), _c('div', { ref: "bodyWrapper", class: [_vm.prefix + "-body-wrapper", _vm.layout.scrollX ? _vm.prefix + "-scrolling-" + _vm.scrollPosition : _vm.prefix + "-scrolling-none"], style: [_vm.bodyHeight] }, [_c('table-body', { style: {
      width: _vm.bodyWidth
    }, attrs: { "highlight": _vm.highlightCurrentRow, "context": _vm.context, "store": _vm.store, "striped": _vm.striped, "row-class": _vm.rowClass, "row-style": _vm.rowStyle, "prefix": _vm.prefix, "disable-mouse-event": _vm.disableMouseEvent } }), _vm._v(" "), _vm.isEmpty ? _c('div', { class: _vm.prefix + "-empty-block", style: {
      width: _vm.bodyWidth
    } }, [_c('span', { class: _vm.prefix + "-empty-text" }, [_vm._t("empty", function () {
    return [_vm._v(_vm._s(_vm.emptyText))];
  })], 2)]) : _vm._e(), _vm._v(" "), _vm.loading ? _c('div', { class: _vm.prefix + "-loading-block" }, [_vm._t("loading", function () {
    return [_c('wt-loading', { attrs: { "message": _vm.loadingMessage } })];
  })], 2) : _vm._e(), _vm._v(" "), _vm.$slots.append ? _c('div', { ref: "appendWrapper", class: _vm.prefix + "-append-wrapper" }, [_vm._t("append")], 2) : _vm._e()], 1), _vm._v(" "), _vm.showSummary ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }, { name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleHeaderFooterMousewheel, expression: "handleHeaderFooterMousewheel" }], ref: "footerWrapper", class: _vm.prefix + "-footer-wrapper" }, [_c('table-footer', { style: {
      width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : ''
    }, attrs: { "store": _vm.store, "border": _vm.bordered, "sum-text": _vm.sumText, "summary-method": _vm.summaryMethod, "prefix": _vm.prefix } })], 1) : _vm._e(), _vm._v(" "), _vm.fixedColumns.length > 0 ? _c('div', { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleFixedMousewheel, expression: "handleFixedMousewheel" }], ref: "fixedWrapper", class: _vm.prefix + "-fixed", style: [{
      width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
    }, _vm.fixedHeight] }, [_vm.showHeader ? _c('div', { ref: "fixedHeaderWrapper", class: _vm.prefix + "-fixed-header-wrapper" }, [_c('table-header', { ref: "fixedTableHeader", style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "left", "border": _vm.bordered, "store": _vm.store, "prefix": _vm.prefix } })], 1) : _vm._e(), _vm._v(" "), _c('div', { ref: "fixedBodyWrapper", class: _vm.prefix + "-fixed-body-wrapper", style: [{
      top: _vm.layout.headerHeight + 'px'
    }, _vm.fixedBodyHeight] }, [_c('table-body', { style: {
      width: _vm.bodyWidth
    }, attrs: { "highlight": _vm.highlightCurrentRow, "fixed": "left", "store": _vm.store, "striped": _vm.striped, "row-class": _vm.rowClass, "row-style": _vm.rowStyle, "disable-mouse-event": _vm.disableMouseEvent, "prefix": _vm.prefix } }), _vm._v(" "), _vm.$slots.append ? _c('div', { class: _vm.prefix + "-append-gutter", style: {
      height: _vm.layout.appendHeight + 'px'
    } }) : _vm._e()], 1), _vm._v(" "), _vm.showSummary ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }], ref: "fixedFooterWrapper", class: _vm.prefix + "-fixed-footer-wrapper" }, [_c('table-footer', { style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "left", "border": _vm.bordered, "sum-text": _vm.sumText, "summary-method": _vm.summaryMethod, "store": _vm.store, "prefix": _vm.prefix } })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.rightFixedColumns.length > 0 ? _c('div', { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleFixedMousewheel, expression: "handleFixedMousewheel" }], ref: "rightFixedWrapper", class: _vm.prefix + "-fixed-right", style: [{
      width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : '',
      right: _vm.layout.scrollY ? (_vm.bordered ? _vm.layout.gutterWidth : _vm.layout.gutterWidth || 0) + 'px' : ''
    }, _vm.fixedHeight] }, [_vm.showHeader ? _c('div', { ref: "rightFixedHeaderWrapper", class: _vm.prefix + "-fixed-header-wrapper" }, [_c('table-header', { ref: "rightFixedTableHeader", style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "right", "border": _vm.bordered, "store": _vm.store, "prefix": _vm.prefix } })], 1) : _vm._e(), _vm._v(" "), _c('div', { ref: "rightFixedBodyWrapper", class: _vm.prefix + "-fixed-body-wrapper", style: [{
      top: _vm.layout.headerHeight + 'px'
    }, _vm.fixedBodyHeight] }, [_c('table-body', { style: {
      width: _vm.bodyWidth
    }, attrs: { "highlight": _vm.highlightCurrentRow, "fixed": "right", "store": _vm.store, "striped": _vm.striped, "row-class": _vm.rowClass, "row-style": _vm.rowStyle, "disable-mouse-event": _vm.disableMouseEvent, "prefix": _vm.prefix } })], 1), _vm._v(" "), _vm.showSummary ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }], ref: "rightFixedFooterWrapper", class: _vm.prefix + "-fixed-footer-wrapper" }, [_c('table-footer', { style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "right", "border": _vm.bordered, "sum-text": _vm.sumText, "summary-method": _vm.summaryMethod, "store": _vm.store, "prefix": _vm.prefix } })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.rightFixedColumns.length > 0 ? _c('div', { ref: "rightFixedPatch", class: _vm.prefix + "-fixed-right-patch", style: {
      width: _vm.layout.scrollY ? _vm.layout.gutterWidth + 'px' : '0',
      height: _vm.layout.headerHeight + 'px'
    } }) : _vm._e(), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.resizeProxyVisible, expression: "resizeProxyVisible" }], ref: "resizeProxy", class: _vm.prefix + "-column-resize-proxy" }), _vm._v(" "), _c('wt-tooltip', _vm._b({ ref: "tooltip", attrs: { "placement": "top", "trigger": "custom", "popper-class": [_vm.tooltipClass, _vm.prefix + "-overflow-tooltip"], "visible": _vm.tooltipVisible, "content": _vm.tooltipContent } }, 'wt-tooltip', _vm.tooltipProps, false))], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Table',

  directives: {
    Mousewheel: Mousewheel
  },

  components: {
    TableHeader: TableHeader,
    TableFooter: TableFooter,
    TableBody: TableBody,
    MtdLoading: MtdLoading,
    MtdTooltip: MtdTooltip
  },

  // mixins: [Locale, Migrating],

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    striped: Boolean,

    bordered: Boolean,

    rowKey: [String, Function],

    context: Object,

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: {
      type: String,
      default: '合计'
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
      default: '暂无数据'
    },

    expandable: Function,
    expandRowKeys: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    checkboxable: Function,
    selectable: Function,
    selection: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    reserveSelection: Boolean,
    indexOfSelection: {
      // required when has selection column
      type: Function,
      default: function _default(row, selection) {
        return selection.indexOf(row);
      }
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
      default: 24
    },
    loadData: {
      type: Function
    },
    loadedKeys: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    findTreeColumnIndex: {
      type: Function
    },
    expandOnClickTr: Boolean,
    resizeImmediate: { // 暂时保留，后期去除
      type: Boolean,
      default: true
    }
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },

  data: function data() {
    var _this = this;

    var layout = new TableLayout({
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });

    var store = createStore(this, [{
      mutations: {
        'updateColumns': function updateColumns(state) {
          _this.$nextTick(_this.doReflow);
        }
      }
    }]);
    return {
      store: store,
      layout: layout,
      hoverRow: undefined,
      hoverState: undefined, // use in mouse event
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left',

      CheckboxPropsCache: {},
      // use in table-body
      tooltipContent: '',
      tooltipVisible: false
    };
  },


  computed: _extends({
    prefix: function prefix() {
      return this.config.getPrefixCls('table');
    }
  }, mapStates({
    columns: 'columns',
    fixedColumns: 'fixedColumns',
    rightFixedColumns: 'rightFixedColumns'
  }), {
    bodyWrapper: function bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight: function shouldUpdateHeight() {
      return this.height || this.maxHeight || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    bodyWidth: function bodyWidth() {
      var _layout = this.layout,
          bodyWidth = _layout.bodyWidth,
          scrollY = _layout.scrollY,
          gutterWidth = _layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },
    bodyHeight: function bodyHeight() {
      if (this.height) {
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        return {
          'max-height': (this.showHeader ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight : this.maxHeight - this.layout.footerHeight) + 'px'
        };
      }
      return {};
    },
    fixedBodyHeight: function fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        maxHeight -= this.layout.footerHeight;

        return {
          'max-height': maxHeight + 'px'
        };
      }

      return {};
    },
    fixedHeight: function fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        var data = this.store.states.data;

        return {
          bottom: this.layout.scrollX && data ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }
    },
    isEmpty: function isEmpty() {
      var data = this.store.states.data;

      return !this.loading && (!data || !data.length);
    },
    _selectable: function _selectable() {
      return this.checkboxable || this.selectable;
    }
  }),

  watch: _extends({}, syncStates({
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
    loadData: 'loadData'
  }), {
    height: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    data: {
      immediate: true,
      handler: function handler(value) {
        var _this2 = this;

        this.store.setData(this.data);
        if (this.$ready) {
          this.$nextTick(function () {
            _this2.doReflow();
          });
        }
      }
    },
    expandRowKeys: {
      immediate: true,
      handler: function handler(val) {
        var _this3 = this;

        var fn = this.store['setExpandRowKeys'];
        fn && fn(val);
        if (this.shouldUpdateHeight) {
          this.$nextTick(function () {
            _this3.layout.updateElsHeight();
          });
        }
      }
    }
  }),

  created: function created() {
    var _this4 = this;

    this.tableId = this.prefix + '_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, function () {
      return _this4.doReflow();
    });
    this.debounceResizeListener = debounce(50, this.resizeListener);
  },
  destroyed: function destroyed() {
    if (this.debounceResizeListener) {
      removeResizeListener(this.$el, this.debounceResizeListener);
    }
  },
  mounted: function mounted() {
    this.bindEvents();

    this.$ready = true;
    this.store.setReady(this.$ready);

    this.doReflow();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    this.fixSafariLayout();
  },
  activated: function activated() {
    this.fixSafariLayout();
  },
  deactivated: function deactivated() {
    this.hideTooltip();
  },


  methods: {
    fixSafariLayout: function fixSafariLayout() {
      if (/chrome/i.test(navigator.userAgent) || !/safari/i.test(navigator.userAgent)) {
        return;
      }
      // see https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7533564
      if (this.$el) {
        // 不走 vue 的生命周期
        var tables = [].concat(_toConsumableArray(this.$el.querySelectorAll('table')));
        tables.forEach(function (table) {
          table.style['table-layout'] = 'auto';
        });
        setTimeout(function () {
          tables.forEach(function (table) {
            table.style['table-layout'] = '';
          });
        }, 20);
      }
    },
    scheduleLayout: function scheduleLayout(updateColumns) {
      if (updateColumns) {
        this.store.updateColumns();
      }
      this.debouncedUpdateLayout();
    },

    // dom event handle
    handleMouseLeave: function handleMouseLeave() {
      this.store.setHoverRow(null);
      if (this.hoverState) this.hoverState = null;
    },
    updateScrollY: function updateScrollY() {
      this.layout.updateScrollY();
      this.layout.updateColumnsWidth();
    },
    handleFixedMousewheel: function handleFixedMousewheel(event, data) {
      var bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        var currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },
    handleHeaderFooterMousewheel: function handleHeaderFooterMousewheel(event, data) {
      var pixelX = data.pixelX,
          pixelY = data.pixelY;

      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },
    bindEvents: function bindEvents() {
      var _$refs = this.$refs,
          headerWrapper = _$refs.headerWrapper,
          footerWrapper = _$refs.footerWrapper;

      var refs = this.$refs;
      var self = this;

      this.bodyWrapper.addEventListener('scroll', function () {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper) {
          refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        }
        if (refs.rightFixedBodyWrapper) {
          refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        }
        var maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        var scrollLeft = this.scrollLeft;
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
    resizeListener: function resizeListener() {
      if (!this.$ready) return;
      var shouldUpdateLayout = false;
      var el = this.$el;
      var _resizeState = this.resizeState,
          oldWidth = _resizeState.width,
          oldHeight = _resizeState.height;


      var width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      var height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doReflow();
      }
    },
    doReflow: function doReflow() {
      this.layout.updateColumnsWidth();
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
    },
    scrollTo: function scrollTo(px) {
      this.$refs.bodyWrapper.scrollTop = px;
    },
    getPopper: function getPopper() {
      return this.$refs.tooltip.getPopper();
    },
    showTooltip: function showTooltip(reference, content) {
      // 需要销毁才能更新 reference
      var popper = this.getPopper();
      if (!popper) {
        return;
      }
      popper.destroy();
      this.tooltipVisible = true;
      this.tooltipContent = content;
      popper.reference = reference;
      popper.updatePopper();
    },
    hideTooltip: function hideTooltip() {
      this.tooltipVisible = false;
    }
  }
};
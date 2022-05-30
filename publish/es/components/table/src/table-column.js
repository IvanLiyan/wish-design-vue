import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import { getPropByPath, hasOwn } from '@wish/wt-vue/es/utils/util';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

var columnIdSeed = 1;

var defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 34,
    minWidth: 34,
    realWidth: 34,
    order: ''
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

function DEFAULT_RENDER_CELL(h, _ref) {
  var row = _ref.row,
      column = _ref.column,
      $index = _ref.$index;

  var property = column.prop;

  var value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
};

function DEFAULT_RENDER_HEADER(h, _ref2) {
  var row = _ref2.row,
      column = _ref2.column;

  return column.label || '';
};

var forced = {
  default: {
    renderHeader: function renderHeader(h, data) {
      var column = data.column;

      var render = column.$scopedSlots.header ? function (h, data) {
        return column.$scopedSlots.header(data);
      } : column.renderHeaderFn || DEFAULT_RENDER_HEADER;
      return render(h, data);
    },
    renderCell: function renderCell(h, data) {
      var column = data.column;

      var render = column.$scopedSlots.default ? function (h, data) {
        return column.$scopedSlots.default(data);
      } : DEFAULT_RENDER_CELL;
      return render(h, data);
    }
  },
  selection: {
    renderHeader: function renderHeader(h, _ref3) {
      var store = _ref3.store;
      var _store$states = store.states,
          isAllSelected = _store$states.isAllSelected,
          hasAnySelected = _store$states.hasAnySelected,
          data = _store$states.data;


      return h('wt-checkbox', {
        on: {
          'click': function click(e) {
            return e.stopPropagation();
          },
          'input': store.toggleAllSelection
        },
        attrs: {
          disabled: data && data.length === 0,
          indeterminate: hasAnySelected && !isAllSelected,

          checked: isAllSelected }
      });
    },
    renderCell: function renderCell(h, _ref4) {
      var row = _ref4.row,
          column = _ref4.column,
          store = _ref4.store,
          $index = _ref4.$index;

      var props = store.getCheckboxPropsByItem(row, $index);

      var on = {
        input: function input(checked) {
          store.rowSelectedChanged(row, checked);
        }
      };

      var nativeOn = {
        click: function click(e) {
          return e.stopPropagation();
        }
      };

      var selection = column.$scopedSlots.selection;
      if (selection) {
        return selection({ props: props, on: on, row: row, $index: $index });
      }
      return h('wt-checkbox', { attrs: props, on: on, nativeOn: nativeOn });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function renderHeader(h, _ref5) {
      var column = _ref5.column;

      return column.label || '#';
    },
    renderCell: function renderCell(h, _ref6) {
      var row = _ref6.row,
          $index = _ref6.$index,
          column = _ref6.column;

      var i = $index + 1;
      var index = column.$scopedSlots.index;
      if (index) {
        return index({ row: row, index: i, $index: $index });
      }

      return h('div', [i]);
    },
    sortable: false
  },
  expand: {
    renderCell: function renderCell(h, _ref7) {
      var row = _ref7.row,
          column = _ref7.column,
          store = _ref7.store,
          $index = _ref7.$index;

      var props = store.getExpandPropsByItem(row, $index);
      var proxy = this._renderProxy;
      var disabled = props.disabled,
          expanded = props.expanded;

      var toggle = function toggle(e) {
        proxy.handleExpandClick(e, row, $index);
      };
      if (disabled) {
        return '';
      }

      var expand = column.$scopedSlots.expand;
      if (expand) {
        var scope = _extends({}, props, { row: row, $index: $index });
        scope.toggle = toggle;
        return expand(scope);
      }

      return h(
        'div',
        { 'class': this.prefix + '-expand-icon ' + (expanded ? this.prefix + '-expand-icon-expanded' : ''),
          on: {
            'click': toggle
          }
        },
        [h(Icon, {
          attrs: { name: 'right-thick' }
        })]
      );
    },
    // sortable: false,
    resizable: false
  }
};

var getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};

  _Object$assign(column, defaults['default'], type ? defaults[type] : {});
  for (var name in options) {
    if (hasOwn(options, name)) {
      var value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};

var parseWidth = function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = undefined;
    }
  }
  return width;
};

var parseMinWidth = function parseMinWidth(minWidth) {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};

export default {
  name: 'WtTableColumn',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClass: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: {
      type: Function
    },
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: false
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    fixed: [Boolean, String],
    formatter: Function,
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default: function _default() {
        return ['ascending', 'descending', null];
      },
      validator: function validator(val) {
        return val.every(function (order) {
          return ['ascending', 'descending', null].indexOf(order) > -1;
        });
      }
    },
    showOverflowTooltip: {
      type: Boolean,
      default: null
    },

    // to support: https://tt.sankuai.com/ticket/detail?id=4121738
    overflowSelector: String,

    filteredValue: Array,
    // 筛选时必须传递此方法
    filterMethod: {
      type: Function
    },
    filters: {
      type: Array
    },
    filterMultiple: {
      type: Boolean,
      default: true
    },
    filterDropdownVisible: Boolean,
    showFilterActions: {
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
    return {
      column: {},
      sFilteredValue: this.filteredValue || [],
      sFilterDropdownVisible: this.filterDropdownVisible || false
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('table');
    },
    owner: function owner() {
      var parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent: function columnOrTableParent() {
      var parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    },
    isSubColumn: function isSubColumn() {
      return this.owner !== this.columnOrTableParent;
    },
    _width: function _width() {
      return parseWidth(this.width);
    },
    _minWidth: function _minWidth() {
      return parseMinWidth(this.minWidth);
    },
    _sortable: function _sortable() {
      return this.sortable === '' ? true : this.sortable;
    },
    _fixed: function _fixed() {
      return this.fixed === '' ? true : this.fixed;
    },
    _showOverflowTooltip: function _showOverflowTooltip() {
      return this.showOverflowTooltip === null ? this.owner.showOverflowTooltip : this.showOverflowTooltip;
    },
    _overflowSelector: function _overflowSelector() {
      return this.overflowSelector === null ? this.owner.overflowSelector : this.overflowSelector;
    },
    alignClass: function alignClass() {
      return this.align ? this.prefix + '-text-' + this.align : undefined;
    },
    headerAlignClass: function headerAlignClass() {
      return this.headerAlign ? this.prefix + '-text-' + this.headerAlign : this.alignClass;
    },
    _column: function _column() {
      var type = this.type;

      var option = {
        id: this.columnId,
        columnKey: this.columnKey,
        label: this.label,
        className: this.className,
        labelClass: this.labelClass,
        prop: this.prop,
        type: type,
        context: this.context,

        width: this._width,
        minWidth: this._minWidth,

        alignClass: this.alignClass,
        headerAlignClass: this.headerAlignClass,

        renderHeaderFn: this.renderHeader,
        formatter: this.formatter,

        fixed: this._fixed,

        sortable: this._sortable,
        sortMethod: this.sortMethod,
        sortOrders: this.sortOrders,
        showOverflowTooltip: this._showOverflowTooltip,
        overflowSelector: this._overflowSelector,
        filterable: this.filters || this.filterMethod,
        filters: this.filters,
        filterDropdownVisible: this.sFilterDropdownVisible,
        filteredValue: this.sFilteredValue,
        filterMethod: this.filterMethod,
        filterMultiple: this.filterMultiple,
        showFilterActions: this.showFilterActions,
        updateFilteredValue: this.updateFilteredValue,
        updateFilterDropdownVisible: this.updateFilterDropdownVisible,
        resizable: this.resizable
      };
      var column = getDefaultColumn(type, option);
      _Object$assign(column, forced['default'], type ? forced[type] : {});
      return column;
    }
  },

  watch: {
    _column: {
      immediate: true,
      handler: function handler(n, v) {
        var _this = this;

        _Object$keys(n).forEach(function (k) {
          var value = n[k];
          if (!v || value !== v[k]) {
            _this.$set(_this.column, k, value);
          }
        });
        var props = ['width', 'minWidth', 'fixed'];
        if (v && props.some(function (p) {
          return n[p] !== v[p];
        })) {
          this.owner.scheduleLayout(n['fixed'] !== v['fixed']);
        }
      }
    },
    filteredValue: function filteredValue(value) {
      this.sFilteredValue = value;
      this.column.filteredValue = this.value;
    },
    filterDropdownVisible: function filterDropdownVisible(visible) {
      this.sFilterDropdownVisible = visible;
      this.column.filterDropdownVisible = this.visible;
    }
  },
  created: function created() {
    var parent = this.columnOrTableParent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++; // computed 时 id 为空

    this.column.id = this.columnId;

    var type = this.type;

    if (type === 'expand') {
      if (this.owner.renderExpanded) {
        console.warn('[WT warn][TableColumn] expand column only allow once');
      } else {
        var self = this;
        this.owner.renderExpanded = function (h, data) {
          return self.$scopedSlots.default ? self.$scopedSlots.default(data) : self.$slots.default;
        };
      }
    }
  },
  destroyed: function destroyed() {
    if (!this.columnOrTableParent) return;
    var parent = this.columnOrTableParent;
    this.owner.store.removeColumn({
      column: this.column,
      parent: this.isSubColumn ? parent.column : null
    });
  },
  mounted: function mounted() {
    var owner = this.owner;
    var parent = this.columnOrTableParent;
    var columnIndex = void 0;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }

    owner.store.insertColumn({
      column: this.column,
      index: columnIndex > -1 ? columnIndex : undefined,
      parent: this.isSubColumn ? parent.column : null
    });
  },
  render: function render(h) {
    this.column.$scopedSlots = this.$scopedSlots; //
    return h('div', [this.$slots.default]);
  },


  methods: {
    updateFilteredValue: function updateFilteredValue(filteredValue) {
      this.$emit('update:filteredValue', filteredValue);
      if (!('filteredValue' in this.$options.propsData)) {
        this.sFilteredValue = filteredValue;
        this.column.filteredValue = this.sFilteredValue;
      }
    },
    updateFilterDropdownVisible: function updateFilterDropdownVisible(filterDropdownVisible) {
      this.$emit('update:filterDropdownVisible', filterDropdownVisible);
      if (!('filterDropdownVisible' in this.$options.propsData)) {
        this.sFilterDropdownVisible = filterDropdownVisible;
        this.column.filterDropdownVisible = this.sFilterDropdownVisible;
      }
    }
  }
};
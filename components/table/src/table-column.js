import { getPropByPath, hasOwn } from '@/utils/util';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';
import Icon from '@components/icon';

let columnIdSeed = 1;

const defaults = {
  default: {
    order: '',
  },
  selection: {
    width: 34,
    minWidth: 34,
    realWidth: 34,
    order: '',
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
};

function DEFAULT_RENDER_CELL(h, { row, column, $index }) {
  const property = column.prop;

  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
};

function DEFAULT_RENDER_HEADER(h, { row, column }) {
  return column.label || '';
};

const forced = {
  default: {
    renderHeader(h, data) {
      const { column } = data;
      const render = column.$scopedSlots.header
        ? (h, data) => column.$scopedSlots.header(data)
        : (column.renderHeaderFn || DEFAULT_RENDER_HEADER);
      return render(h, data);
    },
    renderCell(h, data) {
      const { column } = data;
      const render = column.$scopedSlots.default
        ? (h, data) => column.$scopedSlots.default(data)
        : DEFAULT_RENDER_CELL;
      return render(h, data);
    },
  },
  selection: {
    renderHeader: function (h, { store }) {
      const { isAllSelected, hasAnySelected, data } = store.states;

      return <wt-checkbox on-click={(e) => e.stopPropagation()}
        disabled={data && data.length === 0}
        indeterminate={
          hasAnySelected && !isAllSelected
        }
        on-input={store.toggleAllSelection}
        checked={isAllSelected} />;
    },
    renderCell: function (h, { row, column, store, $index }) {
      const props = store.getCheckboxPropsByItem(row, $index);

      const on = {
        input: (checked) => {
          store.rowSelectedChanged(row, checked);
        },
      };

      const nativeOn = {
        click: (e) => e.stopPropagation(),
      };

      const selection = column.$scopedSlots.selection;
      if (selection) {
        return selection({ props, on, row, $index });
      }
      return <wt-checkbox
        {...{ attrs: props, on: on, nativeOn: nativeOn }} />;
    },
    sortable: false,
    resizable: false,
  },
  index: {
    renderHeader: function (h, { column }) {
      return column.label || '#';
    },
    renderCell: function (h, { row, $index, column }) {
      const i = $index + 1;
      const index = column.$scopedSlots.index;
      if (index) {
        return index({ row, index: i, $index });
      }

      return <div>{i}</div>;
    },
    sortable: false,
  },
  expand: {
    renderCell: function (h, { row, column, store, $index }) {
      const props = store.getExpandPropsByItem(row, $index);
      const proxy = this._renderProxy;
      const { disabled, expanded } = props;
      const toggle = (e) => { proxy.handleExpandClick(e, row, $index); };
      if (disabled) {
        return '';
      }

      const expand = column.$scopedSlots.expand;
      if (expand) {
        const scope = { ...props, row, $index };
        scope.toggle = toggle;
        return expand(scope);
      }

      return <div class={`${this.prefix}-expand-icon ` +
        (expanded ? `${this.prefix}-expand-icon-expanded` : '')} onClick={toggle}
      >
        <Icon name='right-thick' />
      </div>;
    },
    // sortable: false,
    resizable: false,
  },
};

const getDefaultColumn = function (type, options) {
  const column = {};

  Object.assign(column, defaults['default'], type ? defaults[type] : {});
  for (const name in options) {
    if (hasOwn(options, name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth
    : column.width;

  return column;
};

const parseWidth = (width) => {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = undefined;
    }
  }
  return width;
};

const parseMinWidth = (minWidth) => {
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
      default: 'default',
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
      default: false,
    },
    sortMethod: {
      type: Function,
    },
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: false,
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
      default() {
        return ['ascending', 'descending', null];
      },
      validator(val) {
        return val.every(order => ['ascending', 'descending', null]
          .indexOf(order) > -1);
      },
    },
    showOverflowTooltip: {
      type: Boolean,
      default: null,
    },

    // to support: https://tt.sankuai.com/ticket/detail?id=4121738
    overflowSelector: String,

    filteredValue: Array,
    // 筛选时必须传递此方法
    filterMethod: {
      type: Function,
    },
    filters: {
      type: Array,
    },
    filterMultiple: {
      type: Boolean,
      default: true,
    },
    filterDropdownVisible: Boolean,
    showFilterActions: {
      type: Boolean,
      default: true,
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

  data() {
    return {
      column: {},
      sFilteredValue: this.filteredValue || [],
      sFilterDropdownVisible: this.filterDropdownVisible || false,
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('table');
    },
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent() {
      let parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    },
    isSubColumn() {
      return this.owner !== this.columnOrTableParent;
    },
    _width() {
      return parseWidth(this.width);
    },
    _minWidth() {
      return parseMinWidth(this.minWidth);
    },
    _sortable() {
      return this.sortable === '' ? true : this.sortable;
    },
    _fixed() {
      return this.fixed === '' ? true : this.fixed;
    },
    _showOverflowTooltip() {
      return this.showOverflowTooltip === null
        ? this.owner.showOverflowTooltip
        : this.showOverflowTooltip;
    },
    _overflowSelector() {
      return this.overflowSelector === null
        ? this.owner.overflowSelector
        : this.overflowSelector;
    },
    alignClass() {
      return this.align ? `${this.prefix}-text-` + this.align : undefined;
    },
    headerAlignClass() {
      return this.headerAlign
        ? `${this.prefix}-text-` + this.headerAlign
        : this.alignClass;
    },
    _column() {
      const { type } = this;
      const option = {
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
        resizable: this.resizable,
      };
      const column = getDefaultColumn(type, option);
      Object.assign(column, forced['default'], type ? forced[type] : {});
      return column;
    },
  },

  watch: {
    _column: {
      immediate: true,
      handler(n, v) {
        Object.keys(n).forEach((k) => {
          const value = n[k];
          if (!v || value !== v[k]) {
            this.$set(this.column, k, value);
          }
        });
        const props = ['width', 'minWidth', 'fixed'];
        if (v && props.some((p) => n[p] !== v[p])) {
          this.owner.scheduleLayout(n['fixed'] !== v['fixed']);
        }
      },
    },
    filteredValue(value) {
      this.sFilteredValue = value;
      this.column.filteredValue = this.value;
    },
    filterDropdownVisible(visible) {
      this.sFilterDropdownVisible = visible;
      this.column.filterDropdownVisible = this.visible;
    },
  },
  created() {
    const parent = this.columnOrTableParent;
    this.columnId = (parent.tableId || parent.columnId) +
      '_column_' + columnIdSeed++; // computed 时 id 为空

    this.column.id = this.columnId;

    const type = this.type;

    if (type === 'expand') {
      if (this.owner.renderExpanded) {
        console.warn('[WT warn][TableColumn] expand column only allow once');
      } else {
        const self = this;
        this.owner.renderExpanded = function (h, data) {
          return self.$scopedSlots.default
            ? self.$scopedSlots.default(data)
            : self.$slots.default;
        };
      }
    }
  },

  destroyed() {
    if (!this.columnOrTableParent) return;
    const parent = this.columnOrTableParent;
    this.owner.store.removeColumn({
      column: this.column,
      parent: this.isSubColumn ? parent.column : null,
    });
  },

  mounted() {
    const owner = this.owner;
    const parent = this.columnOrTableParent;
    let columnIndex;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(
        parent.$refs.hiddenColumns.children,
        this.$el,
      );
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }

    owner.store.insertColumn({
      column: this.column,
      index: columnIndex > -1 ? columnIndex : undefined,
      parent: this.isSubColumn ? parent.column : null,
    });
  },
  render(h) {
    this.column.$scopedSlots = this.$scopedSlots; //
    return <div>{this.$slots.default}</div>;
  },

  methods: {
    updateFilteredValue(filteredValue) {
      this.$emit('update:filteredValue', filteredValue);
      if (!('filteredValue' in this.$options.propsData)) {
        this.sFilteredValue = filteredValue;
        this.column.filteredValue = this.sFilteredValue;
      }
    },
    updateFilterDropdownVisible(filterDropdownVisible) {
      this.$emit('update:filterDropdownVisible', filterDropdownVisible);
      if (!('filterDropdownVisible' in this.$options.propsData)) {
        this.sFilterDropdownVisible = filterDropdownVisible;
        this.column.filterDropdownVisible = this.sFilterDropdownVisible;
      }
    },
  },
};

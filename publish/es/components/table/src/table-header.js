import _extends from 'babel-runtime/helpers/extends';
import { hasClass, addClass, removeClass } from '@wish/wt-vue/es/utils/dom';
import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import WtPopover from '@wish/wt-vue/es/components/popover';
import FilterPanel from './filter-panel';
import LayoutObserver from './layout-observer';
import { mapStates } from './store';

var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;
  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);

  allColumns.forEach(function (column) {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

export default {
  name: 'WtTableHeader',

  mixins: [LayoutObserver],

  render: function render(h) {
    var _this = this;

    var originColumns = this.store.states.originColumns;
    var columnRows = convertToRows(originColumns);
    // 是否拥有多级表头
    var isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    return h(
      'table',
      {
        'class': this.prefix + '-header',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: { name: column.id }
        });
      }), this.hasGutter ? h('col', {
        attrs: { name: 'gutter' }
      }) : '']), h('thead', [this._l(columnRows, function (columns, rowIndex) {
        return h(
          'tr',
          {
            style: _this.getHeaderRowStyle(rowIndex),
            'class': _this.getHeaderRowClass(rowIndex)
          },
          [_this._l(columns, function (column, cellIndex) {
            return h(
              'th',
              {
                attrs: {
                  colspan: column.colSpan,
                  rowspan: column.rowSpan
                },
                on: {
                  'mouseenter': function mouseenter($event) {
                    return _this.handleMouseEnter($event, column);
                  },
                  'mouseleave': function mouseleave($event) {
                    return _this.handleMouseLeave($event, column);
                  },
                  'mousemove': function mousemove($event) {
                    return _this.handleMouseMove($event, column, cellIndex);
                  },
                  'mouseout': _this.handleMouseOut,
                  'mousedown': function mousedown($event) {
                    return _this.handleMouseDown($event, column);
                  },
                  'click': function click($event) {
                    return _this.handleHeaderClick($event, column);
                  },
                  'contextmenu': function contextmenu($event) {
                    return _this.handleHeaderContextMenu($event, column);
                  }
                },

                style: _this.getHeaderCellStyle(rowIndex, cellIndex, columns, column),
                'class': _this.getHeaderCellClass(rowIndex, cellIndex, columns, column) },
              [h(
                'div',
                { 'class': [_this.prefix + '-cell', column.labelClass] },
                [column.renderHeader ? column.renderHeader.call(_this._renderProxy, h, {
                  column: column,
                  $index: cellIndex,
                  store: _this.store,
                  _self: _this.$parent.$vnode.context,
                  fixed: _this.fixed
                }) : column.label, column.sortable ? _this.renderSortIcon(column) : '']
              ), column.filterable ? h(FilterPanel, { scopedSlots: {
                  'filter-icon': column.$scopedSlots['filter-icon'],
                  'filter-dropdown': column.$scopedSlots['filter-dropdown']
                }, attrs: { column: column,
                  disabled: column.fixed === true ? _this.fixed !== 'left' : column.fixed !== _this.fixed
                }
              }) : '', column.resizable && h('span', { 'class': 'divider' })]
            );
          }), _this.hasGutter ? h('th', { 'class': _this.prefix + '-gutter' }) : '']
        );
      })])]
    );
  },


  props: {
    fixed: [String, Boolean],
    store: {
      required: true
    },
    border: Boolean,
    prefix: {
      type: String,
      required: true
    }
  },

  components: {
    WtCheckbox: WtCheckbox,
    WtPopover: WtPopover
  },

  computed: _extends({
    table: function table() {
      return this.$parent;
    }
  }, mapStates({
    isAllSelected: 'isAllSelected',
    columns: 'columns',
    columnsCount: function columnsCount(states) {
      return states.columns.length;
    },
    leftFixedCount: function leftFixedCount(states) {
      return states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount(states) {
      return states.rightFixedColumns.length;
    },
    leftFixedLeafCount: function leftFixedLeafCount(states) {
      return states.fixedLeafColumns.length;
    },
    rightFixedLeafCount: function rightFixedLeafCount(states) {
      return states.rightFixedLeafColumns.length;
    }
  }), {
    hasGutter: function hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    }
  }),

  methods: {
    renderSortIcon: function renderSortIcon(column) {
      var _this2 = this;

      var h = this.$createElement;
      var _store$states$sortOrd = this.store.states.sortOrder,
          sortOrder = _store$states$sortOrd === undefined ? {} : _store$states$sortOrd;

      var order = void 0;
      if (sortOrder.prop && sortOrder.prop === column.prop) {
        order = sortOrder.order;
      }

      var scoped = {
        order: order,
        change: function change($event) {
          return _this2.handleSortClick($event, column);
        }
      };
      var prefix = this.prefix;

      if (this.table.$scopedSlots.sortIcon) {
        return this.table.$scopedSlots.sortIcon(scoped);
      }
      return h(
        'span',
        { 'class': prefix + '-sortable', on: {
            'click': scoped.change
          }
        },
        [h('i', {
          'class': prefix + '-sortable-icon\n            ' + prefix + '-sortable-ascending'
        }), h('i', {
          'class': prefix + '-sortable-icon\n            ' + prefix + '-sortable-descending'
        })]
      );
    },
    isCellHidden: function isCellHidden(index, columns) {
      var start = 0;
      for (var i = 0; i < index; i++) {
        start += columns[i].colSpan;
      }
      var after = start + columns[index].colSpan - 1;
      if (this.fixed === true || this.fixed === 'left') {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return after < this.leftFixedLeafCount || start >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getHeaderRowStyle: function getHeaderRowStyle(rowIndex) {
      var headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle({ rowIndex: rowIndex });
      }
      return headerRowStyle;
    },
    getHeaderRowClass: function getHeaderRowClass(rowIndex) {
      var classes = [];

      var headerRowClass = this.table.headerRowClass;
      if (typeof headerRowClass === 'string') {
        classes.push(headerRowClass);
      } else if (typeof headerRowClass === 'function') {
        classes.push(headerRowClass({ rowIndex: rowIndex }));
      }

      return classes.join(' ');
    },
    getHeaderCellStyle: function getHeaderCellStyle(rowIndex, columnIndex, row, column) {
      var headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        return headerCellStyle({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return headerCellStyle;
    },
    getHeaderCellClass: function getHeaderCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id,
      // column.order,
      column.headerAlignClass, column.className, column.labelClass];
      var prefix = this.prefix;

      if (column.sortable) {
        classes.push(prefix + '-column-has-actions');
      }
      if (column.filterable) {
        classes.push(prefix + '-column-has-filters');
      }
      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push(prefix + '-is-hidden');
      }
      if (column.type) {
        classes.push(prefix + '-column-' + column.type);
      }
      if (!column.children) {
        classes.push(prefix + '-is-leaf');
      }

      if (column.sortable) {
        classes.push(prefix + '-is-sortable');
      }

      var _store$states$sortOrd2 = this.store.states.sortOrder,
          sortOrder = _store$states$sortOrd2 === undefined ? {} : _store$states$sortOrd2;

      if (column.sortable && sortOrder.prop && sortOrder.prop === column.prop) {
        classes.push(sortOrder.order);
      }

      var headerCellClass = this.table.headerCellClass;
      if (typeof headerCellClass === 'string') {
        classes.push(headerCellClass);
      } else if (typeof headerCellClass === 'function') {
        classes.push(headerCellClass({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    handleHeaderClick: function handleHeaderClick(event, column) {
      if (column.sortable) {
        this.handleSortClick(event, column);
      }
      this.$parent.$emit('header-click', { event: event, column: column });
    },
    handleHeaderContextMenu: function handleHeaderContextMenu(event, column) {
      this.$parent.$emit('header-contextmenu', event, column);
    },
    handleMouseDown: function handleMouseDown(event, column) {
      var _this3 = this;

      if (this.$isServer) return;
      if (!column.resizable || column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn) {
        this.dragging = true;

        var table = this.$parent;
        var tableEl = table.$el;
        var tableLeft = tableEl.getBoundingClientRect().left;
        var columnEl = this.$el.querySelector('th.' + column.id);
        var dividerEl = columnEl.querySelector('.divider');
        var columnRect = columnEl.getBoundingClientRect();
        var minLeft = columnRect.left - tableLeft + 30;
        var borderWidth = this.table.bordered ? 1 : 0;
        addClass(columnEl, 'noclick');
        addClass(dividerEl, 'active');

        this.draggingDivider = dividerEl;
        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft: tableLeft,
          startColumnWidth: column.width
        };
        var resizeImmediate = this.table.resizeImmediate;

        var resizeProxy = table.$refs.resizeProxy;
        if (!resizeImmediate) {
          this.$parent.resizeProxyVisible = true;
          resizeProxy.style.left = this.dragState.startLeft - 2 * borderWidth + 'px';
        }
        this.dragState.left = this.dragState.startLeft;
        document.onselectstart = function () {
          return false;
        };
        document.ondragstart = function () {
          return false;
        };

        var handleMouseMove = function handleMouseMove(event) {
          var _dragState = _this3.dragState,
              startMouseLeft = _dragState.startMouseLeft,
              startLeft = _dragState.startLeft,
              startColumnLeft = _dragState.startColumnLeft;


          var deltaLeft = event.clientX - startMouseLeft;
          var proxyLeft = Math.max(minLeft, startLeft + deltaLeft);
          _this3.dragState.left = proxyLeft;
          if (!resizeImmediate) {
            resizeProxy.style.left = proxyLeft - borderWidth + 'px';
            _this3.draggingDivider.style.left = proxyLeft - startColumnLeft + 'px';
          } else {
            var columnWidth = proxyLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            _this3.table.doReflow();
          }
        };

        var handleMouseUp = function handleMouseUp() {
          if (_this3.dragging) {
            var _dragState2 = _this3.dragState,
                startColumnLeft = _dragState2.startColumnLeft,
                startLeft = _dragState2.startLeft,
                left = _dragState2.left;

            var columnWidth = left - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            _this3.$parent.resizeProxyVisible = false;
            table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

            _this3.table.scheduleLayout();
            _this3.handleDragEnd();
          }

          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          setTimeout(function () {
            removeClass(columnEl, 'noclick');
          }, 0);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    },
    handleMouseMove: function handleMouseMove(event, column, cellIndex) {
      if (column.children && column.children.length > 0) return;
      if (!column || !column.resizable) return;

      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      if (!this.dragging) {
        var rect = target.getBoundingClientRect();
        var bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (hasClass(target, this.prefix + '-column-has-actions')) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (cellIndex > 0 && rect.width > 12 && event.pageX - rect.left < 20) {
          var index = this.columns.indexOf(column);
          if (index > -1) {
            var prevColumn = this.columns[index - 1];
            var el = this.$el.querySelector('.' + prevColumn.id + ' .divider');
            addClass(el, 'hover');
          }
          this.draggingColumn = null;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if (hasClass(target, this.prefix + '-column-has-actions')) {
            target.style.cursor = 'pointer';
          }
          var _el = this.$el.querySelector('.divider.hover');
          _el && removeClass(_el, 'hover');
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut: function handleMouseOut() {
      if (this.$isServer) return;
      if (!this.dragging) {
        document.body.style.cursor = '';
      }
    },
    handleDragEnd: function handleDragEnd() {
      if (!this.dragging) {
        return;
      }
      document.body.style.cursor = '';
      removeClass(this.draggingDivider, 'active');
      this.draggingDivider.style.left = '';
      this.draggingDivider = null;
      this.dragging = false;
      this.draggingColumn = null;
      this.dragState = {};
      // this.table.resizeProxyVisible = false;
    },
    toggleOrder: function toggleOrder(order) {
      return !order ? 'ascending' : order === 'ascending' ? 'descending' : null;
    },


    // 排序按钮
    handleSortClick: function handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      if (target && target.tagName === 'TH') {
        if (hasClass(target, 'noclick')) {
          removeClass(target, 'noclick');
          return;
        }
      }

      if (!column.sortable) return;
      var _store$states = this.store.states,
          sortOrder = _store$states.sortOrder,
          sortingColumn = _store$states.sortingColumn,
          filters = _store$states.filters;

      var nextSortOrder = {
        prop: column.prop,
        order: givenOrder || column.sortOrders[0]
      };
      if (!givenOrder && sortingColumn === column) {
        var nowOrder = sortOrder.order;
        var nextOrderIndex = (column.sortOrders.indexOf(nowOrder) + 1) % column.sortOrders.length;
        nextSortOrder.order = column.sortOrders[nextOrderIndex];
      }
      this.table.$emit('update:sortOrder', nextSortOrder);

      var sorter = _extends({ column: column }, nextSortOrder);
      this.table.$emit('sort-change', sorter);
      this.table.$emit('change', filters, sorter);
    },
    handleMouseEnter: function handleMouseEnter(event, column) {
      clearTimeout(this.resizeTimer);
      if (column.resizable) {
        addClass(event.currentTarget, this.prefix + '-column-resizable');
      }
    },
    handleMouseLeave: function handleMouseLeave(event, column) {
      var _this4 = this;

      if (column.resizable) {
        this.resizeTimer = setTimeout(function () {
          removeClass(event.currentTarget, _this4.prefix + '-column-resizable');
        }, 50);
      }
    }
  },

  data: function data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
};
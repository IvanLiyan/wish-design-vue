import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { getCell, getColumnByCell, getRowIdentity } from './utils/index';
import { addClass, removeClass } from '@wish/wt-vue/es/utils/dom';
import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import Icon from '@wish/wt-vue/es/components/icon';
import LayoutObserver from './layout-observer';
import { mapStates } from './store';
import debounce from 'throttle-debounce/debounce';
function defaultFindTreeColumnIndex(columns) {
  return columns.findIndex(function (column) {
    return column.type === 'default';
  });
}
export default {
  name: 'MtdTableBody',

  mixins: [LayoutObserver],

  components: {
    WtCheckbox: WtCheckbox,
    Icon: Icon
  },

  props: {
    store: {
      required: true
    },
    prefix: {
      type: String,
      required: true
    },
    striped: Boolean,
    context: {},
    rowClass: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean,
    disableMouseEvent: Boolean
  },

  render: function render(h) {
    var _this = this;

    var prefix = this.prefix;

    var findTreeColumnIndex = this.table.findTreeColumnIndex || defaultFindTreeColumnIndex;
    var columnsHidden = this.columns.map(function (column, index) {
      return _this.isColumnHidden(index);
    });
    var renderColumn = function renderColumn(row, column, $index, cellIndex) {
      return column.renderCell.call(_this._renderProxy, h, {
        row: row,
        column: column,
        $index: $index,
        store: _this.store,
        _self: _this.context || _this.table.$vnode.context,
        fixed: _this.fixed
      }, columnsHidden[cellIndex]);
    };
    var indent = this.table.indent;
    var renderTreeExpaned = function renderTreeExpaned(row, column, $index, cellIndex) {
      var _ref = row.$$wt || {},
          expanded = _ref.expanded,
          hasChild = _ref.hasChild,
          level = _ref.level,
          loading = _ref.loading;

      var classes = [prefix + '-tree-expand-icon'];
      !hasChild && classes.push(prefix + '-hidden');
      expanded && classes.push(prefix + '-expand-icon-expanded');
      return h(
        'div',
        { 'class': classes.join(' '),
          on: {
            'click': function click(e) {
              return _this.handleExpandClick(e, row, $index);
            }
          },

          style: {
            marginLeft: level > 0 ? level * indent + 'px' : 0
          }
        },
        [loading ? h(Icon, {
          attrs: { name: 'loading' }
        }) : h(Icon, {
          attrs: { name: 'right-thick' }
        })]
      );
    };
    var treeIndentIndex = !this.tree ? -1 : findTreeColumnIndex(this.columns);
    return h(
      'table',
      {
        'class': prefix + '-body',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: { name: column.id }
        });
      })]), h('tbody', [this._l(this.data, function (row, $index) {
        return [h(
          'tr',
          {
            style: _this.rowStyle ? _this.getRowStyle(row, $index) : null,
            key: _this.table.rowKey ? _this.getKeyOfRow(row, $index) : $index,
            on: {
              'dblclick': function dblclick($event) {
                return _this.handleDoubleClick($event, row);
              },
              'click': function click($event) {
                return _this.handleClick($event, row, $index);
              },
              'contextmenu': function contextmenu($event) {
                return _this.handleContextMenu($event, row);
              },
              'mouseenter': function mouseenter($event) {
                return _this.handleMouseEnter($event, row, $index);
              },
              'mouseleave': function mouseleave($event) {
                return _this.handleMouseLeave($event, row);
              }
            },

            'class': [_this.getRowClass(row, $index)] },
          [_this._l(_this.columns, function (column, cellIndex) {
            var _getSpan = _this.getSpan(row, column, $index, cellIndex),
                rowspan = _getSpan.rowspan,
                colspan = _getSpan.colspan;

            if (!rowspan || !colspan) {
              return '';
            } else {
              return h(
                'td',
                {
                  style: _this.getCellStyle($index, cellIndex, row, column),
                  'class': _this.getCellClass($index, cellIndex, row, column),
                  attrs: { rowspan: rowspan,
                    colspan: colspan
                  },
                  on: {
                    'mouseenter': function mouseenter($event) {
                      return _this.handleCellMouseEnter($event, row);
                    },
                    'mouseleave': _this.handleCellMouseLeave
                  }
                },
                [h(
                  'div',
                  { 'class': prefix + '-cell' },
                  [cellIndex === treeIndentIndex && renderTreeExpaned(row, column, $index, cellIndex), _this.hasTooltip(column) ? h(
                    'div',
                    { 'class': prefix + '-cell-tooltip' },
                    [renderColumn(row, column, $index, cellIndex)]
                  ) : renderColumn(row, column, $index, cellIndex)]
                )]
              );
            }
          })]
        ), !_this.tree && _this.store.isExpanded(row, $index) ? h('tr', [h(
          'td',
          {
            attrs: {
              colspan: _this.columns.length
            },
            'class': prefix + '-expanded-cell' },
          [h(
            'div',
            { 'class': prefix + '-cell' },
            [_this.table.renderExpanded ? _this.table.renderExpanded(h, { row: row, $index: $index, store: _this.store }) : '']
          )]
        )]) : ''];
      })])]
    );
  },


  watch: {
    'store.states.hoverRow': function storeStatesHoverRow(newVal, oldVal) {
      if (!this.isComplex || this.$isServer) return;
      var el = this.$el;
      if (!el) return;
      var prefix = this.prefix;
      // 当嵌套子表格时直接使用 selector 会同时选中子表格行
      // to fix: https://tt.sankuai.com/ticket/detail?id=7263858

      var rows = [].concat(_toConsumableArray(el.querySelector('tbody').children)).filter(function (e) {
        return e.className.indexOf(prefix + '-row') > -1;
      });
      var oldRow = rows[oldVal];
      var newRow = rows[newVal];
      oldRow && removeClass(oldRow, 'hover');
      newRow && addClass(newRow, 'hover');
    }
  },

  computed: _extends({
    table: function table() {
      return this.$parent;
    }
  }, mapStates({
    data: 'data',
    columns: 'columns',
    isComplex: 'isComplex',
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
    currentRow: function currentRow() {
      return this.store.states.currentRow;
    },
    tree: function tree() {
      return this.table.tree;
    }
  }),

  data: function data() {
    return {
      tooltipContent: '',
      tooltipVisible: false
    };
  },


  methods: {
    getKeyOfRow: function getKeyOfRow(row, index) {
      var rowKey = this.table.rowKey;
      if (rowKey) {
        return getRowIdentity(row, rowKey);
      }
      return index;
    },
    isColumnHidden: function isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return index < this.leftFixedLeafCount || index >= this.columnsCount - this.rightFixedLeafCount;
      }
    },


    // 合并行列
    getSpan: function getSpan(row, column, rowIndex, columnIndex) {
      var rowspan = 1;
      var colspan = 1;

      var fn = this.table.rowColSpan;
      if (typeof fn === 'function') {
        var result = fn({
          row: row,
          column: column,
          rowIndex: rowIndex,
          columnIndex: columnIndex
        });

        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }

      return {
        rowspan: rowspan,
        colspan: colspan
      };
    },
    getRowStyle: function getRowStyle(row, rowIndex) {
      var rowStyle = this.table.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle({
          row: row,
          rowIndex: rowIndex
        });
      }
      return rowStyle;
    },
    getRowClass: function getRowClass(row, rowIndex) {
      var prefix = this.prefix;

      var classes = [prefix + '-row'];

      if (this.highlight && this.currentRow === row) {
        classes.push(prefix + '-current-row');
      }
      if (this.striped && rowIndex % 2 === 1) {
        classes.push(prefix + '-row-striped');
      }
      var rowClass = this.table.rowClass;
      if (typeof rowClass === 'string') {
        classes.push(rowClass);
      } else if (typeof rowClass === 'function') {
        classes.push(rowClass({
          row: row,
          rowIndex: rowIndex
        }));
      }

      return classes.join(' ');
    },
    getCellStyle: function getCellStyle(rowIndex, columnIndex, row, column) {
      var cellStyle = this.table.cellStyle;
      if (typeof cellStyle === 'function') {
        return cellStyle({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return cellStyle;
    },
    getCellClass: function getCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.alignClass, column.className];
      var prefix = this.prefix;

      if (this.isColumnHidden(columnIndex)) {
        classes.push(prefix + '-is-hidden');
      }
      if (column.type) {
        classes.push(prefix + '-column-' + column.type);
      }

      var cellClass = this.table.cellClass;
      if (typeof cellClass === 'string') {
        classes.push(cellClass);
      } else if (typeof cellClass === 'function') {
        classes.push(cellClass({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    handleCellMouseEnter: function handleCellMouseEnter(event, row) {
      var table = this.table;
      var cell = getCell(event);

      if (cell) {
        var column = getColumnByCell(this.prefix, table, cell);
        var hoverState = { cell: cell, column: column, row: row };
        var tooltipSelector = '.' + this.prefix + '-cell-tooltip';
        var overflowSelector = column.overflowSelector || tooltipSelector;
        var element = event.target.querySelector(overflowSelector);
        var tooltip = overflowSelector !== tooltipSelector ? event.target.querySelector(tooltipSelector) : element;

        if (column.showOverflowTooltip && element) {
          var scrollWidth = element.scrollWidth,
              clientWidth = element.clientWidth;

          var tooltipVisible = scrollWidth > clientWidth;
          if (tooltipVisible) {
            table.showTooltip(tooltip, element.innerText);
          }
        }
        if (this.disableMouseEvent) return;
        table.hoverState = hoverState;
        table.$emit('cell-mouse-enter', _extends({
          event: event
        }, hoverState));
      }
    },
    handleCellMouseLeave: function handleCellMouseLeave(event) {
      var table = this.table;

      table.hideTooltip();
      if (this.disableMouseEvent) return;
      var cell = getCell(event);
      if (!cell) return;
      var oldHoverState = this.table.hoverState || {};
      this.table.$emit('cell-mouse-leave', {
        event: event,
        row: oldHoverState.row,
        column: oldHoverState.column,
        cell: oldHoverState.cell
      });
    },


    handleMouseEnter: debounce(30, function (event, row, index) {
      if (this.disableMouseEvent) return;
      this.store.setHoverRow(index);
      this.table.$emit('row-mouse-enter', { event: event, row: row });
    }),

    handleMouseLeave: debounce(30, function (event, row) {
      if (this.disableMouseEvent) return;
      this.store.setHoverRow(null);
      this.table.$emit('row-mouse-leave', { event: event, row: row });
    }),

    handleContextMenu: function handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },
    handleDoubleClick: function handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },
    handleClick: function handleClick(event, row, $index) {
      if (this.highlight) {
        var currentRow = this.currentRow;

        if (row !== currentRow) {
          this.store.setCurrentRow(row);
          this.table.$emit('current-change', row, currentRow);
        }
      }
      if (this.table.expandOnClickTr) {
        var _store$getExpandProps = this.store.getExpandPropsByItem(row, $index),
            disabled = _store$getExpandProps.disabled;

        !disabled && this.handleExpandClick(event, row, $index);
      }
      this.handleEvent(event, row, 'click');
    },
    handleEvent: function handleEvent(event, row, name) {
      var table = this.table;
      var cell = getCell(event);
      var column = void 0;
      if (cell) {
        column = getColumnByCell(this.prefix, table, cell);
        if (column) {
          table.$emit('cell-' + name, { event: event, row: row, column: column, cell: cell });
        }
      }
      table.$emit('row-' + name, { event: event, row: row, column: column });
    },
    loadTreeData: function loadTreeData(row) {
      var store = this.store,
          loadData = this.table.loadData;
      var key = row.$$wt.key;

      row.$$wt.loading = true;
      loadData(row, store.createLoadDataCallback(key, row));
    },
    handleExpandClick: function handleExpandClick(e, row, index) {
      e.stopPropagation();
      if (this.tree && row.$$wt) {
        var _row$$$wt = row.$$wt,
            hasChild = _row$$$wt.hasChild,
            childCount = _row$$$wt.childCount,
            expanded = _row$$$wt.expanded,
            loading = _row$$$wt.loading,
            loaded = _row$$$wt.loaded;

        if (hasChild && !childCount && !expanded && !loading && !loaded) {
          this.loadTreeData(row);
        }
      }
      this.store.toggleRowExpansion(row, index);
    },
    hasTooltip: function hasTooltip(column) {
      return column.showOverflowTooltip || this.table.showOverflowTooltip;
    }
  }
};
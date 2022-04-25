import { getCell, getColumnByCell, getRowIdentity } from './utils/index';
import {
  addClass,
  removeClass,
} from '@/utils/dom';
import MtdCheckbox from '@components/checkbox';
import Icon from '@components/icon';
import LayoutObserver from './layout-observer';
import { mapStates } from './store';
import debounce from 'throttle-debounce/debounce';
function defaultFindTreeColumnIndex (columns) {
  return columns.findIndex((column) => {
    return column.type === 'default';
  });
}
export default {
  name: 'MtdTableBody',

  mixins: [LayoutObserver],

  components: {
    MtdCheckbox,
    Icon,
  },

  props: {
    store: {
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    striped: Boolean,
    context: {},
    rowClass: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean,
    disableMouseEvent: Boolean,
  },

  render (h) {
    const { prefix } = this;
    const findTreeColumnIndex = this.table.findTreeColumnIndex ||
      defaultFindTreeColumnIndex;
    const columnsHidden = this.columns.map((column, index) =>
      this.isColumnHidden(index),
    );
    const renderColumn = (row, column, $index, cellIndex) => {
      return column.renderCell.call(
        this._renderProxy,
        h,
        {
          row,
          column,
          $index,
          store: this.store,
          _self: this.context || this.table.$vnode.context,
          fixed: this.fixed,
        },
        columnsHidden[cellIndex],
      );
    };
    const indent = this.table.indent;
    const renderTreeExpaned = (row, column, $index, cellIndex) => {
      const { expanded, hasChild, level, loading } = row.$$wt || {};
      const classes = [`${prefix}-tree-expand-icon`];
      !hasChild && classes.push(`${prefix}-hidden`);
      expanded && classes.push(`${prefix}-expand-icon-expanded`);
      return <div class={classes.join(' ')}
        onClick={(e) => this.handleExpandClick(e, row, $index) }
        style={{
          marginLeft: level > 0 ? `${level * indent}px` : 0,
        }}
      >
        {loading ? <Icon name='loading' />
          : <Icon name='right-thick' />
        }
      </div>;
    };
    const treeIndentIndex = !this.tree ? -1 : findTreeColumnIndex(this.columns);
    return (
      <table
        class={`${prefix}-body`}
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          {
            this._l(this.columns, column => <col name={ column.id } />)
          }
        </colgroup>
        <tbody>
          {
            this._l(this.data, (row, $index) =>
              [<tr
                style={
                  this.rowStyle
                    ? this.getRowStyle(row, $index) : null }
                key={
                  this.table.rowKey
                    ? this.getKeyOfRow(row, $index) : $index
                }
                on-dblclick={
                  ($event) => this.handleDoubleClick($event, row)
                }
                on-click={
                  ($event) => this.handleClick($event, row, $index)
                }
                on-contextmenu={
                  ($event) => this.handleContextMenu($event, row)
                }
                on-mouseenter={
                  ($event) => this.handleMouseEnter($event, row, $index)
                }
                on-mouseleave={
                  ($event) => this.handleMouseLeave($event, row)
                }
                class={ [this.getRowClass(row, $index)] }>
                {
                  this._l(this.columns, (column, cellIndex) => {
                    const {
                      rowspan,
                      colspan,
                    } = this.getSpan(row, column, $index, cellIndex);
                    if (!rowspan || !colspan) {
                      return '';
                    } else {
                      return (
                        <td
                          style={
                            this.getCellStyle($index, cellIndex, row, column)
                          }
                          class={
                            this.getCellClass($index, cellIndex, row, column)
                          }
                          rowspan={ rowspan }
                          colspan={ colspan }
                          on-mouseenter={
                            ($event) => this.handleCellMouseEnter($event, row)
                          }
                          on-mouseleave={ this.handleCellMouseLeave }>
                          <div class={`${prefix}-cell`}>
                            {cellIndex === treeIndentIndex &&
                              renderTreeExpaned(row, column, $index, cellIndex)}
                            { this.hasTooltip(column)
                              ? <div class={`${prefix}-cell-tooltip`}>
                                { renderColumn(row, column, $index, cellIndex) }
                              </div>
                              : renderColumn(row, column, $index, cellIndex)
                            }
                          </div>
                        </td>
                      );
                    }
                  })
                }
              </tr>,
              !this.tree && this.store.isExpanded(row, $index)
                ? (<tr>
                  <td
                    colspan={ this.columns.length }
                    class={`${prefix}-expanded-cell`}>
                    <div class={`${prefix}-cell`}>
                      { this.table.renderExpanded
                        ? this.table.renderExpanded(
                          h,
                          { row, $index, store: this.store },
                        )
                        : ''}
                    </div>
                  </td>
                </tr>)
                : '',
              ],
            )
          }
        </tbody>
      </table>
    );
  },

  watch: {
    'store.states.hoverRow' (newVal, oldVal) {
      if (!this.isComplex || this.$isServer) return;
      const el = this.$el;
      if (!el) return;
      const { prefix } = this;
      // 当嵌套子表格时直接使用 selector 会同时选中子表格行
      // to fix: https://tt.sankuai.com/ticket/detail?id=7263858
      const rows = [...el.querySelector('tbody').children].filter((e) => {
        return e.className.indexOf(`${prefix}-row`) > -1;
      });
      const oldRow = rows[oldVal];
      const newRow = rows[newVal];
      oldRow && removeClass(oldRow, 'hover');
      newRow && addClass(newRow, 'hover');
    },
  },

  computed: {
    table () {
      return this.$parent;
    },
    ...mapStates({
      data: 'data',
      columns: 'columns',
      isComplex: 'isComplex',
      columnsCount: (states) => states.columns.length,
      leftFixedCount: (states) => states.fixedColumns.length,
      rightFixedCount: (states) => states.rightFixedColumns.length,
      leftFixedLeafCount: (states) => states.fixedLeafColumns.length,
      rightFixedLeafCount: (states) => states.rightFixedLeafColumns.length,
    }),
    currentRow () {
      return this.store.states.currentRow;
    },
    tree () {
      return this.table.tree;
    },
  },

  data () {
    return {
      tooltipContent: '',
      tooltipVisible: false,
    };
  },

  methods: {
    getKeyOfRow (row, index) {
      const rowKey = this.table.rowKey;
      if (rowKey) {
        return getRowIdentity(row, rowKey);
      }
      return index;
    },

    isColumnHidden (index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return (index < this.leftFixedLeafCount) ||
        (index >= this.columnsCount - this.rightFixedLeafCount);
      }
    },

    // 合并行列
    getSpan (row, column, rowIndex, columnIndex) {
      let rowspan = 1;
      let colspan = 1;

      const fn = this.table.rowColSpan;
      if (typeof fn === 'function') {
        const result = fn({
          row,
          column,
          rowIndex,
          columnIndex,
        });

        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if (typeof result === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }

      return {
        rowspan,
        colspan,
      };
    },

    getRowStyle (row, rowIndex) {
      const rowStyle = this.table.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle({
          row,
          rowIndex,
        });
      }
      return rowStyle;
    },

    getRowClass (row, rowIndex) {
      const { prefix } = this;
      const classes = [`${prefix}-row`];

      if (this.highlight && this.currentRow === row) {
        classes.push(`${prefix}-current-row`);
      }
      if (this.striped && rowIndex % 2 === 1) {
        classes.push(`${prefix}-row-striped`);
      }
      const rowClass = this.table.rowClass;
      if (typeof rowClass === 'string') {
        classes.push(rowClass);
      } else if (typeof rowClass === 'function') {
        classes.push(rowClass({
          row,
          rowIndex,
        }));
      }

      return classes.join(' ');
    },

    getCellStyle (rowIndex, columnIndex, row, column) {
      const cellStyle = this.table.cellStyle;
      if (typeof cellStyle === 'function') {
        return cellStyle({
          rowIndex,
          columnIndex,
          row,
          column,
        });
      }
      return cellStyle;
    },

    getCellClass (rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.alignClass, column.className];
      const { prefix } = this;
      if (this.isColumnHidden(columnIndex)) {
        classes.push(`${prefix}-is-hidden`);
      }
      if (column.type) {
        classes.push(`${prefix}-column-${column.type}`);
      }

      const cellClass = this.table.cellClass;
      if (typeof cellClass === 'string') {
        classes.push(cellClass);
      } else if (typeof cellClass === 'function') {
        classes.push(cellClass({
          rowIndex,
          columnIndex,
          row,
          column,
        }));
      }

      return classes.join(' ');
    },

    handleCellMouseEnter (event, row) {
      const table = this.table;
      const cell = getCell(event);

      if (cell) {
        const column = getColumnByCell(this.prefix, table, cell);
        const hoverState = { cell, column, row };
        const tooltipSelector = `.${this.prefix}-cell-tooltip`;
        const overflowSelector = column.overflowSelector || tooltipSelector;
        const element = event.target.querySelector(overflowSelector);
        const tooltip = overflowSelector !== tooltipSelector
          ? event.target.querySelector(tooltipSelector)
          : element;

        if (column.showOverflowTooltip && element) {
          const { scrollWidth, clientWidth } = element;
          const tooltipVisible = scrollWidth > clientWidth;
          if (tooltipVisible) {
            table.showTooltip(tooltip, element.innerText);
          }
        }
        if (this.disableMouseEvent) return;
        table.hoverState = hoverState;
        table.$emit(
          'cell-mouse-enter', {
            event,
            ...hoverState,
          },
        );
      }
    },

    handleCellMouseLeave (event) {
      const { table } = this;
      table.hideTooltip();
      if (this.disableMouseEvent) return;
      const cell = getCell(event);
      if (!cell) return;
      const oldHoverState = this.table.hoverState || {};
      this.table.$emit(
        'cell-mouse-leave',
        {
          event,
          row: oldHoverState.row,
          column: oldHoverState.column,
          cell: oldHoverState.cell,
        },
      );
    },

    handleMouseEnter: debounce(30, function (event, row, index) {
      if (this.disableMouseEvent) return;
      this.store.setHoverRow(index);
      this.table.$emit('row-mouse-enter', { event, row });
    }),

    handleMouseLeave: debounce(30, function (event, row) {
      if (this.disableMouseEvent) return;
      this.store.setHoverRow(null);
      this.table.$emit('row-mouse-leave', { event, row });
    }),

    handleContextMenu (event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },

    handleDoubleClick (event, row) {
      this.handleEvent(event, row, 'dblclick');
    },

    handleClick (event, row, $index) {
      if (this.highlight) {
        const { currentRow } = this;
        if (row !== currentRow) {
          this.store.setCurrentRow(row);
          this.table.$emit('current-change', row, currentRow);
        }
      }
      if (this.table.expandOnClickTr) {
        const { disabled } = this.store.getExpandPropsByItem(row, $index);
        !disabled && this.handleExpandClick(event, row, $index);
      }
      this.handleEvent(event, row, 'click');
    },

    handleEvent (event, row, name) {
      const table = this.table;
      const cell = getCell(event);
      let column;
      if (cell) {
        column = getColumnByCell(this.prefix, table, cell);
        if (column) {
          table.$emit(`cell-${name}`, {event, row, column, cell});
        }
      }
      table.$emit(`row-${name}`, {event, row, column});
    },

    loadTreeData (row) {
      const { store, table: { loadData } } = this;
      const { key } = row.$$wt;
      row.$$wt.loading = true;
      loadData(row, store.createLoadDataCallback(key, row));
    },

    handleExpandClick (e, row, index) {
      e.stopPropagation();
      if (this.tree && row.$$wt) {
        const { hasChild, childCount, expanded, loading, loaded } = row.$$wt;
        if (hasChild && !childCount && !expanded && !loading && !loaded) {
          this.loadTreeData(row);
        }
      }
      this.store.toggleRowExpansion(row, index);
    },

    hasTooltip (column) {
      return column.showOverflowTooltip || this.table.showOverflowTooltip;
    },
  },
};

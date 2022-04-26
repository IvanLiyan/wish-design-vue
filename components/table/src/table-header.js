import { hasClass, addClass, removeClass } from '@/utils/dom';
import WtCheckbox from '@components/checkbox';
import WtPopover from '@components/popover';
import FilterPanel from './filter-panel.vue';
import LayoutObserver from './layout-observer';
import { mapStates } from './store';

const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column) => {
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

  render (h) {
    const originColumns = this.store.states.originColumns;
    const columnRows = convertToRows(originColumns);
    // 是否拥有多级表头
    const isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    return (
      <table
        class={`${this.prefix}-header`}
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          {
            this._l(this.columns, column => <col name={ column.id } />)
          }
          {
            this.hasGutter ? <col name="gutter" /> : ''
          }
        </colgroup>
        <thead>
          {/* class={[{
            'is-group': isGroup, 'has-gutter': this.hasGutter }]}> */}
          {/* class={ [{ 'has-gutter': this.hasGutter }] }> */}
          {
            this._l(columnRows, (columns, rowIndex) =>
              <tr
                style={ this.getHeaderRowStyle(rowIndex) }
                class={ this.getHeaderRowClass(rowIndex) }
              >
                {
                  this._l(columns, (column, cellIndex) =>
                    <th
                      colspan={ column.colSpan }
                      rowspan={ column.rowSpan }
                      on-mouseenter={ ($event) => this.handleMouseEnter($event, column)}
                      on-mouseleave={ ($event) => this.handleMouseLeave($event, column)}
                      on-mousemove={
                        ($event) => this.handleMouseMove($event, column, cellIndex)
                      }
                      on-mouseout={ this.handleMouseOut }
                      on-mousedown={
                        ($event) => this.handleMouseDown($event, column)
                      }
                      on-click={
                        ($event) => this.handleHeaderClick($event, column)
                      }
                      on-contextmenu={
                        ($event) => this.handleHeaderContextMenu($event, column)
                      }
                      style={
                        this.getHeaderCellStyle(
                          rowIndex,
                          cellIndex,
                          columns,
                          column,
                        )
                      }
                      class={
                        this.getHeaderCellClass(
                          rowIndex,
                          cellIndex,
                          columns,
                          column,
                        )
                      }>
                      <div class={
                        [`${this.prefix}-cell`, column.labelClass] }>
                        {
                          column.renderHeader
                            ? column.renderHeader.call(
                              this._renderProxy,
                              h,
                              {
                                column,
                                $index: cellIndex,
                                store: this.store,
                                _self: this.$parent.$vnode.context,
                                fixed: this.fixed,
                              },
                            )
                            : column.label
                        }
                        {
                          column.sortable
                            ? this.renderSortIcon(column) : ''
                        }
                      </div>
                      {
                        column.filterable
                          ? <FilterPanel scopedSlots={{
                            'filter-icon': column.$scopedSlots['filter-icon'],
                            'filter-dropdown': column.$scopedSlots['filter-dropdown'],
                          }} column={column}
                          disabled={column.fixed === true
                            ? this.fixed !== 'left' : column.fixed !== this.fixed}
                          />
                          : ''
                      }
                      {
                        column.resizable && <span class="divider" />
                      }
                    </th>,
                  )
                }
                {
                  this.hasGutter ? <th class={`${this.prefix}-gutter`}></th> : ''
                }
              </tr>,
            )
          }
        </thead>
      </table>
    );
  },

  props: {
    fixed: [String, Boolean],
    store: {
      required: true,
    },
    border: Boolean,
    prefix: {
      type: String,
      required: true,
    },
  },

  components: {
    WtCheckbox,
    WtPopover,
  },

  computed: {
    table () {
      return this.$parent;
    },

    ...mapStates({
      isAllSelected: 'isAllSelected',
      columns: 'columns',
      columnsCount: (states) => states.columns.length,
      leftFixedCount: (states) => states.fixedColumns.length,
      rightFixedCount: (states) => states.rightFixedColumns.length,
      leftFixedLeafCount: (states) => states.fixedLeafColumns.length,
      rightFixedLeafCount: (states) => states.rightFixedLeafColumns.length,
    }),

    hasGutter () {
      return !this.fixed && this.tableLayout.gutterWidth;
    },
  },

  methods: {
    renderSortIcon (column) {
      const { sortOrder = {} } = this.store.states;
      let order;
      if (sortOrder.prop &&
        sortOrder.prop === column.prop) {
        order = sortOrder.order;
      }

      const scoped = {
        order,
        change: ($event) => this.handleSortClick($event, column),
      };
      const { prefix } = this;
      if (this.table.$scopedSlots.sortIcon) {
        return this.table.$scopedSlots.sortIcon(scoped);
      }
      return <span class={`${prefix}-sortable`} on-click={scoped.change}>
        <i
          class={`${prefix}-sortable-icon
            ${prefix}-sortable-ascending`}
        />
        <i
          class={`${prefix}-sortable-icon
            ${prefix}-sortable-descending`}
        />
      </span>;
    },

    isCellHidden (index, columns) {
      let start = 0;
      for (let i = 0; i < index; i++) {
        start += columns[i].colSpan;
      }
      const after = start + columns[index].colSpan - 1;
      if (this.fixed === true || this.fixed === 'left') {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return (after < this.leftFixedLeafCount) ||
        (start >= this.columnsCount - this.rightFixedLeafCount);
      }
    },

    getHeaderRowStyle (rowIndex) {
      const headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle({ rowIndex });
      }
      return headerRowStyle;
    },

    getHeaderRowClass (rowIndex) {
      const classes = [];

      const headerRowClass = this.table.headerRowClass;
      if (typeof headerRowClass === 'string') {
        classes.push(headerRowClass);
      } else if (typeof headerRowClass === 'function') {
        classes.push(headerRowClass({ rowIndex }));
      }

      return classes.join(' ');
    },

    getHeaderCellStyle (rowIndex, columnIndex, row, column) {
      const headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        return headerCellStyle({
          rowIndex,
          columnIndex,
          row,
          column,
        });
      }
      return headerCellStyle;
    },

    getHeaderCellClass (rowIndex, columnIndex, row, column) {
      const classes = [
        column.id,
        // column.order,
        column.headerAlignClass,
        column.className,
        column.labelClass,
      ];
      const { prefix } = this;
      if (column.sortable) {
        classes.push(`${prefix}-column-has-actions`);
      }
      if (column.filterable) {
        classes.push(`${prefix}-column-has-filters`);
      }
      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push(`${prefix}-is-hidden`);
      }
      if (column.type) {
        classes.push(`${prefix}-column-${column.type}`);
      }
      if (!column.children) {
        classes.push(`${prefix}-is-leaf`);
      }

      if (column.sortable) {
        classes.push(`${prefix}-is-sortable`);
      }

      const { sortOrder = {} } = this.store.states;
      if (column.sortable && sortOrder.prop &&
        sortOrder.prop === column.prop) {
        classes.push(sortOrder.order);
      }

      const headerCellClass = this.table.headerCellClass;
      if (typeof headerCellClass === 'string') {
        classes.push(headerCellClass);
      } else if (typeof headerCellClass === 'function') {
        classes.push(headerCellClass({
          rowIndex,
          columnIndex,
          row,
          column,
        }));
      }

      return classes.join(' ');
    },

    handleHeaderClick (event, column) {
      if (column.sortable) {
        this.handleSortClick(event, column);
      }
      this.$parent.$emit('header-click', {event, column});
    },

    handleHeaderContextMenu (event, column) {
      this.$parent.$emit('header-contextmenu', event, column);
    },

    handleMouseDown (event, column) {
      if (this.$isServer) return;
      if (!column.resizable || (column.children && column.children.length > 0)) return;
      /* istanbul ignore if */
      if (this.draggingColumn) {
        this.dragging = true;

        const table = this.$parent;
        const tableEl = table.$el;
        const tableLeft = tableEl.getBoundingClientRect().left;
        const columnEl = this.$el.querySelector(`th.${column.id}`);
        const dividerEl = columnEl.querySelector('.divider');
        const columnRect = columnEl.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;
        const borderWidth = this.table.bordered ? 1 : 0;
        addClass(columnEl, 'noclick');
        addClass(dividerEl, 'active');

        this.draggingDivider = dividerEl;
        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft,
          startColumnWidth: column.width,
        };
        const { resizeImmediate } = this.table;
        const resizeProxy = table.$refs.resizeProxy;
        if (!resizeImmediate) {
          this.$parent.resizeProxyVisible = true;
          resizeProxy.style.left = (this.dragState.startLeft - 2 * borderWidth) + 'px';
        }
        this.dragState.left = this.dragState.startLeft;
        document.onselectstart = function () { return false; };
        document.ondragstart = function () { return false; };

        const handleMouseMove = (event) => {
          const { startMouseLeft, startLeft, startColumnLeft } = this.dragState;

          const deltaLeft = event.clientX - startMouseLeft;
          const proxyLeft = Math.max(minLeft, startLeft + deltaLeft);
          this.dragState.left = proxyLeft;
          if (!resizeImmediate) {
            resizeProxy.style.left = `${proxyLeft - borderWidth}px`;
            this.draggingDivider.style.left = `${proxyLeft - startColumnLeft}px`;
          } else {
            const columnWidth = proxyLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            this.table.doReflow();
          }
        };

        const handleMouseUp = () => {
          if (this.dragging) {
            const {
              startColumnLeft,
              startLeft,
              left,
            } = this.dragState;
            const columnWidth = left - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            this.$parent.resizeProxyVisible = false;
            table.$emit(
              'header-dragend',
              column.width,
              startLeft - startColumnLeft,
              column,
              event,
            );

            this.table.scheduleLayout();
            this.handleDragEnd();
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

    handleMouseMove (event, column, cellIndex) {
      if (column.children && column.children.length > 0) return;
      if (!column || !column.resizable) return;

      let target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      if (!this.dragging) {
        const rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (hasClass(target, `${this.prefix}-column-has-actions`)) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (cellIndex > 0 && rect.width > 12 && event.pageX - rect.left < 20) {
          const index = this.columns.indexOf(column);
          if (index > -1) {
            const prevColumn = this.columns[index - 1];
            const el = this.$el.querySelector(`.${prevColumn.id} .divider`);
            addClass(el, 'hover');
          }
          this.draggingColumn = null;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if (hasClass(target, `${this.prefix}-column-has-actions`)) {
            target.style.cursor = 'pointer';
          }
          const el = this.$el.querySelector('.divider.hover');
          el && removeClass(el, 'hover');
          this.draggingColumn = null;
        }
      }
    },

    handleMouseOut () {
      if (this.$isServer) return;
      if (!this.dragging) {
        document.body.style.cursor = '';
      }
    },

    handleDragEnd () {
      if (!this.dragging) { return; }
      document.body.style.cursor = '';
      removeClass(this.draggingDivider, 'active');
      this.draggingDivider.style.left = '';
      this.draggingDivider = null;
      this.dragging = false;
      this.draggingColumn = null;
      this.dragState = {};
      // this.table.resizeProxyVisible = false;
    },

    toggleOrder (order) {
      return !order ? 'ascending' : order === 'ascending' ? 'descending' : null;
    },

    // 排序按钮
    handleSortClick (event, column, givenOrder) {
      event.stopPropagation();
      let target = event.target;
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
      const { sortOrder, sortingColumn, filters } = this.store.states;
      const nextSortOrder = {
        prop: column.prop,
        order: givenOrder || column.sortOrders[0],
      };
      if (!givenOrder && sortingColumn === column) {
        const nowOrder = sortOrder.order;
        const nextOrderIndex = (column.sortOrders.indexOf(nowOrder) + 1) %
          column.sortOrders.length;
        nextSortOrder.order = column.sortOrders[nextOrderIndex];
      }
      this.table.$emit('update:sortOrder', nextSortOrder);

      const sorter = { column, ...nextSortOrder };
      this.table.$emit('sort-change', sorter);
      this.table.$emit('change', filters, sorter);
    },

    handleMouseEnter (event, column) {
      clearTimeout(this.resizeTimer);
      if (column.resizable) {
        addClass(event.currentTarget, `${this.prefix}-column-resizable`);
      }
    },
    handleMouseLeave (event, column) {
      if (column.resizable) {
        this.resizeTimer = setTimeout(() => {
          removeClass(event.currentTarget, `${this.prefix}-column-resizable`);
        }, 50);
      }
    },
  },

  data () {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {},
    };
  },
};

import LayoutObserver from './layout-observer';

export default {
  name: 'MtdTableFooter',

  mixins: [LayoutObserver],

  render: function render(h) {
    var _this = this;

    var sums = [];
    if (this.summaryMethod) {
      sums = this.summaryMethod({
        columns: this.columns,
        data: this.store.states.data
      });
    } else {
      this.columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = _this.sumText;
          return;
        }
        var values = _this.store.states.data.map(function (item) {
          return Number(item[column.prop]);
        });
        var precisions = [];
        var notNumber = true;
        values.forEach(function (value) {
          if (!isNaN(value)) {
            notNumber = false;
            var decimal = ('' + value).split('.')[1];
            precisions.push(decimal ? decimal.length : 0);
          }
        });
        var precision = Math.max.apply(null, precisions);
        if (!notNumber) {
          sums[index] = values.reduce(function (prev, curr) {
            var value = Number(curr);
            if (!isNaN(value)) {
              return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '';
        }
      });
    }
    var prefix = this.prefix;

    return h(
      'table',
      {
        'class': prefix + '-footer',
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
      }) : '']), h('tbody', [h('tr', [this._l(this.columns, function (column, cellIndex) {
        return h(
          'td',
          {
            attrs: {
              colspan: column.colSpan,
              rowspan: column.rowSpan
            },
            'class': [column.id, column.alignClass, column.className || '', _this.isCellHidden(cellIndex, _this.columns) ? prefix + '-is-hidden' : '', !column.children ? prefix + '-is-leaf' : '', column.labelClass] },
          [h(
            'div',
            { 'class': [prefix + '-cell', column.labelClass] },
            [sums[cellIndex]]
          )]
        );
      }), this.hasGutter ? h('td', { 'class': prefix + '-gutter' }) : ''])])]
    );
  },


  props: {
    fixed: String,
    prefix: {
      type: String,
      required: true
    },
    store: {
      required: true
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    sortOrder: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.table.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.table.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.table.columns;
    },
    hasGutter: function hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    }
  },

  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }
};
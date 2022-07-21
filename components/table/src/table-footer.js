import LayoutObserver from './layout-observer';

export default {
  name: 'WtTableFooter',

  mixins: [LayoutObserver],

  render (h) {
    let sums = [];
    if (this.summaryMethod) {
      sums = this.summaryMethod({
        columns: this.columns,
        data: this.store.states.data,
      });
    } else {
      this.columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.sumText;
          return;
        }
        const values = this.store.states.data.map(
          item => Number(item[column.prop]),
        );
        const precisions = [];
        let notNumber = true;
        values.forEach(value => {
          if (!isNaN(value)) {
            notNumber = false;
            const decimal = ('' + value).split('.')[1];
            precisions.push(decimal ? decimal.length : 0);
          }
        });
        const precision = Math.max.apply(null, precisions);
        if (!notNumber) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
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
    const { prefix } = this;
    return (
      <table
        class={`${prefix}-footer`}
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
        {/* <tbody class={[{ 'has-gutter': this.hasGutter }]}> */}
        <tbody>
          <tr>
            {
              this._l(this.columns, (column, cellIndex) =>
                <td
                  colspan={ column.colSpan }
                  rowspan={ column.rowSpan }
                  class={
                    [
                      column.id, column.alignClass, column.className || '',
                      this.isCellHidden(cellIndex, this.columns)
                        ? `${prefix}-is-hidden` : '',
                      !column.children ? `${prefix}-is-leaf` : '',
                      column.labelClass,
                    ]
                  }>
                  <div class={[`${prefix}-cell`, column.labelClass] }>
                    { sums[cellIndex] }
                  </div>
                </td>,
              )
            }
            {
              this.hasGutter ? <td class={`${prefix}-gutter`}></td> : ''
            }
          </tr>
        </tbody>
      </table>
    );
  },

  props: {
    fixed: String,
    prefix: {
      type: String,
      required: true,
    },
    store: {
      required: true,
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    sortOrder: {
      type: Object,
      default () {
        return {
          prop: '',
          order: '',
        };
      },
    },
  },

  computed: {
    table () {
      return this.$parent;
    },

    columnsCount () {
      return this.store.states.columns.length;
    },

    leftFixedCount () {
      return this.table.fixedColumns.length;
    },

    rightFixedCount () {
      return this.table.rightFixedColumns.length;
    },

    columns () {
      return this.table.columns;
    },

    hasGutter () {
      return !this.fixed && this.tableLayout.gutterWidth;
    },
  },

  methods: {
    isCellHidden (index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        let before = 0;
        for (let i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return (index < this.leftFixedCount) ||
        (index >= this.columnsCount - this.rightFixedCount);
      }
    },
  },
};

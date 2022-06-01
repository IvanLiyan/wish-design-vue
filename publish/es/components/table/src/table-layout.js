import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import scrollbarWidth from './utils/scrollbar-width';
import Vue from 'vue';

var TableLayout = function () {
  function TableLayout(options) {
    _classCallCheck(this, TableLayout);

    this.observers = [];
    this.table = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;

    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44; // Table Header Height
    this.appendHeight = 0; // Append Slot Height
    this.footerHeight = 44; // Table Footer Height
    this.viewportHeight = null; // Table Height - Scroll Bar Height
    this.bodyHeight = null; // Table Height - Table Header Height
    // Table Height - Table Header Height - Scroll Bar Height
    this.fixedBodyHeight = null;
    this.gutterWidth = scrollbarWidth();

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }
  }

  _createClass(TableLayout, [{
    key: 'updateScrollY',
    value: function updateScrollY() {
      var height = this.height;
      if (typeof height !== 'string' && typeof height !== 'number') return;
      var bodyWrapper = this.table.bodyWrapper;
      if (this.table.$el && bodyWrapper) {
        var body = bodyWrapper.querySelector('.' + this.table.prefix + '-body');
        this.scrollY = body.offsetHeight > this.bodyHeight;
      }
    }
  }, {
    key: 'setHeight',
    value: function setHeight(value) {
      var _this = this;

      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

      if (Vue.prototype.$isServer) return;
      var el = this.table.$el;
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        value = Number(value);
      }
      this.height = value;

      if (!el && (value || value === 0)) {
        return Vue.nextTick(function () {
          return _this.setHeight(value, prop);
        });
      }

      if (typeof value === 'number') {
        el.style[prop] = value + 'px';

        this.updateElsHeight();
      } else if (typeof value === 'string') {
        el.style[prop] = value;
        this.updateElsHeight();
      }
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(value) {
      return this.setHeight(value, 'max-height');
    }
  }, {
    key: 'updateElsHeight',
    value: function updateElsHeight() {
      var _this2 = this;

      if (!this.table.$ready) return Vue.nextTick(function () {
        return _this2.updateElsHeight();
      });
      var _table$$refs = this.table.$refs,
          headerWrapper = _table$$refs.headerWrapper,
          appendWrapper = _table$$refs.appendWrapper,
          footerWrapper = _table$$refs.footerWrapper;

      this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;

      if (this.showHeader && !headerWrapper) return;
      var headerHeight = this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight;
      if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
        return Vue.nextTick(function () {
          return _this2.updateElsHeight();
        });
      }
      var tableHeight = this.tableHeight = this.table.$el.clientHeight;
      if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
        var footerHeight = this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
        this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
      }
      this.fixedBodyHeight = this.scrollX ? this.bodyHeight - this.gutterWidth : this.bodyHeight;

      var noData = !this.table.data || this.table.data.length === 0;
      this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight;

      this.updateScrollY();
      this.notifyObservers('scrollable');
    }
  }, {
    key: 'getFlattenColumns',
    value: function getFlattenColumns() {
      var flattenColumns = [];
      var columns = this.table.columns;
      columns.forEach(function (column) {
        flattenColumns.push(column);
      });

      return flattenColumns;
    }
  }, {
    key: 'updateColumnsWidth',
    value: function updateColumnsWidth() {
      if (Vue.prototype.$isServer) return;
      var fit = this.fit;
      var bodyWidth = this.table.$el.clientWidth;
      var bodyMinWidth = 0;

      var flattenColumns = this.getFlattenColumns();
      var flexColumns = flattenColumns.filter(function (column) {
        return typeof column.width !== 'number';
      });

      // Clean those columns whose width changed from flex to unflex
      flattenColumns.forEach(function (column) {
        if (typeof column.width === 'number' && column.realWidth) {
          column.realWidth = null;
        }
      });

      if (flexColumns.length > 0 && fit) {
        flattenColumns.forEach(function (column) {
          bodyMinWidth += column.width || column.minWidth || 80;
        });

        var scrollYWidth = this.scrollY ? this.gutterWidth : 0;

        if (bodyMinWidth <= bodyWidth - scrollYWidth) {
          // DON'T HAVE SCROLL BAR
          this.scrollX = false;

          var totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
          } else {
            var allColumnsWidth = flexColumns.reduce(function (prev, column) {
              return prev + (column.minWidth || 80);
            }, 0);
            var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            var noneFirstWidth = 0;

            flexColumns.forEach(function (column, index) {
              if (index === 0) return;
              var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              column.realWidth = (column.minWidth || 80) + flexWidth;
            });

            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
          }
        } else {
          // HAVE HORIZONTAL SCROLL BAR
          this.scrollX = true;
          flexColumns.forEach(function (column) {
            column.realWidth = column.minWidth;
          });
        }

        this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
        this.table.resizeState.width = this.bodyWidth;
      } else {
        flattenColumns.forEach(function (column) {
          if (!column.width && !column.minWidth) {
            column.realWidth = 80;
          } else {
            column.realWidth = column.width || column.minWidth;
          }

          bodyMinWidth += column.realWidth;
        });
        this.scrollX = bodyMinWidth > bodyWidth;

        this.bodyWidth = bodyMinWidth;
      }

      var fixedColumns = this.table.fixedColumns;

      if (fixedColumns.length > 0) {
        var fixedWidth = 0;
        fixedColumns.forEach(function (column) {
          fixedWidth += column.realWidth || column.width;
        });

        this.fixedWidth = fixedWidth;
      }

      var rightFixedColumns = this.table.rightFixedColumns;
      if (rightFixedColumns.length > 0) {
        var rightFixedWidth = 0;
        rightFixedColumns.forEach(function (column) {
          rightFixedWidth += column.realWidth || column.width;
        });

        this.rightFixedWidth = rightFixedWidth;
      }

      this.notifyObservers('columns');
    }
  }, {
    key: 'addObserver',
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: 'removeObserver',
    value: function removeObserver(observer) {
      var index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  }, {
    key: 'notifyObservers',
    value: function notifyObservers(event) {
      var _this3 = this;

      var observers = this.observers;
      observers.forEach(function (observer) {
        switch (event) {
          case 'columns':
            observer.onColumnsChange(_this3);
            break;
          case 'scrollable':
            observer.onScrollableChange(_this3);
            break;
          default:
            throw new Error('Table Layout don\'t have event ' + event + '.');
        }
      });
    }
  }]);

  return TableLayout;
}();

export default TableLayout;
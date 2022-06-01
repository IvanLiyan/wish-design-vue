import WtDropdown from '@wish/wt-vue/es/components/dropdown';
import WtCheckboxGroup from '@wish/wt-vue/es/components/checkbox-group';
import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-dropdown', { ref: "dropdown", attrs: { "trigger": "click", "placement": "bottom-end", "visible": _vm.visible, "disabled": _vm.disabled }, on: { "input": _vm.handleVisibleChange }, nativeOn: { "click": function click($event) {
        $event.stopPropagation();
      } } }, [_c('div', { class: [_vm.prefix + "-column-filter-trigger", (_obj = {
      hover: _vm.visible
    }, _obj[_vm.prefix + "-column-filter-trigger-filtered"] = _vm.value && _vm.value.length, _obj)] }, [_vm._t("filter-icon", function () {
    return [_c('Icon', { attrs: { "name": "filter" } })];
  }, { "active": _vm.visible, "filtered": _vm.filtered })], 2), _vm._v(" "), _c('div', { attrs: { "slot": "dropdown" }, slot: "dropdown" }, [_vm._t("filter-dropdown", function () {
    return [_vm.multiple ? _c('wt-checkbox-group', { class: _vm.prefix + "-filter-checkbox-group", model: { value: _vm.value, callback: function callback($v) {
          _vm.value = $v;
        }, expression: "value" } }, _vm._l(_vm.column.filters, function (item) {
      return _c('wt-checkbox', { key: item.value, class: _vm.dropdownPrefix, attrs: { "value": item.value } }, [_vm._v("\n            " + _vm._s(item.text) + "\n          ")]);
    }), 1) : _c('div', _vm._l(_vm.column.filters, function (item) {
      var _obj;
      return _c('div', { key: item.value, class: [_vm.dropdownPrefix, (_obj = {}, _obj[_vm.dropdownPrefix + "-selected"] = item.value === _vm.value[0], _obj)], on: { "click": function click($event) {
            return _vm.selectSingleValue(item.value);
          } } }, [_c('span', [_vm._v(_vm._s(item.text))])]);
    }), 0), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showActions, expression: "showActions" }], class: _vm.prefix + "-filter-footer" }, [_vm.multiple ? _c('a', { class: _vm.prefix + "-filter-footer-confirm", on: { "click": _vm.confirmFilter } }, [_vm._v("确定")]) : _vm._e(), _vm._v(" "), _c('a', { class: _vm.prefix + "-filter-footer-clear", on: { "click": _vm.clearFilter } }, [_vm._v("重置")])])];
  }, { "confirm": _vm.confirmFilter, "clear": _vm.clearFilter, "setSelected": _vm.handleSelect, "selectedValue": _vm.value })], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'FilerPanel',
  components: {
    WtDropdown: WtDropdown,
    WtCheckboxGroup: WtCheckboxGroup,
    WtCheckbox: WtCheckbox,
    Icon: Icon
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    fixed: Boolean,
    disabled: Boolean
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
      value: this.column.filteredValue || [] // 保存用户在点击确定或关闭下拉前的操作值
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('table');
    },
    dropdownPrefix: function dropdownPrefix() {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
    table: function table() {
      // $parent is table-header;
      return this.$parent.table;
    },
    visible: function visible() {
      return !this.disabled && this.column.filterDropdownVisible;
    },
    filtered: function filtered() {
      return this.value && this.value.length;
    },
    multiple: function multiple() {
      return this.column.filterMultiple;
    },
    showActions: function showActions() {
      return this.multiple || this.column.showFilterActions;
    }
  },
  watch: {
    'column.filteredValue': function columnFilteredValue(filteredValue) {
      if (this.value !== filteredValue) {
        this.value = filteredValue;
        this.table.store.computedFilteredData();
      }
    },
    visible: function visible(nVisible, oVisible) {
      if (!nVisible && this.value !== this.column.filteredValue) {
        this.table.store.computedFilteredData();
      }
    }
  },
  mounted: function mounted() {
    !this.disabled && this.table.bodyWrapper.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function destroyed() {
    !this.disabled && this.table.bodyWrapper.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll: function handleScroll() {
      this.updatePopper();
    },
    updateFilteredValue: function updateFilteredValue(filteredValue) {
      var _this = this;

      if (this.column.filteredValue !== filteredValue) {
        this.column.updateFilteredValue(filteredValue);
        // 由于受控模式下是在 watch 中进行 value 值的同步，故需要使用 nextTick
        this.$nextTick(function () {
          _this.value = _this.column.filteredValue;
          _this.table.store.computedFilteredData();
          var _table$store$states = _this.table.store.states,
              filters = _table$store$states.filters,
              sortOrder = _table$store$states.sortOrder,
              sortingColumn = _table$store$states.sortingColumn;

          var _ref = sortOrder || {},
              prop = _ref.prop,
              order = _ref.order;

          _this.table.$emit('change', filters || {}, { prop: prop, order: order, column: sortingColumn });
        });
      }
    },
    close: function close() {
      this.column.updateFilterDropdownVisible(false);
    },
    handleVisibleChange: function handleVisibleChange(visible) {
      this.column.updateFilterDropdownVisible(visible);
      if (!visible) {
        this.confirmFilter({ closed: false });
      }
    },
    confirmFilter: function confirmFilter(options) {
      var _ref2 = options || {},
          _ref2$closed = _ref2.closed,
          closed = _ref2$closed === undefined ? true : _ref2$closed;

      closed && this.close();
      // todo: 可判断是否变更后在更新
      this.updateFilteredValue(this.value);
    },
    clearFilter: function clearFilter(options) {
      var _ref3 = options || {},
          _ref3$closed = _ref3.closed,
          closed = _ref3$closed === undefined ? true : _ref3$closed;

      closed && this.close();
      this.updateFilteredValue([]);
    },
    handleSelect: function handleSelect(value) {
      this.value = value;
    },
    selectSingleValue: function selectSingleValue(value) {
      this.value = [value];
      this.confirmFilter();
    },
    updatePopper: function updatePopper() {
      this.$refs.dropdown.updatePopper();
    }
  }
};
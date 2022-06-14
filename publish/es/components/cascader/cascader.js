import _extends from 'babel-runtime/helpers/extends';
import { Popper, Reference, Drop } from '@wish/wt-vue/es/components/popper';
import WtInput from '@wish/wt-vue/es/components/input';
import Menus from './menus';
import { DEFAULT_FIELD_NAMES, getActivePaths } from './util.js';
import debounce from 'throttle-debounce/debounce';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('popper', { ref: "popper", class: (_obj = {}, _obj["" + _vm.prefix] = true, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj.focus = _vm.visible, _obj), attrs: { "popper-disabled": _vm.disabled, "visible": _vm.visible, "trigger": "click", "placement": _vm.placement }, on: { "clickoutside": _vm.handleClickoutside } }, [_c('Reference', [_c('div', [_c('wt-input', { ref: "input", attrs: { "size": _vm.size, "placeholder": _vm.currentPlaceholder, "disabled": _vm.disabled, "readonly": !_vm.filterable, "clearable": _vm.clearable, "label": _vm.label, "invalid": _vm.invalid }, on: { "focus": _vm.handleFocus, "clear": _vm.handleClear, "input": _vm.handleInput, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition }, nativeOn: { "click": function click($event) {
        return _vm.handleInputClick.apply(null, arguments);
      } }, model: { value: _vm.inputValue, callback: function callback($v) {
        _vm.inputValue = $v;
      }, expression: "inputValue" } }, [_c('wt-icon', { attrs: { "slot": "suffix", "name": "chevron-down" }, slot: "suffix" })], 1)], 1)]), _vm._v(" "), _c('Drop', { class: [_vm.prefix + "-popper"], attrs: { "use-show": _vm.multiple } }, [_c('wt-cascader-menus', { ref: "menus", attrs: { "filterable": _vm.filterable && !_vm.remote, "filter": _vm.filter, "filter-method": _vm.filterMethod, "filter-parent": !_vm.changeOnSelect, "menu-width": _vm.inputWidth, "data": _vm.data, "props": _vm.fieldNames, "change-on-select": _vm.changeOnSelect, "expand-trigger": _vm.expandTrigger, "load-data": _vm.loadData, "loading": _vm.loading, "loading-text": _vm.loadingText, "no-data-text": _vm.noDataText, "no-match-text": _vm.noMatchText, "expanded-value": _vm.expandedValue, "value": _vm.expandedValue, "checked-values": _vm.value }, on: { "expanded-change": _vm.handleExpandedChange, "select": _vm.handleSelect, "click": _vm.handleClickItem }, scopedSlots: _vm._u([{ key: "default", fn: function fn(ref) {
        var node = ref.node;
        var data = ref.data;
        return [_vm._t("default", function () {
          return [_c('span', [_vm._v(_vm._s(node.label))])];
        }, { "node": node, "data": data })];
      } }], null, true) })], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Cascader',
  components: {
    Popper: Popper,
    Reference: Reference,
    Drop: Drop,
    WtInput: WtInput,
    WtCascaderMenus: Menus
  },
  props: {
    icon: String,
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    label: String,
    noDataText: String,
    changeOnSelect: Boolean,
    expandTrigger: String,
    formatter: Function,
    separator: {
      type: String,
      default: ' / '
    },
    loadData: Function,
    filterable: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    noMatchText: String,
    invalid: Boolean,
    loading: Boolean,
    loadingText: String,
    disabled: Boolean,
    clearable: Boolean,
    size: String,
    placeholder: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    visible: Boolean,
    multiple: Boolean
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },
  data: function data() {
    return {
      inputValue: '',
      expandedValue: this.value,
      focused: false,
      previousQuery: null,
      filter: '',
      inputWidth: '',
      valueStrs: ''
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('cascader');
    },
    fieldNames: function fieldNames() {
      return _extends({}, DEFAULT_FIELD_NAMES);
    },
    currentPlaceholder: function currentPlaceholder() {
      return !this.filterable || !this.focused ? this.placeholder : this.valueStrs[0] || this.placeholder;
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(n) {
        n ? this.handleMenuVisible() : this.handleMenuHidden();
      }
    },
    value: {
      immediate: true,
      handler: function handler(n, v) {
        this.updateValueStrs();
      }
    },
    valueStrs: {
      immediate: true,
      handler: function handler(n, old) {
        if (!old || n[0] !== old[0]) {
          this.setInputValue(n, { force: true });
        }
      }
    },
    expandedValue: function expandedValue() {
      var _this = this;

      this.$nextTick(function () {
        _this.updatePopper();
      });
    },
    data: function data(n, v) {
      if ((!v || !v.length) && (n || n.length)) {
        this.updateValueStrs();
      }
      if (this.visible && n !== v) {
        this.expandedValue = this.value;
      }
    }
  },
  created: function created() {
    this.debouncedQuery = !this.debounce ? this.handleQuery : debounce(this.debounce, this.handleQuery);
  },

  methods: {
    openMenu: function openMenu() {
      if (!this.visible) {
        this.$emit('update:visible', true);
      }
    },
    closeMenu: function closeMenu() {
      if (this.visible) {
        this.$emit('update:visible', false);
      }
    },
    handleMenuVisible: function handleMenuVisible() {
      this.expandedValue = this.value;
      this.focused = true;
      this.setInputValue(['']);
      var input = this.$refs.input;

      if (input) {
        this.inputWidth = input.$el.getBoundingClientRect().width + 'px';
      }
      this.$nextTick(this.scrollMenu);
    },
    handleMenuHidden: function handleMenuHidden() {
      this.setInputValue(this.valueStrs);
      this.focused = false;
      this.filter = '';
      this.previousQuery = '';
    },
    handleClickoutside: function handleClickoutside(e) {
      if (this.disabled) {
        return;
      }
      this.closeMenu();
      this.$emit('clickoutside', e);
      this.$emit('blur', e);
    },
    handleFocus: function handleFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    handleClear: function handleClear() {
      // 如果是过滤中点击清空按钮则清空当前搜索条件，否则清空当前值
      if (this.visible && this.filterable && this.inputValue) {
        this.setInputValue(['']);
      } else {
        this.$emit('clear');
        this.setValue([], [], []);
      }
    },
    handleInput: function handleInput(v) {
      if (!this.visible) {
        // to fix: https://tt.sankuai.com/ticket/detail?id=5934989
        this.openMenu();
      }
      this.debouncedQuery(this.inputValue);
    },
    handleInputChange: function handleInputChange(v) {
      this.inputValue = v;
      this.$nextTick(this.updatePopper);
      this.handleInput(v);
    },
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (type === 'compositionend') {
        this.isOnComposition = false;
        // 当混合输入前后值不变时，不会触发后续的 input 事件，所以需要再次触发 query
        this.debouncedQuery(this.inputValue);
      } else {
        this.isOnComposition = true;
      }
    },
    handleInputClick: function handleInputClick() {
      if (this.disabled) {
        return;
      }
      if (!this.visible) {
        this.openMenu();
      } else if (!this.filterable) {
        this.closeMenu();
      }
    },
    handleQuery: function handleQuery(val) {
      var _this2 = this;

      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(val);
      } else {
        this.filter = val;
      }
      // 如果通过样式修改面板高为不定高后，依赖此方法重新定位
      this.$nextTick(function () {
        _this2.updatePopper();
      });
      this.$emit('filter', val);
    },
    setValue: function setValue(values, nodes) {
      this.$emit('input', values);
      var datas = nodes.map(function (node) {
        return node.data;
      });
      this.$emit('change', values, datas, nodes);
    },
    setInputValue: function setInputValue(values) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.filterable || option.force) {
        this.inputValue = values[0];
      }
    },
    handleSelect: function handleSelect(value, nodes) {
      this.setValue(value, nodes);
      this.closeMenu();
    },
    handleClickItem: function handleClickItem(value, nodes) {
      this.setValue(value, nodes);
    },
    handleExpandedChange: function handleExpandedChange(values, nodes) {
      this.expandedValue = values;
      var datas = nodes.map(function (node) {
        return node.data;
      });
      // 展开项发生变化
      this.$emit('active-item-change', datas);
    },
    scrollMenu: function scrollMenu() {
      var menus = this.$refs.menus;
      if (menus) {
        menus.scrollIntoView();
      }
    },
    focus: function focus() {
      this.$refs.input.focus();
      this.openMenu();
    },
    blur: function blur() {
      this.$refs.input.blur();
      this.closeMenu();
    },
    updatePopper: function updatePopper() {
      if (this.visible) {
        this.$refs.popper.updatePopper();
      }
    },
    updateValueStrs: function updateValueStrs() {
      var _this3 = this;

      var labelField = this.fieldNames.label;
      var values = [this.value];
      this.valueStrs = values.map(function (value) {
        var actived = getActivePaths(_this3.data, value, _this3.fieldNames);
        var labels = actived.map(function (item) {
          return item[labelField];
        });
        if (_this3.formatter) {
          return _this3.formatter(labels, actived, value);
        }
        return labels.join('' + _this3.separator);
      });
    }
  }
};
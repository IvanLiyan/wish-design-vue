import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import WtInput from '../input';
import Clickoutside from '@wish/wt-vue/es/utils/clickoutside';
import NavigationMixin from './navigation-mixin';
import scrollIntoView from '@wish/wt-vue/es/utils/scroll-into-view';
import WtTag from '@wish/wt-vue/es/components/tag';
import debounce from 'throttle-debounce/debounce';
import { getValueByPath } from '@wish/wt-vue/es/utils/util';
import { isFunction, isObject, isExist } from '@wish/wt-vue/es/utils/type';
import WtOption from '@wish/wt-vue/es/components/option';
import { on, off } from '@wish/wt-vue/es/utils/dom';
import { subtraction } from '@wish/wt-vue/es/utils/array';
import { hasProps } from '@wish/wt-vue/es/utils/vnode';
import { notKeys } from '@wish/wt-vue/es/utils/key-codes';
import ChoiceTag from './select-tag';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

function getRealValue(value, valueKey) {
  return isObject(value) && valueKey ? getValueByPath(value, valueKey) : value;
}

var SELECT_ALL_VALUE = '__SELECT_ALL__';
var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1, _obj$2;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj[_vm.prefix + "-multiple-" + _vm.genre] = _vm.genre, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-multiple"] = _vm.multiple, _obj[_vm.prefix + "-multiple-invalid"] = _vm.multiple && _vm.invalid, _obj[_vm.prefix + "-multiple-focus"] = _vm.multiple && _vm.opened, _obj), style: _vm.width && { width: _vm.width + "px" }, on: { "click": _vm.toggleMenu } }, [_vm.multiple ? _c('div', { ref: "tags", class: [_vm.prefix + "-tags", (_obj$1 = {}, _obj$1[_vm.prefix + "-tags-" + _vm.size] = _vm.size, _obj$1[_vm.prefix + "-search-focus"] = _vm.opened, _obj$1)] }, [_c('ul', { class: _vm.prefix + "-tags-ul" }, [!_vm.collapseTags ? _vm._l(_vm.filteredSelected, function (item, index) {
    return _c('ChoiceTag', { key: index, attrs: { "option": item, "theme": "", "size": _vm.size, "closable": !item.disabled && _vm.closableFn(item), "disabled": _vm.disabled }, on: { "close": _vm.handleClearClick }, scopedSlots: _vm._u([{ key: "tag", fn: function fn(scope) {
          return _vm.$scopedSlots.tag ? [_vm._t("tag", null, null, scope)] : undefined;
        } }], null, true) }, [_vm._v("\n          " + _vm._s(_vm.formatterOption(item)) + "\n        ")]);
  }) : _vm._e(), _vm._v(" "), _vm.collapseTags && _vm.filteredSelected.length ? _c('ChoiceTag', { ref: "selectedItemFirst", attrs: { "option": _vm.filteredSelected[0], "theme": "", "size": _vm.size, "disabled": _vm.disabled }, on: { "close": _vm.handleClearClick }, scopedSlots: _vm._u([{ key: "tag", fn: function fn(scope) {
        return _vm.$scopedSlots.tag ? [_vm._t("tag", null, null, scope)] : undefined;
      } }], null, true) }, [_vm._v("\n        " + _vm._s(_vm.formatterOption(_vm.filteredSelected[0])) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('li', { class: _vm.prefix + "-search-line" }, [_c('div', { class: _vm.prefix + "-search-field-wrap" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.query, expression: "query" }], ref: "tagInput", class: _vm.prefix + "-search-field", style: { width: _vm.inputLength + 'px', 'max-width': _vm.tagInputWidth + 'px' }, attrs: { "readonly": _vm.readonly, "autocomplete": "off", "tabindex": "-1" }, domProps: { "value": _vm.query }, on: { "focus": _vm.handleFocus, "keyup": _vm.handleQueryInput, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition, "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }$event.preventDefault();return _vm.navigateOptions('next');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
          return null;
        }$event.preventDefault();return _vm.navigateOptions('prev');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }$event.preventDefault();return _vm.selectOption.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }$event.preventDefault();_vm.focused = false;
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) {
          return null;
        }return _vm.deletePrevTag.apply(null, arguments);
      }], "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.query = $event.target.value;
      } } })])]), _vm._v(" "), _vm.collapseTags && _vm.filteredSelected.length ? _c('li', { ref: "selectedItemTag", class: _vm.prefix + "-tags-li" }) : _vm._e()], 2)]) : _vm._e(), _vm._v(" "), _c('popper', { ref: "popper", attrs: { "visible": _vm.opened, "append-to-container": _vm.appendToContainer, "get-popup-container": _vm.getPopupContainer, "placement": _vm.placement, "close-delay": 0, "popper-options": _vm.popperOptions } }, [_c('reference', [_c('wt-input', _vm._b({ ref: "reference", class: (_obj$2 = {}, _obj$2[_vm.prefix + "-search-focus"] = _vm.focused, _obj$2), attrs: { "name": _vm.name, "label": _vm.label, "disabled": _vm.disabled, "placeholder": _vm.currentPlaceholder, "loading": _vm.loading, "invalid": _vm.invalid, "new-height": _vm.newHeight }, on: { "clear": _vm.handleInputClear, "focus": _vm.handleFocus, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition, "keyup": _vm.handleInputChange, "keydown": [_vm.handleKeydown, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
          return null;
        }$event.stopPropagation();$event.preventDefault();return _vm.navigateOptions('next');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
          return null;
        }$event.stopPropagation();$event.preventDefault();return _vm.navigateOptions('prev');
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }$event.preventDefault();return _vm.selectOption.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }$event.stopPropagation();$event.preventDefault();_vm.focused = false;
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
          return null;
        }_vm.focused = false;
      }] }, model: { value: _vm.showValue, callback: function callback($v) {
        _vm.showValue = $v;
      }, expression: "showValue" } }, 'wt-input', _vm.$attrs, false), [_c('span', { class: _vm.prefix + "-suffix-inner", attrs: { "slot": "suffix" }, slot: "suffix" }, [!_vm.loading ? _c('Icon', { attrs: { "name": _vm.sIcon } }) : _c('wt-loading', { attrs: { "message": "", "size": "small" } })], 1)])], 1), _vm._v(" "), _c('drop', { ref: "drop", class: [_vm.prefix + "-dropdown", _vm.popperClass], style: {
      'min-width': _vm.minWidth
    }, attrs: { "use-show": true } }, [_c('ul', { ref: "menu", class: _vm.dropdownPrefix + "-menu" }, [_vm.canSelectAll ? _c('wt-option', { directives: [{ name: "show", rawName: "v-show", value: !_vm._isEmpty && !_vm.query && !_vm.loading, expression: "!_isEmpty && !query && !loading" }], attrs: { "value": _vm.SELECT_ALL_VALUE, "created": "", "is-select-all": "", "indeterminate": !_vm.isSelectAll && _vm.value && !!_vm.value.length } }, [_vm._v("全选")]) : _vm._e(), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.loading && !_vm.emptyText, expression: "!loading && !emptyText" }] }, [_vm.showNewOption ? _c('wt-option', { attrs: { "value": _vm.query, "label": _vm.query, "created": "" } }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), !_vm.loading && _vm.emptyText ? _vm._t("empty", function () {
    return [_c('li', { class: _vm.dropdownPrefix + "-menu-item " + _vm.prefix + "-dropdown-empty" }, [_vm._v("\n            " + _vm._s(_vm.emptyText) + "\n          ")])];
  }) : _vm._e(), _vm._v(" "), _vm.loading ? _vm._t("loading", function () {
    return [_c('li', { class: _vm.dropdownPrefix + "-menu-item " + _vm.prefix + "-dropdown-loading" }, [_vm._v("\n            " + _vm._s(_vm.loadingText) + "\n          ")])];
  }) : _vm._e()], 2)])], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSelect',
  components: {
    WtInput: WtInput,
    Popper: Popper,
    Drop: Drop,
    Reference: Reference,
    WtTag: WtTag,
    WtOption: WtOption,
    ChoiceTag: ChoiceTag,
    Icon: Icon
  },
  directives: { Clickoutside: Clickoutside },
  mixins: [NavigationMixin],
  props: {
    icon: String,
    name: String,
    value: [String, Number, Object, Array, Boolean],
    width: Number,
    defaultActiveFirstOption: {
      type: Boolean,
      default: true
    },
    valueKey: String,
    label: String,
    size: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: function _default() {
        return '请选择';
      }
    },
    placement: String,
    filterable: Boolean,
    autoClearQuery: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    closeable: [Boolean, Function], // 兼容历史
    closable: {
      type: [Boolean, Function],
      default: true
    },
    debounce: {
      type: Number,
      default: 0
    },
    filterMethod: {
      type: Function,
      default: function _default(query, value) {
        var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        return new RegExp(parsedQuery, 'i').test(value);
      }
    },
    remote: Boolean,
    remoteMethod: Function,
    noMatchText: {
      type: String,
      default: function _default() {
        return '暂无搜索结果';
      }
    },

    loading: Boolean,
    loadingText: {
      type: String,
      default: function _default() {
        return '搜索中';
      }
    },
    invalid: Boolean,
    noDataText: {
      type: String,
      default: function _default() {
        return '暂无数据';
      }
    },
    multiple: Boolean,
    showCheckbox: {
      type: Boolean,
      default: true
    },
    multipleLimit: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    collapseTags: Boolean,
    popperClass: String,
    appendToContainer: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    defaultVisible: Boolean,
    isEmpty: Boolean,
    formatter: Function,
    reserveKeyword: Boolean,
    allowCreate: Boolean,
    popperOptions: Object,
    showSelectAll: {
      type: Boolean,
      default: false
    },
    genre: String,
    collapseMaxSearchWidth: {
      // 将在 1.0 中移除
      type: Number,
      default: 50
    }
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
      options: [],
      filteredOptionsCount: 0,
      focused: this.defaultVisible,
      inputLength: 20,
      showValue: '',
      inputWidth: 0,
      tagInputWidth: 0,
      query: '',
      previousQuery: null,
      minWidth: 0,
      isOnComposition: false,
      selected: this.multiple ? [] : {},
      scrollListener: false,
      SELECT_ALL_VALUE: SELECT_ALL_VALUE,
      isSelectAll: false,
      isMounted: false,
      tagsHeight: 36,
      newHeight: this.label ? 44 : 36
    };
  },
  provide: function provide() {
    return {
      select: this
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('select');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    inputPrefix: function inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    dropdownPrefix: function dropdownPrefix() {
      return this.config.getPrefixCls('dropdown');
    },
    sIcon: function sIcon() {
      return hasProps(this, 'icon') ? this.icon : 'chevron-down';
    },
    canSelectAll: function canSelectAll() {
      return this.showSelectAll && this.multiple;
    },
    filteredOptions: function filteredOptions() {
      if (this.canSelectAll) {
        return this.options.filter(function (option) {
          return !option.isSelectAll;
        });
      }
      return this.options;
    },
    filteredSelected: function filteredSelected() {
      if (!this.canSelectAll) {
        return this.selected;
      }
      return this.selected.filter(function (item) {
        return item.value !== SELECT_ALL_VALUE;
      });
    },
    readonly: function readonly() {
      return !this.filterable;
    },
    tooltipWidth: function tooltipWidth() {
      return this.inputWidth;
    },
    _isEmpty: function _isEmpty() {
      if ('isEmpty' in this.$options.propsData) {
        return this.isEmpty;
      } else if (!this.isMounted) {
        return false;
      }
      return !this.filteredOptions.length;
    },
    isNoMatched: function isNoMatched() {
      return this.filterable && this.query && !this.remote && !this.allowCreate && this.filteredOptionsCount === 0;
    },
    emptyText: function emptyText() {
      if (this._isEmpty) {
        if (this.filterable && this.remote) {
          // tofix: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40370097
          return this.query ? this.noMatchText : '';
        }
        return this.noDataText;
      }
      if (this.isNoMatched) {
        return this.noMatchText;
      }
      return '';
    },
    currentPlaceholder: function currentPlaceholder() {
      if (this.multiple) {
        if (!this.isOnComposition && !this.query && (!this.value || !this.value.length)) {
          return this.placeholder;
        }
        return '';
      }
      return isExist(this.value) ? this.formatterOption(this.getOption(this.value)) : this.placeholder;
    },
    opened: function opened() {
      if (this.filterable && this.remote) {
        return this.focused && !!(this.query || this.options && this.options.length);
      }
      return this.focused;
    },
    shouldClearQuery: function shouldClearQuery() {
      return this.autoClearQuery;
    },
    canClosed: function canClosed() {
      return 'closeable' in this.$options.propsData ? this.closeable : this.closable;
    },
    omittedValues: function omittedValues() {
      if (this.multiple && this.collapseTags) {
        // collapseTags 模式下只显示一个 tag
        var omittedLength = this.selected.length - 1;
        if (omittedLength > 0) {
          return this.selected.slice(1);
        }
      }
      return [];
    },
    showNewOption: function showNewOption() {
      var _this = this;

      if (!this.allowCreate || !this.filterable || !this.query) {
        return false;
      }
      var hasExistingOption = this.options.some(function (option) {
        return !option.created && option.currentLabel === _this.query;
      });
      return !hasExistingOption;
    },
    showClear: function showClear() {
      return this.clearable && !this.disabled && this.selected && this.selected.length && this.opened;
    }
  },
  watch: {
    focused: function focused(val) {
      if (val && !this.readonly) {
        this.$refs.tagInput && this.$refs.tagInput.focus();
      }
      if (!val) {
        this.resetHover();
        this.showValue = this.formatterOption(this.selected);
        this.query = '';
        this.$emit('blur');
      } else {
        if (this.options.length && this.defaultActiveFirstOption) {
          this.setHoverOption(this.options[0]);
        }
        if (this.filterable) {
          if (this.shouldClearQuery) {
            this.showValue = '';
          } else if (!this.multiple) {
            // tofix ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3305664
            var _selected = this.selected,
                __DEFAULT_OPTION__ = _selected.__DEFAULT_OPTION__,
                _selected$currentLabe = _selected.currentLabel,
                currentLabel = _selected$currentLabe === undefined ? '' : _selected$currentLabe;
            var formatter = this.formatter;

            this.showValue = __DEFAULT_OPTION__ && formatter ? formatter(this.selected) : currentLabel;
          } else {
            this.showValue = '';
          }
          this.query = this.remote ? this.showValue : '';
          this.handleQueryChange(this.query);
        }
        this.getInputWidth();
        this.addScrollListenter();
      }
    },
    opened: function opened(val) {
      this.$emit('update:visible', val);
    },
    options: function options() {
      this.setSelected();
      if (this.opened && this.$refs.popper) {
        this.updatePopper();
        if (this.options.length && this.defaultActiveFirstOption) {
          var showNewOption = this.showNewOption;

          var first = this.options.find(function (item) {
            return showNewOption ? item.created : item.visible;
          });
          first && this.setHoverOption(first);
        }
      }
    },
    value: function value() {
      this.setSelected();
    },
    selected: function selected(val, old) {
      if (this.multiple) {
        if (!this.collapseTags) {
          this.updatePopper();
        } else {}
      } else if (!this.focused) {
        this.showValue = this.formatterOption(this.selected);
        this.previousQuery = this.showValue || null;
      }
    },
    inputWidth: function inputWidth() {
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
    },
    tagsHeight: function tagsHeight(val, old) {
      if (val !== old) {
        this.newHeight = val;
      }
    }
  },
  created: function created() {
    this.$on('addOption', this.addOption);
    this.$on('removeOption', this.onOptionDestroy);
    this.$on('optionClick', this.handleOptionClick);

    this.debouncedQueryChange = this.debounce ? debounce(this.debounce, this.handleQueryChange) : this.handleQueryChange;
  },
  mounted: function mounted() {
    this.isMounted = true;
    if (this.defaultVisible) {
      this.$refs.reference && this.$refs.reference.focus();
    }
    this.getInputWidth();
    this.setSelected(); // 防止由于没有 options 从而导致默认值不显示问题
  },
  deactivated: function deactivated() {
    this.removeScrollListener();
  },
  beforeDestroy: function beforeDestroy() {
    this.isMounted = false;
    this.removeScrollListener();
  },

  methods: {
    addOption: function addOption(option) {
      this.options.push(option);
    },
    formatterOption: function formatterOption(option) {
      if (option.length) {
        return '';
      } else if (!isExist(option.value) && option.__DEFAULT_OPTION__) {
        return '';
      }
      return this.formatter ? this.formatter({ value: option.value, label: option.currentLabel }) : option.currentLabel || '';
    },
    setSelectedAll: function setSelectedAll() {
      var _this2 = this;

      var options = this.filteredOptions.filter(function (o) {
        return !o._disabled;
      });
      if (this.canSelectAll && this.value && this.value.length && this.value.length >= options.length) {
        var realValues = this.value.map(function (val) {
          return getRealValue(val, _this2.realValue);
        });
        this.isSelectAll = options.every(function (option) {
          return realValues.indexOf(option.realValue) > -1;
        });
        return;
      }
      this.isSelectAll = false;
    },
    setSelected: function setSelected() {
      this.setSelectedAll();
      var value = this.isSelectAll ? [SELECT_ALL_VALUE].concat(_toConsumableArray(this.value)) : this.value;
      var next = this.multiple ? (value || []).map(this.getOption) : this.getOption(value);

      this.selected = next;
    },
    handleFocus: function handleFocus(event) {
      if (!this.disabled && this.filterable && !this.focused) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },
    handleClose: function handleClose() {
      this.focused = false;
    },
    handleKeydown: function handleKeydown(e) {
      if (!this.disabled && !this.focused) {
        if (notKeys(e, ['enter', 'tab', 'esc', 'delete'])) {
          this.focused = true;
        }
      }
    },
    handleInputChange: function handleInputChange(e) {
      if (this.focused && this.filterable && this.query !== this.showValue) {
        this.query = this.showValue;
        this.debouncedQueryChange(this.query);
      }
    },
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (type === 'compositionend') {
        this.isOnComposition = false;
        // 当混合输入前后值不变时，不会触发后续的 input 事件，所以需要再次触发 query
        this.debouncedQueryChange(e.target.value);
      } else {
        this.isOnComposition = true;
      }
    },
    handleQueryInput: function handleQueryInput(e) {
      if (e && e.target) {
        // to fix vue 2.5.22 下多选输入抖动 bug。
        // ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3016033
        this.query = e.target.value;
      }
      var query = this.query;
      // todo: 需要修改成当前字体大小

      var length = query.length * 14 + 5;
      this.inputLength = this.collapseTags ? Math.min(this.collapseMaxSearchWidth, length) : length;
      this.multiple && !this.collapseTags && this.updatePopper();
      this.debouncedQueryChange(this.query);
    },
    getOption: function getOption(value) {
      // todo: 后续需要确认 value=null 时的处理逻辑
      var realValue = getRealValue(value, this.valueKey);
      var equal = function equal(option) {
        return realValue === option.realValue;
      };

      var opt = this.options.find(equal);
      if (!opt) {
        var cached = Array.isArray(this.selected) ? this.selected : [this.selected];

        opt = cached.find(equal);
      } else {
        opt = {
          value: opt.value,
          realValue: opt.realValue,
          label: opt.label,
          currentLabel: opt.currentLabel,
          disabled: opt.disabled
        };
      }
      return opt || {
        value: value,
        realValue: realValue,
        label: !isExist(value) ? '' : value.toString(),
        currentLabel: !isExist(value) ? '' : value.toString(),
        __DEFAULT_OPTION__: true
      };
    },
    handleOptionClick: function handleOptionClick(option) {
      var _this3 = this;

      if (this.disabled) {
        return;
      }

      var optionValue = option.value,
          optionRealValue = option.realValue;

      if (option.isSelectAll) {
        // 取反
        var allValues = this.options.filter(function (option) {
          return !option.isSelectAll && !option._disabled;
        }).map(function (option) {
          return option.value;
        });

        var nextValues = [];
        if (this.isSelectAll) {
          // 已经全选则清空
          nextValues = subtraction(allValues, this.value, function (a, b) {
            return a === b || getRealValue(a) === getRealValue(b);
          });
        } else {
          // 全选
          var diffValues = subtraction(this.value, allValues, function (a, b) {
            return a === b || getRealValue(a) === getRealValue(b);
          });
          nextValues = [].concat(_toConsumableArray(this.value || []), _toConsumableArray(diffValues));
        }

        this.$emit('input', nextValues);
        this.$emit('change', nextValues);
      } else if (this.multiple) {
        var copyiedValue = this.value ? [].concat(_toConsumableArray(this.value)) : [];
        var realValues = copyiedValue.map(function (val) {
          return getRealValue(val, _this3.valueKey);
        });

        var index = -1;
        realValues.some(function (v, i) {
          var r = v === optionRealValue;
          if (r) {
            index = i;
          }
          return r;
        });
        if (index > -1) {
          copyiedValue.splice(index, 1);
        } else if (!this.multipleLimit || copyiedValue.length < this.multipleLimit) {
          copyiedValue.push(optionValue);
        }
        if (!this.reserveKeyword) {
          this.query = '';
          this.handleQueryInput();
        }
        this.$emit('input', copyiedValue);
        this.$emit('change', copyiedValue);
      } else {
        var realValue = getRealValue(this.value, this.valueKey);
        if (realValue !== optionRealValue) {
          this.$emit('input', option.value);
          this.$emit('change', option.value);
        }
        this.focused = false;
      }
      var input = this.$refs.tagInput;
      if (input) {
        input.focus();
      }
    },
    selectOption: function selectOption() {
      if (!this.opened) {
        this.toggleMenu();
      } else if (!this.isOnComposition && this.hoverOption && this.hoverOption.visible) {
        this.handleOptionClick(this.hoverOption);
      }
    },
    handleInputClear: function handleInputClear() {
      this.$emit('clear');
      this.$emit('input', this.multiple ? [] : '');
      this.$emit('change', this.multiple ? [] : '');
    },
    deletePrevTag: function deletePrevTag(e) {
      if (this.disabled) {
        return;
      }
      if (!this.collapseTags && e.target.value.length <= 0) {
        var filteredSelected = this.filteredSelected;

        if (!filteredSelected || !filteredSelected.length) {
          return;
        }
        var last = filteredSelected[filteredSelected.length - 1];

        if (!last.hitState) {
          this.$set(last, 'hitState', true);
        } else if (!last.disabled && this.closableFn(last)) {
          this.handleClearClick(last);
        }
      }
    },
    handleClearClick: function handleClearClick(tag) {
      if (this.disabled) {
        return;
      }
      var index = this.filteredSelected.indexOf(tag);
      if (index > -1) {
        var value = [].concat(_toConsumableArray(this.value));
        value.splice(index, 1);
        this.$emit('input', value);
        this.$emit('change', value);
        this.$emit('remove', tag.value);
      }
    },
    updatePopper: function updatePopper() {
      var _this4 = this;

      this.$nextTick(function () {
        if (_this4.focused) {
          _this4.$refs.popper.updatePopper();
        }
        _this4.tagsHeight = _this4.$refs.tags.offsetHeight;
      });
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this5 = this;

      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        var filteredOptions = this.options.filter(function (item) {
          if (item.isSelectAll) {
            item.visible = !val;
            return false;
          }
          if (item.created) {
            return false;
          }
          item.visible = val !== '' ? _this5.filterMethod(val, item.currentLabel) : true;
          return item.visible;
        });
        this.filteredOptionsCount = filteredOptions.length;
        if (this.defaultActiveFirstOption) {
          // 如果是可创建的，则自动 hover 创建的，否则找到第一个可显示的
          if (this.showNewOption) {
            var first = this.options.find(function (item) {
              return item.created;
            });
            first && this.setHoverOption(first);
          } else if (this.filteredOptionsCount) {
            this.setHoverOption(filteredOptions[0]);
          }
        }
        this.updatePopper();
      }
      this.$emit('filter', val);
    },
    toggleMenu: function toggleMenu() {
      if (!this.disabled) {
        if (!this.filterable || !this.focused) {
          this.focused = !this.focused;
        }
        if (this.focused) {
          this.$refs.tagInput && this.$refs.tagInput.focus();
        }
      }
    },
    getInputWidth: function getInputWidth() {
      var _$refs = this.$refs,
          selectedItemFirst = _$refs.selectedItemFirst,
          selectedItemTag = _$refs.selectedItemTag,
          reference = _$refs.reference;

      var inputWidth = reference.$el.getBoundingClientRect().width;
      this.inputWidth = inputWidth;
      if (selectedItemFirst && selectedItemFirst.$el) {
        inputWidth += selectedItemFirst.$el.getBoundingClientRect().width;
      }
      if (selectedItemTag) {
        inputWidth += selectedItemTag.getBoundingClientRect().width;
      }
      var width = inputWidth - 42; // right icon size
      this.tagInputWidth = width > 0 ? width : 0;
    },
    onOptionDestroy: function onOptionDestroy(option) {
      var index = this.options.indexOf(option);
      if (this.hoverOption === option) {
        this.resetHover();
      }
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.menu;
        scrollIntoView(menu, target);
      }
      // this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    closableFn: function closableFn(item) {
      return isFunction(this.canClosed) ? this.canClosed(item) : this.canClosed;
    },
    addScrollListenter: function addScrollListenter() {
      var _$listeners = this.$listeners,
          scrollBottom = _$listeners['scroll-bottom'],
          scroll = _$listeners.scroll;
      var dropdownPrefix = this.dropdownPrefix;

      if ((scrollBottom || scroll) && this.$refs.drop) {
        var scrollElement = this.$refs.drop.$el.querySelector('.' + dropdownPrefix + '-menu');
        if (scrollElement) {
          on(scrollElement, 'scroll', this.handleScroll);
          this.scrollListener = true;
        }
      }
    },
    removeScrollListener: function removeScrollListener() {
      if (this.scrollListener) {
        var dropdownPrefix = this.dropdownPrefix;

        var scrollElement = this.$refs.drop.$el.querySelector('.' + dropdownPrefix + '-menu');
        off(scrollElement, 'scroll', this.handleScroll);
      }
      this.scrollListener = false;
    },
    handleScroll: function handleScroll(event) {
      this.$emit('scroll', event);
      var _event$target = event.target,
          scrollHeight = _event$target.scrollHeight,
          scrollTop = _event$target.scrollTop,
          clientHeight = _event$target.clientHeight;

      if (scrollTop + clientHeight + 20 >= scrollHeight) {
        this.$emit('scroll-bottom', event);
      }
    },
    focus: function focus() {
      var _$refs2 = this.$refs,
          reference = _$refs2.reference,
          tagInput = _$refs2.tagInput;

      this.focused = true;
      if (this.multiple) {
        tagInput.focus();
        return;
      }
      reference.focus();
    },
    blur: function blur() {
      var _$refs3 = this.$refs,
          reference = _$refs3.reference,
          tagInput = _$refs3.tagInput;

      this.focused = false;
      if (this.multiple) {
        tagInput.blur();
        return;
      }
      reference.blur();
    }
  }
};
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import WtInput from '../input';
import Clickoutside from '@wish/wt-vue/es/utils/clickoutside';
import NavigationMixin from './navigation-mixin';
import debounce from 'throttle-debounce/debounce';
import { getValueByPath } from '@wish/wt-vue/es/utils/util';
import { isObject, isExist } from '@wish/wt-vue/es/utils/type';
import WtOption from '@wish/wt-vue/es/components/option';
import { on, off } from '@wish/wt-vue/es/utils/dom';
import { subtraction } from '@wish/wt-vue/es/utils/array';
import { notKeys } from '@wish/wt-vue/es/utils/key-codes';
import ChoiceTag from './select-tag';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1, _obj$2;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-multiple"] = _vm.multiple, _obj[_vm.prefix + "-multiple-invalid"] = _vm.multiple && _vm.invalid, _obj[_vm.prefix + "-multiple-focus"] = _vm.multiple && _vm.opened, _obj), style: _vm.width && { width: _vm.width + "px" }, on: { "click": _vm.toggleMenu } }, [_vm.multiple ? _c('div', { ref: "tags", class: [_vm.prefix + "-tags", (_obj$1 = {}, _obj$1[_vm.prefix + "-search-focus"] = _vm.opened, _obj$1)] }, [_c('ul', { class: _vm.prefix + "-tags-ul" }, [_vm._l(_vm.filteredSelected, function (item, index) {
    return _c('ChoiceTag', { key: index, attrs: { "option": item, "disabled": _vm.disabled }, on: { "close": _vm.handleClearClick }, scopedSlots: _vm._u([{ key: "tag", fn: function fn(scope) {
          return _vm.$scopedSlots.tag ? [_vm._t("tag", null, null, scope)] : undefined;
        } }], null, true) }, [_vm._v("\n          " + _vm._s(_vm.formatterOption(item)) + "\n        ")]);
  }), _vm._v(" "), _c('li', { class: _vm.prefix + "-search-line" }, [_c('div', { class: _vm.prefix + "-search-field-wrap" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.query, expression: "query" }], ref: "tagInput", class: _vm.prefix + "-search-field", style: { width: _vm.inputLength + 'px', 'max-width': _vm.tagInputWidth + 'px' }, attrs: { "readonly": _vm.readonly, "autocomplete": "off", "tabindex": "-1" }, domProps: { "value": _vm.query }, on: { "focus": _vm.handleFocus, "keyup": _vm.handleQueryInput, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition, "keydown": [function ($event) {
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
      } } })])])], 2)]) : _vm._e(), _vm._v(" "), _c('popper', { ref: "popper", attrs: { "visible": _vm.opened, "append-to-container": true, "close-delay": 0 } }, [_c('reference', [_c('wt-input', _vm._b({ ref: "reference", class: (_obj$2 = {}, _obj$2[_vm.prefix + "-search-focus"] = _vm.focused, _obj$2), attrs: { "label": _vm.label, "disabled": _vm.disabled, "placeholder": _vm.currentPlaceholder, "loading": _vm.loading, "invalid": _vm.invalid, "new-height": _vm.newHeight }, on: { "clear": _vm.handleInputClear, "focus": _vm.handleFocus, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition, "keyup": _vm.handleInputChange, "keydown": [_vm.handleKeydown, function ($event) {
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
      }, expression: "showValue" } }, 'wt-input', _vm.$attrs, false), [_c('span', { class: _vm.prefix + "-suffix-inner", attrs: { "slot": "suffix" }, slot: "suffix" }, [!_vm.loading ? _c('Icon', { attrs: { "name": "chevron-down" } }) : _c('wt-loading', { attrs: { "message": "", "size": "small" } })], 1)])], 1), _vm._v(" "), _c('drop', { ref: "drop", class: [_vm.prefix + "-dropdown"], style: {
      'min-width': _vm.minWidth
    }, attrs: { "use-show": true } }, [_c('ul', { ref: "menu", class: _vm.dropdownPrefix + "-menu" }, [_vm.canSelectAll ? _c('wt-option', { directives: [{ name: "show", rawName: "v-show", value: !_vm._isEmpty && !_vm.query && !_vm.loading, expression: "!_isEmpty && !query && !loading" }], attrs: { "value": _vm.SELECT_ALL_VALUE, "created": "", "is-select-all": "" } }, [_vm._v("全选")]) : _vm._e(), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.loading && !_vm.emptyText, expression: "!loading && !emptyText" }] }, [_vm._t("default")], 2), _vm._v(" "), !_vm.loading && _vm.emptyText ? _vm._t("empty", function () {
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
    WtOption: WtOption,
    ChoiceTag: ChoiceTag,
    Icon: Icon
  },
  directives: { Clickoutside: Clickoutside },
  mixins: [NavigationMixin],
  props: {
    // select当前选中值
    value: [String, Number, Object, Array, Boolean],
    // 设置宽度
    width: Number,
    // 仅当 value 值为 object、object[]时生效，作为value唯一标识的键名
    valueKey: String,
    // select标题
    label: String,
    // 是否禁用
    disabled: Boolean,
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否可搜索
    filterable: Boolean,
    // 远程搜索的方法
    remoteMethod: Function,
    // 搜索条件无匹配时显示的文字
    noMatchText: {
      type: String,
      default: '暂无搜索结果'
    },
    // 是否正在从远程获取数据
    loading: Boolean,
    // 搜索中文案
    loadingText: {
      type: String,
      default: '搜索中'
    },
    // 是否校验通过，用于非空校验
    invalid: Boolean,
    // 选项为空时显示的文字
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    // 是否多选
    multiple: Boolean,
    // 默认可见
    defaultVisible: Boolean,
    // 格式化当前输入框中显示的内容
    formatter: Function,
    // 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
    reserveKeyword: Boolean,
    // 显示全选
    showSelectAll: {
      type: Boolean,
      default: false
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
      options: [], // 选项
      filteredOptionsCount: 0, // 搜到选项输
      focused: this.defaultVisible, // 是否聚焦
      inputLength: 20, // input字符长度
      showValue: '', // input显示值
      inputWidth: 0, // input宽度
      tagInputWidth: 0, // tag宽度
      query: '', // 搜索匹配文字
      previousQuery: null, // 上一条查询
      minWidth: 0, // 最小宽度
      isOnComposition: false, // 正在输入
      selected: this.multiple ? [] : {}, // 选中值
      scrollListener: false, // 是否滚动
      SELECT_ALL_VALUE: '__SELECT_ALL__', // 常量 全部
      isSelectAll: false, // 是否全选
      isMounted: false, // 是否mounted
      tagsHeight: 36, // tag默认高度
      newHeight: this.label ? 44 : 36, // 计算高度
      showCheckbox: true, // 是否显示checkbox
      isEmpty: false // 是否手动设置选项为空
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

    // 是否可以全选
    canSelectAll: function canSelectAll() {
      return this.showSelectAll && this.multiple;
    },

    // 过滤选项
    filteredOptions: function filteredOptions() {
      if (this.canSelectAll) {
        return this.options.filter(function (option) {
          return !option.isSelectAll;
        });
      }
      return this.options;
    },

    // 过滤选中的
    filteredSelected: function filteredSelected() {
      var _this = this;

      if (!this.canSelectAll) {
        return this.selected;
      }
      return this.selected.filter(function (item) {
        return item.value !== _this.SELECT_ALL_VALUE;
      });
    },

    // 只读
    readonly: function readonly() {
      return !this.filterable;
    },

    // 是否为空
    _isEmpty: function _isEmpty() {
      if ('isEmpty' in this.$options.propsData) {
        return this.isEmpty;
      } else if (!this.isMounted) {
        return false;
      }
      return !this.filteredOptions.length;
    },

    // 是否无匹配
    isNoMatched: function isNoMatched() {
      return this.filterable && this.query && !this.remote && this.filteredOptionsCount === 0;
    },

    // 空数据文案
    emptyText: function emptyText() {
      if (this._isEmpty) {
        if (this.filterable && this.remote) {
          return this.query ? this.noMatchText : '';
        }
        return this.noDataText;
      }
      if (this.isNoMatched) {
        return this.noMatchText;
      }
      return '';
    },

    // 当前占位符
    currentPlaceholder: function currentPlaceholder() {
      if (this.multiple) {
        if (!this.isOnComposition && !this.query && (!this.value || !this.value.length)) {
          return this.placeholder;
        }
        return '';
      }
      return isExist(this.value) ? this.formatterOption(this.getOption(this.value)) : this.placeholder;
    },

    // 是否打开选项
    opened: function opened() {
      if (this.filterable && this.remote) {
        return this.focused && !!(this.query || this.options && this.options.length);
      }
      return this.focused;
    },

    // 是否为远程获取数据
    remote: function remote() {
      if (typeof this.remoteMethod === 'function') {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    // 监听获取焦点逻辑
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
        if (this.options.length) {
          this.setHoverOption(this.options[0]);
        }
        if (this.filterable) {
          if (!this.multiple) {
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

    // 打开选项
    opened: function opened(val) {
      this.$emit('update:visible', val);
    },

    // 监听选项变化
    options: function options() {
      this.setSelected();
      if (this.opened && this.$refs.popper) {
        this.updatePopper();
        if (this.options.length) {
          var first = this.options.find(function (item) {
            return item.visible;
          });
          first && this.setHoverOption(first);
        }
      }
    },

    // 监听value变化
    value: function value() {
      this.setSelected();
    },

    // 监听选中变化
    selected: function selected(val, old) {
      if (this.multiple) {
        this.updatePopper();
      } else if (!this.focused) {
        this.showValue = this.formatterOption(this.selected);
        this.previousQuery = this.showValue || null;
      }
    },

    // input宽度
    inputWidth: function inputWidth() {
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
    },

    // tags容器高度
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
    /**
     * 添加选项
     */
    addOption: function addOption(option) {
      this.options.push(option);
    },

    /**
     * 处理选项数据
     */
    formatterOption: function formatterOption(option) {
      if (option.length) {
        return '';
      } else if (!isExist(option.value) && option.__DEFAULT_OPTION__) {
        return '';
      }
      return this.formatter ? this.formatter({ value: option.value, label: option.currentLabel }) : option.currentLabel || '';
    },

    /**
     * 设置全选
     */
    setSelectedAll: function setSelectedAll() {
      var _this2 = this;

      var options = this.filteredOptions.filter(function (o) {
        return !o._disabled;
      });
      if (this.canSelectAll && this.value && this.value.length && this.value.length >= options.length) {
        var realValues = this.value.map(function (val) {
          return _this2.getRealValue(val, _this2.realValue);
        });
        this.isSelectAll = options.every(function (option) {
          return realValues.indexOf(option.realValue) > -1;
        });
        return;
      }
      this.isSelectAll = false;
    },

    /**
     * 设置选中
     */
    setSelected: function setSelected() {
      this.setSelectedAll();
      var value = this.isSelectAll ? [this.SELECT_ALL_VALUE].concat(_toConsumableArray(this.value)) : this.value;
      var next = this.multiple ? (value || []).map(this.getOption) : this.getOption(value);

      this.selected = next;
    },

    /**
     * 聚焦
     */
    handleFocus: function handleFocus(event) {
      if (!this.disabled && this.filterable && !this.focused) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },

    /**
     * 设置关闭
     */
    handleClose: function handleClose() {
      this.focused = false;
    },

    /**
     * 监控按键
     */
    handleKeydown: function handleKeydown(e) {
      if (!this.disabled && !this.focused) {
        if (notKeys(e, ['enter', 'tab', 'esc', 'delete'])) {
          this.focused = true;
        }
      }
    },

    /**
     * 处理输入事件
     */
    handleInputChange: function handleInputChange(e) {
      if (this.focused && this.filterable && this.query !== this.showValue) {
        this.query = this.showValue;
        this.debouncedQueryChange(this.query);
      }
    },

    /**
     * 处理输入拼音
     */
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

    /**
     * 处理多选更新选项
     */
    handleQueryInput: function handleQueryInput(e) {
      if (e && e.target) {
        this.query = e.target.value;
      }
      var query = this.query;

      var length = query.length * 14 + 5;
      this.inputLength = length;
      this.multiple && this.updatePopper();
      this.debouncedQueryChange(this.query);
    },

    /**
     * 获取匹配选项
     */
    getOption: function getOption(value) {
      var realValue = this.getRealValue(value, this.valueKey);
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

    /**
     * 处理选中选项
     */
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
            return a === b || _this3.getRealValue(a) === _this3.getRealValue(b);
          });
        } else {
          // 全选
          var diffValues = subtraction(this.value, allValues, function (a, b) {
            return a === b || _this3.getRealValue(a) === _this3.getRealValue(b);
          });
          nextValues = [].concat(_toConsumableArray(this.value || []), _toConsumableArray(diffValues));
        }

        this.$emit('input', nextValues);
        this.$emit('change', nextValues);
      } else if (this.multiple) {
        var copyiedValue = this.value ? [].concat(_toConsumableArray(this.value)) : [];
        var realValues = copyiedValue.map(function (val) {
          return _this3.getRealValue(val, _this3.valueKey);
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
        } else {
          copyiedValue.push(optionValue);
        }
        if (!this.reserveKeyword) {
          this.query = '';
          this.handleQueryInput();
        }
        this.$emit('input', copyiedValue);
        this.$emit('change', copyiedValue);
      } else {
        var realValue = this.getRealValue(this.value, this.valueKey);
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

    /**
     * 选项点击事件
     */
    selectOption: function selectOption() {
      if (!this.opened) {
        this.toggleMenu();
      } else if (!this.isOnComposition && this.hoverOption && this.hoverOption.visible) {
        this.handleOptionClick(this.hoverOption);
      }
    },

    /**
     * 清空全部选项
     */
    handleInputClear: function handleInputClear() {
      this.$emit('clear');
      this.$emit('input', this.multiple ? [] : '');
      this.$emit('change', this.multiple ? [] : '');
    },

    /**
     * 触发删除tag
     */
    deletePrevTag: function deletePrevTag(e) {
      if (this.disabled) {
        return;
      }
      if (e.target.value.length <= 0) {
        var filteredSelected = this.filteredSelected;

        if (!filteredSelected || !filteredSelected.length) {
          return;
        }
        var last = filteredSelected[filteredSelected.length - 1];

        if (!last.hitState) {
          this.$set(last, 'hitState', true);
        } else if (!last.disabled) {
          this.handleClearClick(last);
        }
      }
    },

    /**
     * 删除某个tag
     */
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

    /**
     * 更新选项列表
     */
    updatePopper: function updatePopper() {
      var _this4 = this;

      this.$nextTick(function () {
        if (_this4.focused) {
          _this4.$refs.popper.updatePopper();
        }
        _this4.tagsHeight = _this4.$refs.tags.offsetHeight;
      });
    },

    /**
     * 处理选项变更
     */
    handleQueryChange: function handleQueryChange(val) {
      var _this5 = this;

      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else {
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
        // 如果是可创建的，则自动 hover 创建的，否则找到第一个可显示的
        if (this.filteredOptionsCount) {
          this.setHoverOption(filteredOptions[0]);
        }
        this.updatePopper();
      }
      this.$emit('filter', val);
    },

    /**
     * 显隐选项
     */
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

    /**
     * 获取input宽度
     */
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

    /**
     * 销毁选项
     */
    onOptionDestroy: function onOptionDestroy(option) {
      var index = this.options.indexOf(option);
      if (this.hoverOption === option) {
        this.resetHover();
      }
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },

    /**
     * 添加滚动监听
     */
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

    /**
     * 移除滚动监听
     */
    removeScrollListener: function removeScrollListener() {
      if (this.scrollListener) {
        var dropdownPrefix = this.dropdownPrefix;

        var scrollElement = this.$refs.drop.$el.querySelector('.' + dropdownPrefix + '-menu');
        off(scrollElement, 'scroll', this.handleScroll);
      }
      this.scrollListener = false;
    },

    /**
     * 滚动事件
     */
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

    /**
     * 聚焦
     */
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

    /**
     * 失焦
     */
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
    },

    /**
     * 过滤方法
     */
    filterMethod: function filterMethod(query, value) {
      var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      return new RegExp(parsedQuery, 'i').test(value);
    },

    /**
     * 获取value为对象时唯一key
     */
    getRealValue: function getRealValue(value, valueKey) {
      // return isObject(value) && valueKey ? getValueByPath(value, valueKey) : value;
      if (isObject(value) && value.hasOwnProperty('value')) {
        return value.value;
      } else if (isObject(value) && valueKey) {
        getValueByPath(value, valueKey);
      } else if (!isObject(value)) {
        return value;
      }
    }
  }
};
import _Object$assign from 'babel-runtime/core-js/object/assign';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import { isKey } from '@wish/wt-vue/es/utils/key-codes';
import calcNodeHeight from './calcNodeHeight';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('fieldset', { class: (_obj = {}, _obj[_vm.inputPrefix + "-wrapper"] = true, _obj[_vm.inputPrefix + "-" + _vm.type] = _vm.type, _obj[_vm.inputPrefix + "-with-label"] = _vm.label, _obj[_vm.inputPrefix + "-disabled"] = _vm.disabled, _obj[_vm.inputPrefix + "-invalid"] = _vm.isInvalid && !_vm.focused, _obj[_vm.inputPrefix + "-focused"] = _vm.focused, _obj), style: _vm.fullWidth ? { width: '100%' } : {} }, [_vm.label ? _c('legend', [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.inputPrefix + "-con" }, [_vm._t("prefix"), _vm._v(" "), _vm.type === 'textarea' ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputPrefix, style: _vm.textareaCalcStyle, attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.inputValue } }, 'textarea', _vm.$attrs, false), _vm.inputLisenters)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputPrefix, attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.inputValue } }, 'input', _vm.$attrs, false), _vm.inputLisenters)), _vm._v(" "), _vm._t("suffix")], 2)]), _vm._v(" "), _c('div', { class: _vm.inputPrefix + "-tip" }, [_vm.isInvalid && !_vm.focused ? _c('span', [_vm._v(_vm._s(_vm.validation || '请填写正确的内容'))]) : _vm._e(), _vm._v(" "), _vm.type === 'textarea' ? _c('em', [_vm._v(" " + _vm._s(_vm.inputValue.length) + "/ " + _vm._s(_vm.maxLength))]) : _vm._e()])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtInput',
  components: {
    Icon: Icon
  },
  inheritAttrs: false,
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  props: {
    type: {
      type: String,
      validator: function validator(val) {
        return ['line', 'textarea'].includes(val);
      }
    },
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String,
    value: [String, Number],
    validation: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    maxLength: {
      type: Number,
      default: 100
    }
  },
  data: function data() {
    return {
      focused: false,
      hovering: false,
      isComposing: false,
      textareaCalcStyle: {}
    };
  },


  computed: {
    inputPrefix: function inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    inputValue: function inputValue() {
      return this.hasValue ? this.value : '';
    },
    hasValue: function hasValue() {
      return this.value === 0 || !!this.value;
    },
    isInvalid: function isInvalid() {
      return this.type === 'textarea' && this.value && this.value.length > this.maxLength || this.invalid;
    },
    inputLisenters: function inputLisenters() {
      var lisenters = _Object$assign({}, this.$listeners, {
        input: this.handleInput,
        focus: this.focus,
        blur: this.blur,
        keyup: this.handleKeyup,
        compositionstart: this.handleComposition,
        compositionupdate: this.handleComposition,
        compositionend: this.handleComposition
      });
      if (lisenters.change) {
        // it will trigger change event twice if not remove
        delete lisenters.change;
      }
      return lisenters;
    }
  },
  watch: {
    value: function value(val) {
      if (this.type === 'textarea') {
        this.$nextTick(this.resizeTextarea);
      }
    }
  },
  mounted: function mounted() {
    this.resizeTextarea();
  },

  methods: {
    /**
     * 输入框内容改变handle
     */
    handleInput: function handleInput(event, options) {
      var value = event.target.value;
      // 输入中触发

      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.$nextTick(this.setNativeInput);
        }
      }
      // 输入结束后触发
      if (!this.isComposing || options && options.change) {
        this.$emit('change', value);
      }
    },

    /**
     * 处理事件集合
     */
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (this.$listeners[type]) {
        this.$emit(type, e);
      }
      if (type === 'compositionend') {
        this.isComposing = false;
        this.handleInput(e, { change: true });
      } else {
        this.isComposing = true;
      }
    },

    /**
     * 设置input值
     */
    setNativeInput: function setNativeInput() {
      var input = this.$refs.input;

      if (input && input.value !== this.value) {
        this.value = input.value;
      }
    },

    /**
     * 获得焦点
     */
    focus: function focus() {
      this.focused = true;
      this.$refs.input.focus();
    },

    /**
     * 失去焦点
     */
    blur: function blur() {
      this.focused = false;
      this.$refs.input.blur();
    },

    /**
     * 处理键盘事件
     */
    handleKeyup: function handleKeyup(e) {
      if (this.$listeners.keyup) {
        this.$emit('keyup', e);
      }
      if (isKey(e, 'enter') && !this.isComposing) {
        this.$emit('enter', e);
      }
    },

    /**
     * 设置textarea自适应高度
     */
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      if (!this.autosize) {
        this.textareaCalcStyle = {
          minHeight: calcNodeHeight(this.$refs.input).minHeight
        };
        return;
      }
      var _autosize = this.autosize,
          _autosize$minRows = _autosize.minRows,
          minRows = _autosize$minRows === undefined ? 2 : _autosize$minRows,
          _autosize$maxRows = _autosize.maxRows,
          maxRows = _autosize$maxRows === undefined ? 6 : _autosize$maxRows;

      this.textareaCalcStyle = calcNodeHeight(this.$refs.input, minRows, maxRows);
    }
  }
};
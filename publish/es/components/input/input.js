import _Object$assign from 'babel-runtime/core-js/object/assign';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import { isKey } from '@wish/wt-vue/es/utils/key-codes';
import calcNodeHeight from './calcNodeHeight';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.inputPrefix + "-box", style: _vm.width && { width: _vm.width + "px" } }, [_c('fieldset', { class: (_obj = {}, _obj[_vm.inputPrefix + "-wrapper"] = true, _obj[_vm.inputPrefix + "-" + _vm.type] = _vm.type, _obj[_vm.inputPrefix + "-with-label"] = _vm.label, _obj[_vm.inputPrefix + "-disabled"] = _vm.disabled, _obj[_vm.inputPrefix + "-invalid"] = _vm.isInvalid, _obj[_vm.inputPrefix + "-focused"] = _vm.focused, _obj), style: { height: _vm.newHeight + 'px' } }, [_vm.label ? _c('legend', { class: { 'space-label': !_vm.label.trim() } }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.inputPrefix + "-con" }, [_vm._t("prefix"), _vm._v(" "), _vm.type === 'textarea' ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputPrefix, style: _vm.textareaCalcStyle, attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.inputValue } }, 'textarea', _vm.$attrs, false), _vm.inputLisenters)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputPrefix, attrs: { "type": _vm.type === 'password' ? 'password' : _vm.text, "disabled": _vm.disabled }, domProps: { "value": _vm.inputValue } }, 'input', _vm.$attrs, false), _vm.inputLisenters)), _vm._v(" "), _vm.showClearIcon ? _c('Icon', { attrs: { "name": "x-circle" }, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.handleClear.apply(null, arguments);
      } } }) : _vm._e(), _vm._v(" "), _vm._t("suffix")], 2)]), _vm._v(" "), _vm.type === 'textarea' && _vm.inputValue.length > _vm.maxLength ? _c('em', { class: _vm.inputPrefix + "-tip" }, [_vm._v("\n    " + _vm._s(_vm.inputValue.length) + "/" + _vm._s(_vm.maxLength))]) : _vm._e()]);
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
    // 类型
    type: {
      type: String,
      validator: function validator(val) {
        return !val || ['line', 'textarea'].includes(val);
      }
    },
    // 禁止状态
    disabled: Boolean,
    // 校验不通过
    invalid: Boolean,
    // 宽
    width: Number,
    // 标签
    label: String,
    // 输入框的内容
    value: [String, Number],
    // 是否有清空按钮
    clearable: Boolean,
    // textarea时 自适应内容高度
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    // 限制输入的最大长度
    maxLength: {
      type: Number,
      default: 100
    },
    newHeight: Number
  },
  data: function data() {
    return {
      // 聚焦
      focused: false,
      // 是否在拼音拼写中
      isComposing: false,
      // textarea自适应高度
      textareaCalcStyle: {},
      // input自身值
      nativeValue: '',
      // 没有双向绑定
      noModel: false
    };
  },


  computed: {
    inputPrefix: function inputPrefix() {
      return this.config.getPrefixCls('input');
    },


    // 是否显示清除icon
    showClearIcon: function showClearIcon() {
      return this.clearable && this.inputValue && !this.disabled;
    },


    // input值
    inputValue: function inputValue() {
      var value = (this.noModel ? this.nativeValue : this.value) || '';
      if (this.type !== 'textarea') {
        value = value.slice(0, this.maxLength);
      }
      return value;
    },

    // 是否校验不通过
    isInvalid: function isInvalid() {
      return this.type === 'textarea' && this.inputValue && this.inputValue.length > this.maxLength || this.invalid;
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
    /**
     *textarea时，监听输入内容，若时autosize,变更输入框的高度
     */
    value: function value(val) {
      this.nativeValue = val;
      if (this.type === 'textarea') {
        this.$nextTick(this.resizeTextarea);
      }
    }
  },
  mounted: function mounted() {
    if (this.type === 'textarea') {
      this.resizeTextarea();
    }
  },

  methods: {
    /**
     * 输入框内容改变handle
     */
    handleInput: function handleInput(event, options) {
      var _this = this;

      var value = event.target.value;

      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.setNativeInput(value);
          this.$nextTick(function () {
            return _this.setNativeInput(value);
          });
          this.$emit('change', value);
        }
      }
    },


    /**
     * 处理输入中文的合成事件
     */
    handleComposition: function handleComposition(e) {
      var type = e.type;

      if (this.$listeners[type]) {
        this.$emit(type, e);
      }
      if (type === 'compositionend') {
        this.isComposing = false;
        this.handleInput(e);
      } else {
        this.isComposing = true;
      }
    },

    /**
     * 设置input值
     */
    setNativeInput: function setNativeInput(value) {
      if (value !== this.value) {
        // 若没有v-model，则两个值会不同
        this.noModel = true;
        this.nativeValue = value;
      }
    },

    /**
     * 获得焦点
     */
    focus: function focus(e) {
      this.focused = true;
      this.$emit('focus', e);
      this.$refs.input.focus();
    },

    /**
     * 失去焦点
     */
    blur: function blur(e) {
      this.focused = false;
      this.$emit('blur', e);
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
    },

    /**
     * 清除输入框文本内容
     */
    handleClear: function handleClear() {
      this.handleInput({ target: { value: '' } });
      this.nativeValue = '';
      this.$emit('clear');
    }
  }
};
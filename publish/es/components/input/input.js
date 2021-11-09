import _Object$assign from 'babel-runtime/core-js/object/assign';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import { isKey } from '@wish/wt-vue/es/utils/key-codes';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix + "-wrapper"] = true, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-readonly"] = _vm.readonly, _obj[_vm.prefix + "-invalid"] = _vm.invalid, _obj[_vm.prefix + "-focused"] = _vm.focused, _obj), style: _vm.fullWidth ? { width: '100%' } : {} }, [_c('fieldset', [_c('legend', { style: !_vm.label ? { padding: 0 } : {} }, [_vm._v(_vm._s(_vm.focused ? _vm.label : ''))]), _vm._v(" "), _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.prefix, attrs: { "readonly": _vm.readonly, "disabled": _vm.disabled }, domProps: { "value": _vm.inputValue } }, 'input', _vm.$attrs, false), _vm.inputLisenters))])]);
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
    readonly: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    fullWidth: Boolean,
    label: String
  },
  data: function data() {
    return {
      focused: false,
      hovering: false,
      isComposing: false
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('input');
    },
    inputValue: function inputValue() {
      return this.hasValue ? this.value : '';
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
  methods: {
    handleInput: function handleInput(event, options) {
      var value = event.target.value;

      if (value !== this.value) {
        this.$emit('input', value);
        if (!this.isComposing) {
          this.$nextTick(this.setNativeInput);
        }
      }
      if (!this.isComposing || options && options.change) {
        this.$emit('change', value);
      }
    },
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
    setNativeInput: function setNativeInput() {
      var input = this.$refs.input;

      if (input && input.value !== this.value) {
        input.value = this.inputValue;
      }
    },
    focus: function focus() {
      this.focused = true;
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.focused = false;
      this.$refs.input.blur();
    },
    handleKeyup: function handleKeyup(e) {
      if (this.$listeners.keyup) {
        this.$emit('keyup', e);
      }
      if (isKey(e, 'enter') && !this.isComposing) {
        this.$emit('enter', e);
      }
    }
  }
};
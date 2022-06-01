import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
import Modal from '@wish/wt-vue/es/components/modal';
import Button from '@wish/wt-vue/es/components/button';
import { isPromise } from '@wish/wt-vue/es/utils/type';
import { getPrefix, getIconPrefix } from '@wish/wt-vue/es/utils/config';

var ICONS = {
  success: 'success-circle',
  info: 'info-circle',
  warning: 'warning-circle',
  error: 'error-circle'
};

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('mtd-modal', { class: (_obj = {}, _obj[_vm.prefix + "-wrapper"] = true, _obj["" + _vm.className] = _vm.className, _obj[_vm.prefix + "-wrapper-" + _vm.type] = _vm.type, _obj), attrs: { "visible": _vm.modalVisible, "mask-closable": _vm.maskClosable, "placement": _vm.placement, "closable": _vm.closable, "width": _vm.width, "title": _vm.type ? undefined : _vm.title, "append-to-container": false }, on: { "input": _vm.handleVisibleChange, "closed": _vm.destroyElement } }, [_c('div', { class: (_obj$1 = {}, _obj$1[_vm.prefix] = true, _obj$1[_vm.prefix + "-typed"] = _vm.type, _obj$1) }, [_vm.type ? _c('span', { class: _vm.prefix + "-icon " + _vm.prefix + "-" + _vm.type }, [_c('i', { class: _vm.icon })]) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.prefix + "-right" }, [_vm.type && _vm.title ? _c('div', { class: _vm.prefix + "-title" }, [_vm._v("\n        " + _vm._s(_vm.title) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm._t("default", function () {
    return [!_vm.useHTMLString ? _c('div', { class: _vm.prefix + "-message" }, [_vm._v(_vm._s(_vm.message))]) : _c('div', { class: _vm.prefix + "-message", domProps: { "innerHTML": _vm._s(_vm.message) } })];
  })], 2)]), _vm._v(" "), _c('div', { class: _vm.prefix + "-footer", attrs: { "slot": "footer" }, slot: "footer" }, [_vm.showCancelButton ? _c('mtd-button', _vm._b({ ref: "cancel", attrs: { "loading": _vm.cancelButtonLoading }, on: { "click": _vm.handleCancel } }, 'mtd-button', _vm.cancelButtonProps, false), [_vm._v("\n      " + _vm._s(_vm.cancelButtonText) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.showOkButton ? _c('mtd-button', _vm._b({ ref: "ok", attrs: { "loading": _vm.okButtonLoading }, on: { "click": _vm.handleOk } }, 'mtd-button', _vm.okProps, false), [_vm._v("\n      " + _vm._s(_vm.okButtonText) + "\n    ")]) : _vm._e()], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'MtdConfirm',

  components: {
    MtdModal: Modal,
    MtdButton: Button
  },
  data: function data() {
    return {
      modalVisible: true,
      type: '',
      title: '',
      message: '',
      width: '',
      className: '',
      closable: true,
      placement: undefined,
      okButtonText: '确定',
      cancelButtonText: '取消',
      okButtonProps: {},
      cancelButtonProps: {},
      okButtonLoading: false,
      cancelButtonLoading: false,
      showOkButton: true,
      showCancelButton: false,
      maskClosable: false,
      onOk: null,
      onCancel: null,
      useHTMLString: false,
      prefixCls: getPrefix(),
      iconPrefixCls: getIconPrefix()
    };
  },

  computed: {
    prefix: function prefix() {
      return this.prefixCls + '-confirm';
    },
    okProps: function okProps() {
      return _extends({
        type: 'primary'
      }, this.okButtonProps);
    },
    icon: function icon() {
      var iconPrefixCls = this.iconPrefixCls;

      return iconPrefixCls + ' ' + iconPrefixCls + '-' + ICONS[this.type];
    }
  },
  watch: {
    modalVisible: function modalVisible(n) {
      this.$emit('input', n);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.$refs.ok) {
        _this.$refs.ok.focus();
      } else if (_this.$refs.cancel) {
        _this.$refs.cancel.focus();
      }
    });
  },

  methods: {
    destroyElement: function destroyElement() {
      var parent = this.$el.parentNode;
      // tofix test error.
      if (parent) {
        parent.removeChild(this.$el);
      }
      this.$destroy(true);
    },
    handleCancel: function handleCancel() {
      this.callbackWrapper(this.onCancel, { action: 'cancel' }, 'cancelButtonLoading');
    },
    handleVisibleChange: function handleVisibleChange(v) {
      if (!v) {
        // 参照 ant-design 的处理逻辑，目前点击蒙层、x、esc 触发的关闭不会被阻止
        this.onCancel && this.onCancel({ action: 'close' });
      }
      this.modalVisible = v;
    },
    handleOk: function handleOk() {
      this.callbackWrapper(this.onOk, { action: 'confirm' }, 'okButtonLoading');
    },
    close: function close() {
      this.modalVisible = false;
    },
    callbackWrapper: function callbackWrapper(fn, params, prop) {
      var _this2 = this;

      var result = fn && fn(params);
      var promise = isPromise(result) ? result : _Promise.resolve();
      this[prop] = true;
      var reset = function reset() {
        _this2[prop] = false;
      };
      promise.then(this.close, reset);
    }
  }
};
import { hasClass } from '@wish/wt-vue/es/utils/dom';
import { lock, unlock } from '@wish/wt-vue/es/utils/lock-scroll';
import { PopupManage } from '@wish/wt-vue/es/utils/popper';
import { isNumber } from '@wish/wt-vue/es/utils/type';
import Dialog from './inside';
import { getConfig, CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('transition', { attrs: { "name": "fade-in" } }, [_vm.mask ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "mask", class: _vm.prefix + "-mask", style: { 'z-index': _vm.zIndex }, on: { "click": _vm.handleMaskClick } }) : _vm._e()]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.wrapVisible, expression: "wrapVisible" }], class: (_obj = {}, _obj[_vm.prefix + "-wrapper"] = true, _obj[_vm.prefix + "-" + _vm.placement] = _vm.placement, _obj), style: { 'z-index': _vm.zIndex }, on: { "click": _vm.handleWrapClick } }, [_c('transition', { attrs: { "name": "dialog-fade" }, on: { "after-enter": _vm.handleAfterEnter, "after-leave": _vm.handleAfterLeave } }, [_vm.dialogVisible ? _c('Dialog', _vm._b({ directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], style: { width: _vm.dialogWidth }, attrs: { "closable": _vm.closable }, on: { "close": _vm.handleClose } }, 'Dialog', _vm.$attrs, false), [_vm.$slots.title ? _vm._t("title", null, { "slot": "title" }) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.$slots.footer ? _vm._t("footer", null, { "slot": "footer" }) : _vm._e()], 2) : _vm._e()], 1)], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtDialog',
  components: {
    Dialog: Dialog
  },
  inheritAttrs: false,
  model: {
    prop: 'visible'
  },
  props: {
    appendToContainer: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    mask: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    visible: Boolean,
    destroyOnClose: Boolean,
    lockScroll: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      validator: function validator(v) {
        return ['top', 'center'].indexOf(v) > -1;
      },

      default: 'center'
    },
    width: [String, Number]
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
      dialogVisible: true,
      wrapVisible: this.visible,
      zIndex: 2000
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('dialog');
    },
    dialogWidth: function dialogWidth() {
      return this.width ? isNumber(this.width) ? this.width + 'px' : this.width : undefined;
    },
    getContainer: function getContainer() {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    }
  },
  watch: {
    visible: function visible(n) {
      n ? this.openDialog() : this.closeDialog();
    }
  },
  created: function created() {
    this.$on('esc', this.handleEscClose);
  },
  mounted: function mounted() {
    this.init();
  },
  activated: function activated() {
    this.init();
  },
  deactivated: function deactivated() {
    this.destroy();
    this._dialog = undefined;
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },

  methods: {
    init: function init() {
      if (this.visible) {
        this.openDialog();
      }
    },
    destroy: function destroy() {
      this.closeDialog(this);
      var parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    createDialog: function createDialog() {
      if (this.appendToContainer) {
        var parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    openDialog: function openDialog() {
      this.dialogVisible = true;
      this.wrapVisible = true;
      this.zIndex = PopupManage.nextZIndex();
      PopupManage.open(this);
      if (!this._dialog) {
        this._dialog = this.createDialog();
      }
      if (this.lockScroll) {
        lock(document.body);
      }
      this.$emit('open');
    },
    closeDialog: function closeDialog() {
      PopupManage.close(this);
      if (this.lockScroll) {
        unlock(document.body);
      }
    },
    close: function close() {
      this.$emit('close');
      this.$emit('input', false);
    },
    handleAfterLeave: function handleAfterLeave() {
      if (this.destroyOnClose) {
        this.dialogVisible = false;
      }
      this.wrapVisible = false;
      this.$emit('closed');
    },
    handleAfterEnter: function handleAfterEnter() {
      this.$emit('opened');
    },
    handleMaskClick: function handleMaskClick() {
      this.maskClosable && this.visible && this.close();
    },
    handleClose: function handleClose() {
      this.visible && this.close();
    },
    handleWrapClick: function handleWrapClick(event) {
      if (hasClass(event.target, this.prefix + '-wrapper')) {
        this.handleMaskClick(event);
      }
    },
    handleEscClose: function handleEscClose(e) {
      this.visible && this.closable && this.close();
    }
  }
};
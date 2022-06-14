import { lock, unlock } from '@wish/wt-vue/es/utils/lock-scroll';
import { PopupManage } from '@wish/wt-vue/es/utils/popper';
import Drawer from './inside';
import { CONFIG_PROVIDER, getPrefixCls, getConfig } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('transition', { attrs: { "name": "fade-in" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: _vm.mask ? _vm.prefix + "-mask" : _vm.prefix + "-wrapper", style: { 'z-index': _vm.zIndex }, on: { "click": _vm.handleMaskClick } })]), _vm._v(" "), _c('transition', { attrs: { "name": "fade-in-" + _vm.placement }, on: { "after-leave": _vm.handleAfterLeave } }, [_vm.drawVisible ? _c('drawer', _vm._b({ directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], attrs: { "placement": _vm.placement, "closable": _vm.closable, "z-index": _vm.zIndex }, on: { "close": _vm.handleClickClose } }, 'drawer', _vm.$attrs, false), [_vm.$slots.title ? _vm._t("title", null, { "slot": "title" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtDrawer',
  components: {
    Drawer: Drawer
  },
  inheritAttrs: false,
  model: {
    prop: 'visible'
  },
  props: {
    placement: {
      type: String,
      default: 'right',
      validator: function validator(p) {
        return ['left', 'right', 'top', 'bottom'].indexOf(p) > -1;
      }
    },
    visible: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    appendToContainer: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    destroyOnClose: {
      type: Boolean,
      default: false
    }
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
      drawVisible: this.visible,
      zIndex: 2000
    };
  },

  computed: {
    getContainer: function getContainer() {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    },
    prefix: function prefix() {
      return this.config.getPrefixCls('drawer');
    }
  },
  watch: {
    visible: function visible(val) {
      val ? this.openDrawer() : this.closeDrawer();
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
    this._modal = undefined;
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },

  methods: {
    init: function init() {
      if (this.visible) {
        this.openDrawer();
      }
    },
    destroy: function destroy() {
      this.closeDrawer(this);
      var parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    createDrawer: function createDrawer() {
      if (this.appendToContainer) {
        var parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    openDrawer: function openDrawer() {
      this.drawVisible = true;
      this.zIndex = PopupManage.nextZIndex();
      PopupManage.open(this);
      if (!this._drawer) {
        this._drawer = this.createDrawer();
      }
      if (this.lockScroll) {
        lock(document.body);
      }
      this.$emit('open');
    },
    closeDrawer: function closeDrawer() {
      PopupManage.close(this);
      if (this.lockScroll) {
        unlock(document.body);
      }
      this._drawer = false;
    },
    handleAfterLeave: function handleAfterLeave() {
      if (this.destroyOnClose) {
        this.drawVisible = false;
      }
    },
    handleMaskClick: function handleMaskClick() {
      if (this.maskClosable) {
        this.handleClickClose();
      }
    },
    handleClickClose: function handleClickClose() {
      this.$emit('input', false);
      this.$emit('close');
    },
    handleEscClose: function handleEscClose(e) {
      this.visible && this.closable && this.handleClickClose();
    }
  }
};
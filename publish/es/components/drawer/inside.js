import { isNumber } from '@wish/wt-vue/es/utils/type';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-" + _vm.placement] = true, _obj), style: _vm.drawerStyle }, [_vm.closable ? _c('div', { class: _vm.prefix + "-close", on: { "click": _vm.handleClickClose } }, [_c('Icon', { attrs: { "name": "x" } })], 1) : _vm._e(), _vm._v(" "), _vm.title || _vm.$slots.title ? _c('div', { class: _vm.prefix + "-header" }, [_vm._t("title", function () {
    return [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")];
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.prefix + "-content" }, [_vm._t("default")], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtDrawer',
  components: {
    Icon: Icon
  },
  props: {
    title: String,
    width: {
      type: [Number, String],
      default: 232
    },
    height: {
      type: [Number, String],
      default: 232
    },
    closable: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'right'
    },
    zIndex: Number
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('drawer');
    },
    isVertical: function isVertical() {
      return ['left', 'right'].indexOf(this.placement) > -1;
    },
    drawerStyle: function drawerStyle() {
      var style = {
        zIndex: this.zIndex
      };
      if (this.isVertical) {
        style.width = isNumber(this.width) ? this.width + 'px' : this.width;
      } else {
        style.height = isNumber(this.height) ? this.height + 'px' : this.height;
      }
      return style;
    }
  },
  methods: {
    handleClickClose: function handleClickClose() {
      this.$emit('close');
    }
  }
};
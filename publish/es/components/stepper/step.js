import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1, _obj$2, _obj$3;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-flex"] = !_vm.space, _obj[_vm.prefix + "-dot"] = _vm.dot, _obj)], style: _vm.style }, [_c('div', { class: [_vm.prefix + "-head", (_obj$1 = {}, _obj$1[_vm.prefix + "-" + _vm.status] = true, _obj$1)] }, [_c('div', { class: [_vm.prefix + "-head-line", (_obj$2 = {}, _obj$2[_vm.prefix + "-head-line-dot"] = _vm.dot && _vm.direction === 'vertical', _obj$2)] }), _vm._v(" "), _vm.icon || _vm.$slots.icon ? _c('div', { class: _vm.prefix + "-head-icon" }, [_vm._t("icon", function () {
    return [_c('wt-icon', { attrs: { "name": _vm.icon } })];
  })], 2) : _vm.dot ? _c('div', { class: _vm.prefix + "-head-number", style: { border: 'none', background: 'none' } }, [_c('div', { class: _vm.prefix + "-head-dot" })]) : _c('div', { class: _vm.prefix + "-head-number" }, [_vm.status === 'process' || _vm.status === 'wait' ? _c('span', [_vm._v("\n        " + _vm._s(_vm.index + 1) + "\n      ")]) : _c('wt-icon', { attrs: { "name": _vm.currentIcon, "width": 24, "height": 24, "color": _vm.currentIconColor } })], 1)]), _vm._v(" "), _c('div', { class: [_vm.prefix + "-main", (_obj$3 = {}, _obj$3[_vm.prefix + "-" + _vm.status] = true, _obj$3)] }, [_c('div', { class: _vm.prefix + "-main-title" }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2), _vm._v(" "), _c('div', { class: _vm.prefix + "-main-description" }, [_vm._t("description", function () {
    return [_vm._v(_vm._s(_vm.description))];
  })], 2)])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Step',
  props: {
    index: Number,
    title: String,
    icon: String,
    description: String,
    status: String,
    direction: String,
    dot: Boolean,
    space: [Number, String]
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
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('step');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    style: function style() {
      var size = this.space;
      var space = typeof size === 'number' ? size + 'px' : size;
      if (this.direction === 'vertical') {
        return { height: space };
      }
      return { width: space };
    },
    currentIcon: function currentIcon() {
      if (this.icon) {
        return this.icon;
      }
      switch (this.status) {
        case 'error':
          return 'x-circle';
        case 'cancel':
          return 'alert-circle';
        case 'finish':
          return 'check-circle';
        default:
          return 'check-circle';
      }
    },
    currentIconColor: function currentIconColor() {
      switch (this.status) {
        case 'error':
          return '#e52533';
        case 'cancel':
          return '#ffc72c';
        case 'finish':
          return '#305bef';
        default:
          return '#305bef';
      }
    }
  }
};
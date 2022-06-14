import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1, _obj$2;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-flex"] = !_vm.space, _obj)], style: _vm.style }, [_c('div', { class: [_vm.prefix + "-head", (_obj$1 = {}, _obj$1[_vm.prefix + "-" + _vm.status] = true, _obj$1)] }, [_c('div', { class: [_vm.prefix + "-head-line"] }), _vm._v(" "), _vm.icon || _vm.$slots.icon ? _c('div', { class: _vm.prefix + "-head-icon" }, [_vm._t("icon", function () {
    return [_c('wt-icon', { attrs: { "name": _vm.icon } })];
  })], 2) : _c('div', { class: _vm.prefix + "-head-number" }, [_vm.status === 'process' || _vm.status === 'wait' ? _c('span', [_vm._v("\n        " + _vm._s(_vm.index + 1) + "\n      ")]) : _c('wt-icon', { attrs: { "name": _vm.currentIcon, "width": 24, "height": 24, "color": _vm.currentIconColor } })], 1)]), _vm._v(" "), _c('div', { class: [_vm.prefix + "-main", (_obj$2 = {}, _obj$2[_vm.prefix + "-" + _vm.status] = true, _obj$2)] }, [_c('div', { class: _vm.prefix + "-main-title" }, [_vm._t("title", function () {
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
    // 索引
    index: Number,
    // 标题
    title: String,
    // icon
    icon: String,
    // 描述
    description: String,
    // 每个步骤状态
    status: String,
    // 方向
    direction: String,
    // 步骤间距
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

    // 设置步骤方向间距等样式
    style: function style() {
      var size = this.space;
      var space = typeof size === 'number' ? size + 'px' : size;
      if (this.direction === 'vertical') {
        return { height: space };
      }
      return { width: space };
    },

    // 不同状态icon
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

    // 不同icon样式
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
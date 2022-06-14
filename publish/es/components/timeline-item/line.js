import STATUSICON_ENUM from './STATUSICON_ENUM';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix + "-line" }, [_c('span', { class: _vm.prefix + "-dot" }, [_vm._t("dot", function () {
    return [_vm.type === 'icon' ? _c('wt-icon', { attrs: { "name": _vm.STATUSICON_ENUM[_vm.status].name, "color": _vm.STATUSICON_ENUM[_vm.status].color } }) : _c('span', { class: [_vm.prefix + "-dot-normal", _vm.prefix + "-dot-normal-" + _vm.status] })];
  })], 2), _vm._v(" "), _c('div', { class: _vm.prefix + "-line-tail" })]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  props: {
    type: {
      type: String,
      default: 'dot',
      validator: function validator(value) {
        return ['dot', 'icon'].indexOf(value) > -1;
      }
    },
    status: {
      type: String,
      default: 'normal',
      validator: function validator(value) {
        return ['normal', 'success', 'fail', 'warning'].indexOf(value) > -1;
      }
    },
    prefix: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      STATUSICON_ENUM: STATUSICON_ENUM
    };
  }
};
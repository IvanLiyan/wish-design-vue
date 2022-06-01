import WtLine from './line';
import WtCircle from './circle';
import { CONFIG_PROVIDER, getPrefixCls, getIconPrefix } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj["" + _vm.prefix] = true, _obj[_vm.prefix + "-" + _vm.status] = _vm.status, _obj[_vm.prefix + "-" + _vm.type] = _vm.type, _obj) }, [_c(_vm.tag, _vm._b({ tag: "div", attrs: { "percentage": _vm.percentage } }, 'div', _vm.$attrs, false)), _vm._v(" "), _vm.type === 'line' ? _c('div', { class: _vm.prefix + "-percentage" }, [_vm.status ? _c('wt-icon', { class: [_vm.prefix + "-icon", _vm.icon], attrs: { "name": _vm.status === 'success' ? 'check-circle' : 'x-circle', "color": _vm.status === 'success' ? '#2EAA77' : '#E52533', "width": 18, "height": 18 } }) : _vm.text ? _c('span', { class: _vm.prefix + "-text" }, [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")]) : _c('span', { class: _vm.prefix + "-text" }, [_vm._v("\n      " + _vm._s(_vm.percentage + "%") + "\n    ")])], 1) : _c('div', { class: _vm.prefix + "-percentage" }, [_vm.status ? _c('wt-icon', { class: [_vm.prefix + "-icon", _vm.icon], attrs: { "name": _vm.status === 'success' ? 'check' : 'x', "color": _vm.status === 'success' ? '#2EAA77' : '#E52533', "width": 18, "height": 18 } }) : _vm.text ? _c('span', { class: _vm.prefix + "-text" }, [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")]) : _c('span', { class: _vm.prefix + "-text" }, [_vm._v("\n      " + _vm._s(_vm.percentage + "%") + "\n    ")])], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtProgress',
  components: {
    WtLine: WtLine,
    WtCircle: WtCircle
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'line',
      validator: function validator(val) {
        return ['line', 'circle'].indexOf(val) > -1;
      }
    },
    status: {
      type: String
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0;
      }
    },
    text: {
      type: String
    }
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconPrefix: getIconPrefix
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('progress');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconPrefix;
    },
    tag: function tag() {
      return this.type === 'circle' ? WtCircle : WtLine;
    },
    icon: function icon() {
      if (this.type === 'line') {
        if (this.status === 'success') {
          return this.iconPrefix('success-circle');
        } else if (this.status === 'error') {
          return this.iconPrefix('error-circle');
        }
      } else if (this.type === 'circle') {
        if (this.status === 'success') {
          return this.iconPrefix('check-thick');
        } else if (this.status === 'error') {
          return this.iconPrefix('close-thick');
        }
      }
      return undefined;
    }
  }
};
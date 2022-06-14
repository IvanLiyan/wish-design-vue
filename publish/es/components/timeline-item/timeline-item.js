import TimelineItemLine from './line';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-" + _vm.align] = _vm.align, _obj)] }, [_vm.showTitle ? _c('div', { class: _vm.prefix + "-title" }, [_vm._t("title", function () {
    return [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")];
  })], 2) : _vm.mode === 'alternate' ? _c('div', { class: _vm.prefix + "-holder" }) : _vm._e(), _vm._v(" "), _c('timeline-item-line', { attrs: { "prefix": _vm.prefix, "type": _vm.type, "status": _vm.status } }, [_vm.$slots.dot ? _vm._t("dot", null, { "slot": "dot" }) : _vm._e()], 2), _vm._v(" "), _c('div', { class: _vm.prefix + "-content-wrapper" }, [_vm._t("default")], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtTimelineItem',
  components: {
    TimelineItemLine: TimelineItemLine
  },
  props: {
    type: String,
    status: String,
    align: {
      type: String,
      validator: function validator(value) {
        return ['right', 'left', '', undefined].indexOf(value) > -1;
      }
    },
    title: String,
    showTitle: Boolean,
    mode: String
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
      return this.config.getPrefixCls('timeline-item');
    },
    parDirec: function parDirec() {
      return this.$parent.mode;
    },
    minHeight: function minHeight() {
      return this.$parent.minHeight;
    },
    titleWidth: function titleWidth() {
      return this.$parent.titleWidth;
    }
  }
};
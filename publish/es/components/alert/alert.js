import _defineProperty from 'babel-runtime/helpers/defineProperty';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.prefix + "-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: _vm.typeClass }, [_c('div', { class: _vm.prefix + "-content" }, [_c('div', { class: (_obj = {}, _obj[_vm.prefix + "-title"] = true, _obj) }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2), _vm._v(" "), _vm.description || _vm.$slots.description ? _c('div', { class: _vm.prefix + "-description" }, [_vm._t("description", function () {
    return [_vm._v(_vm._s(_vm.description))];
  })], 2) : _vm._e()]), _vm._v(" "), _c('Icon', { directives: [{ name: "show", rawName: "v-show", value: _vm.canClosed, expression: "canClosed" }], class: _vm.prefix + "-close", attrs: { "name": "x", "width": 16, "height": 16 }, on: { "click": _vm.close } })], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtAlert',
  components: {
    Icon: Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },

    closable: {
      type: Boolean,
      default: true
    },

    showIcon: Boolean
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
      visible: true
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('alert');
    },
    canClosed: function canClosed() {
      return this.closable;
    },
    typeClass: function typeClass() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, this.prefix, true), _defineProperty(_ref, this.prefix + '-' + this.type, this.type), _ref;
    }
  },

  methods: {
    close: function close() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
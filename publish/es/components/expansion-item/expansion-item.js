import _Symbol from 'babel-runtime/core-js/symbol';
import Icon from '../icon/icon';
import WtExpansionTransition from '@wish/wt-vue/es/transitions/expansion-transition';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-active"] = _vm.active, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj) }, [_c('div', { class: _vm.prefix + "-header", on: { "click": _vm.handleClick } }, [_c('Icon', { class: _vm.expansionPrefix + "-arrow", attrs: { "name": _vm.arrowIcon, "color": "#0E161C", "width": 18, "height": 18 } }), _vm._v(" "), _vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2), _vm._v(" "), _c('wt-expansion-transition', [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.active, expression: "active" }], class: _vm.prefix + "-wrapper" }, [_c('div', { class: _vm.prefix + "-content" }, [_vm._t("default")], 2)])])], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'ExpansionItem',
  components: {
    Icon: Icon,
    WtExpansionTransition: WtExpansionTransition
  },
  props: {
    title: String,
    value: [String, Number, Object, Array, _Symbol],
    disabled: Boolean,
    active: Boolean
  },
  data: function data() {
    return {
      arrowIcon: 'chevron-down'
    };
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
      return this.config.getPrefixCls('expansion-item');
    },
    expansionPrefix: function expansionPrefix() {
      return this.config.getPrefixCls('expansion');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    }
  },
  methods: {
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$emit('itemClick', !this.active, this);
        this.arrowIcon = this.arrowIcon === 'chevron-down' ? 'chevron-up' : 'chevron-down';
      }
    }
  }
};
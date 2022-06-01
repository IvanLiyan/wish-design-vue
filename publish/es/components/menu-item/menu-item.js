import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import MtdTooltip from '@wish/wt-vue/es/components/tooltip';
import Link from './link';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-tooltip', _vm._b({ class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-active"] = _vm.active, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj), attrs: { "tag": "li", "disabled": !_vm.enabledTip, "placement": _vm.placement } }, 'wt-tooltip', _vm.tooltipProps, false), [_c(_vm.tag, _vm._g(_vm._b({ tag: "a", class: _vm.prefix + "-title", style: _vm.style, nativeOn: { "click": function click($event) {
        return _vm.handleClick.apply(null, arguments);
      } } }, 'a', _vm.others, false), _vm.listeners), [_vm.icon || _vm.$slots.icon ? _c('span', { class: _vm.prefix + "-icon" }, [_vm._t("icon", function () {
    return [_c('i', { class: _vm.icon })];
  })], 2) : _vm._e(), _vm._v(" "), !_vm.isCollapse ? _c('span', { class: _vm.prefix + "-text" }, [_vm._t("default")], 2) : _vm._e()]), _vm._v(" "), _c('div', { attrs: { "slot": "content" }, slot: "content" }, [!!_vm.tooltip ? _c('span', [_vm._v(_vm._s(_vm.tooltip))]) : _vm.isCollapse ? _vm._t("default") : _vm._e()], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtMenuItem',
  components: {
    MtdTooltip: MtdTooltip
  },
  inject: {
    menu: 'menu',
    submenu: {
      default: ''
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  props: {
    name: [String, Number],
    icon: String,
    route: [String, Object],
    href: String,
    disabled: Boolean,
    tooltipProps: {
      type: Object
    },
    enabledTooltip: Boolean,
    tooltip: String
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('menu-item');
    },
    listeners: function listeners() {
      return _extends({}, this.$listeners);
    },
    active: function active() {
      return this.menu.isActive(this);
    },
    isCollapse: function isCollapse() {
      return this.level === 0 && this.menu.isCollapse;
    },
    parent: function parent() {
      return this.submenu || this.menu;
    },
    level: function level() {
      return this.parent.level + 1;
    },
    paddingLeft: function paddingLeft() {
      return this.menu.baseIndent + this.level * this.menu.indent;
    },
    router: function router() {
      return this.menu.router || this.route;
    },
    tag: function tag() {
      return this.router ? 'router-link' : Link;
    },
    link: function link() {
      return this.router ? this.menu.router ? this.name : this.route : this.href;
    },
    others: function others() {
      return _extends({}, this.$attrs, _defineProperty({
        disabled: this.disabled
      }, this.router ? 'to' : 'href', this.link));
    },
    style: function style() {
      return this.menu.getItemStyled(this);
    },
    enabledTip: function enabledTip() {
      return this.disabled ? !!this.tooltip && this.enabledTooltip : this.isCollapse || !!this.tooltip && this.menu.mode !== 'horizontal';
    },
    placement: function placement() {
      if (!this.tooltipProps) {
        return 'right';
      }
      return this.tooltipProps.placement || 'right';
    }
  },
  watch: {
    active: function active() {
      this.emitActive();
    }
  },
  created: function created() {
    this.active && this.emitActive();
  },

  methods: {
    emitActive: function emitActive() {
      this.submenu && this.submenu.$emit('activeChange', this);
      this.menu.$emit('item-matched');
    },
    handleMouseenter: function handleMouseenter() {
      this.parent.$emit('submenu-enter');
    },
    handleMouseleave: function handleMouseleave() {
      this.parent.$emit('submenu-leave');
    },
    handleClick: function handleClick() {
      if (this.disabled) {
        return;
      }
      this.menu.$emit('menuItemClick', this);
      this.submenu && this.submenu.$emit('menuItemClick', this);
    }
  }
};
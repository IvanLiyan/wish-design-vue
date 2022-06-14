import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import WtStooltip from '@wish/wt-vue/es/components/stooltip';
import Link from './link';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-stooltip', _vm._b({ class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-active"] = _vm.active, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj), attrs: { "tag": "li", "disabled": !_vm.enabledTip, "placement": _vm.placement }, nativeOn: { "mouseenter": function mouseenter($event) {
        return _vm.handleMouseenter.apply(null, arguments);
      }, "mouseleave": function mouseleave($event) {
        return _vm.handleMouseleave.apply(null, arguments);
      } } }, 'wt-stooltip', _vm.tooltipProps, false), [_c(_vm.tag, _vm._g(_vm._b({ tag: "a", class: _vm.prefix + "-title", style: _vm.style, nativeOn: { "click": function click($event) {
        return _vm.handleClick.apply(null, arguments);
      } } }, 'a', _vm.others, false), _vm.listeners), [!_vm.isCollapse ? _c('span', { class: _vm.prefix + "-text" }, [_vm._t("default")], 2) : _vm._e()]), _vm._v(" "), _c('div', { attrs: { "slot": "content" }, slot: "content" }, [!!_vm.stooltip ? _c('span', [_vm._v(_vm._s(_vm.stooltip))]) : _vm.isCollapse ? _vm._t("default") : _vm._e()], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSmenuItem',
  components: {
    WtStooltip: WtStooltip
  },
  inject: {
    smenu: 'smenu',
    ssubmenu: {
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
    stooltip: String
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('smenu-item');
    },
    listeners: function listeners() {
      return _extends({}, this.$listeners);
    },
    active: function active() {
      return this.smenu.isActive(this);
    },
    isCollapse: function isCollapse() {
      return this.level === 0 && this.smenu.isCollapse;
    },
    parent: function parent() {
      return this.ssubmenu || this.smenu;
    },
    level: function level() {
      return this.parent.level + 1;
    },
    paddingLeft: function paddingLeft() {
      return this.smenu.baseIndent + this.level * this.smenu.indent;
    },
    router: function router() {
      return this.smenu.router || this.route;
    },
    tag: function tag() {
      return this.router ? 'router-link' : Link;
    },
    link: function link() {
      return this.router ? this.smenu.router ? this.name : this.route : this.href;
    },
    others: function others() {
      return _extends({}, this.$attrs, _defineProperty({
        disabled: this.disabled
      }, this.router ? 'to' : 'href', this.link));
    },
    style: function style() {
      return this.smenu.getItemStyled(this);
    },
    enabledTip: function enabledTip() {
      return this.disabled ? !!this.stooltip && this.enabledTooltip : this.isCollapse || !!this.stooltip && this.smenu.mode !== 'horizontal';
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
      this.ssubmenu && this.ssubmenu.$emit('activeChange', this);
      this.smenu.$emit('item-matched');
    },
    handleMouseenter: function handleMouseenter() {
      this.parent.$emit('ssubmenu-enter');
    },
    handleMouseleave: function handleMouseleave() {
      this.parent.$emit('ssubmenu-leave');
    },
    handleClick: function handleClick() {
      if (this.disabled) {
        return;
      }
      this.smenu.$emit('menuItemClick', this);
      this.ssubmenu && this.ssubmenu.$emit('menuItemClick', this);
    }
  }
};
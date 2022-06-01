import WtExpansionTransition from '@wish/wt-vue/es/transitions/expansion-transition';
import DropdownMenu from './drop';
import WtTooltip from '@wish/wt-vue/es/components/tooltip';
import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import { getProps, findVNodesFromSlot } from '@wish/wt-vue/es/utils/vnode';

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-expanded"] = _vm.isExpanded, _obj[_vm.prefix + "-active"] = _vm.active || _vm.showChildActive, _obj)], on: { "click": _vm.handleClickMenu } }, [_c('wt-tooltip', _vm._b({ attrs: { "disabled": !_vm.enabledTip, "content": _vm.tooltip, "placement": _vm.tooltipPlacement, "tag": "div" } }, 'wt-tooltip', _vm.tooltipProps, false), [_c('div', { class: _vm.prefix + "-title", style: _vm.style, on: { "click": _vm.handleClickTitle } }, [_vm.icon || _vm.$slots.icon ? _c('span', { class: _vm.prefix + "-icon" }, [_vm._t("icon", function () {
    return [_c('i', { class: _vm.icon })];
  })], 2) : _vm._e(), _vm._v(" "), _vm.level !== 0 || !_vm.isCollapse ? _c('div', { class: _vm.prefix + "-text" }, [_vm._t("title")], 2) : _vm._e(), _vm._v(" "), _c('Icon', { class: [_vm.prefix + "-direction", (_obj$1 = {}, _obj$1[_vm.prefix + "-direction-expanded"] = _vm.isExpanded, _obj$1)], attrs: { "name": "chevron-down", "width": 14, "height": 14 } })], 1), _vm._v(" "), _c('div', { attrs: { "slot": "content" }, slot: "content" }, [_vm._v(_vm._s(_vm.tooltip))])]), _vm._v(" "), !_vm.isPopup ? _c('wt-expansion-transition', { on: { "after-enter": _vm.handleAnimateEnd, "after-leave": _vm.handleAnimateEnd } }, [_vm.isMounted ? _c('ul', { directives: [{ name: "show", rawName: "v-show", value: _vm.isExpanded, expression: "isExpanded" }], class: _vm.prefix + "-content" }, [_vm._t("default")], 2) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.isPopup ? _c('dropdown-menu', { attrs: { "visible": _vm.isExpanded, "lazy": _vm.lazy, "disabled": _vm.disabled, "placement": _vm.dropdownPlacement, "level": _vm.level, "popper-class": _vm.popperClass } }, [_vm._t("default")], 2) : _vm._e()], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSubmenu',
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
  components: {
    WtExpansionTransition: WtExpansionTransition,
    DropdownMenu: DropdownMenu,
    WtTooltip: WtTooltip,
    Icon: Icon
  },
  props: {
    icon: String,
    name: [Number, String],
    disabled: Boolean,
    closeDelay: {
      type: Number,
      default: 100
    },
    openDelay: {
      type: Number,
      default: 0
    },
    tooltip: String,
    enabledTooltip: Boolean,
    tooltipProps: Object,
    popperClass: String
  },
  provide: function provide() {
    return {
      submenu: this
    };
  },
  data: function data() {
    return {
      dropdownData: [],
      activeChild: null,
      isMounted: !this.menu.lazy,
      animating: true
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('submenu');
    },
    isExpanded: function isExpanded() {
      return this.menu.isExpanded(this);
    },
    isCollapse: function isCollapse() {
      return this.menu.isCollapse;
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
    style: function style() {
      return this.menu.getItemStyled(this);
    },
    active: function active() {
      if (this.level === 0 && (this.menu.mode !== 'inline' || this.menu.isCollapse)) {
        return this.hasChildActive;
      }
      return undefined;
    },
    isPopup: function isPopup() {
      return this.isCollapse || this.menu.mode !== 'inline';
    },
    dropdownPlacement: function dropdownPlacement() {
      return this.level === 0 && this.menu.mode === 'horizontal' ? 'bottom' : 'right-start';
    },
    isClickTrigger: function isClickTrigger() {
      return !this.isPopup;
    },
    tooltipPlacement: function tooltipPlacement() {
      if (!this.tooltipProps) {
        return 'right';
      }
      return this.tooltipProps.placement || 'right';
    },
    enabledTip: function enabledTip() {
      if (!this.tooltip) {
        return false;
      }
      return this.disabled ? this.enabledTooltip : this.menu.mode !== 'horizontal';
    },
    hasChildActive: function hasChildActive() {
      return !!this.activeChild;
    },
    showChildActive: function showChildActive() {
      return this.hasChildActive && (this.isPopup || !this.isExpanded && !this.animating);
    },
    lazy: function lazy() {
      return this.menu.lazy;
    }
  },
  watch: {
    isExpanded: {
      immediate: true,
      handler: function handler(n) {
        n && (this.isMounted = n);
        this.animating = true;
      }
    }
  },
  created: function created() {
    this.$on('activeChange', this.handleChildActiveChange);
    this.$on('menuItemClick', this.handleMenuItemClick);
    this.$on('submenu-enter', this.handleMouseenter);
    this.$on('submenu-leave', this.handleMouseleave);
    this.$on('handleClickMenu', this.handleClickMenu);
  },
  mounted: function mounted() {
    this.computedActive();
  },
  updated: function updated() {
    this.computedActive();
  },
  destroyed: function destroyed() {
    clearTimeout(this.timer);
  },

  methods: {
    computedActive: function computedActive() {
      var _menu = this.menu,
          foundedActivedItem = _menu.foundedActivedItem,
          isActive = _menu.isActive,
          lazy = _menu.lazy;

      if (lazy) {
        if (!foundedActivedItem) {
          var items = findVNodesFromSlot(this.$slots.default, 'WtMenuItem');
          var activeItem = items.find(function (item) {
            return isActive(getProps(item));
          });
          if (activeItem) {
            this.activeChild = getProps(activeItem);
          }
        }
        if (this.activeChild && !isActive(this.activeChild)) {
          this.activeChild = undefined;
        }
      }
    },
    handleChildActiveChange: function handleChildActiveChange(item) {
      if (item.active) {
        this.activeChild = item;
        this.submenu && this.submenu.$emit('activeChange', item);
      } else if (this.activeChild === item) {
        this.activeChild = null;
        this.submenu && this.submenu.$emit('activeChange', item);
      }
    },
    handleClickTitle: function handleClickTitle() {
      if (this.disabled) {
        return;
      }
      if (this.isPopup) {
        // 当处于需要展开菜单的模式时;
        if (!this.isClickTrigger) return;
        return;
      }
      // 不处于需要展开菜单的模式时才触发;
      if (this.isCollapse) {
        this.menu.toggleCollapse();
      }
      this.menu.toggleExpanded(this);
    },
    handleMouseenter: function handleMouseenter() {
      var _this = this;

      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('submenu-enter');
      clearTimeout(this.timer);
      if (!this.isExpanded) {
        this.timer = setTimeout(function () {
          _this.menu.toggleExpanded(_this);
        }, this.openDelay);
      }
    },
    handleMouseleave: function handleMouseleave() {
      var _this2 = this;

      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('submenu-leave');
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (_this2.isExpanded) {
          _this2.isExpanded && _this2.menu.toggleExpanded(_this2);
        }
      }, this.closeDelay);
    },
    handleClickMenu: function handleClickMenu() {
      var _this3 = this;

      if (this.isClickTrigger || this.disabled) return;
      clearTimeout(this.timer);
      if (!this.isExpanded) {
        this.$parent.clearInnerExpandedNames();
        this.timer = setTimeout(function () {
          _this3.menu.toggleExpanded(_this3);
        }, this.openDelay);
      } else {
        this.$parent.clearInnerExpandedNames();
        this.timer = setTimeout(function () {
          if (_this3.isExpanded) {
            _this3.isExpanded && _this3.menu.toggleExpanded(_this3);
          }
        }, this.closeDelay);
      }
    },
    clearTimer: function clearTimer() {
      this.parent.$emit('submenu-enter');
      this.timer && clearTimeout(this.timer);
    },
    closePopup: function closePopup() {
      this.handleMouseleave();
    },
    handleMenuItemClick: function handleMenuItemClick() {
      this.closePopup();
      this.submenu && this.submenu.$emit('menuItemClick', this);
    },
    handleAnimateEnd: function handleAnimateEnd() {
      this.animating = false;
    }
  }
};
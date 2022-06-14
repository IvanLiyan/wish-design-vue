import WtSmenuItem from '@wish/wt-vue/es/components/smenu-item';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-smenu-item', _vm._b({ attrs: { "tooltip-props": _vm.tooltipProps, "tooltip": _vm.item.tooltip, "enabled-tooltip": _vm.item.enabledTooltip } }, 'wt-smenu-item', _vm.rest, false), [_vm.item.icon ? _c('i', { class: _vm.item.icon, attrs: { "slot": "icon" }, slot: "icon" }) : _vm._e(), _vm._v(" "), _vm._t("default", function () {
    return [_vm._v(_vm._s(_vm.item.title))];
  }, { "item": _vm.item })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'SmenuItem',
  components: {
    WtSmenuItem: WtSmenuItem
  },
  // inheritAttrs: false,
  props: {
    /**
     * @param {Object} item
     * @param {Router} route 路由跳转信息，详细请查看 route-link to 属性
     * @param {string} href 同 a 标签 href 属性
     */
    item: {
      type: Object,
      required: true
    },
    itemKey: String,
    tooltipProps: {
      type: Object
    }
  },
  computed: {
    rest: function rest() {
      var item = this.item,
          itemKey = this.itemKey;

      return {
        name: item[itemKey],
        href: item.href,
        route: item.route,
        replace: item.replace,
        target: item.target,
        rel: item.rel,
        disabled: item.disabled,
        'active-class': item['active-class'],
        'exact-active-class': item['exact-active-class'],
        exact: item.exact
      };
    }
  }
};
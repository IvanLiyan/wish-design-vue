import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: (_obj = {}, _obj["" + _vm.prefix] = true, _obj[_vm.prefix + "-active"] = _vm.selected, _obj[_vm.prefix + "-checked"] = _vm.node.checked, _obj[_vm.prefix + "-disabled"] = _vm.node.disabled, _obj.hover = _vm.node.hover, _obj), on: { "click": _vm.handleClick, "mouseenter": _vm.handleMouseEnter, "mouseleave": _vm.handleMouseLeave } }, [_vm.showCheckbox ? _c('wt-checkbox', { class: _vm.prefix + "-checkbox", attrs: { "checked": _vm.node.checked, "disabled": _vm.node.disabled, "indeterminate": _vm.node.indeterminate }, on: { "input": _vm.handleChecked }, nativeOn: { "click": function click($event) {
        $event.stopPropagation();
      } } }) : _vm._e(), _vm._v(" "), _vm._t("default", null, { "node": _vm.node, "data": _vm.node.data }), _vm._v(" "), _vm.node.hasChildren ? _c('span', { class: _vm.prefix + "-expand-icon" }, [_c('wt-icon', { attrs: { "name": "chevron-right", "color": "#0E161C", "width": 20, "height": 20 } })], 1) : _vm._e()], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'CascaderMenuItem',
  components: {
    WtCheckbox: WtCheckbox
  },
  inheritAttrs: false,
  props: {
    node: Object,
    value: [String, Number, Object],
    filtered: Boolean
  },
  inject: {
    menus: { from: 'menus' },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },
  data: function data() {
    return {
      hover: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('cascader-menu-item');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    selected: function selected() {
      return this.node.value === this.value;
    },
    showCheckbox: function showCheckbox() {
      return this.menus.showCheckbox;
    },
    changeOnSelect: function changeOnSelect() {
      return !this.menus.multiple && this.menus.changeOnSelect;
    },
    isTgHover: function isTgHover() {
      return this.menus.expandTrigger === 'hover';
    },
    expandableOnDisabled: function expandableOnDisabled() {
      return this.menus.expandableOnDisabled;
    }
  },
  methods: {
    setExpanded: function setExpanded() {
      var node = this.node;

      if (node.disabled) {
        if (this.expandableOnDisabled) {
          this.$emit('expand', node);
        }
        return;
      } else if (!node.hasChildren) {
        if (!node.hasChildren && this.isTgHover) {
          var parent = node.$parent;
          var expandedValue = this.menus.expandedValue;

          if (!parent) {
            if (expandedValue.length) {
              this.$emit('expand', undefined);
            }
          } else if (node.level !== expandedValue.length) {
            // 阻止同一层级的事件外抛
            this.$emit('expand', parent);
          }
        }
        return;
      }
      this.$emit('expand', node);
    },
    handleClick: function handleClick() {
      if (this.node.disabled) {
        return;
      }
      /**
       * 1. 过滤时点整行选中，非过滤时如果有 checkbox 只能点击 checkbox 选中
       * 2. 如果当前是叶子节点，点击则表示选中
       * 3. 多选时选中逻辑不走此方法逻辑
       */
      if (this.filtered) {
        if (this.showCheckbox) {
          this.handleChecked(true);
        } else {
          this.$emit('select', this.node, { selected: !this.selected });
        }
      } else if (this.menus.expandTrigger === 'click' && this.node.hasChildren) {
        this.setExpanded();
      } else if (!this.showCheckbox && !this.node.hasChildren) {
        this.$emit('select', this.node, { selected: !this.selected });
      }
      if (this.changeOnSelect && this.node.hasChildren) {
        this.$emit('click', this.node, { selected: !this.selected });
      }
    },
    handleChecked: function handleChecked(checked) {
      if (this.node.disabled) {
        return;
      }
      this.$emit('checked', this.node, { checked: !this.node.checked });
      if (!this.filtered && this.showCheckbox) {
        this.handleClick();
      }
    },
    handleMouseEnter: function handleMouseEnter() {
      if (this.isTgHover) {
        this.setExpanded();
      }
    },
    handleMouseLeave: function handleMouseLeave(e) {
      if (this.isTgHover) {
        this.$emit('mouseleave', e);
      }
    }
  }
};
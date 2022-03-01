import { isObject, isExist } from '@wish/wt-vue/es/utils/type';
import { getValueByPath } from '@wish/wt-vue/es/utils/util';
import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: (_obj = {}, _obj[_vm.dmi_p] = true, _obj[_vm.dmi_p + "-selected"] = _vm.itemSelected, _obj[_vm.dmi_p + "-disabled"] = _vm._disabled, _obj.hover = _vm.hover, _obj), on: { "mouseenter": _vm.hoverItem, "click": function click($event) {
        $event.stopPropagation();return _vm.selectOptionClick.apply(null, arguments);
      } } }, [_vm.isCheckbox ? _c('wt-checkbox', { attrs: { "form-no-validate": true, "indeterminate": _vm.indeterminate, "checked": !!_vm.itemSelected, "disabled": _vm._disabled }, on: { "input": _vm.selectOptionClick }, nativeOn: { "click": function click($event) {
        $event.stopPropagation();
      } } }, [_vm._t("default", function () {
    return [_c('span', [_vm._v(_vm._s(_vm.currentLabel))])];
  })], 2) : _c('span', { class: _vm.prefix + "-label-wrapper" }, [_vm._t("default", function () {
    return [_c('span', [_vm._v(_vm._s(_vm.currentLabel))])];
  }), _vm._v(" "), _vm.isMultiple && _vm.itemSelected ? _c('span', { class: _vm.selectPrefix + "-selected-check " + _vm.iconPrefix('check-thick') }) : _vm._e()], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtOption',
  components: {
    WtCheckbox: WtCheckbox
  },

  inject: {
    select: 'select',
    optionGroup: {
      default: null
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },

  props: {
    value: [String, Number, Object, Boolean],
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },

    created: Boolean, // 用于标记是否自动创建

    isSelectAll: Boolean, // 是否全选 option
    indeterminate: Boolean // 是否半选状态，仅用于 全选时
  },

  data: function data() {
    return {
      visible: true,
      hover: false,
      hitState: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('option');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    selectPrefix: function selectPrefix() {
      return this.config.getPrefixCls('select');
    },
    dmi_p: function dmi_p() {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
    realValue: function realValue() {
      if (isObject(this.value) && this.select.valueKey) {
        return getValueByPath(this.value, this.select.valueKey);
      }
      return this.value;
    },
    currentLabel: function currentLabel() {
      return isExist(this.label) ? this.label : isExist(this.value) ? this.value.toString() : '';
    },
    itemSelected: function itemSelected() {
      var _this = this;

      if (!this.select.selected) {
        return false;
      }
      if (!this.select.multiple) {
        return this.realValue === this.select.selected.realValue;
      } else {
        return this.select.selected.find(function (item) {
          return item.realValue === _this.realValue;
        });
      }
    },
    groupDisabled: function groupDisabled() {
      return this.optionGroup ? this.optionGroup.disabled : false;
    },
    _disabled: function _disabled() {
      return this.disabled || this.groupDisabled;
    },
    isMultiple: function isMultiple() {
      return this.select.multiple && !this.select.showCheckbox;
    },
    isCheckbox: function isCheckbox() {
      return this.select.multiple && this.select.showCheckbox;
    }
  },

  created: function created() {
    this.select.$emit('addOption', this);
  },
  beforeDestroy: function beforeDestroy() {
    this.select.$emit('removeOption', this);
  },


  methods: {
    hoverItem: function hoverItem() {
      if (!this._disabled) {
        this.select.$emit('hoverItem', this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (!this._disabled) {
        this.select.$emit('optionClick', this);
      }
    }
  }
};
import { isObject, isExist } from '@wish/wt-vue/es/utils/type';
import { getValueByPath } from '@wish/wt-vue/es/utils/util';
import WtCheckbox from '@wish/wt-vue/es/components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: (_obj = {}, _obj[_vm.dmi_p] = true, _obj[_vm.dmi_p + "-selected"] = _vm.itemSelected, _obj[_vm.dmi_p + "-disabled"] = _vm._disabled, _obj.hover = _vm.hover, _obj), on: { "mouseenter": _vm.hoverItem, "click": function click($event) {
        $event.stopPropagation();return _vm.selectOptionClick.apply(null, arguments);
      } } }, [_vm.isCheckbox ? _c('wt-checkbox', { attrs: { "form-no-validate": true, "checked": !!_vm.itemSelected, "disabled": _vm._disabled }, on: { "input": _vm.selectOptionClick }, nativeOn: { "click": function click($event) {
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
    // 选项值
    value: [String, Number, Object, Boolean],
    // 选项显示内容
    label: {
      type: [String, Number]
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 用于标记是否自动创建
    created: Boolean,
    // 是否全选 option
    isSelectAll: Boolean
  },

  data: function data() {
    return {
      // 可见状态
      visible: true,
      // hover状态
      hover: false
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

    // 选项对应vlaue标识
    realValue: function realValue() {
      // if (isObject(this.value) && this.select.valueKey) {
      //   return getValueByPath(this.value, this.select.valueKey);
      // }
      if (isObject(this.value) && this.value.hasOwnProperty('value')) {
        return this.value.value;
      } else if (isObject(this.value) && this.select.valueKey) {
        return getValueByPath(this.value, this.select.valueKey);
      } else if (!isObject(this.value)) {
        return this.value;
      } else {
        return this.value;
      }
    },

    // 选项显示内容取值
    currentLabel: function currentLabel() {
      // return isExist(this.label) ? this.label : isExist(this.value) ? this.value.toString() : '';
      if (isExist(this.label)) {
        return this.label;
      } else {
        if (isExist(this.value)) {
          if (isObject(this.value) && this.value.hasOwnProperty('value')) {
            return this.value.value;
          } else {
            return this.value.toString();
          }
        } else {
          return '';
        }
      }
    },

    // 选项是否被选中
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

    // 选项群组是否可用
    groupDisabled: function groupDisabled() {
      return this.optionGroup ? this.optionGroup.disabled : false;
    },

    // 禁用状态
    _disabled: function _disabled() {
      return this.disabled || this.groupDisabled;
    },

    // 是否多选
    isMultiple: function isMultiple() {
      return this.select.multiple && !this.select.showCheckbox;
    },

    // 是否为checkbox
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
    /**
     * 触发hover
     */
    hoverItem: function hoverItem() {
      if (!this._disabled) {
        this.select.$emit('hoverItem', this);
      }
    },

    /**
     * 选项点击事件
     */
    selectOptionClick: function selectOptionClick() {
      if (!this._disabled) {
        this.select.$emit('optionClick', this);
      }
    }
  }
};
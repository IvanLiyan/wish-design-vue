<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    :class="{
      [dmi_p]: true,
      [`${dmi_p}-selected`]: itemSelected,
      [`${dmi_p}-disabled`]: _disabled,
      hover: hover,
    }"
    v-show="visible"
  >
    <wt-checkbox
      v-if="isCheckbox"
      @click.native.stop
      @input="selectOptionClick"
      :form-no-validate="true"
      :checked="!!itemSelected"
      :disabled="_disabled"
    >
      <slot>
        <span>{{ currentLabel }}</span>
      </slot>
    </wt-checkbox>
    <span v-else :class="`${prefix}-label-wrapper`">
      <slot name="default"><span>{{ currentLabel }}</span></slot>
      <span
        v-if="isMultiple && itemSelected"
        :class="`${selectPrefix}-selected-check ${iconPrefix('check-thick')}`"
      ></span>
    </span>
  </li>
</template>

<script>
import { isObject, isExist } from '@/utils/type';
import { getValueByPath } from '@/utils/util';
import WtCheckbox from '@components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'WtOption',
  components: {
    WtCheckbox,
  },

  inject: {
    select: 'select',
    optionGroup: {
      default: null,
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },

  props: {
    // 选项值
    value: [String, Number, Object, Boolean],
    // 选项显示内容
    label: {
      type: [String, Number],
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 用于标记是否自动创建
    created: Boolean,
    // 是否全选 option
    isSelectAll: Boolean,
  },

  data() {
    return {
      // 可见状态
      visible: true,
      // hover状态
      hover: false,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('option');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    selectPrefix() {
      return this.config.getPrefixCls('select');
    },
    dmi_p() {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
    // 选项对应vlaue标识
    realValue() {
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
    currentLabel() {
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
    itemSelected() {
      if (!this.select.selected) {
        return false;
      }
      if (!this.select.multiple) {
        return this.realValue === this.select.selected.realValue;
      } else {
        return this.select.selected.find((item) => {
          return item.realValue === this.realValue;
        });
      }
    },
    // 选项群组是否可用
    groupDisabled() {
      return this.optionGroup ? this.optionGroup.disabled : false;
    },
    // 禁用状态
    _disabled() {
      return this.disabled || this.groupDisabled;
    },
    // 是否多选
    isMultiple() {
      return this.select.multiple && !this.select.showCheckbox;
    },
    // 是否为checkbox
    isCheckbox() {
      return this.select.multiple && this.select.showCheckbox;
    },
  },

  created() {
    this.select.$emit('addOption', this);
  },

  beforeDestroy() {
    this.select.$emit('removeOption', this);
  },

  methods: {
    /**
     * 触发hover
     */
    hoverItem() {
      if (!this._disabled) {
        this.select.$emit('hoverItem', this);
      }
    },
    /**
     * 选项点击事件
     */
    selectOptionClick() {
      if (!this._disabled) {
        this.select.$emit('optionClick', this);
      }
    },
  },
};
</script>

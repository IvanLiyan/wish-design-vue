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
      :indeterminate="indeterminate"
      :checked="!!itemSelected"
      :disabled="_disabled"
    >
      <slot>
        <span>{{ currentLabel }}</span>
      </slot>
    </wt-checkbox>
    <span v-else :class="`${prefix}-label-wrapper`">
      <slot>
        <span>{{ currentLabel }}</span>
      </slot>
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
import MtdCheckbox from '@components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'WtOption',
  components: {
    MtdCheckbox,
  },

  inject: {
    select: '',
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
    value: [String, Number, Object, Boolean],
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },

    created: Boolean, // 用于标记是否自动创建

    isSelectAll: Boolean, // 是否全选 option
    indeterminate: Boolean, // 是否半选状态，仅用于 全选时
  },

  data() {
    return {
      visible: true,
      hover: false,
      hitState: false,
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
    realValue() {
      if (isObject(this.value) && this.select.valueKey) {
        return getValueByPath(this.value, this.select.valueKey);
      }
      return this.value;
    },
    currentLabel() {
      return isExist(this.label) ? this.label : isExist(this.value) ? this.value.toString() : '';
    },
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
    groupDisabled() {
      return this.optionGroup ? this.optionGroup.disabled : false;
    },
    _disabled() {
      return this.disabled || this.groupDisabled;
    },
    isMultiple() {
      return this.select.multiple && !this.select.showCheckbox;
    },
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
    hoverItem() {
      if (!this._disabled) {
        this.select.$emit('hoverItem', this);
      }
    },

    selectOptionClick() {
      if (!this._disabled) {
        this.select.$emit('optionClick', this);
      }
    },
  },
};
</script>

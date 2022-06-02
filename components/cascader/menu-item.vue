<template>
  <li
    :class="{
      [`${prefix}`]: true,
      [`${prefix}-active`]: selected,
      [`${prefix}-checked`]: node.checked,
      [`${prefix}-disabled`]: node.disabled,
      hover: node.hover,
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <wt-checkbox
      v-if="showCheckbox"
      :class="`${prefix}-checkbox`"
      :checked="node.checked"
      :disabled="node.disabled"
      :indeterminate="node.indeterminate"
      @click.native.stop
      @input="handleChecked"
    />
    <slot :node="node" :data="node.data"></slot>
    <span :class="`${prefix}-expand-icon`" v-if="node.hasChildren">
      <wt-icon name="chevron-right" color="#0E161C" :width="20" :height="20" />
    </span>
  </li>
</template>
<script>
import WtCheckbox from '@components/checkbox';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'CascaderMenuItem',
  components: {
    WtCheckbox,
  },
  inheritAttrs: false,
  props: {
    node: Object,
    value: [String, Number, Object],
    filtered: Boolean,
  },
  inject: {
    menus: { from: 'menus' },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('cascader-menu-item');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    selected() {
      return this.node.value === this.value;
    },
    showCheckbox() {
      return this.menus.showCheckbox;
    },
    changeOnSelect() {
      return !this.menus.multiple && this.menus.changeOnSelect;
    },
    isTgHover() {
      return this.menus.expandTrigger === 'hover';
    },
    expandableOnDisabled() {
      return this.menus.expandableOnDisabled;
    },
  },
  methods: {
    setExpanded() {
      const { node } = this;
      if (node.disabled) {
        if (this.expandableOnDisabled) {
          this.$emit('expand', node);
        }
        return;
      } else if (!node.hasChildren) {
        if (!node.hasChildren && this.isTgHover) {
          const parent = node.$parent;
          const { expandedValue } = this.menus;
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

    handleClick() {
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

    handleChecked(checked) {
      if (this.node.disabled) {
        return;
      }
      this.$emit('checked', this.node, { checked: !this.node.checked });
      if (!this.filtered && this.showCheckbox) {
        this.handleClick();
      }
    },

    handleMouseEnter() {
      if (this.isTgHover) {
        this.setExpanded();
      }
    },
    handleMouseLeave(e) {
      if (this.isTgHover) {
        this.$emit('mouseleave', e);
      }
    },
  },
};
</script>

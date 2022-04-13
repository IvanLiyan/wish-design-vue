<template>
  <li
    :class="[prefix, {
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-expanded`]: isExpanded,
      [`${prefix}-active`]: active || showChildActive,
    }]"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <mtd-tooltip v-bind="tooltipProps"
      :disabled="!enabledTip" :content="tooltip"
      :placement="tooltipPlacement"
      tag="div"
    >
      <div :class="`${prefix}-title`" :style="style"
        @click="handleClickTitle"
      >
        <span :class="`${prefix}-icon`" v-if="icon || $slots.icon">
          <slot name="icon"><i :class="icon"></i></slot>
        </span>
        <div :class="`${prefix}-text`" v-if="level !== 0 || !isCollapse">
          <slot name="title"></slot>
        </div>
        <Icon name="down-thick"
          :class="[`${prefix}-direction`, {
            [`${prefix}-direction-expanded`]: isExpanded
          }]"
        />
      </div>
      <div slot="content">{{ tooltip }}</div>
    </mtd-tooltip>
    <mtd-collapse-transition v-if="!isPopup"
      @after-enter="handleAnimateEnd"
      @after-leave="handleAnimateEnd"
    >
      <ul :class="`${prefix}-content`" v-if="isMounted" v-show="isExpanded">
        <slot></slot>
      </ul>
    </mtd-collapse-transition>
    <dropdown-menu v-if="isPopup" :visible="isExpanded" :lazy="lazy"
      :disabled="disabled" :placement="dropdownPlacement" :level="level"
      :popper-class="popperClass"
      @mouseenter="clearTimer"
      @mouseleave="closePopup"
    >
      <slot></slot>
    </dropdown-menu>
  </li>
</template>
<script>
import MtdCollapseTransition from '@/transitions/collapse-transition';
import DropdownMenu from './drop';
import MtdTooltip from '@components/tooltip';
import Icon from '@components/icon';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';
import { getProps, findVNodesFromSlot } from '@/utils/vnode';

export default {
  name: 'MtdSubmenu',
  inject: {
    menu: 'menu',
    submenu: {
      default: '',
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  components: {
    MtdCollapseTransition,
    DropdownMenu: DropdownMenu,
    MtdTooltip,
    Icon,
  },
  props: {
    icon: String,
    name: [Number, String],
    disabled: Boolean,
    closeDelay: {
      type: Number,
      default: 100,
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    tooltip: String,
    enabledTooltip: Boolean,
    tooltipProps: Object,
    popperClass: String,
  },
  provide () {
    return {
      submenu: this,
    };
  },
  data () {
    return {
      dropdownData: [],
      activeChild: null,
      isMounted: !this.menu.lazy,
      animating: true,
    };
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('submenu');
    },
    isExpanded () {
      return this.menu.isExpanded(this);
    },
    isCollapse () {
      return this.menu.isCollapse;
    },
    parent () {
      return this.submenu || this.menu;
    },
    level () {
      return this.parent.level + 1;
    },
    paddingLeft () {
      return this.menu.baseIndent + this.level * this.menu.indent;
    },
    style () {
      return this.menu.getItemStyled(this);
    },
    active () {
      if (this.level === 0 &&
        (this.menu.mode !== 'inline' || this.menu.isCollapse)) {
        return this.hasChildActive;
      }
      return undefined;
    },
    isPopup () {
      return this.isCollapse || this.menu.mode !== 'inline';
    },
    dropdownPlacement () {
      return this.level === 0 && this.menu.mode === 'horizontal'
        ? 'bottom' : 'right-start';
    },
    isClickTrigger () {
      return !this.isPopup;
    },
    tooltipPlacement () {
      if (!this.tooltipProps) {
        return 'right';
      }
      return this.tooltipProps.placement || 'right';
    },
    enabledTip () {
      if (!this.tooltip) {
        return false;
      }
      return this.disabled ? this.enabledTooltip : this.menu.mode !== 'horizontal';
    },
    hasChildActive () {
      return !!this.activeChild;
    },
    showChildActive () {
      return this.hasChildActive && (this.isPopup || (!this.isExpanded && !this.animating));
    },
    lazy () {
      return this.menu.lazy;
    },
  },
  watch: {
    isExpanded: {
      immediate: true,
      handler (n) {
        n && (this.isMounted = n);
        this.animating = true;
      },
    },
  },
  created () {
    this.$on('activeChange', this.handleChildActiveChange);
    this.$on('menuItemClick', this.handleMenuItemClick);
    this.$on('submenu-enter', this.handleMouseenter);
    this.$on('submenu-leave', this.handleMouseleave);
  },
  mounted () {
    this.computedActive();
  },
  updated () {
    this.computedActive();
  },
  destroyed () {
    clearTimeout(this.timer);
  },
  methods: {
    computedActive () {
      const { foundedActivedItem, isActive, lazy } = this.menu;
      if (lazy) {
        if (!foundedActivedItem) {
          const items = findVNodesFromSlot(this.$slots.default, 'MtdMenuItem');
          const activeItem = items.find((item) => isActive(getProps(item)));
          if (activeItem) {
            this.activeChild = getProps(activeItem);
          }
        }
        if (this.activeChild && !isActive(this.activeChild)) {
          this.activeChild = undefined;
        }
      }
    },
    handleChildActiveChange (item) {
      if (item.active) {
        this.activeChild = item;
        this.submenu && this.submenu.$emit('activeChange', item);
      } else if (this.activeChild === item) {
        this.activeChild = null;
        this.submenu && this.submenu.$emit('activeChange', item);
      }
    },
    handleClickTitle () {
      if (this.disabled) {
        return;
      }
      if (this.isPopup) { // 当处于需要展开菜单的模式时;
        if (!this.isClickTrigger) return;
        return;
      }
      // 不处于需要展开菜单的模式时才触发;
      if (this.isCollapse) {
        this.menu.toggleCollapse();
      }
      this.menu.toggleExpanded(this);
    },
    handleMouseenter () {
      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('submenu-enter');
      clearTimeout(this.timer);
      if (!this.isExpanded) {
        this.timer = setTimeout(() => {
          this.menu.toggleExpanded(this);
        }, this.openDelay);
      }
    },
    handleMouseleave () {
      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('submenu-leave');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.isExpanded) {
          this.isExpanded && this.menu.toggleExpanded(this);
        }
      }, this.closeDelay);
    },
    clearTimer () {
      this.parent.$emit('submenu-enter');
      this.timer && clearTimeout(this.timer);
    },
    closePopup () {
      this.handleMouseleave();
    },
    handleMenuItemClick () {
      this.closePopup();
      this.submenu && this.submenu.$emit('menuItemClick', this);
    },
    handleAnimateEnd () {
      this.animating = false;
    },
  },
};
</script>

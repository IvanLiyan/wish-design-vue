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
    <wt-stooltip v-bind="tooltipProps"
      :disabled="!enabledTip" :content="stooltip"
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
        <Icon name="chevron-down" :width="12" :height="12"
          :class="[`${prefix}-direction`, {
            [`${prefix}-direction-expanded`]: isExpanded
          }]"
        />
      </div>
      <div slot="content">{{ stooltip }}</div>
    </wt-stooltip>
    <wt-expansion-transition v-if="!isPopup"
      @after-enter="handleAnimateEnd"
      @after-leave="handleAnimateEnd"
    >
      <ul :class="`${prefix}-content`" v-if="isMounted" v-show="isExpanded">
        <slot></slot>
      </ul>
    </wt-expansion-transition>
    <dropdown-smenu v-if="isPopup" :visible="isExpanded" :lazy="lazy"
      :disabled="disabled" :placement="dropdownPlacement" :level="level"
      :popper-class="popperClass"
      @mouseenter="clearTimer"
      @mouseleave="closePopup"
    >
      <slot></slot>
    </dropdown-smenu>
  </li>
</template>
<script>
import WtExpansionTransition from '@/transitions/expansion-transition';
import DropdownMenu from './drop';
import WtStooltip from '@components/stooltip';
import Icon from '@components/icon';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';
import { getProps, findVNodesFromSlot } from '@/utils/vnode';

export default {
  name: 'WtSsubmenu',
  inject: {
    smenu: 'smenu',
    ssubmenu: {
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
    WtExpansionTransition,
    DropdownMenu: DropdownMenu,
    WtStooltip,
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
    stooltip: String,
    enabledTooltip: Boolean,
    tooltipProps: Object,
    popperClass: String,
  },
  provide () {
    return {
      ssubmenu: this,
    };
  },
  data () {
    return {
      dropdownData: [],
      activeChild: null,
      isMounted: !this.smenu.lazy,
      animating: true,
    };
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('ssubmenu');
    },
    isExpanded () {
      return this.smenu.isExpanded(this);
    },
    isCollapse () {
      return this.smenu.isCollapse;
    },
    parent () {
      return this.ssubmenu || this.smenu;
    },
    level () {
      return this.parent.level + 1;
    },
    paddingLeft () {
      return this.smenu.baseIndent + this.level * this.smenu.indent;
    },
    style () {
      return this.smenu.getItemStyled(this);
    },
    active () {
      if (this.level === 0 &&
        (this.smenu.mode !== 'inline' || this.smenu.isCollapse)) {
        return this.hasChildActive;
      }
      return undefined;
    },
    isPopup () {
      return this.isCollapse || this.smenu.mode !== 'inline';
    },
    dropdownPlacement () {
      return this.level === 0 && this.smenu.mode === 'horizontal'
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
      if (!this.stooltip) {
        return false;
      }
      return this.disabled ? this.enabledTooltip : this.smenu.mode !== 'horizontal';
    },
    hasChildActive () {
      return !!this.activeChild;
    },
    showChildActive () {
      // return this.hasChildActive && (this.isPopup || (!this.isExpanded && !this.animating));
      return this.hasChildActive;
    },
    lazy () {
      return this.smenu.lazy;
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
    this.$on('ssubmenu-enter', this.handleMouseenter);
    this.$on('ssubmenu-leave', this.handleMouseleave);
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
      const { foundedActivedItem, isActive, lazy } = this.smenu;
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
        this.ssubmenu && this.ssubmenu.$emit('activeChange', item);
      } else if (this.activeChild === item) {
        this.activeChild = null;
        this.ssubmenu && this.ssubmenu.$emit('activeChange', item);
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
        this.smenu.toggleCollapse();
      }
      this.smenu.toggleExpanded(this);
    },
    handleMouseenter () {
      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('ssubmenu-enter');
      clearTimeout(this.timer);
      if (!this.isExpanded) {
        this.timer = setTimeout(() => {
          this.smenu.toggleExpanded(this);
        }, this.openDelay);
      }
    },
    handleMouseleave () {
      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('ssubmenu-leave');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.isExpanded) {
          this.isExpanded && this.smenu.toggleExpanded(this);
        }
      }, this.closeDelay);
    },
    clearTimer () {
      this.parent.$emit('ssubmenu-enter');
      this.timer && clearTimeout(this.timer);
    },
    closePopup () {
      this.handleMouseleave();
    },
    handleMenuItemClick () {
      this.closePopup();
      this.ssubmenu && this.ssubmenu.$emit('menuItemClick', this);
    },
    handleAnimateEnd () {
      this.animating = false;
    },
  },
};
</script>

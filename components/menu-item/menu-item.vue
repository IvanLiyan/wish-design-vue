<template>
  <wt-tooltip v-bind="tooltipProps"
    tag="li"
    :class="{
      [prefix]: true,
      [`${prefix}-active`]: active,
      [`${prefix}-disabled`]: disabled,
    }"
    :disabled="!enabledTip" :placement="placement"
    @mouseenter.native="handleMouseenter"
    @mouseleave.native="handleMouseleave"
  >
    <a :is="tag" :style="style"
      :class="`${prefix}-title`"
      v-bind="others"
      v-on="listeners"
      @click.native="handleClick"
    >
      <span :class="`${prefix}-icon`" v-if="icon || $slots.icon">
        <slot name="icon"><i :class="icon"></i></slot>
      </span>
      <span :class="`${prefix}-text`" v-if="!isCollapse"><slot></slot></span>
    </a>
    <div slot="content">
      <span v-if="!!tooltip">{{ tooltip }}</span>
      <slot v-else-if="isCollapse"></slot>
    </div>
  </wt-tooltip>
</template>
<script>
import MtdTooltip from '@components/tooltip';
import Link from './link';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtMenuItem',
  components: {
    MtdTooltip,
  },
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
  props: {
    name: [String, Number],
    icon: String,
    route: [String, Object],
    href: String,
    disabled: Boolean,
    tooltipProps: {
      type: Object,
    },
    enabledTooltip: Boolean,
    tooltip: String,
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('menu-item');
    },
    listeners () {
      return {
        ...this.$listeners,
      };
    },
    active () {
      return this.menu.isActive(this);
    },
    isCollapse () {
      return this.level === 0 && this.menu.isCollapse;
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
    router () {
      return this.menu.router || this.route;
    },
    tag () {
      return this.router ? 'router-link' : Link;
    },
    link () {
      return this.router
        ? (this.menu.router ? this.name : this.route)
        : this.href;
    },
    others () {
      return {
        ...this.$attrs,
        disabled: this.disabled,
        [this.router ? 'to' : 'href']: this.link,
      };
    },
    style () {
      return this.menu.getItemStyled(this);
    },
    enabledTip () {
      return this.disabled ? (!!this.tooltip && this.enabledTooltip) : (this.isCollapse ||
         (!!this.tooltip && this.menu.mode !== 'horizontal'));
    },
    placement () {
      if (!this.tooltipProps) {
        return 'right';
      }
      return this.tooltipProps.placement || 'right';
    },
  },
  watch: {
    active () {
      this.emitActive();
    },
  },
  created () {
    this.active && this.emitActive();
  },
  methods: {
    emitActive () {
      this.submenu && this.submenu.$emit('activeChange', this);
      this.menu.$emit('item-matched');
    },
    handleMouseenter () {
      this.parent.$emit('submenu-enter');
    },
    handleMouseleave () {
      this.parent.$emit('submenu-leave');
    },
    handleClick () {
      if (this.disabled) {
        return;
      }
      this.menu.$emit('menuItemClick', this);
      this.submenu && this.submenu.$emit('menuItemClick', this);
    },
  },
};
</script>

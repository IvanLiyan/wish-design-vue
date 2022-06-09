<template>
  <wt-stooltip v-bind="tooltipProps"
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
      <!-- <span :class="`${prefix}-icon`" v-if="icon || $slots.icon">
        <slot name="icon"><i :class="icon"></i></slot>
      </span> -->
      <span :class="`${prefix}-text`" v-if="!isCollapse"><slot></slot></span>
    </a>
    <div slot="content">
      <span v-if="!!stooltip">{{ stooltip }}</span>
      <slot v-else-if="isCollapse"></slot>
    </div>
  </wt-stooltip>
</template>
<script>
import WtStooltip from '@components/stooltip';
import Link from './link';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtSmenuItem',
  components: {
    WtStooltip,
  },
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
    stooltip: String,
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('smenu-item');
    },
    listeners () {
      return {
        ...this.$listeners,
      };
    },
    active () {
      return this.smenu.isActive(this);
    },
    isCollapse () {
      return this.level === 0 && this.smenu.isCollapse;
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
    router () {
      return this.smenu.router || this.route;
    },
    tag () {
      return this.router ? 'router-link' : Link;
    },
    link () {
      return this.router
        ? (this.smenu.router ? this.name : this.route)
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
      return this.smenu.getItemStyled(this);
    },
    enabledTip () {
      return this.disabled ? (!!this.stooltip && this.enabledTooltip) : (this.isCollapse ||
         (!!this.stooltip && this.smenu.mode !== 'horizontal'));
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
      this.ssubmenu && this.ssubmenu.$emit('activeChange', this);
      this.smenu.$emit('item-matched');
    },
    handleMouseenter () {
      this.parent.$emit('ssubmenu-enter');
    },
    handleMouseleave () {
      this.parent.$emit('ssubmenu-leave');
    },
    handleClick () {
      if (this.disabled) {
        return;
      }
      this.smenu.$emit('menuItemClick', this);
      this.ssubmenu && this.ssubmenu.$emit('menuItemClick', this);
    },
  },
};
</script>

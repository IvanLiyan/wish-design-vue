<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}-active`]: active,
      [`${prefix}-disabled`]: disabled,
    }"
  >
    <div :class="`${prefix}-header`" @click="handleClick">
      <Icon :class="`${expansionPrefix}-arrow`" :name="arrowIcon" color="#0E161C" :width="18" :height="18" />
      <slot name="title">{{ title }}</slot>
    </div>
    <wt-expansion-transition>
      <div v-show="active" :class="`${prefix}-wrapper`">
        <div :class="`${prefix}-content`">
          <slot></slot>
        </div>
      </div>
    </wt-expansion-transition>
  </div>
</template>
<script>
import Icon from '../icon/icon';
import WtExpansionTransition from '@/transitions/expansion-transition';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'ExpansionItem',
  components: {
    Icon,
    WtExpansionTransition,
  },
  props: {
    title: String,
    value: [String, Number, Object, Array, Symbol],
    disabled: Boolean,
    active: Boolean,
  },
  data() {
    return {
      arrowIcon: 'chevron-down',
    };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('expansion-item');
    },
    expansionPrefix() {
      return this.config.getPrefixCls('expansion');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('itemClick', !this.active, this);
        this.arrowIcon = this.arrowIcon === 'chevron-down' ? 'chevron-up' : 'chevron-down';
      }
    },
  },
};
</script>

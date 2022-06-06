<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}-${placement}`]: true,
    }"
    :style="drawerStyle"
  >
    <div :class="`${prefix}-close`" v-if="closable"
      @click="handleClickClose">
      <Icon name="x" />
    </div>
    <div :class="`${prefix}-header`" v-if="title || $slots.title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="`${prefix}-content`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { isNumber } from '@/utils/type';
import Icon from '@components/icon';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtDrawer',
  components: {
    Icon,
  },
  props: {
    title: String,
    width: {
      type: [Number, String],
      default: 232,
    },
    height: {
      type: [Number, String],
      default: 232,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: 'right',
    },
    zIndex: Number,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('drawer');
    },
    isVertical () {
      return ['left', 'right'].indexOf(this.placement) > -1;
    },
    drawerStyle () {
      const style = {
        zIndex: this.zIndex,
      };
      if (this.isVertical) {
        style.width = isNumber(this.width) ? `${this.width}px` : this.width;
      } else {
        style.height = isNumber(this.height) ? `${this.height}px` : this.height;
      }
      return style;
    },
  },
  methods: {
    handleClickClose () {
      this.$emit('close');
    },
  },
};
</script>

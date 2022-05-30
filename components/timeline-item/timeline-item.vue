<template>
  <li :class="[prefix, { [`${prefix}-${align}`]: align }]">
    <div :class="`${prefix}-title`" v-if="showTitle">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-else-if="mode === 'alternate'" :class="`${prefix}-holder`"></div>
    <timeline-item-line :prefix="prefix" :type="type">
      <slot name="dot" slot="dot" v-if="$slots.dot"></slot>
    </timeline-item-line>
    <div :class="`${prefix}-content-wrapper`">
      <slot></slot>
    </div>
  </li>
</template>
<script>
import TimelineItemLine from './line';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'MtdTimelineItem',
  components: {
    TimelineItemLine,
  },
  props: {
    type: String,
    align: {
      type: String,
      validator (value) {
        return ['right', 'left', '', undefined].indexOf(value) > -1;
      },
    },
    title: String,
    showTitle: Boolean,
    mode: String,
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
      return this.config.getPrefixCls('timeline-item');
    },
    parDirec () {
      return this.$parent.mode;
    },
    minHeight () {
      return this.$parent.minHeight;
    },
    titleWidth () {
      return this.$parent.titleWidth;
    },
  },
};
</script>

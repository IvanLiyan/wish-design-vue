<template>
  <div
    :class="[
      prefix,
      {
        [`${prefix}-flex`]: !space,
        [`${prefix}-dot`]: dot,
      },
    ]"
    :style="style"
  >
    <div
      :class="[
        `${prefix}-head`,
        {
          [`${prefix}-${status}`]: true,
        },
      ]"
    >
      <div
        :class="[
          `${prefix}-head-line`,
          {
            [`${prefix}-head-line-dot`]: dot && direction === 'vertical',
          },
        ]"
      ></div>
      <div v-if="icon || $slots.icon" :class="`${prefix}-head-icon`">
        <slot name="icon"><wt-icon :name="icon" /></slot>
      </div>
      <div v-else-if="dot" :class="`${prefix}-head-number`" :style="{ border: 'none', background: 'none' }">
        <div :class="`${prefix}-head-dot`"></div>
      </div>
      <div v-else :class="`${prefix}-head-number`">
        <span v-if="status === 'process' || status === 'wait'">
          {{ index + 1 }}
        </span>
        <wt-icon v-else :name="currentIcon" :width="24" :height="24" :color="currentIconColor" />
      </div>
    </div>
    <div
      :class="[
        `${prefix}-main`,
        {
          [`${prefix}-${status}`]: true,
        },
      ]"
    >
      <div :class="`${prefix}-main-title`">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="`${prefix}-main-description`">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'Step',
  props: {
    index: Number,
    title: String,
    icon: String,
    description: String,
    status: String,
    direction: String,
    dot: Boolean,
    space: [Number, String],
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
      return this.config.getPrefixCls('step');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    style() {
      const size = this.space;
      const space = typeof size === 'number' ? size + 'px' : size;
      if (this.direction === 'vertical') {
        return { height: space };
      }
      return { width: space };
    },
    currentIcon() {
      if (this.icon) {
        return this.icon;
      }
      switch (this.status) {
        case 'error':
          return 'x-circle';
        case 'cancel':
          return 'alert-circle';
        case 'finish':
          return 'check-circle';
        default:
          return 'check-circle';
      }
    },
    currentIconColor() {
      switch (this.status) {
        case 'error':
          return '#e52533';
        case 'cancel':
          return '#ffc72c';
        case 'finish':
          return '#305bef';
        default:
          return '#305bef';
      }
    },
  },
};
</script>

<template>
  <div
    :class="[
      prefix,
      {
        [`${prefix}-flex`]: !space,
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
      <div :class="[`${prefix}-head-line`]"></div>
      <div v-if="icon || $slots.icon" :class="`${prefix}-head-icon`">
        <slot name="icon"><wt-icon :name="icon" /></slot>
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
    // 索引
    index: Number,
    // 标题
    title: String,
    // icon
    icon: String,
    // 描述
    description: String,
    // 每个步骤状态
    status: String,
    // 方向
    direction: String,
    // 步骤间距
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
    // 设置步骤方向间距等样式
    style() {
      const size = this.space;
      const space = typeof size === 'number' ? size + 'px' : size;
      if (this.direction === 'vertical') {
        return { height: space };
      }
      return { width: space };
    },
    // 不同状态icon
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
    // 不同icon样式
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

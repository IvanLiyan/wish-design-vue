<template>
  <div
    :is="tag"
    :class="[
      prefix,
      justify !== 'start' ? `${prefix}-justify-${justify}` : '',
      align !== 'top' ? `${prefix}-align-${align}` : '',
      { [`${prefix}-flex`]: type === 'flex' },
    ]"
  >
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtRow',

  props: {
    // 自定义元素标签
    tag: {
      type: String,
      default: 'div',
    },
    // 栅格间隔
    gutter: Number,
    // 布局模式
    type: String,
    // flex布局下的水平排列方式
    justify: {
      type: String,
      default: 'start',
    },
    // flex 布局下的垂直排列方式
    align: {
      type: String,
      default: 'top',
    },
  },
  provide() {
    return { row: this };
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
    prefix() {
      return this.config.getPrefixCls('row');
    },
  },
};
</script>

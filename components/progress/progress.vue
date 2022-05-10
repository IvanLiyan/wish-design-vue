<template>
  <div :class="{
    [`${prefix}`]: true,
    [`${prefix}-${status}`]: status,
    [`${prefix}-${type}`]: type,
  }">
    <div :is="tag" v-bind="$attrs" :percentage="percentage" />
    <!-- 条形进度条的文案展示 -->
    <div v-if="type === 'line'" :class="`${prefix}-percentage`">
      <!-- 先判断是否有状态，有状态则展示状态图标 -->
      <wt-icon v-if="status" :class="[`${prefix}-icon`, icon]" :name="status === 'success' ? 'check-circle' : 'x-circle'" :color="status === 'success' ? '#2EAA77' : '#E52533'" />
      <!-- 无状态时，判断是否自定义文字，是则展示自定义文字 -->
      <span v-else-if="text" :class="`${prefix}-text`">
        {{ text }}
      </span>
      <!-- 无状态且未自定义文字，则显示进度值 -->
      <span v-else :class="`${prefix}-text`">
        {{ `${percentage}%` }}
      </span>
    </div>
    <!-- 环形进度条的文案展示 -->
    <div v-else :class="`${prefix}-percentage`">
      <!-- 先判断是否有状态，有状态则展示状态图标 -->
      <wt-icon v-if="status" :class="[`${prefix}-icon`, icon]" :name="status === 'success' ? 'check' : 'x'" :color="status === 'success' ? '#2EAA77' : '#E52533'" />
      <!-- 无状态时，判断是否有自定义文字，有则展示自定义文字 -->
      <span v-else-if="text" :class="`${prefix}-text`">
        {{ text }}
      </span>
      <!-- 无状态且未自定义文字，则显示进度值 -->
      <span v-else :class="`${prefix}-text`">
        {{ `${percentage}%` }}
      </span>
    </div>
  </div>
</template>
<script>
import WtLine from './line.vue';
import WtCircle from './circle.vue';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
  getIconPrefix,
} from '@/utils/config';

export default {
  name: 'WtProgress',
  components: {
    WtLine,
    WtCircle,
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle'].indexOf(val) > -1,
    },
    status: {
      type: String,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0,
    },
    text: {
      type: String,
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconPrefix,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('progress');
    },
    iconPrefix () {
      return this.config.getIconPrefix;
    },
    tag () {
      return this.type === 'circle' ? WtCircle : WtLine;
    },
    icon () {
      if (this.type === 'line') {
        if (this.status === 'success') {
          return this.iconPrefix('success-circle');
        } else if (this.status === 'error') {
          return this.iconPrefix('error-circle');
        }
      } else if (this.type === 'circle') {
        if (this.status === 'success') {
          return this.iconPrefix('check-thick');
        } else if (this.status === 'error') {
          return this.iconPrefix('close-thick');
        }
      }
      return undefined;
    },
  },
};
</script>

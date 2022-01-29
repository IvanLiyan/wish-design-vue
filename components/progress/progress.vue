<template>
  <div :class="{
    [`${prefix}`]: true,
    [`${prefix}-${status}`]: status,
    [`${prefix}-${type}`]: type,
  }">
    <div :is="tag" v-bind="$attrs" :percentage="percentage" /><div
    :class="`${prefix}-percentage`">
      <span v-if="!status" :class="`${prefix}-text`">
        {{ type ==='line' ? `${percentage}%` : '' }}
      </span>
      <i v-else :class="[`${prefix}-icon`, icon]"></i>
    </div>
  </div>
</template>
<script>
import MtdLine from './line.vue';
import MtdCircle from './circle.vue';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
  getIconPrefix,
} from '@/utils/config';

export default {
  name: 'MtdProgress',
  components: {
    MtdLine,
    MtdCircle,
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
      return this.type === 'circle' ? MtdCircle : MtdLine;
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

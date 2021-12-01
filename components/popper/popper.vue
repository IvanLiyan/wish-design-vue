<template>
  <div v-bind="$attrs" v-on="$listeners" :is="tag">
    <slot></slot>
  </div>
</template>
<script>
import { key } from './provide';
import Popper from '@/utils/popper';
export default {
  name: 'WdPopper',
  mixins: [Popper],
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'div',
    },
  },
  provide() {
    return {
      [key]: this,
    };
  },
  methods: {
    registerReference(reference) {
      this.referenceRef = reference;
      this.reference = reference.$el;
    },
    registerDrop(drop) {
      this.dropRef = drop;
      this.drop = drop.$el;
    },
  },
};
</script>

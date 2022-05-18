<template>
  <div :class="[prefix, !isCenter && `${prefix}-right`, direction && `${prefix}-${direction}`]">
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtStepper',
  props: {
    dot: {
      type: Boolean,
      default: false,
    },
    space: [String, Number],
    direction: {
      type: String,
      default: 'horizontal',
    },
    active: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'process',
    },
    isCenter: {
      type: Boolean,
      default: false,
    },
    simple: Boolean,
  },
  provide() {
    return {
      stepper: this,
    };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data() {
    return {
      stepper: [],
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('stepper');
    },
  },
  watch: {
    stepper(stepper) {
      stepper.forEach((child, index) => {
        child.index = index;
      });
    },
  },
  created() {
    this.$on('addStep', this.add);
    this.$on('removeStep', this.remove);
  },
  methods: {
    add(step) {
      this.stepper.push(step);
    },
    remove(step) {
      const index = this.stepper.indexOf(step);
      if (index > -1) {
        this.stepper.splice(index, 1);
      }
    },
  },
};
</script>

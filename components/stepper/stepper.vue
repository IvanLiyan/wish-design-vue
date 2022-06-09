<template>
  <div :class="[prefix, `${prefix}-right`, direction && `${prefix}-${direction}`]">
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtStepper',
  props: {
    // 每个step间距
    space: [String, Number],
    // 方向
    direction: {
      type: String,
      default: 'horizontal',
    },
    // 设置当前激活步骤
    active: {
      type: Number,
      default: 0,
    },
    // 设置当前步骤状态
    status: {
      type: String,
      default: 'process',
    },
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
      // 每个具体步骤
      stepper: [],
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('stepper');
    },
  },
  watch: {
    // 监听step获取index
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
    /**
     * 添加步骤
     */
    add(step) {
      this.stepper.push(step);
    },
    /**
     * 删除步骤
     */
    remove(step) {
      const index = this.stepper.indexOf(step);
      if (index > -1) {
        this.stepper.splice(index, 1);
      }
    },
  },
};
</script>

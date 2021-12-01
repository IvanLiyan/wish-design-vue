<template>
  <transition :name="transition" @after-leave="handleAfterLeave">
    <div
      v-bind="$attrs"
      v-on="$listeners"
      v-show="visible"
      :class="{
        [prefix]: true,
        [`${prefix}-show-arrow`]: showArrow,
      }"
      :is="tag"
      ref="drop"
    >
      <div :class="`${prefix}-arrow`" x-arrow v-if="showArrow"></div>
      <template v-if="useShow">
        <slot></slot>
      </template>
      <template v-else>
        <slot v-if="isMounted"></slot>
      </template>
    </div>
  </transition>
</template>

<script>
import { key } from './provide';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtPopperDrop',
  inheritAttrs: false,
  inject: {
    popper: {
      from: key,
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  props: {
    useShow: Boolean,
    tag: {
      type: [String, Object],
      default: 'div',
    },
    transition: {
      type: String,
      default: 'fade-in',
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMounted: this.popper.visible,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('popper');
    },
    showArrow() {
      return this.popper.showArrow;
    },
    visible() {
      return this.popper.visible;
    },
  },
  watch: {
    visible(n) {
      if (n) {
        this.isMounted = true;
      }
    },
  },
  mounted() {
    this.popper.registerDrop(this);
  },
  activated() {
    // tofix: ones.sankuai.com/ones/product/4348/workItem/defect/detail/7142006
    // 在嵌套 drop 的组件中，存在内部 drop 组件没有被挂载到实际的 parent 节点下的情况
    const parentEl = this.$parent.$el;
    const children = parentEl.children;
    let found = false;
    for (let i = children.length; i > -1; i--) {
      if (this.$el === children[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      parentEl.append(this.$el);
    }
  },
  methods: {
    handleAfterLeave() {
      if (this.destroyOnClose) {
        this.isMounted = false;
      }
    },
  },
};
</script>

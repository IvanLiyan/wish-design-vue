<template>
  <transition :name="`${prefix}-fade`">
    <div :class="typeClass" v-show="visible">
      <div :class="`${prefix}-content`">
        <div
          :class="{
            [`${prefix}-title`]: true,
          }"
        >
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="`${prefix}-description`" v-if="description || $slots.description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <Icon name="x" :class="`${prefix}-close`" v-show="canClosed" @click="close" :width="16" :height="16" />
    </div>
  </transition>
</template>

<script>
import Icon from '@components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtAlert',
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default',
    },

    closable: {
      type: Boolean,
      default: true,
    },

    showIcon: Boolean,
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
      visible: true,
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('alert');
    },

    canClosed() {
      return this.closable;
    },
    typeClass() {
      return {
        [this.prefix]: true,
        [`${this.prefix}-${this.type}`]: this.type,
      };
    },
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    },
  },
};
</script>

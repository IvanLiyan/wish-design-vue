<template>
  <li :class="`${prefix}-choice`">
    <slot name="tag" :option="option" :size="size" :closable="closable" :disabled="disabled" :onClose="handleClose">
      <wt-tag
        :class="{ focus: option.hitState }"
        :size="size"
        :theme="theme"
        :closable="closable"
        :disabled="disabled"
        @close="handleClose"
      >
        <slot></slot>
      </wt-tag>
    </slot>
  </li>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import MtdTag from '@components/tag';

export default {
  name: 'WtSelectChoice',
  components: {
    MtdTag,
  },
  props: {
    theme: String,
    size: String,
    option: {
      type: Object,
      required: true,
    },
    closable: Boolean,
    disabled: Boolean,
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
      return this.config.getPrefixCls('select');
    },
  },
  methods: {
    handleClose() {
      this.$emit('close', this.option);
    },
  },
};
</script>

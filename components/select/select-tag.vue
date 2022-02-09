<template>
  <li :class="`${prefix}-choice`">
    <slot name="tag" :option="option" :size="size" :clearable="clearable" :disabled="disabled" :onClose="handleClose">
      <wt-tag
        :class="{ focus: option.hitState }"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        @close="handleClose"
        round
      >
        <slot></slot>
      </wt-tag>
    </slot>
  </li>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import WtTag from '@components/tag';

export default {
  name: 'WtSelectChoice',
  components: {
    WtTag,
  },
  props: {
    size: String,
    option: {
      type: Object,
      required: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
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

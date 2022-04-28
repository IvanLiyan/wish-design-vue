<template>
  <li :class="`${prefix}-choice`">
    <slot name="tag" :option="option" :clearable="clearable" :disabled="disabled" :onClose="handleClose">
      <wt-tag
        :class="{ focus: option.hitState }"
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
    // 选中tags
    option: {
      type: Object,
      required: true,
    },
    // 清除tag
    clearable: {
      type: Boolean,
      default: true,
    },
    // 不可用
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
    // 处理删除tag
    handleClose() {
      this.$emit('close', this.option);
    },
  },
};
</script>

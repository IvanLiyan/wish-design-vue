<template>
  <div :class="prefix">
    <slot />
  </div>
</template>

<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WdButtonGroup',
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
      return this.config.getPrefixCls('btn-group');
    },
  },
  created: function () {
    const buttons = this.$slots.default;
    if (buttons && buttons.length > 0) {
      buttons.forEach((button) => (button.componentOptions.propsData.type = 'third'));
      this.$slots.default = buttons;
    }
  },
};
</script>

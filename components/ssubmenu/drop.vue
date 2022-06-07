<template>
<Popper ref="popper"
  :popper-disabled="disabled"
  :placement="placement"
  :visible="v"
  :show-arrow="level === 0"
>
  <Drop tag="ul" :use-show="!lazy"
    :class="dropClassName"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <slot></slot>
  </Drop>
</Popper>
</template>
<script>
import {
  Popper,
  Drop,
} from '@components/popper';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'DropdownMenu',
  components: {
    Popper,
    Drop,
  },
  inheritAttrs: false,
  props: {
    placement: String,
    level: Number,
    disabled: Boolean,
    visible: Boolean,
    lazy: Boolean,
    popperClass: String,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data () {
    return {
      v: false,
    };
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('smenu');
    },
    dropClassName () {
      const { prefix } = this;
      const submenu = this.config.getPrefixCls('ssubmenu');
      return [
        prefix, `${prefix}-light`, `${prefix}-vertical`,
        `${submenu}-dropdown`, this.popperClass,
      ];
    },
  },
  watch: {
    visible () {
      this.v = this.visible;
    },
  },
  mounted () {
    this.$refs.popper.registerReference(this.$parent);
    this.v = this.visible;
    // this.$refs.popper.init();
  },
  methods: {
    handleMouseenter (e) {
      this.$emit('mouseenter', e);
    },
    handleMouseleave (e) {
      this.$emit('mouseleave', e);
    },
  },
};
</script>

<template>
  <div :class="`${prefix}-line`">
    <span :class="`${prefix}-dot`">
      <slot name="dot">
        <span :class="`${prefix}-dot-${type}`"></span>
      </slot>
    </span>
    <div :class="`${prefix}-line-tail`"></div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['master', 'normal', 'solid', 'hollow'].indexOf(value) > -1;
      },
    },
    prefix: {
      type: String,
      required: true,
    },
  },
};
</script>

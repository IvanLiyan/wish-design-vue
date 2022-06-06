<template>
  <div :class="`${prefix}-line`">
    <span :class="`${prefix}-dot`">
      <slot name="dot">
        <wt-icon v-if="type === 'icon'" :name="STATUSICON_ENUM[status].name" :color="STATUSICON_ENUM[status].color" />
        <span v-else :class="[`${prefix}-dot-normal`, `${prefix}-dot-normal-${status}`]"></span>
      </slot>
    </span>
    <div :class="`${prefix}-line-tail`"></div>
  </div>
</template>
<script>
import STATUSICON_ENUM from './STATUSICON_ENUM';
export default {
  props: {
    type: {
      type: String,
      default: 'dot',
      validator (value) {
        return ['dot', 'icon'].indexOf(value) > -1;
      },
    },
    status: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'success', 'fail', 'warning'].indexOf(value) > -1;
      },
    },
    prefix: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      STATUSICON_ENUM,
    };
  },
};
</script>

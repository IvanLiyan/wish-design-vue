<template>
  <a v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a>
</template>
<script>
// tofix: https://tt.sankuai.com/ticket/detail?id=4026992
// https://tt.sankuai.com/ticket/detail?id=4020772
export default {
  name: 'Link',
};
</script>

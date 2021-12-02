<template>
  <div class="demo-container">
    <wt-radio-group v-model="value" arrange="vertical">
      <wt-radio value="item1">item content</wt-radio>
      <wt-radio value="item2">item content</wt-radio>
      <wt-radio value="item3">item content</wt-radio>
      <wt-radio value="item4">item content</wt-radio>
    </wt-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 'item1',
    };
  },
};
</script>

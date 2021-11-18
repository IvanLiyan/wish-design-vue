<template>
  <div class="demo-radio-container">
    <wt-radio-group v-model="value" arrange="horizontal">
      <wt-radio value="item1">项目内容</wt-radio>
      <wt-radio value="item2">项目内容</wt-radio>
      <wt-radio value="item3">项目内容</wt-radio>
      <wt-radio value="item4">项目内容</wt-radio>
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

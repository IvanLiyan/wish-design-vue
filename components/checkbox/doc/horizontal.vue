<template>
  <div class="demo-container">
    <wt-checkbox-group arrange="horizontal" v-model="groupValue">
      <wt-checkbox value="1">项目内容</wt-checkbox>
      <wt-checkbox value="2">项目内容</wt-checkbox>
      <wt-checkbox value="3">项目内容</wt-checkbox>
      <wt-checkbox value="4">项目内容</wt-checkbox>
    </wt-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groupValue: ['1', '3'],
    };
  },
};
</script>

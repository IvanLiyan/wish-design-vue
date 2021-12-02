<template>
  <div class="demo-container">
    <wt-checkbox-group arrange="vertical" v-model="groupValue">
      <wt-checkbox value="1">item content</wt-checkbox>
      <wt-checkbox value="2">item content</wt-checkbox>
      <wt-checkbox value="3">item content</wt-checkbox>
    </wt-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groupValue: [],
    };
  },
};
</script>

<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="year"
        v-model="value3"
        placeholder="选择时间" />
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  data () {
    return {
      value3: '',
    };
  },
};
</script>

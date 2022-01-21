<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="date"
        v-model="value1"
      />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker
        type="month"
        v-model="value2"
        placeholder="选择时间" />
    </div>
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
      value1: '',
      value2: '',
      value3: '',
    };
  },
};
</script>

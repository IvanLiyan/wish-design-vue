<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="date"
        v-model="value1"
        :open="true"
        :append-to-container="false"
        placeholder="选择时间" />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker
        type="month"
        v-model="value2"
        :open="true"
        placeholder="选择时间" />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker
        type="year"
        v-model="value3"
        :open="true"
        placeholder="选择时间" />
    </div>
  </div>
</template>
<style>
  .demo-picker-wrapper {
    height: 345px;
  }
</style>
<script>
export default {
  data () {
    return {
      value1: undefined,
      value2: undefined,
      value3: undefined,
    };
  },
};
</script>

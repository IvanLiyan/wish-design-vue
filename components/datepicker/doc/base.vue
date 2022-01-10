<template>
  <div>
    <div class="demo-picker-group">
      <wt-date-picker type="date"
        v-model="value1"
        placeholder="选择时间" />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker type="date"
        v-model="value2"
        placeholder="选择时间" />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker type="date"
        v-model="value3"
        placeholder="选择时间" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: new Date(),
      value2: new Date(),
      value3: new Date(),
    };
  },
};
</script>

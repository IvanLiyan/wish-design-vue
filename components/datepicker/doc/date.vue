<template>
  <div class="demo-container">
    <p>精确到天</p>
    <wt-date-picker type="date" v-model="value1" placeholder="选择时间" />
    <p>精确到时间</p>
    <wt-date-picker
      type="datetime"
      v-model="value2"
      placeholder="选择时间"
      format="yyyy-MM-dd HH:mm"
      :time-picker-options="{ format: 'HH:mm' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: new Date(),
      value2: new Date(),
    };
  },
};
</script>

<template>
  <div class="demo-container">
    <wt-date-picker type="date" v-model="value1" />
    <wt-date-picker type="month" v-model="value2" placeholder="选择时间" />
    <wt-date-picker type="year" v-model="value3" placeholder="选择时间" />
  </div>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
    };
  },
};
</script>

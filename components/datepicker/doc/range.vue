<template>
  <div class="demo-container">
    <wt-date-picker type="daterange" v-model="value4" placeholder="选择时间" />
    <wt-date-picker type="monthrange" v-model="value5" placeholder="选择时间" />
    <!-- <wt-date-picker type="weekrange"
        v-model="value6"
        placeholder="选择时间" style="width: 240px;"
      /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value4: [],
      value5: [],
      value6: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.demo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

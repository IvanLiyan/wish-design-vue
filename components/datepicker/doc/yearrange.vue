<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker type="daterange"
        v-model="value4"
        placeholder="选择时间" style="width: 240px;"
      />
    </div>
    <div class="demo-picker-group">
      <wt-date-picker type="monthrange"
        v-model="value5"
        placeholder="选择时间" style="width: 240px;"
      />
    </div>
    <!-- <div class="demo-picker-group">
      <wt-date-picker type="yearrange"
        v-model="value6"
        placeholder="选择时间" style="width: 240px;"
      />
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      value4: [],
      value5: [],
      value6: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.demo-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

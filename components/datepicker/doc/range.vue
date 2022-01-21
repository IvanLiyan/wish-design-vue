<template>
  <div>
    <wt-date-picker type="daterange"
      v-model="value1"
      placeholder="选择时间" style="width: 240px;"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: [],
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

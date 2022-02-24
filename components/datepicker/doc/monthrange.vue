<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="monthrange"
        v-model="value5"
        style="width: 240px;"
      />
    </div>
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

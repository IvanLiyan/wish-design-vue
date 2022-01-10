<template>
  <div>
    <div class="demo-picker-group">
      <p>按周选择</p>
      <wt-date-picker type="week"
        v-model="value3"
        placeholder="选择时间"
        format="yyyy年WW周" />
    </div>
    <div class="demo-picker-group">
      <p>按月选择</p>
      <wt-date-picker type="month"
        v-model="value1"
        placeholder="选择时间"
        format="yyyy年MM月" />
    </div>
    <div class="demo-picker-group">
      <p>按年选择</p>
      <wt-date-picker type="year"
        v-model="value2"
        placeholder="选择时间"
        format="yyyy年" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: new Date(),
      value2: new Date(),
      value3: null,
    };
  },
};
</script>

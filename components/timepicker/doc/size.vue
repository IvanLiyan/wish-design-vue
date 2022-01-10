<template>
  <div class="wt-row">
    <div class="wt-col-8">
      <p>小号</p>
      <wt-time-picker size="small"
        v-model="value3"
        placeholder="选择时间" />
    </div>
    <div class="wt-col-8">
      <p>默认</p>
      <wt-time-picker
        v-model="value4"
        placeholder="选择时间" />
    </div>
    <div class="wt-col-8">
      <p>大号</p>
      <wt-time-picker size="large"
        v-model="value5"
        placeholder="选择时间" />
    </div>
    <div style="">
      <p>时间范围选择框</p>
      <wt-time-picker type="timerange"
        v-model="value2"
        placeholder="选择时间"
        :clearable="true"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value2: [],
      value3: new Date(),
      value4: new Date(),
      value5: new Date(),
    };
  },
};
</script>

<template>
  <div class="demo-container">
    <p>禁用日期</p>
    <wt-date-picker type="date" v-model="value" placeholder="选择日期" :options="options" />
    <p>禁用日期和时间</p>
    <wt-date-picker
      type="datetime"
      v-model="value"
      placeholder="选择日期"
      format="yyyy-MM-dd HH:mm"
      :time-picker-options="{
        'disabled-hours': [1, 5, 10],
        'disabled-minutes': [0, 10, 20],
        format: 'HH:mm',
      }"
      :options="options2"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: new Date(),
      value2: new Date(),
      options: {
        disabledDate(date) {
          return date && date.getTime() > Date.now();
        },
      },
      options2: {
        disabledDate(date) {
          return date && date.getTime() > Date.now();
        },
      },
    };
  },
};
</script>

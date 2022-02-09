<template>
  <div>
    <div class="demo-picker-group">
      <wt-date-picker type="daterange"
        v-model="value8"
        placeholder="选择时间"
        :options="rangeOptions" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    const rangeShortcuts = [
      {
        text: '前7天',
        value () {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return [date, new Date()];
        },
      }, {
        text: '前14天',
        value () {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 14);
          return [date, new Date()];
        },
      }, {
        text: '前30天',
        value () {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
          return [date, new Date()];
        },
      }, {
        text: '前90天',
        value () {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
          return [date, new Date()];
        },
      }];
    return {
      value8: [],
      options: {
        disabledDate (date) {
          return date && date.getTime() > Date.now();
        },
      },
      rangeOptions: {
        shortcuts: rangeShortcuts,
      },
    };
  },
};
</script>

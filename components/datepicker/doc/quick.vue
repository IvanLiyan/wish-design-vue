<template>
  <div class="demo-container">
    <wt-date-picker type="daterange" v-model="value" :options="rangeOptions" />
  </div>
</template>
<script>
export default {
  data() {
    const rangeShortcuts = [
      {
        text: '7 days before',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return [date, new Date()];
        },
      },
      {
        text: '14 days before',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 14);
          return [date, new Date()];
        },
      },
      {
        text: '30 days before',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
          return [date, new Date()];
        },
      },
    ];
    return {
      value: [],
      rangeOptions: {
        shortcuts: rangeShortcuts,
      },
    };
  },
};
</script>

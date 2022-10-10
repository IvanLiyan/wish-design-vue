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
        text: 'Pre 7D',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return [date, new Date()];
        },
      },
      {
        text: 'Pre 14D',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 14);
          return [date, new Date()];
        },
      },
      {
        text: 'Pre 30D',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
          return [date, new Date()];
        },
      },
      {
        text: 'Pre 90D',
        value() {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
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

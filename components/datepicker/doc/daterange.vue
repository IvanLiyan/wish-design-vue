<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker type="daterange" v-model="created_time" :options="dateRangeOptions" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      created_time: [],
    };
  },
};
</script>

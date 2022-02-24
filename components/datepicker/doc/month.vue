<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="month"
        v-model="value2" />
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  data () {
    return {
      value2: '',
    };
  },
};
</script>

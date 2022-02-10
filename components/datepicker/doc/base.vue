<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <wt-date-picker
        type="date"
        v-model="value1"
      />
    </div>
  </div>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      value1: '',
    };
  },
};
</script>

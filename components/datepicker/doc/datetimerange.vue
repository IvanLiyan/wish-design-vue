<template>
  <div class="demo-container">
    <wt-date-picker
      type="datetimerange"
      v-model="value7"
      format="yyyy-MM-dd HH:mm"
      :time-picker-options="{ format: 'HH:mm:ss' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value7: [],
    };
  },
};
</script>

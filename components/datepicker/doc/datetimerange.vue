<template>
  <div>
    <wt-date-picker type="datetimerange"
      style="width: 320px;"
      v-model="value7"
      format="yyyy-MM-dd HH:mm"
      :time-picker-options="{ format: 'HH:mm:ss' }"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value7: [],
    };
  },
};
</script>

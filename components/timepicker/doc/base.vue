<template>
  <div class="demo-picker-group" style="display: flex; justify-content: space-around;">
    <div>
      <wt-time-picker type="time"
        v-model="value1"
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
      value1: '',
    };
  },
};
</script>

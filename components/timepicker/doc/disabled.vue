<template>
  <div>
    <div class="demo-picker-group">
      <p>禁用时间</p>
      <wt-time-picker
        v-model="value"
        :disabled-hours="[1,5,10]"
        :disabled-minutes="[0,10,20]" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: new Date(),
    };
  },
};
</script>

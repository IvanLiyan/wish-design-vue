<template>
  <div class="demo-picker-group">
    <div>
      <wt-time-picker type="time"
        v-model="value1"
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

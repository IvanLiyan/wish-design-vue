<template>
  <div class="demo-picker-group">
    <div>
      <wt-time-picker
        type="time"
        v-model="value2"
        show-now
    />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value2: '',
    };
  },
};
</script>

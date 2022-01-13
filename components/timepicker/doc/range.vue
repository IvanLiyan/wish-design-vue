<template>
  <div class="wt-row">
    <div style="">
      <wt-time-picker
        type="timerange"
        v-model="value3"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value3: [],
    };
  },
};
</script>

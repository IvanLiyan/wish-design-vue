<template>
  <div>
    <div class="demo-container">
      <wt-checkbox v-model="checked1">item content<span slot="hint">desc should be short</span></wt-checkbox>
      <wt-checkbox v-model="checked2">item content<span slot="hint">desc should be short</span></wt-checkbox>
    </div>
    <div class="demo-container">
      <wt-checkbox disabled checked>item content<span slot="hint">desc should be short</span></wt-checkbox>
      <wt-checkbox disabled>item content<span slot="hint">desc should be short</span></wt-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: false,
    };
  },
};
</script>

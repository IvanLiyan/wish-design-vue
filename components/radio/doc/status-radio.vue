<template>
  <div class="demo-container">
    <wt-radio value="item1">item content <span slot="hint">desc should short</span></wt-radio>
    <wt-radio checked value="item2">item content <span slot="hint">desc should short</span></wt-radio>
    <wt-radio disabled value="item3">item content <span slot="hint">desc should short</span></wt-radio>
    <wt-radio disabled checked value="item4">item content <span slot="hint">desc should short</span></wt-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'item1',
    };
  },
};
</script>

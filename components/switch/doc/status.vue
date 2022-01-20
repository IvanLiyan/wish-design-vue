<template>
  <div class="demo-container">
    <wt-switch v-model="value1">item content<span slot="hint">desc</span> </wt-switch>
    <wt-switch v-model="value2">item content<span slot="hint">desc</span> </wt-switch>
    <wt-switch v-model="value3" disabled>item content<span slot="hint">desc</span> </wt-switch>
    <wt-switch v-model="value4" disabled>item content<span slot="hint">desc</span> </wt-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: false,
      value3: true,
      value4: false,
    };
  },
};
</script>

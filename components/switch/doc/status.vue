<template>
  <div>
    <div class="demo-container">
      <wt-switch v-model="value1"> 项目内容 <span slot="hint">注释不要太长</span> </wt-switch>
      <wt-switch v-model="value2"> 项目内容 <span slot="hint">注释不要太长</span> </wt-switch>
      <wt-switch v-model="value3" disabled> 项目内容 <span slot="hint">注释不要太长</span> </wt-switch>
      <wt-switch v-model="value4" disabled> 项目内容 <span slot="hint">注释不要太长</span> </wt-switch>
    </div>
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

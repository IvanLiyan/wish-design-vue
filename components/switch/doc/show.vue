<template>
  <div>
    <h3>打开控制台查看</h3>

    <h6>default return value is true or false</h6>
    <div class="demo-container">
      <wt-switch v-model="value1" @change="handleSwitch">item content</wt-switch>
    </div>
    <h6>define return value</h6>
    <div class="demo-container">
      <wt-switch v-model="value2" @change="handleSwitch" true-value="开" false-value="关">item content</wt-switch>
    </div>
    <h6>disabled</h6>
    <div class="demo-container">
      <wt-switch v-model="value3" disabled>item content<span slot="hint">desc should be short</span> </wt-switch>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: false,
      value2: '开',
      value3: false,
    };
  },
  methods: {
    handleSwitch: function (val) {
      console.log('handleCheck', val);
    },
  },
};
</script>

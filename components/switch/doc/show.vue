<template>
  <div>
    <h3>打开控制台查看</h3>

    <h6>默认返回值为true false</h6>
    <div class="demo-container">
      <wt-switch v-model="value1" @change="handleSwitch"> 项目内容 </wt-switch>
    </div>
    <h6>自定义设置返回值</h6>
    <div class="demo-container">
      <wt-switch v-model="value2" @change="handleSwitch" true-value="开" false-value="关"> 项目内容 </wt-switch>
    </div>
    <h6>不可点击</h6>
    <div class="demo-container">
      <wt-switch v-model="value3" disabled> 项目内容 <span slot="hint">注释不要太长</span> </wt-switch>
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

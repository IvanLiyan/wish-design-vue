<template>
  <div class="demo-container">
    <wt-checkbox v-model="checked1">项目内容<span slot="hint">注释不要太长</span></wt-checkbox>
    <wt-checkbox v-model="checked2">项目内容<span slot="hint">注释不要太长</span></wt-checkbox>
    <wt-checkbox disabled checked>项目内容<span slot="hint">注释不要太长</span></wt-checkbox>
    <wt-checkbox disabled>项目内容<span slot="hint">注释不要太长</span></wt-checkbox>
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
  methods: {
    handleRadioInput: function (val) {
      console.log('handleCheckInput', val);
    },
    handleGroupRadioInput: function (val) {
      console.log('handleGroupRadioInput', val);
    },
  },
};
</script>

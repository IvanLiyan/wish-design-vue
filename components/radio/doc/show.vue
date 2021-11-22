<template>
  <div>
    <h6>单个单选框事件反馈，请打开控制台查看</h6>
    <div class="demo-radio-container">
      <wt-radio value="item1" @input="handleRadioInput" :checked="checked">项目内容</wt-radio>
    </div>

    <h6>单选框组事件反馈，请打开控制台查看</h6>
    <div class="demo-radio-container">
      <wt-radio-group v-model="groupRadioValue" arrange="vertical" @input="handleGroupRadioInput">
        <wt-radio value="item1">项目内容</wt-radio>
        <wt-radio value="item2">项目内容</wt-radio>
        <wt-radio value="item3">项目内容</wt-radio>
        <wt-radio value="item4">项目内容</wt-radio>
      </wt-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groupRadioValue: 'item1',
      checked: false,
    };
  },
  methods: {
    handleRadioInput: function (val) {
      console.log('handleRadioInput', val);
      this.checked = val;
    },
    handleGroupRadioInput: function (val) {
      console.log('handleGroupRadioInput', val);
    },
  },
};
</script>

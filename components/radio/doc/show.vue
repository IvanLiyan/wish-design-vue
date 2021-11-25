<template>
  <div>
    <h6>单个单选框事件反馈，请打开控制台查看</h6>
    <div class="demo-container">
      <wt-radio value="item1" @change="handleRadio" :checked="checked">项目内容</wt-radio>
    </div>

    <h6>单选框组事件反馈，请打开控制台查看</h6>
    <div class="demo-container">
      <wt-radio-group v-model="groupRadioValue" arrange="vertical" @change="handleGroupRadio">
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
    handleRadio: function (val) {
      console.log('handleRadio', val);
      this.checked = val;
    },
    handleGroupRadio: function (val) {
      console.log('handleGroupRadio', val);
    },
  },
};
</script>

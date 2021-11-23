<template>
  <div>
    <h6>单选框组事件反馈，请打开控制台查看</h6>
    <div class="demo-container">
      <wt-checkbox v-model="checkedValue" @input="handleCheck">项目内容</wt-checkbox>
    </div>

    <div class="demo-container">
      <wt-checkbox-group v-model="groupValue" @input="handleGroupCheck">
        <wt-checkbox value="1">选项</wt-checkbox>
        <wt-checkbox value="2">选项</wt-checkbox>
        <wt-checkbox value="3">选项</wt-checkbox>
      </wt-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedValue: true,
      groupValue: ['1'],
    };
  },
  methods: {
    handleCheck: function (val) {
      console.log('handleCheck', val);
    },
    handleGroupCheck: function (val) {
      console.log('handleGroupCheck', val);
    },
  },
};
</script>

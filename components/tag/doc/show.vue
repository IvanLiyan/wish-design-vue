<template>
  <div>
    <h4>default</h4>
    <div class="demo-container">
      <wt-tag rounded>项目内容</wt-tag>
      <wt-tag size="large" rounded>项目内容</wt-tag>
      <wt-tag>项目内容</wt-tag>
      <wt-tag size="large">项目内容</wt-tag>
      <wt-tag rounded clearable>项目内容</wt-tag>
      <wt-tag rounded clearable size="large">项目内容</wt-tag>
    </div>
    <h4>primary</h4>
    <div class="demo-container">
      <wt-tag type="primary" rounded>项目内容</wt-tag>
      <wt-tag type="primary" size="large" rounded>项目内容</wt-tag>
      <wt-tag type="primary">项目内容</wt-tag>
      <wt-tag type="primary" size="large">项目内容</wt-tag>
      <wt-tag type="primary" clearable rounded>项目内容</wt-tag>
      <wt-tag type="primary" size="large" clearable rounded>项目内容</wt-tag>
    </div>
    <h4>success</h4>
    <div class="demo-container">
      <wt-tag type="success" rounded>项目内容</wt-tag>
      <wt-tag type="success" size="large" rounded>项目内容</wt-tag>
      <wt-tag type="success">项目内容</wt-tag>
      <wt-tag type="success" size="large">项目内容</wt-tag>
      <wt-tag type="success" clearable rounded>项目内容</wt-tag>
      <wt-tag type="success" size="large" clearable rounded>项目内容</wt-tag>
    </div>
    <h4>danger</h4>
    <div class="demo-container">
      <wt-tag type="danger" rounded>项目内容</wt-tag>
      <wt-tag type="danger" size="large" rounded>项目内容</wt-tag>
      <wt-tag type="danger">项目内容</wt-tag>
      <wt-tag type="danger" size="large">项目内容</wt-tag>
      <wt-tag type="danger" clearable rounded>项目内容</wt-tag>
      <wt-tag type="danger" size="large" clearable rounded>项目内容</wt-tag>
    </div>
    <h4>warning</h4>
    <div class="demo-container">
      <wt-tag type="warning" rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" rounded>项目内容</wt-tag>
      <wt-tag type="warning">项目内容</wt-tag>
      <wt-tag type="warning" size="large">项目内容</wt-tag>
      <wt-tag type="warning" clearable rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" clearable rounded>项目内容</wt-tag>
    </div>
    <h4>disabled</h4>
    <div class="demo-container">
      <wt-tag type="warning" disabled rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" disabled rounded>项目内容</wt-tag>
      <wt-tag type="warning" disabled>项目内容</wt-tag>
      <wt-tag type="warning" size="large" disabled>项目内容</wt-tag>
      <wt-tag type="warning" @close="handleClose" clearable disabled>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @close="handleClose" clearable disabled rounded>项目内容</wt-tag>
    </div>
    <h4>打开控制台查看触发事件反馈</h4>
    <h6>正常</h6>
    <div class="demo-container">
      <wt-tag type="warning" @click="handleClick" rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" rounded>项目内容</wt-tag>
      <wt-tag type="warning" @click="handleClick">项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick">项目内容</wt-tag>
      <wt-tag type="warning" @click="handleClick" @close="handleClose" clearable rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" @close="handleClose" clearable rounded>项目内容</wt-tag>
    </div>
    <h6>disabled 的点击</h6>
    <div class="demo-container">
      <wt-tag type="warning" @click="handleClick" disabled rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" disabled rounded>项目内容</wt-tag>
      <wt-tag type="warning" @click="handleClick" disabled>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" disabled>项目内容</wt-tag>
      <wt-tag type="warning" @click="handleClick" @close="handleClose" clearable disabled rounded>项目内容</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" @close="handleClose" clearable disabled rounded
        >项目内容</wt-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: false,
    };
  },
  methods: {
    handleClick: function (e) {
      console.log('handleClick', e);
    },
    handleClose: function (e) {
      console.log('handleClose', e);
    },
  },
};
</script>

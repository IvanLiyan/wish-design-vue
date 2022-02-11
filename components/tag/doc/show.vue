<template>
  <div>
    <h4>default</h4>
    <div class="demo-container">
      <wt-tag rounded>item content</wt-tag>
      <wt-tag size="large" rounded>item content</wt-tag>
      <wt-tag>item content</wt-tag>
      <wt-tag size="large">item content</wt-tag>
      <wt-tag rounded clearable>item content</wt-tag>
      <wt-tag rounded clearable size="large">item content</wt-tag>
    </div>
    <h4>primary</h4>
    <div class="demo-container">
      <wt-tag type="primary" rounded>item content</wt-tag>
      <wt-tag type="primary" size="large" rounded>item content</wt-tag>
      <wt-tag type="primary">item content</wt-tag>
      <wt-tag type="primary" size="large">item content</wt-tag>
      <wt-tag type="primary" clearable rounded>item content</wt-tag>
      <wt-tag type="primary" size="large" clearable rounded>item content</wt-tag>
    </div>
    <h4>success</h4>
    <div class="demo-container">
      <wt-tag type="success" rounded>item content</wt-tag>
      <wt-tag type="success" size="large" rounded>item content</wt-tag>
      <wt-tag type="success">item content</wt-tag>
      <wt-tag type="success" size="large">item content</wt-tag>
      <wt-tag type="success" clearable rounded>item content</wt-tag>
      <wt-tag type="success" size="large" clearable rounded>item content</wt-tag>
    </div>
    <h4>error</h4>
    <div class="demo-container">
      <wt-tag type="error" rounded>item content</wt-tag>
      <wt-tag type="error" size="large" rounded>item content</wt-tag>
      <wt-tag type="error">item content</wt-tag>
      <wt-tag type="error" size="large">item content</wt-tag>
      <wt-tag type="error" clearable rounded>item content</wt-tag>
      <wt-tag type="error" size="large" clearable rounded>item content</wt-tag>
    </div>
    <h4>warning</h4>
    <div class="demo-container">
      <wt-tag type="warning" rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" rounded>item content</wt-tag>
      <wt-tag type="warning">item content</wt-tag>
      <wt-tag type="warning" size="large">item content</wt-tag>
      <wt-tag type="warning" clearable rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" clearable rounded>item content</wt-tag>
    </div>
    <h4>disabled</h4>
    <div class="demo-container">
      <wt-tag type="warning" disabled rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" disabled rounded>item content</wt-tag>
      <wt-tag type="warning" disabled>item content</wt-tag>
      <wt-tag type="warning" size="large" disabled>item content</wt-tag>
      <wt-tag type="warning" @close="handleClose" clearable disabled>item content</wt-tag>
      <wt-tag type="warning" size="large" @close="handleClose" clearable disabled rounded>item content</wt-tag>
    </div>

    <h4>Please open console panel check the trigger event response</h4>
    <h6>normal</h6>
    <div class="demo-container">
      <wt-tag type="warning" @click="handleClick" rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" rounded>item content</wt-tag>
      <wt-tag type="warning" @click="handleClick">item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick">item content</wt-tag>
      <wt-tag type="warning" @click="handleClick" @close="handleClose" clearable rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" @close="handleClose" clearable rounded
        >item content</wt-tag
      >
    </div>
    <h6>disabled</h6>
    <div class="demo-container">
      <wt-tag type="warning" @click="handleClick" disabled rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" disabled rounded>item content</wt-tag>
      <wt-tag type="warning" @click="handleClick" disabled>item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" disabled>item content</wt-tag>
      <wt-tag type="warning" @click="handleClick" @close="handleClose" clearable disabled rounded>item content</wt-tag>
      <wt-tag type="warning" size="large" @click="handleClick" @close="handleClose" clearable disabled rounded
        >item content</wt-tag
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

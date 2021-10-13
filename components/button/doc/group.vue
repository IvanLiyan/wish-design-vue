<template>
  <div
    class="demo-btn-group"
    style="">
    <wd-button-group>
      <wd-button type="text" icon="wdicon wdicon-file-add-o">添加</wd-button>
      <wd-button type="text" icon="wdicon wdicon-delete-o">删除</wd-button>
      <wd-button type="text" icon="wdicon wdicon-edit-o">编辑</wd-button>
    </wd-button-group>

    <wd-button-group>
      <wd-icon-button type="secondary" icon="wdicon wdicon-piechart" />
      <wd-icon-button type="secondary" icon="wdicon wdicon-barschart" />
      <wd-icon-button type="secondary" icon="wdicon wdicon-areachart" />
    </wd-button-group>
    <div>
      <wd-icon-button
        type="secondary"
        class="float-icon-button"
        icon="wdicon wdicon-left-thick" />
      <wd-icon-button
        type="secondary"
        class="float-icon-button"
        icon="wdicon wdicon-right-thick" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .demo-btn-group{
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .wd-btn{
      margin-left: 0;
    }
  }
</style>

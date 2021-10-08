<template>
  <div
    class="demo-btn-group"
    style="">
    <mtd-button-group>
      <mtd-button type="text" icon="mtdicon mtdicon-file-add-o">添加</mtd-button>
      <mtd-button type="text" icon="mtdicon mtdicon-delete-o">删除</mtd-button>
      <mtd-button type="text" icon="mtdicon mtdicon-edit-o">编辑</mtd-button>
    </mtd-button-group>

    <mtd-button-group>
      <mtd-icon-button type="secondary" icon="mtdicon mtdicon-piechart" />
      <mtd-icon-button type="secondary" icon="mtdicon mtdicon-barschart" />
      <mtd-icon-button type="secondary" icon="mtdicon mtdicon-areachart" />
    </mtd-button-group>
    <div>
      <mtd-icon-button
        type="secondary"
        class="float-icon-button"
        icon="mtdicon mtdicon-left-thick" />
      <mtd-icon-button
        type="secondary"
        class="float-icon-button"
        icon="mtdicon mtdicon-right-thick" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .demo-btn-group{
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .mtd-btn{
      margin-left: 0;
    }
  }
</style>

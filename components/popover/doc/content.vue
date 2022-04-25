<template>
  <div class="top">
    <mtd-popover trigger="hover" placement="top">
      <mtd-button style="margin-right: 40px;">带标题</mtd-button>
      <div slot="title">弹出框的标题</div>
      <div slot="content" class="demo-popover-content">
        弹出框的内容，弹出框的内容。
      </div>
    </mtd-popover>
    <mtd-popover trigger="hover" placement="top">
      <mtd-button style="margin-right: 40px;">带按钮操作</mtd-button>
      <div slot="title">弹出框的标题</div>
      <div slot="content" class="demo-popover-content">
        <p>弹出框的内容，弹出框的内容。</p>
        <div class="demo-popover-actions">
          <mtd-button type="primary" size="small">按钮</mtd-button>
        </div>
      </div>
    </mtd-popover>
    <mtd-popover trigger="hover" v-model="visible" placement="top">
      <mtd-button>带图标</mtd-button>
      <div slot="content" class="demo-popover-content">
        <i class="demo-popover-aside mtdicon mtdicon-warning-circle"></i>
        <div class="demo-popover-panel">
          您确定要删除现有文档内容吗？
          <div class="demo-popover-actions">
            <mtd-button size="small" @click="closePopover">取消</mtd-button>
            <mtd-button type="primary" size="small"
              @click="closePopover">确定</mtd-button>
          </div>
        </div>
      </div>
    </mtd-popover>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
    };
  },
  methods: {
    closePopover () {
      this.visible = false;
    },
  },
};
</script>
<style lang='scss'>
  .demo-popover-content{
    h2{
      margin: 0 0 8px 0;
    }
    p{
      margin: 0;
    }
  }
  .demo-popover-actions {
    margin-top: 16px;
    text-align: right;
  }
  .demo-popover-aside{
    font-size: 26px;
    margin-right: 8px;
    float: left;
    display: inline-block;
    color: #FF6459;
    vertical-align: top;
  }
  .demo-popover-panel{
    margin-left: 34px;
    /* display: inline-block; */
    vertical-align: top;
  }
</style>

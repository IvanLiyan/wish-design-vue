<template>
  <div class="demo-modal-btn-groups">
    <wt-button @click="openDefaultConfirm">默认样式</wt-button>
    <wt-button type="success" @click="openSuccessConfirm">成功提示</wt-button>
    <wt-button type="primary" @click="openConfirm">信息提示</wt-button>
    <wt-button type="warning" @click="openWarningConfirm">警告提示</wt-button>
    <wt-button type="error" @click="openDangerConfirm">失败提示</wt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '这是VNode节点这是VNode节点这是VNode节点,这是VNode节点这是VNode节点.',
    };
  },
  methods: {
    openDefaultConfirm() {
      this.$wt
        .confirm({
          title: '确认提交审核？',
          message: `<div>${this.msg}</div>`,
          useHTMLString: true,
          width: '430px',
          okButtonText: '确定',
          showCancelButton: true,
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openConfirm() {
      this.$wt
        .confirm({
          title: '申请审核已提交',
          message: '请耐心等待业务审核。',
          type: 'info',
          width: '430px',
          okButtonText: '确定',
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openSuccessConfirm() {
      this.$wt
        .confirm({
          title: '申请审核通过',
          message: `物流商价格申请内容通过，从下一个工作日开始生效。`,
          width: '430px',
          type: 'success',
          okButtonText: '确定',
        })
        .catch(() => {});
    },
    openWarningConfirm() {
      this.$wt
        .confirm({
          title: '数据与预期差距较大',
          message: '物流商价格申请内容通过，从下一个工作日开始生效。',
          width: '430px',
          type: 'warning',
          okButtonText: '确定',
        })
        .catch(() => {});
    },
    openDangerConfirm() {
      this.$wt
        .confirm({
          title: '申请审核未通过',
          message: '物流商价格申请内容通过，从下一个工作日开始生效。',
          width: '430px',
          type: 'error',
          okButtonText: '确定',
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.demo-modal-btn-groups {
  .wt-btn {
    margin: 0 20px;
  }
}
</style>

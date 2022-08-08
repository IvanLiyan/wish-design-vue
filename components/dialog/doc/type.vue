<template>
  <div class="demo-modal-btn-groups">
    <wt-button @click="openDefaultConfirm">Primary</wt-button>
    <wt-button type="success" @click="openSuccessConfirm">Success</wt-button>
    <wt-button type="primary" @click="openConfirm">Notice</wt-button>
    <wt-button type="warning" @click="openWarningConfirm">Alert</wt-button>
    <wt-button type="error" @click="openDangerConfirm">Fail</wt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'This is a sample text.',
    };
  },
  methods: {
    openDefaultConfirm() {
      this.$wt
        .confirm({
          title: 'Confirm to submit?',
          message: `<div>${this.msg}</div>`,
          useHTMLString: true,
          width: '430px',
          okButtonText: 'Confirm',
          onOk: this.ok,
          onCancel: this.cancel,
        })
        .catch((err) => {
          console.log('error', err);
        });
    },
    ok(res) {
      console.log('ok res:', res);
    },
    cancel(res) {
      console.log('cancel res:', res);
    },
    openConfirm() {
      this.$wt
        .confirm({
          title: 'Application review has been submitted',
          message: 'Please wait patiently for the service review.',
          type: 'info',
          width: '430px',
          okButtonText: 'OK',
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openSuccessConfirm() {
      this.$wt
        .confirm({
          title: 'Approved application',
          message: `The price application content of the logistics provider is approved, and it will take effect from the next working day.`,
          width: '430px',
          type: 'success',
          okButtonText: 'OK',
          showCancelButton: true,
          onOk: this.ok,
          onCancel: this.cancel,
        })
        .catch(() => {});
    },
    openWarningConfirm() {
      this.$wt
        .confirm({
          title: 'The data fell short of expectations',
          message: 'The price application content of the logistics provider is approved, and it will take effect from the next working day.',
          width: '430px',
          type: 'warning',
          okButtonText: 'OK',
        })
        .catch(() => {});
    },
    openDangerConfirm() {
      this.$wt
        .confirm({
          title: 'The application was not approved',
          message: 'The price application content of the logistics provider is approved, and it will take effect from the next working day.',
          width: '430px',
          type: 'error',
          okButtonText: 'OK',
          showCancelButton: true,
          onOk: this.ok,
          onCancel: this.cancel,
        })
        .catch((err) => {
          console.log('err', err);
        });
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

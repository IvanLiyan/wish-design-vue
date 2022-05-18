<template>
  <div>
    <wt-button type="primary" @click="openDialog1">预览效果</wt-button>
    <wt-dialog title="确认提交审核？" v-model="visible1" width="400px">
      <div>物流商价格的申请内容提交后，等待客服审核通过，可在一个工作日后查看结果。</div>
      <div slot="footer" class="demo-dialog-footer">
        <wt-button type="primary" @click="closeDialog1">确定</wt-button>
        <wt-button type="secondary" @click="closeDialog1">取消</wt-button>
      </div>
    </wt-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible1: false,
    };
  },
  methods: {
    openDialog1() {
      this.visible1 = true;
    },
    closeDialog1() {
      this.visible1 = false;
    },
  },
};
</script>

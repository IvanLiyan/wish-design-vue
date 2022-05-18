<template>
  <div>
    <wt-button type="primary" @click="openDialog5">异步关闭的对话框</wt-button>
    <wt-dialog :mask-closable="false" width="400px" v-model="visible5" title="异步关闭的对话框">
      春江潮水连海平，海上明月共潮生。滟滟随波千万里，何处春江无月明！
      江流宛转绕芳甸，月照花林皆似霰；空里流霜不觉飞，汀上白沙看不见。
      江天一色无纤尘，皎皎空中孤月轮。江畔何人初见月？江月何年初照人？
      人生代代无穷已，江月年年望相似。不知江月待何人，但见长江送流水。
      <div slot="footer" class="demo-dialog-footer">
        <wt-button type="primary" :loading="submitting" @click="submitDialog5">提交</wt-button>
        <wt-button type="secondary" @click="cancelDialog5">取消</wt-button>
      </div>
    </wt-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible5: false,
      submitting: false,
    };
  },
  methods: {
    openDialog5() {
      this.visible5 = true;
    },
    cancelDialog5() {
      this.visible5 = false;
    },
    submitDialog5() {
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
        this.visible5 = false;
      }, 3000);
    },
  },
};
</script>

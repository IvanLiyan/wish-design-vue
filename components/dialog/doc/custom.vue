<template>
  <div>
    <div class="demo-dialog-btn-groups">
      <wt-button type="primary" @click="openDialog">填写表单</wt-button>
    </div>
    <wt-dialog v-model="visible" title="企业入驻" :closable="true">
      <wt-form ref="form" :rules="ruleCustom" :model="formData" :first-fields="true" class="form">
        <div class="title">企业注册地址</div>
        <wt-form-item prop="regNation" required>
          <wt-select v-model="formData.regNation" label="国家" placeholder="请选择">
            <wt-option v-for="item in nations" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="regProvince" required>
          <wt-select v-model="formData.regProvince" label="省" placeholder="请选择">
            <wt-option v-for="item in provinces" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="regCity" required>
          <wt-select v-model="formData.regCity" label="市" placeholder="请选择">
            <wt-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="code" required>
          <wt-input label="邮政编码" placeholder="请输入纯数字" v-model="formData.code" />
        </wt-form-item>
      </wt-form>
      <div slot="footer" class="demo-modal-footer">
        <wt-button type="primary" :loading="submitting" @click="submit">提交</wt-button>
        <wt-button type="secondary" @click="reset">重置</wt-button>
      </div>
    </wt-dialog>
  </div>
</template>
<script>
const initialData = {
  regNation: null,
  regProvince: null,
  regCity: null,
  code: null,
};
export default {
  data() {
    return {
      visible: false,
      submitting: false,
      formData: initialData,
      nations: [
        {
          value: 'China',
          label: '中国',
        },
        {
          value: 'America',
          label: '美国',
        },
      ],
      provinces: [
        {
          value: 'zhejiang',
          label: '浙江',
        },
        {
          value: 'jiangsu',
          label: '江苏',
        },
      ],
      cities: [
        {
          value: 'shanghai',
          label: '上海',
        },
        {
          value: 'beijing',
          label: '北京',
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.visible = true;
    },
    reset() {
      this.$refs.form.resetFields();
    },
    submit() {
      const valid = this.$refs.form.validateFields();
      if (valid) {
        this.submitting = true;
        setTimeout(() => {
          this.submitting = false;
          this.$wt.notify({
            type: 'success',
            message: 'Submit success',
          });
          console.log('data', this.formData);
          this.visible = false;
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
.form {
  width: 560px;
  margin-left: auto;
  margin-right: auto;
}
</style>

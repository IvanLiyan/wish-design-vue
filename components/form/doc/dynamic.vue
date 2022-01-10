<template>
  <wt-form :model="dynamicValidateForm" ref="dynamicValidateForm"
    :label-width="100" class="demo-dynamic">
    <wt-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]">
      <wt-input v-model="dynamicValidateForm.email" />
    </wt-form-item>
    <wt-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :label="'域名' + index"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true, message: '域名不能为空', trigger: 'blur'
      }">
      <wt-input v-model="domain.value" /><wt-button @click.prevent="removeDomain(domain)">删除</wt-button>
    </wt-form-item>
    <wt-form-item>
      <wt-button type="primary" @click="submitForm('dynamicValidateForm')">提交</wt-button>
      <wt-button @click="addDomain">新增域名</wt-button>
      <wt-button @click="resetForm('dynamicValidateForm')">重置</wt-button>
    </wt-form-item>
  </wt-form>
</template>
<script>
export default {
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          value: '',
        }],
        email: '',
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
  },
};
</script>

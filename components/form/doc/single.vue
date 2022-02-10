<template>
  <div class="demo-container">
    <wt-form
      ref="form"
      title="法人信息"
      :rules="ruleCustom"
      :model="formCustom"
      :first-fields="true"
      :style="{ width: '600px' }"
    >
      <wt-form-item prop="username" helper="提现操作仅限于此真实姓名下的银行卡。" required>
        <wt-input label="法人代表姓名" placeholder="大陆身份证" v-model="formCustom.username" />
      </wt-form-item>
      <wt-form-item prop="idCard" required helper=" ">
        <wt-input label="身份证号" placeholder="大陆身份证" v-model="formCustom.idCard" />
      </wt-form-item>
      <wt-form-item prop="nation" required :span="12">
        <wt-select v-model="formCustom.nation" label="身份证有效期限">
          <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </wt-select>
      </wt-form-item>
      <wt-form-item prop="date" required :span="12">
        <wt-date-picker type="date" v-model="formCustom.date" />
      </wt-form-item>
      <div>
        <wt-button @click="submit">提交</wt-button>
        <wt-button type="text" @click="reset">重置</wt-button>
      </div>
    </wt-form>
  </div>
</template>
<script>
const validatePassword = (rule, value, callback) => {
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)) {
    callback(new Error('请输入正确的身份证号'));
  } else {
    callback();
  }
};
const initialData = {
  username: '',
  idCard: '',
  checkboxValue: ['checkbox1', 'checkbox3'],
  radioValue: 'radio1',
  switchValue: false,
  nation: null,
  time: null,
  date: null,
};

export default {
  data() {
    return {
      formCustom: JSON.parse(JSON.stringify(initialData)),
      ruleCustom: {
        idCard: [{ validator: validatePassword, trigger: 'blur' }],
      },
      options: [
        {
          value: 'china',
          label: '中国',
        },
        {
          value: 'america',
          label: '美国',
        },
        {
          value: 'japan',
          label: '日本',
        },
        {
          value: 'france',
          label: '法国',
        },
      ],
    };
  },
  methods: {
    reset: function () {
      this.$refs.form.resetFields();
    },
    clearValidate: function () {
      this.$refs.form.clearValidate();
    },
    submit: async function () {
      const valid = this.$refs.form.validateFields();
      if (valid) {
        this.$wt.notify({
          type: 'success',
          message: 'Submit success',
        });
      }
      console.log('data', this.formCustom);
    },
  },
};
</script>

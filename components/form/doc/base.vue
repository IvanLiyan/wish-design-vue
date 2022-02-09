<template>
  <wt-form ref="formCustom" title="法人信息" :rules="ruleCustom" :model="formCustom" :first-fields="true">
    <wt-row :gutter="20">
      <wt-col :span="12">
        <wt-form-item prop="username" helper="提现操作仅限于此真实姓名下的银行卡。" required>
          <wt-input label="法人代表姓名" placeholder="大陆身份证" v-model="formCustom.username" />
        </wt-form-item>
      </wt-col>
      <wt-col :span="12">
        <wt-form-item prop="idCard" required :rules="idRule">
          <wt-input label="身份证号" placeholder="大陆身份证" v-model="formCustom.idCard" />
        </wt-form-item>
      </wt-col>
    </wt-row>

    <wt-row :gutter="20">
      <wt-col :span="8">
        <wt-form-item prop="nation" required>
          <wt-select v-model="formCustom.nation" label="国家">
            <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
      </wt-col>
      <wt-col :span="8">
        <wt-form-item prop="time" required>
          <wt-time-picker type="time" v-model="formCustom.time" />
        </wt-form-item>
      </wt-col>
      <wt-col :span="8">
        <wt-form-item prop="date" required>
          <wt-date-picker type="date" v-model="formCustom.date" />
        </wt-form-item>
      </wt-col>
    </wt-row>

    <wt-form-item prop="checkboxValue" required>
      <wt-checkbox-group arrange="horizontal" v-model="formCustom.checkboxValue">
        <wt-checkbox value="checkbox1">checkbox1</wt-checkbox>
        <wt-checkbox value="checkbox2">checkbox2</wt-checkbox>
        <wt-checkbox value="checkbox3">checkbox3</wt-checkbox>
        <wt-checkbox value="checkbox4">checkbox4</wt-checkbox>
      </wt-checkbox-group>
    </wt-form-item>

    <wt-form-item prop="radioValue" required>
      <wt-radio-group v-model="formCustom.radioValue" arrange="horizontal">
        <wt-radio value="radio1">radio1</wt-radio>
        <wt-radio value="radio2">radio2</wt-radio>
        <wt-radio value="radio3">radio3</wt-radio>
        <wt-radio value="radio4">radio4</wt-radio>
      </wt-radio-group>
    </wt-form-item>

    <wt-form-item prop="switchValue" required>
      <wt-switch v-model="formCustom.switchValue">item content</wt-switch>
    </wt-form-item>
    <div>
      <wt-button type="text" @click="reset">重置</wt-button>
      <wt-button type="text" @click="clear">清空数据</wt-button>

      <wt-button type="text" @click="clearValidate">移除校验</wt-button>
      <wt-button @click="submit">提交</wt-button>
    </div>
  </wt-form>
</template>
<script>
const validatePassword = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
    callback(new Error('只能输入6-16个字符且仅为字母,数字'));
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
        // username: [{ required: true }],
        idCard: [{ validator: validatePassword, trigger: 'blur' }],
      },

      idRule: {
        max: 5,
        message: '身份证号不能多余5位',
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
      this.$refs.formCustom.resetFields();
    },
    clear: function () {
      this.$refs.formCustom.clearValidate();
      this.formCustom = {};
    },

    clearValidate: function () {
      this.$refs.formCustom.clearValidate();
    },

    submit: async function () {
      const valid = this.$refs.formCustom.validateFields();
      console.log('valid', valid);
      console.log('data', this.formCustom);
    },
  },
};
</script>
<style lang="scss"></style>

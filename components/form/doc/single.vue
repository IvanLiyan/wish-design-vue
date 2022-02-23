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
      <wt-form-item prop="idFront" required>
        <span class="upload-label">身份证件（头像面）副本</span>
        <wt-upload
          class="upload-base"
          action="https://jsonplaceholder.typicode.com/posts/"
          input-type="button"
          v-model="formCustom.idFront"
          :on-remove="removeFront"
        />
        <span class="helper">文件大小不超过20MB</span>
      </wt-form-item>
      <wt-form-item prop="idBack" required>
        <span class="upload-label">身份证件（国徽面）副本</span>
        <wt-upload
          class="upload-base"
          action="https://jsonplaceholder.typicode.com/posts/"
          input-type="button"
          v-model="formCustom.idBack"
          @input="input"
        />
        <span class="helper">文件大小不超过20MB</span>
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
  idFront: [
    {
      name: 'test.jpg',
      percentage: 100,
      raw: {
        uid: 1645171975770,
        lastModified: 1644907336299,
        lastModifiedDate: new Date(),
        name: 'test.jpg',
        size: 88596,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
      size: 88596,
      status: 'success',
      uid: 1645171975770,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
    },
  ],
  idBack: [
    {
      name: 'test.jpg',
      percentage: 100,
      raw: {
        uid: 1645171975770,
        lastModified: 1644907336299,
        lastModifiedDate: new Date(),
        name: 'test.jpg',
        size: 88596,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
      size: 88596,
      status: 'success',
      uid: 1645171975770,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
    },
  ],
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
    removeFront () {
      console.log('formCustom', this.formCustom);
    },
    input: function (a) {
      console.log('aaa', a);
    },
    reset: function () {
      this.$refs.form.resetFields();
      console.log('this.$refs.form.formCustom', this.$refs.form.formCustom);
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

<style scope>
.upload-label {
  color: #0e161c;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
  display: inline-block;
}
.helper {
  font-size: 12px;
  position: absolute;
  left: 120px;
  top: 30px;
}
</style>

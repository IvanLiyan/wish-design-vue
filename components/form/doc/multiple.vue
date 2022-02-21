<template>
  <wt-form ref="form" title="法人信息" :rules="ruleCustom" :model="formCustom" :first-fields="true">
    <wt-form-item
      prop="username"
      :span="12"
      helper="提现操作仅限于此真实姓名下的银行卡。"
      required
      :style="{ 'padding-right': '10px' }"
    >
      <wt-input label="法人代表姓名" placeholder="大陆身份证" v-model="formCustom.username" />
    </wt-form-item>
    <wt-form-item prop="idCard" required :span="12" helper=" " :style="{ 'padding-left': '10px' }">
      <wt-input label="身份证号" placeholder="大陆身份证" v-model="formCustom.idCard" />
    </wt-form-item>
    <wt-form-item prop="idFront" :span="6" required :style="{ 'padding-right': '10px' }">
      <wt-upload
        input-type="input"
        action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
        list-type="picture-list"
        :http-request="uploadPdf"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        v-model="formCustom.idFront"
      >
        <Icon name="paperclip" :width="18" :height="18" class="picture-list-icon" />
        <span>点击上传</span>
      </wt-upload>
    </wt-form-item>
    <wt-form-item prop="idBack" :span="6" required :style="{ 'padding-right': '10px' }">
      <wt-upload
        input-type="input"
        action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
        list-type="picture-list"
        :http-request="uploadPdf"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        v-model="formCustom.idBack"
      >
        <Icon name="paperclip" :width="18" :height="18" class="picture-list-icon" />
        <span>点击上传</span>
      </wt-upload>
    </wt-form-item>
    <wt-form-item prop="nation" required :span="6" :style="{ 'padding-left': '10px' }">
      <wt-select v-model="formCustom.nation" label="身份证有效期限">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="date" required :span="6">
      <wt-date-picker type="date" v-model="formCustom.date" label="选择日期" />
    </wt-form-item>
    <div>
      <wt-button @click="submit">提交</wt-button>
      <wt-button type="text" @click="reset">重置</wt-button>
    </div>
  </wt-form>
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
    // {
    //   name: 'test.jpg',
    //   percentage: 100,
    //   raw: {
    //     uid: 1645171975770,
    //     lastModified: 1644907336299,
    //     lastModifiedDate: new Date(),
    //     name: 'test.jpg',
    //     size: 88596,
    //     type: 'image/jpeg',
    //     webkitRelativePath: '',
    //   },
    //   size: 88596,
    //   status: 'success',
    //   uid: 1645171975770,
    //   url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
    // },
  ],
  idBack: [
    // {
    //   name: 'test.jpg',
    //   percentage: 100,
    //   raw: {
    //     uid: 1645171975770,
    //     lastModified: 1644907336299,
    //     lastModifiedDate: new Date(),
    //     name: 'test.jpg',
    //     size: 88596,
    //     type: 'image/jpeg',
    //     webkitRelativePath: '',
    //   },
    //   size: 88596,
    //   status: 'success',
    //   uid: 1645171975770,
    //   url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
    // },
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
          value: 'date-range',
          label: '起止日期',
        },
      ],
    };
  },
  methods: {
    reset: function () {
      this.$refs.form.resetFields();
      console.log(this.$refs.form.formCustom);
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

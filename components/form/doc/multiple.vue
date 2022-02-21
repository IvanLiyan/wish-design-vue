<template>
  <wt-form ref="form" title="企业入驻" :rules="ruleCustom" :model="formData" :first-fields="true">
    <wt-form-item prop="open" required>
      <wt-switch v-model="value1"
        >管理功能开启<span slot="hint">请确定当前账号有相应权限后再操作否则无法过审</span>
      </wt-switch>
    </wt-form-item>
    <div class="title">法人本人注册或代注册</div>
    <wt-form-item prop="open" required>
      <wt-radio-group v-model="value" arrange="vertical">
        <wt-radio value="item1">法人本人<span slot="hint">法人可以在提交申请后立刻参与实名认证</span></wt-radio>
        <wt-radio value="item1">代为注册<span slot="hint">需要另外联系法人安排时间进行实名认证</span></wt-radio>
      </wt-radio-group>
    </wt-form-item>

    <wt-form-item prop="nation" required :span="12" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.nation" label="入驻介绍人（可选）" placeholder="输入介绍人姓名搜索并选则">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="nation" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-select v-model="formData.nation" label="经营类型" placeholder="输入经营类型搜索并选则">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>

    <wt-form-item
      prop="username"
      :span="12"
      helper="提现操作仅限于此真实姓名下的银行卡。"
      required
      :style="{ 'padding-right': '10px' }"
    >
      <wt-input label="法人代表姓名" placeholder="请输入真实姓名" v-model="formData.username" />
    </wt-form-item>
    <wt-form-item prop="idCard" required :span="12" helper=" " :style="{ 'padding-left': '10px' }">
      <wt-input label="对公银行卡号" placeholder="企业对公账户号码" v-model="formData.idCard" />
    </wt-form-item>

    <wt-form-item prop="nation" required :span="12" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.nation" label="证件类型" placeholder="请选择证件类型">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="date" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-date-picker
        type="date"
        v-model="formData.date"
        label="证件有效日期"
        placeholder="请输入证件上显示的有效起止日期"
      />
    </wt-form-item>

    <wt-form-item
      prop="idFront"
      required
      :span="12"
      helper="可接受的文件类型：jpg, png, gif, pdf。文件大小不能超过20MB。"
      :style="{ 'padding-right': '10px' }"
    >
      <wt-upload
        input-type="input"
        action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
        list-type="picture-list"
        :http-request="uploadPdf"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        v-model="formData.idFront"
      />
    </wt-form-item>
    <wt-form-item
      prop="idBack"
      required
      :span="12"
      helper="可接受的文件类型：jpg, png, gif, pdf。文件大小不能超过20MB。"
      :style="{ 'padding-right': '10px' }"
    >
      <wt-upload
        input-type="input"
        action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
        list-type="picture-list"
        :http-request="uploadPdf"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        v-model="formData.idBack"
      />
    </wt-form-item>

    <div class="title">企业注册地址</div>
    <wt-form-item prop="nation" required :span="6" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.nation" label="国家" placeholder="请选择">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="nation" required :span="6" :style="{ 'padding-left': '10px', 'padding-right': '10px' }">
      <wt-select v-model="formData.nation" label="省" placeholder="请选择">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="nation" required :span="6" :style="{ 'padding-right': '10px', 'padding-left': '10px' }">
      <wt-select v-model="formData.nation" label="市" placeholder="请选择">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="username" :span="6" required :style="{ 'padding-left': '10px' }">
      <wt-input label="邮政编码" placeholder="请输入纯数字" v-model="formData.username" />
    </wt-form-item>

    <div class="title">其他电商平台经验</div>
    <wt-form-item prop="username" required>
      <wt-checkbox-group arrange="horizontal" v-model="groupValue">
        <wt-checkbox value="Ebay">ebay</wt-checkbox>
        <wt-checkbox value="Amazon">Amazon</wt-checkbox>
        <wt-checkbox value="Shopee">Shopee</wt-checkbox>
        <wt-checkbox value="Shopify">Shopify独立站</wt-checkbox>
        <wt-checkbox value="NonShopify">非Shopify独立站</wt-checkbox>
      </wt-checkbox-group>
    </wt-form-item>

    <div class="title">电话联系方式</div>
    <wt-form-item prop="nation" required :span="6">
      <wt-select v-model="formData.nation" label="座机/手机" placeholder="请选择">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="username" :span="6" required :style="{ 'padding-right': '10px' }">
      <wt-input label=" " placeholder="请输入纯数字电话号码" v-model="formData.username" />
    </wt-form-item>

    <wt-form-item prop="date" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-date-picker type="date" v-model="formData.date" label="可接听来电的时间段" placeholder="请选择时间" />
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
      formData: JSON.parse(JSON.stringify(initialData)),
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
      console.log(this.$refs.form.formData);
    },
    submit: async function () {
      const valid = this.$refs.form.validateFields();
      if (valid) {
        this.$wt.notify({
          type: 'success',
          message: 'Submit success',
        });
      }
      console.log('data', this.formData);
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 8px;
}
</style>

<template>
  <wt-form ref="form" title="Enterprises" :rules="ruleCustom" :model="formData" :first-fields="true">
    <wt-form-item prop="open" required>
      <wt-switch v-model="formData.open"
        >Enabling Management<span slot="hint">Please make sure that the current account has corresponding permissions before operation, otherwise it cannot be audited</span>
      </wt-switch>
    </wt-form-item>
    <div class="title">Legal person / Dealer registration</div>
    <wt-form-item prop="login" required>
      <wt-radio-group v-model="formData.login" arrange="vertical">
        <wt-radio value="faren">Legal person<span slot="hint">Legal entities can participate in real-name verification immediately after submitting an application</span></wt-radio>
        <wt-radio value="daili">Dealer registration<span slot="hint">Need to contact the legal person to arrange time for real-name authentication</span></wt-radio>
      </wt-radio-group>
    </wt-form-item>
    <wt-form-item prop="introducer" :span="12" :style="{ 'padding-right': '10px' }">
      <wt-select
        v-model="formData.introducer"
        label="Settled introducers (optional)"
        filterable
        placeholder="Enter referrer to search/select"
      >
        <wt-option v-for="item in introducers" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="busType" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-select multiple v-model="formData.busType" label="Business type" placeholder="Enter business type to search/select">
        <wt-option v-for="item in busTypes" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item
      prop="name"
      :span="12"
      helper="The withdrawal operation is limited to cards under this real name"
      required
      :style="{ 'padding-right': '10px' }"
    >
      <wt-input label="Name of legal representative" placeholder="Please enter real name" v-model="formData.name" />
    </wt-form-item>
    <wt-form-item prop="idCard" required :span="12" helper=" " :style="{ 'padding-left': '10px' }">
      <wt-input label="Public bank card number" placeholder="Business to business account number" v-model="formData.idCard" />
    </wt-form-item>

    <wt-form-item prop="idType" required :span="12" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.idType" label="Certificate type" placeholder="Please select certificate type">
        <wt-option v-for="item in idTypes" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="idDate" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-date-picker
        type="date"
        v-model="formData.idDate"
        label="Valid date of certificate"
        placeholder="Please enter the valid start and end dates shown on the certificate"
      />
    </wt-form-item>

    <wt-form-item
      prop="idFront"
      required
      :span="12"
      helper="Acceptable file types: JPG, PNG, GIF, PDF. The file size cannot exceed 20MB"
      :style="{ 'padding-right': '10px' }"
    >
      <wt-upload
        input-type="input"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-list"
        v-model="formData.idFront"
      />
    </wt-form-item>
    <wt-form-item
      prop="idBack"
      required
      :span="12"
      helper="Acceptable file types: JPG, PNG, GIF, PDF. The file size cannot exceed 20MB"
      :style="{ 'padding-left': '10px' }"
    >
      <wt-upload
        input-type="input"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-list"
        v-model="formData.idBack"
      />
    </wt-form-item>

    <div class="title">Business registration address</div>
    <wt-form-item prop="regNation" required :span="6" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.regNation" label="Country" placeholder="Please select">
        <wt-option v-for="item in nations" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="regProvince" required :span="6" :style="{ 'padding-right': '10px' }">
      <wt-select v-model="formData.regProvince" label="Province" placeholder="Please select">
        <wt-option v-for="item in provinces" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="regCity" required :span="6" :style="{ 'padding-right': '10px', 'padding-left': '10px' }">
      <wt-select v-model="formData.regCity" label="City" placeholder="Please select">
        <wt-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="code" :span="6" required :style="{ 'padding-left': '10px' }">
      <wt-input label="Zip code" placeholder="Please enter number" v-model="formData.code" />
    </wt-form-item>
    <div class="title">Experience in other e-commerce platforms</div>
    <wt-form-item prop="experience" required>
      <wt-checkbox-group arrange="horizontal" v-model="formData.experience">
        <wt-checkbox v-for="exp in experiences" :key="exp.value" :value="exp.value">{{ exp.label }}</wt-checkbox>
      </wt-checkbox-group>
    </wt-form-item>
    <div class="title">Phone number</div>
    <wt-form-item prop="telType" required :span="6">
      <wt-select v-model="formData.telType" label="Landline/Cell phone" placeholder="Please select">
        <wt-option v-for="item in telTypes" :key="item.value" :label="item.label" :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item prop="telPhone" :span="6" required :style="{ 'padding-right': '10px' }">
      <wt-input label=" " placeholder="Please enter a only digital phone number" v-model="formData.telPhone" />
    </wt-form-item>
    <wt-form-item prop="telOpenTime" required :span="12" :style="{ 'padding-left': '10px' }">
      <wt-time-picker
        type="timerange"
        v-model="formData.telOpenTime"
        label="Period of calls are available"
        placeholder="Please select time"
      />
    </wt-form-item>

    <div>
      <wt-button @click="submit">Submit</wt-button>
      <wt-button type="text" @click="reset">Reset</wt-button>
    </div>
  </wt-form>
</template>
<script>
const initialData = {
  open: false,
  login: 'daili',
  introducer: null,
  busType: null,
  name: '',
  idCard: '',
  idFront: [],
  idBack: [],
  regNation: null,
  regProvince: null,
  regCity: null,
  code: null,
  experience: [],
  telType: null,
  telPhone: null,
  telOpenTime: null,
};

export default {
  data() {
    return {
      formData: initialData,
      ruleCustom: {
        // idCard: [{ validator: validateIdCard, trigger: 'blur' }],
      },
      introducers: [
        {
          value: 'amy',
          label: 'amy',
        },
        {
          value: 'lili',
          label: 'lili',
        },
      ],
      busTypes: [
        {
          value: 'e-commerce',
          label: 'E-commerce',
        },
        {
          value: 'factory',
          label: 'Factory',
        },
      ],
      idTypes: [
        {
          value: 'idcard',
          label: 'Id card',
        },
        {
          value: 'passport',
          label: 'Passport',
        },
      ],
      nations: [
        {
          value: 'China',
          label: 'China',
        },
        {
          value: 'America',
          label: 'America',
        },
      ],
      provinces: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
        },
      ],
      cities: [
        {
          value: 'shanghai',
          label: 'Shanghai',
        },
        {
          value: 'beijing',
          label: 'Beijing',
        },
      ],
      experiences: [
        {
          value: 'Ebay',
          label: 'ebay',
        },
        {
          value: 'Amazon',
          label: 'Amazon',
        },
        {
          value: 'Shopee',
          label: 'Shopee',
        },
        {
          value: 'Shopify',
          label: 'Shopify Independent Sites',
        },
        {
          value: 'NonShopify',
          label: 'Non-shopify Independent Site',
        },
      ],
      telTypes: [
        {
          value: 'landline',
          label: 'Landline',
        },
        {
          value: 'phone',
          label: 'Phone',
        },
      ],
    };
  },
  methods: {
    reset: function () {
      this.$refs.form.resetFields();
      console.log(this.formData);
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

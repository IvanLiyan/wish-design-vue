<template>
  <div>
    <div class="demo-dialog-btn-groups">
      <wt-button type="primary" @click="openDialog">Fill out</wt-button>
    </div>
    <wt-dialog v-model="visible" title="Enterprise Enter" :closable="true">
      <wt-form ref="form" :model="formData" :first-fields="true" class="form">
        <div class="title">Business address</div>
        <wt-form-item prop="regNation" required>
          <wt-select v-model="formData.regNation" label="Country" placeholder="Please select">
            <wt-option v-for="item in nations" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="regType" required>
          <wt-select v-model="formData.regType" label="Type" placeholder="Please select">
            <wt-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="regNum" required>
          <wt-select v-model="formData.regNum" label="Number of employees" placeholder="Please select">
            <wt-option v-for="item in num" :key="item.value" :label="item.label" :value="item.value" />
          </wt-select>
        </wt-form-item>
        <wt-form-item prop="code" required>
          <wt-input label="Postal code" placeholder="Please input number" v-model="formData.code" />
        </wt-form-item>
      </wt-form>
      <div slot="footer" class="demo-modal-footer">
        <wt-button type="primary" :loading="submitting" @click="submit">Submit</wt-button>
        <wt-button type="secondary" @click="reset">Reset</wt-button>
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
          label: 'China',
        },
        {
          value: 'America',
          label: 'America',
        },
        {
          value: 'India',
          label: 'India',
        },
      ],
      type: [
        {
          value: 'AD',
          label: 'Aerospace & Defense',
        },
        {
          value: 'AL',
          label: 'Airlines',
        },
        {
          value: 'BM',
          label: 'Building Materials',
        },
        {
          value: 'CC',
          label: 'Chemicals',
        },
      ],
      num: [
        {
          value: 'less',
          label: '1-30',
        },
        {
          value: 'normal',
          label: '31-99',
        },
        {
          value: 'large',
          label: 'more than 100',
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

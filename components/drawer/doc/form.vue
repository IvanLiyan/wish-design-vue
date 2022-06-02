<template>
  <div>
    <wt-button type="primary" @click="visible = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible"
      class="demo-drawer-form" width="800px"
      destroy-on-close>
      <div class="demo-action">
        <wt-button type="primary" @click="handleSubmit">提交</wt-button>
        <wt-button @click="visible = false">取消</wt-button>
      </div>
      <h3 class="title">创建 Offer</h3>
      <h4 class="sub-title">原雇主薪酬</h4>
      <wt-form :rules="rules" :model="model" ref="form">
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="公司主体:" prop="company">
              <wt-input v-model="model.company" />
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="开户行:" prop="bank">
              <wt-input v-model="model.bank" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="岗位类别:" prop="type">
              <wt-select v-model="model.type">
                <wt-option label="研发岗" value="1" />
                <wt-option label="产品岗" value="2" />
                <wt-option label="安全岗" value="3" />
              </wt-select>
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="基本薪资:" prop="salary">
              <wt-input v-model="model.salary" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="入职时间:" prop="hiredate">
              <wt-date-picker type="date" v-model="model.hiredate" />
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="离职时间:" prop="leavedate">
              <wt-date-picker type="date" v-model="model.leavedate" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="简历来源:" prop="source">
              <wt-checkbox-group v-model="model.source">
                <wt-checkbox value="1">官网</wt-checkbox>
                <wt-checkbox value="2">伯乐网</wt-checkbox>
                <wt-checkbox value="3">猎头网</wt-checkbox>
              </wt-checkbox-group>
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="部门名称:" prop="department">
              <wt-input v-model="model.department" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-form-item label="备注">
          <wt-textarea v-model="model.remarks" class="demo-remarks" />
        </wt-form-item>
      </wt-form>
    </wt-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      model: {
        company: '',
        bank: '',
        type: '',
        salary: '',
        hiredate: '',
        leavedate: '',
        source: [],
        department: '',
        remarks: '',
      },
      submitting: false,
      rules: {
        company: { required: true, message: '请填写公司主体' },
        bank: { required: true },
        type: { required: true },
        salary: { required: true },
      },
    };
  },
  methods: {
    handleSubmit () {
      this.submitting = true;
      this.$refs.form.validate().then(() => {
        this.submitting = false;
        this.visible = false;
        this.$wt.message('提交成功');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .demo-drawer-form{
    /deep/ {
      .wt-drawer-close{
        left: 16px;
        right: auto;
      }
      .wt-input-wrapper, .wt-select{
        width: 100%;
      }
      .wt-date-picker{
        width: 100%;
      }
    }
  }
  .demo-action{
    text-align: right;
    > button{
      min-width: 80px;
    }
    button + button {
      margin-left: 12px;
    }
  }
  .demo-remarks{
    width: 100%;
    height: 300px;
  }
  .title{
    margin: 16px 0;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
  }
  .sub-title{
    margin: 0 0 16px 0;
    font-size: 16px;
    line-height: 24px5;
  }
</style>

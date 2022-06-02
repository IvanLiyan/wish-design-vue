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
      <wt-form :rules="rules" :model="model" ref="form" label-width="120">
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="公司主体:" prop="company">
              <wt-input v-model="model.company" placeholder="请输入公司主体" />
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="开户行:" prop="openingbank">
              <wt-input v-model="model.openingbank" placeholder="请输入开户行" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <div>
            <wt-form-item label="期望提交审核的日期:" prop="submitdata" class="formheight1">
              <wt-select v-model="model.submitdata" placeholder="请选择日期">
                <wt-option label="研发岗" value="1" />
                <wt-option label="产品岗" value="2" />
                <wt-option label="安全岗" value="3" />
              </wt-select>
            </wt-form-item>
            </div>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="个人银行账号:" prop="bank">
              <wt-input v-model="model.bank" placeholder="请输入银行账号" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="岗位类别:" prop="worktype">
              <wt-select v-model="model.worktype" placeholder="请选择类别">
                <wt-option label="研发岗" value="1" />
                <wt-option label="产品岗" value="2" />
                <wt-option label="安全岗" value="3" />
              </wt-select>
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="基本薪资:" prop="salary">
              <wt-input v-model="model.salary" placeholder="请选择薪资范围" />
            </wt-form-item>
          </wt-col>
        </wt-row>
      </wt-form>

      <h4 class="sub-title">竞争Offer</h4>
      <wt-form :rules="rules" :model="model" ref="form" label-width="120">
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="公司名称:" prop="company">
              <wt-input v-model="model.company" placeholder="请输入公司名称" />
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="职位序列:" prop="workrank">
              <wt-input v-model="model.workrank" placeholder="请输入职位序列" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="入职职级:" prop="grade">
              <wt-select v-model="model.grade" placeholder="请选择职级">
                <wt-option label="等级1" value="1" />
                <wt-option label="等级2" value="2" />
                <wt-option label="等级3" value="3" />
              </wt-select>
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="离职职级:" prop="grade">
              <wt-select v-model="model.grade" placeholder="请选择离职职级">
                <wt-option label="等级1" value="1" />
                <wt-option label="等级2" value="2" />
                <wt-option label="等级3" value="3" />
              </wt-select>
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
              <wt-input v-model="model.department" placeholder="请输入部门名称" />
            </wt-form-item>
          </wt-col>
        </wt-row>
        <wt-row>
          <wt-col :span="12">
            <wt-form-item label="期望收入:" prop="expectincome">
              <wt-input v-model="model.expectincome" placeholder="请输入金额" />
            </wt-form-item>
          </wt-col>
          <wt-col :span="12">
            <wt-form-item label="基本薪资:" prop="salary">
              <wt-input v-model="model.salary" placeholder="请输入基本薪资" />
            </wt-form-item>
          </wt-col>
        </wt-row>
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
        submitdata: '',
        grade: '',
        expectincome: '',
        workrank: '',
        worktype: '',
      },
      submitting: false,
      rules: {
        company: { required: true, message: '请填写公司名称' },
        bank: { required: true },
        type: { required: true },
        submitdata: { required: true },
        grade: { required: true },
        expectincome: { required: true },
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
      .wt-checkbox{
          margin-right: 30px;
      }
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
      .formheight1{
        /deep/ {
          .wt-form-item-label{
            line-height: 20px;
          }
        }
      }
    }
  }
  .demo-action{
    text-align: right;
    > button{
      min-width: 80px;
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

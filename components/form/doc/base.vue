<template>
  <wt-form :model="formCustom" ref="formCustom" :rules="ruleCustom">
    <wt-form-item label="主机名称" prop="hostname">
      <wt-input type="text" v-model="formCustom.hostname" style="width: 260px;" />
    </wt-form-item>
    <wt-form-item label="管理员" prop="owner">
      {{ formCustom.owner }}
    </wt-form-item>
    <wt-form-item label="机房区域" prop="curzone">
      <wt-input-group compact>
        <wt-select type="text" v-model="formCustom.curzone" style="width: 100px;">
          <wt-option :key="item.value"
            v-for="item in list1"
            :value="item.value"
            :label="item.label" />
        </wt-select>
        <wt-select type="text" v-model="formCustom.curhost">
          <wt-option :key="item.value"
            v-for="item in list1.filter(v => v.value === formCustom.curzone).length
            ? list1.filter(v => v.value === formCustom.curzone)[0].children
            : []"
            :value="item.value"
            :label="item.label" />
        </wt-select>
      </wt-input-group>
    </wt-form-item>
    <wt-form-item label="类型" prop="type">
      <wt-radio-group v-model="formCustom.type">
        <wt-radio value="windows">windows</wt-radio>
        <wt-radio value="linux">Linux</wt-radio>
      </wt-radio-group>
    </wt-form-item>
    <wt-form-item label="CPU" prop="cpu">
      <wt-radio-group v-model="formCustom.cpu">
        <wt-radio-button value="2">2核</wt-radio-button>
        <wt-radio-button value="4">4核</wt-radio-button>
        <wt-radio-button value="8">8核</wt-radio-button>
        <wt-radio-button value="16">16核</wt-radio-button>
      </wt-radio-group>
    </wt-form-item>
    <wt-form-item label="标签" prop="tags">
      <wt-select v-model="formCustom.tags" placeholder="请选择" multiple style="width: 260px;">
        <wt-option
          v-for="item in list2"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </wt-select>
    </wt-form-item>
    <wt-form-item label="描述" prop="desc">
      <wt-textarea placeholder="描述文本"
        v-model="formCustom.desc" style="width: 260px;"
        rows="3" maxlength="50" />
    </wt-form-item>
    <wt-form-item>
      <wt-button type="primary" style="margin-right: 12px;"
        @click="handleSubmit('formCustom')">
        立即创建
      </wt-button>
      <wt-button @click="handleReset('formCustom')">取消</wt-button>
    </wt-form-item>
  </wt-form>
</template>
<script>
export default {
  data () {
    const validateHostname = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入主机名称'));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        hostname: '',
        owner: '李明/liming',
        curzone: '',
        curhost: '',
        type: 'windows',
        cpu: '2',
        tags: [],
      },
      ruleCustom: {
        curzone: {
          required: true,
          validator: (rule, value, callback) => {
            if (!this.formCustom.curzone) {
              return callback(new Error('请选择区域'));
            } else if (!this.formCustom.curhost) {
              return callback(new Error('请选择机房'));
            }
            callback();
          },
        },
        type: { required: true, message: '必填' },
        cpu: { required: true, message: '必填' },
        hostname: [
          { required: true, message: '必填' },
          { validator: validateHostname, trigger: 'blur' },
        ],
      },
      list1: [{
        value: '1',
        label: '区域1',
        children: [{
          value: '1',
          label: '主机1',
        }, {
          value: '2',
          label: '主机2',
        }],
      }, {
        value: '2',
        label: '区域2',
        children: [{
          value: '3',
          label: '主机3',
        }, {
          value: '4',
          label: '主机4',
        }],
      }],
      list2: [{
        value: 'tag1',
        label: '标签1',
      }, {
        value: 'tag2',
        label: '标签2',
      }, {
        value: 'tag3',
        label: '标签3',
      }, {
        value: 'tag4',
        label: '标签4',
      }, {
        value: 'tag5',
        label: '标签5',
      }],
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('Success!');
        } else {
          console.error('Fail!');
        }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
<style lang='scss'>
  .demo-input-group{
    >:not(:last-child){
      .wt-input {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: none;
      }
    }
    >:not(:first-child){
      .wt-input {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }
  }
</style>

<template>
  <wt-form>
    <wt-form-item>
      <span slot="label">
        任务名
        <wt-tooltip placement="top" content="任务名会同步成数据表名">
          <i class="wticon wticon-question-circle-o demo-icon demo-icon-label"></i>
        </wt-tooltip>
      </span>
      <wt-input type="text" v-model="value1" />
    </wt-form-item>
    <wt-form-item label="会员名">
      <wt-input v-model="value2" />
      <wt-tooltip placement="top" content="会员名会同步到后台系统">
        <i class="wticon-question-circle-o demo-icon"></i>
      </wt-tooltip>
    </wt-form-item>
    </wt-form>
</template>
<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
    };
  },
};
</script>

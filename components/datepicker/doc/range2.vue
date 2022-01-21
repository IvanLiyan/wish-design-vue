<template>
  <div>
    <wt-row>
      <wt-col :span="12">
        <p>精确到天</p>
        <wt-date-picker type="daterange"
          v-model="values1"
          placeholder="选择时间" style="width: 200px;"
        />
      </wt-col>
      <wt-col :span="12">
        <p>精确到时间</p>
        <wt-date-picker type="datetimerange"
          v-model="values2"
          placeholder="选择时间"
          style="width: 360px;" />
      </wt-col>
    </wt-row>
    <br />
    <wt-row>
      <wt-col :span="12">
        <p>精确到月</p>
        <wt-date-picker type="monthrange"
          v-model="values3" :split-panels="false"
          placeholder="选择时间" style="width: 240px;"
        />
      </wt-col>
      <wt-col :span="12">
        <p>精确到周</p>
        <wt-date-picker type="weekrange"
          v-model="values4" :split-panels="false"
          format="yyyy 年 WW 周"
          placeholder="选择时间" style="width: 240px;"
        />
      </wt-col>
    </wt-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      values1: [],
      values2: [],
      values3: [],
      values4: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.demo-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <wt-row>
      <wt-col :span="8">
        <p>Date 对象</p>
        <div>{{ value1 }}</div>
        <wt-date-picker type="date"
          v-model="value1"
          placeholder="选择时间" />
      </wt-col>
      <wt-col :span="8">
        <p>String 格式</p>
        <div>{{ value2 }}</div>
        <wt-date-picker type="date"
          v-model="value2"
          value-format="yyyy-MM-dd"
          placeholder="选择时间" />
      </wt-col>
      <wt-col :span="8">
        <p>时间戳格式</p>
        <div>{{ value3 }}</div>
        <wt-date-picker type="date"
          v-model="value3"
          value-format="timestamp"
          placeholder="选择时间" />
      </wt-col>
    </wt-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: null,
      value2: null,
      value3: null,
    };
  },
};
</script>

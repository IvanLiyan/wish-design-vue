<template>
  <wt-row>
    <wt-col :span="12">
      <p>value-key</p>
      <wt-select v-model="value" style="width: 200px" value-key="id">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
      </wt-select>
    </wt-col>
    <wt-col :span="12">
      <p>自定义显示</p>
      <wt-select v-model="value2" style="width: 200px" value-key="id" :formatter="formatter">
        <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
      </wt-select>
    </wt-col>
  </wt-row>
</template>
<script>
export default {
  name: 'DemoSelectBase',
  data() {
    return {
      options: [
        {
          id: 1,
          label: '李白',
          mis: 'libai',
        },
        {
          id: 2,
          label: '李贺',
          mis: 'lihe',
        },
        {
          id: 3,
          label: '杜甫',
          mis: 'dufu',
        },
        {
          id: 4,
          label: '白居易',
          mis: 'baijuyi',
        },
        {
          id: 5,
          label: '屈原',
          mis: 'quyuan',
        },
      ],
      value: { id: 2 },
      value2: { id: 2 },
    };
  },
  methods: {
    formatter({ value }) {
      return `${value.label} - ${value.mis}`;
    },
  },
};
</script>

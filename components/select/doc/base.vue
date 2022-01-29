<template>
  <div>
    <wt-select v-model="value" style="margin-right: 50px" label="国家">
      <wt-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value2" placeholder="选择国家">
      <wt-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
  </div>
</template>
<script>
export default {
  name: 'DemoSelectBase',
  data() {
    return {
      options: [
        {
          value: '中国',
          label: '中国',
        },
        {
          value: '美国',
          label: '美国',
        },
        {
          value: '日本',
          label: '日本',
          disabled: true,
        },
        {
          value: '法国',
          label: '法国',
        },
        {
          value: '俄罗斯',
          label: '俄罗斯',
        },
      ],
      value: '',
      value2: '',
    };
  },
};
</script>

<template>
  <div style="text-align: left; display: flex; align-items: baseline; justify-content: space-around">
    <wt-select v-model="value1" loading label="国家" placeholder="可多选">
      <wt-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value2" disabled label="国家" placeholder="可多选">
      <wt-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value3" :invalid="isInvalid" label="国家" placeholder="可多选">
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
      value1: '',
      value2: '美国',
      value3: '',
    };
  },
  computed: {
    isInvalid() {
      if (this.value3 !== '') {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

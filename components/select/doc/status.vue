<template>
  <div style="text-align: left; display: flex; align-items: baseline; justify-content: space-around">
    <wt-select v-model="value4">
      <wt-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value41" disabled>
      <wt-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value42" disabled>
      <wt-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </wt-select>
    <wt-select v-model="value42" invalid>
      <wt-option
        v-for="item in options4"
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
      options4: [
        {
          value: '李白',
          label: '李白',
        },
        {
          value: '李贺',
          label: '李贺',
        },
        {
          value: '杜甫',
          label: '杜甫',
          disabled: true,
        },
        {
          value: '白居易',
          label: '白居易',
        },
        {
          value: '屈原',
          label: '屈原',
        },
      ],
      value4: '',
      value41: '',
      value42: '李贺',
    };
  },
};
</script>

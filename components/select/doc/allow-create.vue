<template>
  <div>
    <wt-select v-model="value" class="select-width" :filterable="true" :allow-create="true" :clearable="true">
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
    const options = [
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
    ];
    return {
      options: options,
      value: '',
    };
  },
};
</script>

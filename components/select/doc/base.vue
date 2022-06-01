<template>
  <div class="demo-container">
    <wt-select v-model="value" style="margin-right: 50px" label="国家">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
    </wt-select>
    <wt-select v-model="value2" placeholder="选择国家">
      <wt-option v-for="item in options" :key="item.value" :value="item" :disabled="item.disabled" />
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
          value: 'China',
          label: 'China',
        },
        {
          value: 'America',
          label: 'America',
        },
        {
          value: 'Japan',
          label: 'Japan',
          disabled: true,
        },
        {
          value: 'France',
          label: 'France',
        },
        {
          value: 'Russia',
          label: 'Russia',
        },
      ],
      value: '',
      value2: '',
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>

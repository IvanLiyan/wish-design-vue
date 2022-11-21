<template>
  <div class="demo-container">
    <wt-select v-model="value" style="margin-right: 50px" label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
    </wt-select>
    <wt-select v-model="value2" placeholder="get default value" label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item" :disabled="item.disabled" />
    </wt-select>
    <wt-select v-model="value3" value-key="name" placeholder="value is object" label="Country">
      <wt-option v-for="item in options2" :key="item.name" :value="item" :label="item.label" />
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
      options2: [
        {
          name: 'China',
          label: 'China',
        },
        {
          name: 'America',
          label: 'America',
        },
        {
          name: 'Japan',
          label: 'Japan',
          disabled: true,
        },
        {
          name: 'France',
          label: 'France',
        },
        {
          name: 'Russia',
          label: 'Russia',
        },
      ],
      value: '',
      value2: '',
      value3: null,
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

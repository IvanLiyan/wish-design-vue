<template>
  <div class="demo-container">
    <wt-select v-model="value" label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
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
    };
  },
};
</script>

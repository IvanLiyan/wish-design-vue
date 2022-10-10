<template>
  <div style="text-align: left; display: flex; align-items: baseline; justify-content: space-around">
    <wt-select v-model="value1" loading label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
    </wt-select>
    <wt-select v-model="value2" disabled label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
    </wt-select>
    <wt-select v-model="value3" :invalid="isInvalid" label="Country">
      <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
    </wt-select>
  </div>
</template>
<script>
export default {
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
      value1: '',
      value2: 'America',
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

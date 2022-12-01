<template>
  <div class="demo-container">
    <wt-select v-model="value" style="margin-right: 50px">
      <wt-tooltip content="Country / Region" placement="top" slot="label">
        <div class="content">
          <span>C/R</span>
          <wt-icon name="alert-circle" color="rgb(255, 152, 1)" :width="16" :height="16" />
        </div>
      </wt-tooltip>
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

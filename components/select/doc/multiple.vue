<template>
  <div>
    <div class="type-and-use-size">
      <wt-select v-model="value" multiple label="国家">
        <wt-option v-for="item in options" :key="item.value" :value="item" :disabled="item.disabled" />
      </wt-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
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
    };
  },
};
</script>
<style lang="scss">
.group-hr {
  opacity: 0.8;
  height: 1px;
  border: none;
  background-color: #d8dde7;
  border-radius: 2px;
}
.type-and-use-size {
  font-size: 14px;
  color: #464646;
  letter-spacing: 0;
}
.type-and-use-size {
  margin: 0 20px;
  display: inline-block;
  width: 25%;
  text-align: left;
  vertical-align: top;
}
</style>

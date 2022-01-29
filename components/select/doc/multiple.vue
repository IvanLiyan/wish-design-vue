<template>
  <div>
    <div class="type-and-use-size">
      <wt-select v-model="value" multiple label="渠道">
        <wt-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
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
.type-and-use-size p {
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

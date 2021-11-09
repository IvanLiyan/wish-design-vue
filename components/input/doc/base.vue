<template>
  <div>
    <wt-input label="姓名" value="222" @input="input">
      <wt-icon name="plus" slot="prefix" />
      <span slot="suffix">RMB</span>
    </wt-input>
    <wt-input label="姓名" value="222" @input="input" invalid>
      <wt-icon name="plus" slot="suffix" />
    </wt-input>
    <wt-input label="姓名" value="222" @input="input" disabled />
    <wt-input full-width placeholder="请输入姓名" />
    <wt-input type="line" label="姓名" value="222" @input="input">
      <wt-icon name="plus" slot="prefix" />
      <wt-icon name="plus" slot="suffix" />
    </wt-input>
    <wt-input type="line" label="姓名" value="222" @input="input" invalid />
    <wt-input type="line" label="姓名" value="222" @input="input" disabled />
    <wt-input type="line" full-width placeholder="请输入姓名" />
  </div>
</template>

<script>
export default {
  methods: {
    input: function (val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.wt-input-wrapper {
  margin-bottom: 20px;
}
</style>

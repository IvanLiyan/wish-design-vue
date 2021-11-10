<template>
  <div>
    <div class="demo-input-group">
      <wt-input label="姓名" value="222" @input="input">
        <wt-icon name="user" slot="prefix" />
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input label="姓名" value="222" @input="input" invalid>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input label="姓名" value="222" @input="input" disabled />
      <wt-input full-width placeholder="请输入姓名" />
      <wt-input type="line" label="姓名" value="222" @input="input">
        <span slot="prefix">RMB</span>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input type="line" label="姓名" value="222" @input="input" invalid validation="请输入正确的姓名" />
      <wt-input type="line" label="姓名" value="222" @input="input" disabled />
      <wt-input type="line" full-width placeholder="请输入姓名" />
    </div>
    <div class="demo-input-group">
      <wt-input label="多行输入标题" type="textarea" placeholder="请输入姓名" autosize />
      <wt-input label="多行输入标题" type="textarea" disabled placeholder="请输入姓名" />
      <wt-input type="textarea" placeholder="请输入姓名" invalid validation="请输入正确的姓名" />
    </div>
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

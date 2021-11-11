<template>
  <div>
    <h3>Normal</h3>
    <div class="demo-input-group">
      <wt-input label="联系人" placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="联系人" disabled placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="联系人" invalid validation="请输入正确的内容" placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入" />
      <wt-input disabled placeholder="请输入" />
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" />
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input disabled placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input disabled placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" label="联系人" placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="联系人" disabled placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="联系人" invalid validation="请输入正确的内容" placeholder="请输入">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入" />
      <wt-input type="line" disabled placeholder="请输入" />
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" />
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入">
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="textarea" placeholder="请输入" />
      <wt-input type="textarea" disabled placeholder="请输入" />
      <wt-input type="textarea" invalid placeholder="请输入" validation="请输入正确的内容" />
    </div>

    <h3>允许autosize</h3>
    <div class="demo-input-group">
      <wt-input type="textarea" placeholder="请输入" autosize />
      <wt-input type="textarea" disabled placeholder="请输入" autosize />
      <wt-input type="textarea" invalid placeholder="请输入" validation="请输入正确的内容" autosize />
    </div>

    <h3>允许clearable</h3>
    <div class="demo-input-group">
      <wt-input label="联系人" placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="联系人" disabled placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="联系人" invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入" clearable />
      <wt-input disabled placeholder="请输入" clearable />
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" clearable />
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input disabled placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input disabled placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" label="联系人" placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="联系人" disabled placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="联系人" invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入" clearable />
      <wt-input type="line" disabled placeholder="请输入" clearable />
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" clearable />
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="line" placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input type="textarea" placeholder="请输入" clearable autosize />
      <wt-input type="textarea" disabled placeholder="请输入" clearable autosize />
      <wt-input type="textarea" invalid placeholder="请输入" validation="请输入正确的内容" clearable autosize />
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

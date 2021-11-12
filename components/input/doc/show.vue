<template>
  <div>
    <h3>Normal</h3>
    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input placeholder="请输入" />
      <wt-input disabled placeholder="请输入" />
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" />
    </div>

    <div class="demo-input-container">
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

    <div class="demo-input-container">
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

    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input type="line" placeholder="请输入" />
      <wt-input type="line" disabled placeholder="请输入" />
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" />
    </div>

    <div class="demo-input-container">
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

    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="请输入" />
      <wt-input type="textarea" disabled placeholder="请输入" />
      <wt-input type="textarea" invalid placeholder="请输入" validation="请输入正确的内容" />
    </div>

    <h3>允许autosize</h3>
    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="请输入" autosize />
      <wt-input type="textarea" disabled placeholder="请输入" autosize />
      <wt-input type="textarea" invalid placeholder="请输入" validation="请输入正确的内容" autosize />
    </div>

    <h3>允许clearable</h3>
    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input placeholder="请输入" clearable />
      <wt-input disabled placeholder="请输入" clearable />
      <wt-input invalid validation="请输入正确的内容" placeholder="请输入" clearable />
    </div>

    <div class="demo-input-container">
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

    <div class="demo-input-container">
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

    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input type="line" placeholder="请输入" clearable />
      <wt-input type="line" disabled placeholder="请输入" clearable />
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" clearable />
    </div>

    <div class="demo-input-container">
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

    <div class="demo-input-container">
      <wt-input type="line" placeholder="请输入" clearable @focus="focus" @enter="enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" invalid validation="请输入正确的内容" placeholder="请输入" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="请输入" clearable autosize />
      <wt-input type="textarea" disabled placeholder="请输入" clearable autosize />
      <wt-input
        type="textarea"
        invalid
        placeholder="请输入"
        validation="请输入正确的内容"
        clearable
        :autosize="{ minRows: 4, maxRows: 10 }"
      />
    </div>

    <h3>事件反馈，请打开控制台查看</h3>
    <h3>input、change、focus事件</h3>
    <div class="demo-input-container">
      <wt-input
        type="textarea"
        placeholder="请输入"
        clearable
        autosize
        @change="handleChange"
        @input="input"
        @focus="focus"
        :value="inputData"
      />
    </div>
    <h6>双向绑定</h6>
    <div class="demo-input-container">
      <wt-input
        type="textarea"
        invalid
        placeholder="请输入"
        validation="请输入正确的内容"
        clearable
        :autosize="{ minRows: 4, maxRows: 10 }"
        @change="handleChange"
        @input="input"
        @focus="focus"
        v-model="inputData"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: '初始化value',
    };
  },
  methods: {
    input: function (val) {
      console.log('input val', val);
    },
    handleChange: function (val) {
      console.log('change val', val);
    },
    focus: function (val) {
      console.log('focus val', val.target.value);
    },
    enter: function (e) {
      console.log('enter val', e.target.value);
    },
  },
};
</script>

<style scoped>
.wt-input-wrapper {
  margin-bottom: 20px;
}
</style>

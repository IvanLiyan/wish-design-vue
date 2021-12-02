<template>
  <div>
    <h3>Normal</h3>
    <div class="demo-input-container">
      <wt-input label="contactor" placeholder="please enter">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="contactor" disabled placeholder="please enter">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="contactor" invalid validation="please enter the right content" placeholder="please enter">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter" />
      <wt-input disabled placeholder="please enter" />
      <wt-input invalid validation="please enter the right content" placeholder="please enter" />
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input disabled placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input invalid validation="please enter the right content" placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input disabled placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input invalid validation="please enter the right content" placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" label="contactor" placeholder="please enter">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="contactor" disabled placeholder="please enter">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input
        type="line"
        label="contactor"
        invalid
        validation="please enter the right content"
        placeholder="please enter"
      >
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter" />
      <wt-input type="line" disabled placeholder="please enter" />
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter" />
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter">
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="please enter" />
      <wt-input type="textarea" disabled placeholder="please enter" />
      <wt-input type="textarea" invalid placeholder="please enter" validation="please enter the right content" />
    </div>

    <h3>允许autosize</h3>
    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="please enter" autosize />
      <wt-input type="textarea" disabled placeholder="please enter" autosize />
      <wt-input
        type="textarea"
        invalid
        placeholder="please enter"
        validation="please enter the right content"
        autosize
      />
    </div>

    <h3>允许clearable</h3>
    <div class="demo-input-container">
      <wt-input label="contactor" placeholder="please enter" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input label="contactor" disabled placeholder="please enter" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input
        label="contactor"
        invalid
        validation="please enter the right content"
        placeholder="please enter"
        clearable
      >
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter" clearable />
      <wt-input disabled placeholder="please enter" clearable />
      <wt-input invalid validation="please enter the right content" placeholder="please enter" clearable />
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input disabled placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input invalid validation="please enter the right content" placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input placeholder="please enter" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input disabled placeholder="please enter" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input invalid validation="please enter the right content" placeholder="please enter" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" label="contactor" placeholder="please enter" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" label="contactor" disabled placeholder="please enter" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input
        type="line"
        label="contactor"
        invalid
        validation="please enter the right content"
        placeholder="please enter"
        clearable
      >
        <wt-icon name="user" slot="prefix" />
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter" clearable />
      <wt-input type="line" disabled placeholder="please enter" clearable />
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter" clearable />
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter" clearable>
        <span slot="prefix">¥</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="line" placeholder="please enter" clearable @focus="focus" @enter="enter">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" disabled placeholder="please enter" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" invalid validation="please enter the right content" placeholder="please enter" clearable>
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-container">
      <wt-input type="textarea" placeholder="please enter" clearable autosize />
      <wt-input type="textarea" disabled placeholder="please enter" clearable autosize />
      <wt-input
        type="textarea"
        invalid
        placeholder="please enter"
        validation="please enter the right content"
        clearable
        :autosize="{ minRows: 4, maxRows: 10 }"
      />
    </div>

    <h3>事件反馈，请打开控制台查看</h3>
    <h3>input、change、focus事件</h3>
    <div class="demo-input-container">
      <wt-input
        placeholder="please enter"
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
        placeholder="please enter"
        validation="please enter the right content"
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
      inputData: 'initial val',
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

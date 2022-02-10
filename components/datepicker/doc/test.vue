<template>
  <div class="demo-picker-wrapper">
    <div class="demo-picker-group">
      <p>自定义日期格式yyyy/MM/dd</p>
      <wt-date-picker
        type="date"
        v-model="value1"
        format="yyyy/MM/dd"
      />
      <br />
      <p>只读</p>
      <wt-date-picker
        type="date"
        v-model="value2"
        :readonly="true"
      />
      <br />
      <p>禁用</p>
      <wt-date-picker
        type="date"
        v-model="value3"
        :disabled="true"
      />
      <br />
      <p>多选日期</p>
      <wt-date-picker
        type="date"
        v-model="value4"
        :multiple="true"
      />
      <br />
      <p>面板弹出方向——top</p>
      <wt-date-picker
        type="date"
        v-model="value5"
        placement="top"
      />
      <br />
      <p>面板弹出方向——top-start</p>
      <wt-date-picker
        type="date"
        v-model="value6"
        placement="top-start"
      />
      <br />
      <p>面板弹出方向——top-end</p>
      <wt-date-picker
        type="date"
        v-model="value7"
        placement="top-end"
      />
      <br />
      <p>面板弹出方向——bottom</p>
      <wt-date-picker
        type="date"
        v-model="value8"
        placement="bottom"
      />
      <br />
      <p>面板弹出方向——bottom-end</p>
      <wt-date-picker
        type="date"
        v-model="value9"
        placement="bottom-end"
      />
      <br />
      <p>面板弹出方向——left</p>
      <wt-date-picker
        type="date"
        v-model="value10"
        placement="left"
      />
      <br />
      <p>面板弹出方向——left-start</p>
      <wt-date-picker
        type="date"
        v-model="value11"
        placement="left-start"
      />
      <br />
      <p>面板弹出方向——left-end</p>
      <wt-date-picker
        type="date"
        v-model="value12"
        placement="left-end"
      />
      <br />
      <p>面板弹出方向——right</p>
      <wt-date-picker
        type="date"
        v-model="value13"
        placement="right"
      />
      <br />
      <p>面板弹出方向——right-start</p>
      <wt-date-picker
        type="date"
        v-model="value14"
        placement="right-start"
      />
      <br />
      <p>面板弹出方向——right-end</p>
      <wt-date-picker
        type="date"
        v-model="value15"
        placement="right-end"
      />
      <br />
      <p>输入框的name属性</p>
      <wt-date-picker
        type="date"
        v-model="value16"
        name="test-name"
      />
      <br />
      <p>当前选中的值</p>
      <wt-date-picker
        type="date"
        v-model="value17"
        value="2022-02-02"
      />
      <br />
      <p>下拉框的类名</p>
      <wt-date-picker
        type="date"
        v-model="value18"
        popper-class="test-popper-class"
      />
      <br />
      <p>周起始日期——周三起始</p>
      <wt-date-picker
        type="date"
        v-model="value19"
        :week-start="3"
      />
      <br />
      <p>(事件)面板显示隐藏时触发</p>
      <wt-date-picker
        type="date"
        v-model="value20"
        @update:open="panelChange"
      />
      <br />
      <p>value发生改变时触发</p>
      <wt-date-picker
        type="date"
        v-model="value21"
        @input="input"
      />
      <br />
      <p>日期段模式选择时间触发</p>
      <wt-date-picker
        type="daterange"
        v-model="value22"
        @pick-range="pickRange"
      />
      <br />
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      value18: '',
      value19: '',
      value20: '',
      value21: '',
      value22: '',
    };
  },
  methods: {
    panelChange (e) {
      if (e === true) {
        console.log('打开了面板');
      } else {
        console.log('关闭了面板');
      }
    },
    input (e) {
      console.log('value变成了:', e);
    },
    pickRange (e) {
      console.log('from', e.from);
      console.log('selecting', e.selecting);
      console.log('to', e.to);
    },
  },
};
</script>

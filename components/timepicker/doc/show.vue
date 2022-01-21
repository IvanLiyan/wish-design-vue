<template>
  <div class="demo-picker-group">
    <span>显示类型-time</span>
    <div>
      <wt-time-picker type="time"
        v-model="value1"
      />
    </div>
    <span>显示类型-timerange</span>
    <div>
      <wt-time-picker
        v-model="value2"
        type="timerange"
      />
    </div>
    <span>是否只读-true</span>
    <div>
      <wt-time-picker type="time"
        v-model="value3"
        :readonly="true"
      />
    </div>
    <span>是否禁用-true</span>
    <div>
      <wt-time-picker type="time"
        v-model="value4"
        :disabled="true"
      />
    </div>
    <span>占位内容-time</span>
    <div>
      <wt-time-picker type="time"
        v-model="value5"
        placeholder="Time Placeholder"
      />
    </div>
    <span>占位内容-timerange</span>
    <div>
      <wt-time-picker type="timerange"
        v-model="value6"
        placeholder="Time Range Placeholder"
      />
    </div>
    <span>面板弹出方向-top</span>
    <div>
      <wt-time-picker type="time"
        v-model="value7"
        placement="top"
      />
    </div>
    <span>面板弹出方向-top-start</span>
    <div>
      <wt-time-picker type="time"
        v-model="value8"
        placement="top-start"
      />
    </div>
    <span>面板弹出方向-top-end</span>
    <div>
      <wt-time-picker type="time"
        v-model="value9"
        placement="top-end"
      />
    </div>
    <span>面板弹出方向-bottom</span>
    <div>
      <wt-time-picker type="time"
        v-model="value10"
        placement="bottom"
      />
    </div>
    <span>面板弹出方向-bottom-end</span>
    <div>
      <wt-time-picker type="time"
        v-model="value11"
        placement="bottom-end"
      />
    </div>
    <span>面板弹出方向-left</span>
    <div>
      <wt-time-picker type="time"
        v-model="value12"
        placement="left"
      />
    </div>
    <span>面板弹出方向-left-start</span>
    <div>
      <wt-time-picker type="time"
        v-model="value13"
        placement="left-start"
      />
    </div>
    <span>面板弹出方向-left-end</span>
    <div>
      <wt-time-picker type="time"
        v-model="value14"
        placement="left-end"
      />
    </div>
    <span>面板弹出方向-right</span>
    <div>
      <wt-time-picker type="time"
        v-model="value15"
        placement="right"
      />
    </div>
    <span>面板弹出方向-right-start</span>
    <div>
      <wt-time-picker type="time"
        v-model="value16"
        placement="right-start"
      />
    </div>
    <span>面板弹出方向-right-end</span>
    <div>
      <wt-time-picker type="time"
        v-model="value17"
        placement="right-end"
      />
    </div>
    <span>输入框的name-testName</span>
    <div>
      <wt-time-picker type="time"
        v-model="value18"
        name="testName"
      />
    </div>
    <span>当前选中的值-时间选择</span>
    <div>
      <wt-time-picker type="time"
        value="11:30:45"
      />
    </div>
    <span>当前选中的值-时间段选择</span>
    <div>
      <wt-time-picker type="timerange"
        :value="['9:00:00', '18:00:00']"
      />
    </div>
    <span>禁用小时-[2, 4, 6]</span>
    <div>
      <wt-time-picker type="time"
        v-model="value19"
        :disabled-hours="[2, 4, 6]"
      />
    </div>
    <span>禁用分钟-[0, 15, 30, 45]</span>
    <div>
      <wt-time-picker type="time"
        v-model="value20"
        :disabled-minutes="[0, 15, 30, 45]"
      />
    </div>
    <span>禁用秒-[0, 20, 40]</span>
    <div>
      <wt-time-picker type="time"
        v-model="value21"
        :disabled-seconds="[0, 20, 40]"
      />
    </div>
    <span>下拉框类名-test-popper-class</span>
    <div>
      <wt-time-picker type="time"
        v-model="value22"
        popper-class="test-popper-class"
      />
    </div>
    <span>面板状态改变时触发事件(看控制台)</span>
    <div>
      <wt-time-picker type="time"
        v-model="value23"
        @update:open="changePanel"
      />
    </div>
    <span>value改变时触发事件(看控制台)</span>
    <div>
      <wt-time-picker type="time"
        v-model="value24"
        @input="changeValue"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: new Date(),
      value4: new Date(),
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
      value23: '',
      value24: '',
      value25: '',
    };
  },
  methods: {
    changePanel (e) {
      if (e === true) {
        console.log('show panel');
      } else {
        console.log('hide panel');
      }
    },
    changeValue (e) {
      console.log('select time', e);
    },
  },
};
</script>

<template>
  <div>
    <h6>Please open console panel check the radio trigger event response</h6>
    <div class="demo-container">
      <wt-radio value="item1" @change="handleRadio" :checked="checked">item content </wt-radio>{{ checked }}
    </div>

    <h6>Please open console panel check the radio group trigger event response</h6>

    <div class="demo-container">
      <wt-radio-group v-model="groupRadioValue" arrange="vertical" @change="handleGroupRadio">
        <wt-radio value="item1">item content</wt-radio>
        <wt-radio value="item2">item content</wt-radio>
        <wt-radio value="item3">item content</wt-radio>
        <wt-radio value="item4">item content</wt-radio>
      </wt-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groupRadioValue: 'item1',
      checked: false,
    };
  },
  methods: {
    handleRadio: function (val) {
      console.log('handleRadio', val);
      this.checked = val;
    },
    handleGroupRadio: function (val) {
      console.log('handleGroupRadio', val);
    },
  },
};
</script>

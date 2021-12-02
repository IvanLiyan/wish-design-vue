<template>
  <div>
    <h6>Checkbox-group disabled</h6>
    <div class="demo-container">
      <wt-checkbox-group v-model="groupValue1" disabled>
        <wt-checkbox value="1">option</wt-checkbox>
        <wt-checkbox value="2">option</wt-checkbox>
        <wt-checkbox value="3">option</wt-checkbox>
      </wt-checkbox-group>
    </div>

    <h6>Please open console panel check the trigger event response</h6>
    <div class="demo-container">
      <wt-checkbox v-model="checkedValue" @change="handleCheck">item content</wt-checkbox>
    </div>

    <div class="demo-container">
      <wt-checkbox-group v-model="groupValue2" @change="handleGroupCheck">
        <wt-checkbox value="1">option</wt-checkbox>
        <wt-checkbox value="2">option</wt-checkbox>
        <wt-checkbox value="3">option</wt-checkbox>
      </wt-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedValue: true,
      groupValue1: ['1', '2'],
      groupValue2: ['1'],
    };
  },
  methods: {
    handleCheck: function (val) {
      console.log('handleCheck', val);
    },
    handleGroupCheck: function (val) {
      console.log('handleGroupCheck', val);
    },
  },
};
</script>

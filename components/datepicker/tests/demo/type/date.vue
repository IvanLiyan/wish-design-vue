<template>
  <wt-date-picker type="date"
    v-model="value"
    :open.sync="open"
    :start-date="startDate"
    placeholder="选择时间"
  />
</template>
<script>
import { triggerClick, waitImmediate } from '@test/util';

export default {
  data () {
    return {
      value: undefined,
      open: false,
      startDate: new Date(2019, 11, 30),
    };
  },
  methods: {
    async doTest (done) {
      this.open = true;
      await waitImmediate();
      const pickerEl = document.querySelector('.wt-picker-panel-body-wrapper');
      expect(pickerEl).to.be.not.undefined();

      // 2019-12-27
      const cellEl = pickerEl.querySelector('.wt-date-picker-cells-cell:nth-child(4)');
      expect(cellEl).to.be.not.undefined();
      triggerClick(cellEl, true, true);
      await waitImmediate();
      expect(this.value.getTime()).to.be.eql(1574784000000);
      done();
    },
  },
};
</script>

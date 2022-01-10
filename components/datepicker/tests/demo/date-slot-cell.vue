<template>
  <div>
    <div class="demo-picker-group">
      <p>日期选择框</p>
      <wt-date-picker type="date"
        v-model="value1"
        placeholder="选择日期"
      >
      <span slot-scope="scope" slot="cell" class="demo-date-cell-slot">
        {{ scope.cell.desc }}
      </span>
      </wt-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: new Date(),
    };
  },
  methods: {
    doTest (done) {
      const el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-date-cell-slot');
      expect(el).to.be.not.undefined();
      done();
    },
  },
};
</script>

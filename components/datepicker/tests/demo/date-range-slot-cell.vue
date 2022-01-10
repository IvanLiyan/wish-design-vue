<template>
  <div>
    <div class="demo-picker-group">
      <p>选择日期段</p>
      <wt-date-picker type="daterange"
        v-model="value1"
        placeholder="选择日期段"
      >
      <span slot-scope="scope" slot="cell" class="demo-date-range-cell-slot">
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
      value1: [],
    };
  },
  methods: {
    doTest (done) {
      const el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-date-range-cell-slot');
      expect(el).to.be.not.undefined();
      done();
    },
  },
};
</script>

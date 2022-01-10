<template>
  <div>
    <div class="demo-picker-group">
      <p>按周选择</p>
      <wt-date-picker type="week"
        v-model="value1"
        placeholder="选择一周"
      >
      <span slot-scope="scope" slot="cell" class="demo-week-cell-slot">
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
      value1: null,
    };
  },
  methods: {
    doTest (done) {
      const el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-week-cell-slot');
      expect(el).to.be.not.undefined();
      done();
    },
  },
};
</script>

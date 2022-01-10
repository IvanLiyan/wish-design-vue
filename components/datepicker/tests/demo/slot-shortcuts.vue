<template>
  <div>
    <div class="demo-picker-group">
      <p>日期选择框</p>
      <wt-date-picker type="date"
        v-model="value1"
        placeholder="选择时间"
      >
        <div slot="shortcuts" class="demo-shortcuts-slot">
          hello world
        </div>
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
      const el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-shortcuts-slot');
      expect(el).to.be.not.undefined();
      done();
    },
  },
};
</script>

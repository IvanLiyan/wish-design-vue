<template>
  <wt-date-picker type="daterange"
    v-model="value"
    placeholder="选择时间"
    @change="handleInput"
  />
</template>
<script>
import { waitImmediate } from '@test/util';

export default {
  data () {
    return {
      value: undefined,
      handleInput () {},
    };
  },
  methods: {
    async doTest (done) {
      this.handleInput = sinon.spy();
      await waitImmediate();
      this.value = [];
      await waitImmediate();
      this.handleInput.should.have.been.not.called('set []');
      this.value = [new Date(), new Date()];
      await waitImmediate();
      this.handleInput.should.have.been.not.called('set Date[]');
      this.value = null;
      await waitImmediate();
      this.handleInput.should.have.been.not.called('set null');
      done();
    },
  },
};
</script>

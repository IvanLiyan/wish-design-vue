<template>
  <wt-select v-model="value" ref="select">
    <wt-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label" />
  </wt-select>
</template>
<script>
import MtdSelect from '@components/select';
import MtdOption from '@components/option';
import { triggerClick, waitImmediate } from '@test/util';

export default {
  components: {
    MtdSelect,
    MtdOption,
  },
  data() {
    return {
      value: null,
      options: [
        {
          label: 'true',
          value: true,
        },
        {
          label: 'false',
          value: false,
        },
      ],
    };
  },
  methods: {
    async doTest(done) {
      this.$refs.select.focus();
      await waitImmediate();
      const select = this.$refs.select.$refs.wrappedInstance;
      const options = select.options;

      triggerClick(options[0].$el);
      await waitImmediate();
      expect(this.value).to.be.eql(this.options[0].value);
      expect(select.showValue).to.be.eql(this.options[0].label);

      this.$refs.select.focus();
      await waitImmediate();
      triggerClick(options[1].$el);
      await waitImmediate();
      expect(this.value).to.be.eql(this.options[1].value);
      expect(select.showValue).to.be.eql(this.options[1].label);

      done();
    },
  },
};
</script>

<template>
  <wt-select v-model="value" ref="select" :multiple="multiple">
    <wt-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label" />
  </wt-select>
</template>
<script>
import MtdSelect from '@components/select';
import MtdOption from '@components/option';
import { triggerClick, waitImmediate, findVM } from '@test/util';

export default {
  components: {
    MtdSelect,
    MtdOption,
  },
  data() {
    return {
      value: null,
      multiple: true,
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    };
  },
  methods: {
    async doTest(done) {
      this.$refs.select.focus();
      await waitImmediate();
      const select = findVM(this.$refs.select, {
        name: 'Select',
      });
      const { options } = select;
      triggerClick(options[0].$el);
      await waitImmediate();
      expect(this.value).to.be.eql([this.options[0].value]);
      const tags = select.$el.querySelector('.wt-select-tags');
      expect(tags.innerText).to.be.eql(this.options[0].label);

      this.value = undefined;
      this.$refs.select.focus();
      await waitImmediate();
      triggerClick(options[1].$el);
      await waitImmediate();
      expect(this.value).to.be.eql([this.options[1].value]);
      expect(tags.innerText).to.be.eql(this.options[1].label);
      done();
    },
  },
};
</script>

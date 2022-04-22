<template>
  <wt-select v-model="value" multiple expansion-tags :closable="false" ref="select">
    <wt-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </wt-select>
</template>

<script>
import { triggerClick, waitImmediate } from '@test/util';

export default {
  name: 'MultipleNullSelect',
  data() {
    return {
      value: null,
      options: [
        {
          value: '李白',
          label: '李白',
        },
        {
          value: '李贺',
          label: '李贺',
        },
        {
          value: '杜甫',
          label: '杜甫',
          disabled: true,
        },
        {
          value: '白居易',
          label: '白居易',
        },
        {
          value: '屈原',
          label: '屈原',
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
      expect(this.value).to.be.eql([this.options[0].value]);
      done();
    },
  },
};
</script>

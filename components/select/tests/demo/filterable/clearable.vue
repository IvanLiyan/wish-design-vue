<template>
  <wt-select v-model="value" style="width: 200px" filterable clearable ref="select">
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
import {
  setInputValue,
  // triggerEvent,
  triggerClick,
  waitImmediate,
} from '@test/util';

export default {
  data() {
    return {
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
      value: '',
    };
  },
  methods: {
    async doTest(done) {
      this.$refs.select.focus();
      await waitImmediate();
      const input = this.$el.querySelector('input');
      setInputValue(input, '李白');
      await waitImmediate();
      const select = this.$refs.select.$refs.wrappedInstance;
      expect(select.query).to.be.equal('李白');
      const options = select.options;
      const filteredOptions = options.filter((opt) => opt.visible);
      expect(filteredOptions.length).to.be.equal(1);

      triggerClick(filteredOptions[0].$el);
      await waitImmediate();
      expect(this.value).to.be.equal('李白');

      select.$refs.reference.hovering = true;
      await waitImmediate();
      const clearIcon = this.$el.querySelector('.wt-input-suffix-inner .wt-input-clear');
      expect(clearIcon).to.be.ok();
      triggerClick(clearIcon);
      await waitImmediate();

      this.$refs.select.focus();
      await waitImmediate();

      expect(this.value).to.be.equal('');
      const filteredOptions2 = options.filter((opt) => opt.visible);
      expect(filteredOptions2.length).to.be.equal(this.options.length);

      done();
    },
  },
};
</script>

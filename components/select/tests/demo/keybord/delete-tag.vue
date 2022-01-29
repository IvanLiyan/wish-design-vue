<template>
  <wt-select multiple v-model="value" :filterable="true" ref="select">
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
import { triggerKeyUp, triggerKeyDown, waitImmediate } from '@test/util';

function triggerKey(el, keyCode) {
  triggerKeyDown(el, keyCode);
  triggerKeyUp(el, keyCode);
}
export default {
  data() {
    const options = [
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
    ];
    return {
      options: options,
      value: ['李白'],
    };
  },
  methods: {
    async doTest() {
      await waitImmediate();
      const tags = this.$el.querySelectorAll('.wt-select-choice');
      expect(tags.length).to.be.eql(1);
      const input = this.$el.querySelector('.wt-select-search-field');
      // focus 在最后一个 tag 上
      triggerKey(input, 8); // delete
      await waitImmediate();
      const last = tags[0];
      expect(!!last.querySelector('.focus')).to.be.true();
      // 删除最后一个 tag 的值
      triggerKey(input, 8); // delete
      await waitImmediate();
      expect(this.value).to.be.eql([], 'should remove last tag');
    },
  },
};
</script>

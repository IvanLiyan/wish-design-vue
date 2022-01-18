<template>
  <wt-select v-model="value" :filterable="true" allow-create ref="select" @change="handleChange">
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
import Select from '../../../select';
import { setInputValue, triggerEvent, waitImmediate, triggerClick } from '@test/util';

export default {
  name: 'SelectAllowCreate',
  components: {
    MtdSelect: Select,
  },
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
      value: '',
      handleChange() {},
    };
  },
  methods: {
    async doTest(done) {
      this.handleChange = sinon.spy();
      await waitImmediate();

      const query = '李明';
      const select = this.$refs.select;
      // 打开面板
      triggerEvent(this.$el, 'click');
      await waitImmediate();
      expect(select.opened).to.be.true();
      const input = this.$el.querySelector('input');
      // 搜索
      setInputValue(input, query);
      await waitImmediate();
      const options = [...document.body.querySelectorAll('.wt-select-dropdown .wt-dropdown-menu-item')].filter(
        (option) => option.style.display !== 'none',
      );
      const texts = options.map((option) => option.innerText);
      expect(texts).to.include(query);
      expect(select.isNoMatched).to.be.false();

      const matchOption = options.find((option) => option.innerText === query);
      triggerClick(matchOption);
      await waitImmediate();
      expect(this.value).to.be.eql(query);
      expect(this.handleChange.calledOnce).to.be.true();
      done();
    },
  },
};
</script>

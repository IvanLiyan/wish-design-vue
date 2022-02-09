<template>
  <wt-select
    v-model="value"
    :loading="loading"
    :filterable="true"
    :remote="true"
    auto-clear-query
    :remote-method="remoteMethod"
    ref="select"
  >
    <wt-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </wt-select>
</template>
<script>
import Select from '../../select';
export default {
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
      loading: false,
      value: undefined,
      data: options,
      options: options,
    };
  },
  methods: {
    remoteMethod(query) {
      clearTimeout(this.remoteTimer);
      this.loading = true;
      this.remoteTimer = setTimeout(() => {
        this.options = this.data.filter((item) => {
          return item.label.toLowerCase().indexOf(query && query.toLowerCase()) > -1;
        });
        this.loading = false;
      }, 100);
    },
    doTest(done, { triggerEvent }) {
      const select = this.$el;
      triggerEvent(select, 'click');
      expect(this.$refs.select.opened, 'should opend dropdown when query is empty and option has length').to.be.true();

      // reset opened
      this.$refs.select.focused = false;
      expect(this.$refs.select.opened, 'reset opened').to.be.false();

      this.options = [];
      this.$nextTick(() => {
        triggerEvent(select, 'click');
        expect(this.$refs.select.opened, 'should hide dropdown when query is empty').to.be.false();
        done();
      });
    },
  },
};
</script>

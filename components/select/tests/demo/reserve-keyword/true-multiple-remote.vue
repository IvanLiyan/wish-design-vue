<template>
  <wt-select
    v-model="value"
    :loading="loading"
    :filterable="true"
    :remote="true"
    :remote-method="remoteMethod"
    multiple
    :reserve-keyword="reserveKeyword"
    ref="select"
  >
    <wt-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </wt-select>
</template>
<script>
import Select from '../../../select';

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
      options2: options,
      value: '',
      loading: false,
      reserveKeyword: true,
    };
  },
  methods: {
    remoteMethod(query) {
      clearTimeout(this.remoteTimer);
      if (query) {
        this.loading = true;
        this.remoteTimer = setTimeout(() => {
          this.options2 = this.options.filter((item) => {
            return item.label.toLowerCase().indexOf(query && query.toLowerCase()) > -1;
          });
          this.loading = false;
        }, 100);
      } else {
        this.options2 = this.options;
      }
    },
    doTest(done, { setInputValue, triggerEvent }) {
      const select = this.$refs.select;
      triggerEvent(this.$el, 'click');
      this.$nextTick(() => {
        expect(select.opened).to.be.true();
        const input = this.$el.querySelector('input');
        setInputValue(input, '李');
        setTimeout(() => {
          // wait remote method end
          const option = document.body.querySelector('.wt-select-dropdown .wt-dropdown-menu-item');
          triggerEvent(option, 'click');
          expect(this.value).to.be.eql(['李白']);
          this.$nextTick(() => {
            expect(input.value, 'should reserve query').to.be.eql('李');
            done();
          });
        }, 300);
      });
    },
  },
};
</script>

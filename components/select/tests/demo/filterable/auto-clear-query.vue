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
import Select from '../../../select';
// import sinon from 'sinon';

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
      remoteMethod: function () {},
    };
  },
  methods: {
    doTest(done, { triggerEvent, setInputValue }) {
      this.remoteMethod = sinon.spy();
      this.$nextTick(() => {
        triggerEvent(this.$el, 'click');
        expect(this.$refs.select.opened, 'should opend dropdown').to.be.true();

        const input = this.$el.querySelector('input');
        setInputValue(input, 'something');
        // expect(this.remoteMethod.calledOnce).to.be.true();
        this.remoteMethod.should.have.been.calledOnce();

        setInputValue(input, '');
        // expect(this.remoteMethod.calledOnce).to.be.true();
        this.remoteMethod.should.have.been.calledTwice();
        done();
      });
    },
  },
};
</script>

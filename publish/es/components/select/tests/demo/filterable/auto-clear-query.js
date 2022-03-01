import Select from '../../../select';
// import sinon from 'sinon';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "loading": _vm.loading, "filterable": true, "remote": true, "auto-clear-query": "", "remote-method": _vm.remoteMethod }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.value, attrs: { "label": item.label, "value": item.value } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  components: {
    MtdSelect: Select
  },
  data: function data() {
    var options = [{
      value: '李白',
      label: '李白'
    }, {
      value: '李贺',
      label: '李贺'
    }, {
      value: '杜甫',
      label: '杜甫'
    }, {
      value: '白居易',
      label: '白居易'
    }, {
      value: '屈原',
      label: '屈原'
    }];
    return {
      loading: false,
      value: undefined,
      data: options,
      options: options,
      remoteMethod: function remoteMethod() {}
    };
  },

  methods: {
    doTest: function doTest(done, _ref) {
      var _this = this;

      var triggerEvent = _ref.triggerEvent,
          setInputValue = _ref.setInputValue;

      this.remoteMethod = sinon.spy();
      this.$nextTick(function () {
        triggerEvent(_this.$el, 'click');
        expect(_this.$refs.select.opened, 'should opend dropdown').to.be.true();

        var input = _this.$el.querySelector('input');
        setInputValue(input, 'something');
        // expect(this.remoteMethod.calledOnce).to.be.true();
        _this.remoteMethod.should.have.been.calledOnce();

        setInputValue(input, '');
        // expect(this.remoteMethod.calledOnce).to.be.true();
        _this.remoteMethod.should.have.been.calledTwice();
        done();
      });
    }
  }
};
import Select from '../../select';
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
      options: options
    };
  },

  methods: {
    remoteMethod: function remoteMethod(query) {
      var _this = this;

      clearTimeout(this.remoteTimer);
      this.loading = true;
      this.remoteTimer = setTimeout(function () {
        _this.options = _this.data.filter(function (item) {
          return item.label.toLowerCase().indexOf(query && query.toLowerCase()) > -1;
        });
        _this.loading = false;
      }, 100);
    },
    doTest: function doTest(done, _ref) {
      var _this2 = this;

      var triggerEvent = _ref.triggerEvent;

      var select = this.$el;
      triggerEvent(select, 'click');
      expect(this.$refs.select.opened, 'should opend dropdown when query is empty and option has length').to.be.true();

      // reset opened
      this.$refs.select.focused = false;
      expect(this.$refs.select.opened, 'reset opened').to.be.false();

      this.options = [];
      this.$nextTick(function () {
        triggerEvent(select, 'click');
        expect(_this2.$refs.select.opened, 'should hide dropdown when query is empty').to.be.false();
        done();
      });
    }
  }
};
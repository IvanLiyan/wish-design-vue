import Select from '../../../select';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "filterable": true, "multiple": "", "reserve-keyword": _vm.reserveKeyword }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.value, attrs: { "label": item.label, "value": item.value, "disabled": item.disabled } });
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
    return {
      options: [{
        value: '李白',
        label: '李白'
      }, {
        value: '李贺',
        label: '李贺'
      }, {
        value: '杜甫',
        label: '杜甫',
        disabled: true
      }, {
        value: '白居易',
        label: '白居易'
      }, {
        value: '屈原',
        label: '屈原'
      }],
      value: '',
      reserveKeyword: false
    };
  },

  methods: {
    doTest: function doTest(done, _ref) {
      var _this = this;

      var setInputValue = _ref.setInputValue,
          triggerEvent = _ref.triggerEvent;

      var select = this.$refs.select;
      triggerEvent(this.$el, 'click');
      this.$nextTick(function () {
        expect(select.opened).to.be.true();
        var input = _this.$el.querySelector('input');
        setInputValue(input, '李');
        setTimeout(function () {
          // wait remote method end
          var option = document.body.querySelector('.wt-select-dropdown .wt-dropdown-menu-item');
          triggerEvent(option, 'click');
          expect(_this.value).to.be.eql(['李白']);
          _this.$nextTick(function () {
            expect(input.value, 'should clear query').to.be.eql('');
            done();
          });
        }, 300);
      });
    }
  }
};
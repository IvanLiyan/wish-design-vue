import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';

import WtSelect from '@wish/wt-vue/es/components/select';
import WtOption from '@wish/wt-vue/es/components/option';
// import WtPicker from '@wish/wt-vue/es/components/picker';

export default {
  name: 'WtTabMore',

  components: {
    WtSelect: WtSelect,
    WtOption: WtOption
    // WtPicker,
  },

  props: {
    label: String,
    size: String,
    disabled: Boolean,
    moreTabs: Array,
    currentValue: [String, Number, Object, Array],
    dropAutosize: Boolean,
    prefix: {
      type: String,
      required: true
    },
    tabComponent: [String, Object]
  },

  data: function data() {
    return {
      selectValue: this.label
    };
  },


  watch: {
    currentValue: {
      immediate: true,
      handler: function handler() {
        this.setSelectValue();
      }
    },
    moreTabs: function moreTabs() {
      this.setSelectValue();
    }
  },
  methods: {
    setSelectValue: function setSelectValue() {
      var _this = this;

      var selected = this.moreTabs.find(function (item) {
        return item.value === _this.currentValue;
      });
      if (!selected) {
        this.selectValue = this.label;
      } else {
        this.selectValue = selected.label;
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    var selectValue = this.selectValue,
        moreTabs = this.moreTabs,
        disabled = this.disabled,
        size = this.size,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix;

    var props = {
      popperClass: prefix + '-select',
      value: selectValue,
      placeholder: '',
      disabled: disabled,
      size: size,
      genre: 'line'
    };
    var WtSelectData = {
      props: props,
      attrs: props,
      on: {
        input: function input(value) {
          // 手动更新select value
          _this2.$nextTick(function () {
            if (value) {
              _this2.selectValue = value;
              _this2.$emit('tabSelectClick', value);
            }
          });
        }
      }
    };
    var Component = WtSelect;
    return h(
      Component,
      _mergeJSXProps([WtSelectData, { 'class': dropAutosize ? '' : prefix + '-select-item' }]),
      [moreTabs && moreTabs.map(function (item) {
        return h(
          'Wt-option',
          {
            key: item.value,
            attrs: { value: item.value,
              label: item.label,

              disabled: item.disabled
            },
            'class': item.labelClass },
          [item.$slots && item.$slots.label && h(
            'template',
            { slot: 'default' },
            [item.$slots.label]
          )]
        );
      })]
    );
  }
};
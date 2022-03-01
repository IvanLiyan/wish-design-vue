
export default {
  name: 'WtTabDrop',
  props: {
    label: String,
    disabled: Boolean
  },

  data: function data() {
    return {
      currentValue: '',
      tabDropInfo: {
        moreTabs: []
      }
    };
  },
  mounted: function mounted() {
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  },


  methods: {
    calcPaneInstances: function calcPaneInstances() {
      if (!this.$slots.default) {
        return null;
      }
      var data = [].map.call(this.$slots.default, function (item) {
        if (!item || !item.componentOptions) {
          return null;
        }
        var _item$componentOption = item.componentOptions.propsData,
            label = _item$componentOption.label,
            value = _item$componentOption.value,
            disabled = _item$componentOption.disabled,
            labelClass = _item$componentOption.labelClass;

        var instance = item.componentInstance;

        return {
          label: label,
          value: value,
          disabled: disabled,
          labelClass: labelClass,
          $slots: instance ? instance.$slots : undefined
        };
      });

      var moreTabs = data.filter(function (item) {
        return item;
      });
      this.tabDropInfo.moreTabs = moreTabs;
    },
    addTabs: function addTabs(tab, $parent) {
      this.tabDropInfo.$parent = this.tabDropInfo.$parent || $parent;
    }
  },

  render: function render(h) {
    var panes = this.$slots.default;
    return h(
      'div',
      { ref: 'select' },
      [panes]
    );
  }
};
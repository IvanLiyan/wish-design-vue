<script>
export default {
  name: 'WtTabDrop',
  props: {
    label: String,
    disabled: Boolean,
  },

  data() {
    return {
      currentValue: '',
      tabDropInfo: {
        moreTabs: [],
      },
    };
  },

  mounted() {
    this.calcPaneInstances();
  },

  updated() {
    this.calcPaneInstances();
  },

  methods: {
    calcPaneInstances() {
      if (!this.$slots.default) {
        return null;
      }
      const data = [].map.call(this.$slots.default, (item) => {
        if (!item || !item.componentOptions) {
          return null;
        }
        const { label, value, disabled, labelClass } = item.componentOptions.propsData;
        const instance = item.componentInstance;

        return {
          label,
          value,
          disabled,
          labelClass,
          $slots: instance ? instance.$slots : undefined,
        };
      });

      const moreTabs = data.filter((item) => {
        return item;
      });
      this.tabDropInfo.moreTabs = moreTabs;
    },
    addTabs(tab, $parent) {
      this.tabDropInfo.$parent = this.tabDropInfo.$parent || $parent;
    },
  },

  render(h) {
    const panes = this.$slots.default;
    return <div ref='select'>{panes}</div>;
  },
};
</script>

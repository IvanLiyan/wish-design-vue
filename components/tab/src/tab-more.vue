<script>
import WtSelect from '@components/select';
import WtOption from '@components/option';
// import WtPicker from '@components/picker';

export default {
  name: 'WtTabMore',

  components: {
    WtSelect,
    WtOption,
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
      required: true,
    },
    tabComponent: [String, Object],
  },

  data() {
    return {
      selectValue: this.label,
    };
  },

  watch: {
    currentValue: {
      immediate: true,
      handler() {
        this.setSelectValue();
      },
    },
    moreTabs() {
      this.setSelectValue();
    },
  },
  methods: {
    setSelectValue() {
      const selected = this.moreTabs.find((item) => {
        return item.value === this.currentValue;
      });
      if (!selected) {
        this.selectValue = this.label;
      } else {
        this.selectValue = selected.label;
      }
    },
  },
  render(h) {
    const { selectValue, moreTabs, disabled, size, dropAutosize, prefix } = this;
    const props = {
      popperClass: `${prefix}-select`,
      value: selectValue,
      placeholder: '',
      disabled,
      size,
      genre: 'line',
    };
    const WtSelectData = {
      props: props,
      attrs: props,
      on: {
        input: (value) => {
          // 手动更新select value
          this.$nextTick(() => {
            if (value) {
              this.selectValue = value;
              this.$emit('tabSelectClick', value);
            }
          });
        },
      },
    };
    const Component = WtSelect;
    return (
      <Component {...WtSelectData} class={dropAutosize ? '' : `${prefix}-select-item`}>
        {moreTabs &&
          moreTabs.map((item) => {
            return (
              <Wt-option
                key={item.value}
                value={item.value}
                label={item.label}
                class={item.labelClass}
                disabled={item.disabled}
              >
                {item.$slots && item.$slots.label && <template slot='default'>{item.$slots.label}</template>}
              </Wt-option>
            );
          })}
      </Component>
    );
  },
};
</script>

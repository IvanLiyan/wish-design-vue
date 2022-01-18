export default {
  data () {
    return {
      hoverOption: undefined,
    };
  },
  created () {
    this.$on('hoverItem', this.setHoverOption);
  },
  computed: {
    navOptions () {
      return this.options.filter((o) => o.visible && !o._disabled);
    },
  },
  methods: {
    setHoverOption (option) {
      if (this.hoverOption) {
        this.hoverOption.hover = false;
      }
      if (option && option.disabled) {
        return;
      }
      this.hoverOption = option;
      if (option) {
        option.hover = true;
      }
    },
    resetHover () {
      if (this.hoverOption) {
        this.hoverOption.hover = false;
      }
      this.hoverOption = undefined;
    },
    navigateOptions (direction) {
      if (!this.focused) {
        this.focused = true;
        return;
      }
      if (this.navOptions.length === 0) return;
      let hoverIndex = this.hoverOption
        ? this.navOptions.indexOf(this.hoverOption) : -1;
      if (direction === 'next') {
        hoverIndex++;
      } else if (direction === 'prev') {
        hoverIndex--;
      }
      if (hoverIndex >= this.navOptions.length) {
        hoverIndex = 0;
      } else if (hoverIndex < 0) {
        hoverIndex = this.navOptions.length - 1;
      }
      const option = this.navOptions[hoverIndex];
      if (option) {
        this.setHoverOption(option);
        this.$nextTick(() => this.scrollToOption(option));
      } else {
        this.setHoverOption();
      }
    },
  },
};

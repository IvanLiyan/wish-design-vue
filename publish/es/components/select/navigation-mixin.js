export default {
  data: function data() {
    return {
      hoverOption: undefined
    };
  },
  created: function created() {
    this.$on('hoverItem', this.setHoverOption);
  },

  computed: {
    navOptions: function navOptions() {
      return this.options.filter(function (o) {
        return o.visible && !o._disabled;
      });
    }
  },
  methods: {
    setHoverOption: function setHoverOption(option) {
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
    resetHover: function resetHover() {
      if (this.hoverOption) {
        this.hoverOption.hover = false;
      }
      this.hoverOption = undefined;
    },
    navigateOptions: function navigateOptions(direction) {
      var _this = this;

      if (!this.focused) {
        this.focused = true;
        return;
      }
      if (this.navOptions.length === 0) return;
      var hoverIndex = this.hoverOption ? this.navOptions.indexOf(this.hoverOption) : -1;
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
      var option = this.navOptions[hoverIndex];
      if (option) {
        this.setHoverOption(option);
        this.$nextTick(function () {
          return _this.scrollToOption(option);
        });
      } else {
        this.setHoverOption();
      }
    }
  }
};
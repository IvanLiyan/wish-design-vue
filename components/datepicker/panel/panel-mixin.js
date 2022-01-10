import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
    showBtnNow: Boolean,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('date-picker');
    },
    panelPrefix () {
      return this.config.getPrefixCls('picker-panel');
    },
  },
  methods: {
    iconBtnCls (direction, type = '') {
      const { prefix, panelPrefix } = this;
      return [
        `${panelPrefix}-icon-btn`,
        `${prefix}-${direction}-btn`,
        `${prefix}-${direction}-btn-arrow${type}`,
      ];
    },
    handleShortcutClick (shortcut) {
      if (shortcut.value) {
        this.$emit('pick', shortcut.value());
      }
      if (shortcut.onClick) shortcut.onClick(this);
    },
    handlePickClickNow () {
      this.resetView();
      this.$emit('pick-click-now');
    },
    handlePickSuccess () {
      this.resetView();
      this.$emit('pick-success');
    },
    resetView () {
      setTimeout(
        () => { this.currentView = this.selectionMode; },
        500, // 500ms so the dropdown can close before changing
      );
    },
    handleClear () {
      this.dates = this.dates.map(() => null);
      this.rangeState = {};
      this.$emit('pick', this.dates);
      this.handleConfirm();
      //  if (this.showTime) this.$refs.timePicker.handleClear();
    },
    handleConfirm (visible, type) {
      this.$emit('pick', this.dates, visible, type || this.type);
    },
    onToggleVisibility (open) {
      const {timeSpinner, timeSpinnerEnd} = this.$refs;
      if (open && timeSpinner) timeSpinner.updateScroll();
      if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
    },
  },
};

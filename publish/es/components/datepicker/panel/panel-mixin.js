import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

export default {
  props: {
    confirm: {
      type: Boolean,
      default: false
    },
    showBtnNow: Boolean
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('date-picker');
    },
    panelPrefix: function panelPrefix() {
      return this.config.getPrefixCls('picker-panel');
    }
  },
  methods: {
    iconBtnCls: function iconBtnCls(direction) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var prefix = this.prefix,
          panelPrefix = this.panelPrefix;

      return [panelPrefix + '-icon-btn', prefix + '-' + direction + '-btn', prefix + '-' + direction + '-btn-arrow' + type];
    },
    handleShortcutClick: function handleShortcutClick(shortcut) {
      if (shortcut.value) {
        this.$emit('pick', shortcut.value());
      }
      if (shortcut.onClick) shortcut.onClick(this);
    },
    handlePickClickNow: function handlePickClickNow() {
      this.resetView();
      this.$emit('pick-click-now');
    },
    handlePickSuccess: function handlePickSuccess() {
      this.resetView();
      this.$emit('pick-success');
    },
    resetView: function resetView() {
      var _this = this;

      setTimeout(function () {
        _this.currentView = _this.selectionMode;
      }, 500 // 500ms so the dropdown can close before changing
      );
    },
    handleClear: function handleClear() {
      this.dates = this.dates.map(function () {
        return null;
      });
      this.rangeState = {};
      this.$emit('pick', this.dates);
      this.handleConfirm();
      //  if (this.showTime) this.$refs.timePicker.handleClear();
    },
    handleConfirm: function handleConfirm(visible, type) {
      this.$emit('pick', this.dates, visible, type || this.type);
    },
    onToggleVisibility: function onToggleVisibility(open) {
      var _$refs = this.$refs,
          timeSpinner = _$refs.timeSpinner,
          timeSpinnerEnd = _$refs.timeSpinnerEnd;

      if (open && timeSpinner) timeSpinner.updateScroll();
      if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
    }
  }
};
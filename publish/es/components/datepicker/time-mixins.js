export default {
  props: {
    disabledHours: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledMinutes: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledSeconds: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    hideDisabledOptions: {
      type: Boolean,
      default: false
    }
  }
};
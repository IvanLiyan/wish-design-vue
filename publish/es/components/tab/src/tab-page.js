import _defineProperty from 'babel-runtime/helpers/defineProperty';

import Icon from '@wish/wt-vue/es/components/icon';

export default {
  name: 'WtTabPage',

  props: {
    size: String,
    prevStatus: Boolean,
    nextStatus: Boolean,
    pageStyle: {
      type: Object,
      default: function _default() {
        return {
          right: 0
        };
      }
    },
    prefix: {
      type: String,
      required: true
    }
  },

  methods: {
    prevClick: function prevClick(event) {
      if (this.prevStatus) {
        this.$emit('prevClick', event);
      }
    },
    nextClick: function nextClick(event) {
      if (this.nextStatus) {
        this.$emit('nextClick', event);
      }
    }
  },

  render: function render(h) {
    var _ref2, _ref3;

    var pageStyle = this.pageStyle,
        prevClick = this.prevClick,
        nextClick = this.nextClick,
        prevStatus = this.prevStatus,
        nextStatus = this.nextStatus,
        prefix = this.prefix;

    return h(
      'span',
      {
        'class': _defineProperty({}, prefix + '-page', true),
        style: pageStyle
      },
      [h(Icon, {
        attrs: {
          name: 'arrow-left',
          width: '18',
          height: '18'
        },
        'class': (_ref2 = {}, _defineProperty(_ref2, prefix + '-action', true), _defineProperty(_ref2, prefix + '-action-disabled', !prevStatus), _ref2),
        on: {
          'click': prevClick
        }
      }), h(Icon, {
        attrs: {
          name: 'arrow-right',
          width: '18',
          height: '18'
        },
        'class': (_ref3 = {}, _defineProperty(_ref3, prefix + '-action', true), _defineProperty(_ref3, prefix + '-action-disabled', !nextStatus), _ref3),
        on: {
          'click': nextClick
        }
      })]
    );
  }
};
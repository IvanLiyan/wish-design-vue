<script>
import Icon from '@components/icon';

export default {
  name: 'WtTabPage',

  props: {
    size: String,
    prevStatus: Boolean,
    nextStatus: Boolean,
    pageStyle: {
      type: Object,
      default() {
        return {
          right: 0,
        };
      },
    },
    prefix: {
      type: String,
      required: true,
    },
  },

  methods: {
    prevClick: function (event) {
      if (this.prevStatus) {
        this.$emit('prevClick', event);
      }
    },
    nextClick: function (event) {
      if (this.nextStatus) {
        this.$emit('nextClick', event);
      }
    },
  },

  render(h) {
    const { pageStyle, prevClick, nextClick, prevStatus, nextStatus, prefix } = this;
    return (
      <span
        class={{
          [`${prefix}-page`]: true,
        }}
        style={pageStyle}
      >
        <Icon
          name='arrow-left'
          width='18'
          height='18'
          class={{
            [`${prefix}-action`]: true,
            [`${prefix}-action-disabled`]: !prevStatus,
          }}
          onClick={prevClick}
        />
        <Icon
          name='arrow-right'
          width='18'
          height='18'
          class={{
            [`${prefix}-action`]: true,
            [`${prefix}-action-disabled`]: !nextStatus,
          }}
          onClick={nextClick}
        />
      </span>
    );
  },
};
</script>

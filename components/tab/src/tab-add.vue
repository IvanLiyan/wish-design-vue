<script>
import Icon from '@components/icon';

export default {
  name: 'MtdTabAdd',
  inheritAttrs: false,
  props: {
    prefix: {
      type: String,
      required: true,
    },
  },
  methods: {
    addClick: function (event) {
      this.$parent.addClick(event);
    },
  },

  render (h) {
    const {
      addClick,
      prefix,
    } = this;
    return (
      <span class={`${prefix}-action ${prefix}-add`}
        onClick={addClick}
      >
        <Icon name="add" />
      </span>
    );
  },
};
</script>

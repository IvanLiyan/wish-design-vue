
import Icon from '@wish/wt-vue/es/components/icon';

export default {
  name: 'MtdTabAdd',
  inheritAttrs: false,
  props: {
    prefix: {
      type: String,
      required: true
    }
  },
  methods: {
    addClick: function addClick(event) {
      this.$parent.addClick(event);
    }
  },

  render: function render(h) {
    var addClick = this.addClick,
        prefix = this.prefix;

    return h(
      'span',
      { 'class': prefix + '-action ' + prefix + '-add',
        on: {
          'click': addClick
        }
      },
      [h(Icon, {
        attrs: { name: 'add' }
      })]
    );
  }
};
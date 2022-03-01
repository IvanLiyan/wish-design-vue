import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function (name, Component) {
  return createHoc({
    name: name,
    model: true,
    props: {
      open: Boolean
    },
    data: function data() {
      return {
        isOpened: false
      };
    },

    computed: {
      isControlled: function isControlled() {
        return 'open' in this.$options.propsData;
      },
      _open: function _open() {
        return this.isControlled ? this.open : this.isOpened;
      }
    },
    methods: {
      handleOpenChange: function handleOpenChange(v) {
        if (!this.isControlled) {
          this.isOpened = v;
        }
        this.$emit('update:open', v);
      }
    }
  }, {
    withRef: true,
    mapStateToProps: function mapStateToProps(context) {
      return {
        open: context._open
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        'update:open': context.handleOpenChange
      };
    }
  })(Component);
}
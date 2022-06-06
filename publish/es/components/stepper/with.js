import createHoc from '@wish/wt-vue/es/utils/hoc';

export default function withStepper(name, Components) {
  return createHoc({
    name: name,
    inject: ['stepper'],
    props: {
      status: String
    },
    data: function data() {
      return {
        index: -1 // use in stepper component
      };
    },
    created: function created() {
      this.stepper.$emit('addStep', this);
    },
    beforeDestroy: function beforeDestroy() {
      this.stepper.$emit('removeStep', this);
    },


    computed: {
      internalStatus: function internalStatus() {
        if (this.index > -1) {
          var val = this.stepper.active;
          if (this.index < val) {
            return 'finish';
          } else if (this.index === val) {
            return this.stepper.status || 'process';
          } else if (this.index > val) {
            return 'wait';
          }
        }
      },
      currentStatus: function currentStatus() {
        return this.status || this.internalStatus;
      }
    }
  }, {
    mapStateToProps: function mapStateToProps(context) {
      return {
        index: context.index,
        status: context.currentStatus,
        space: context.stepper.space,
        direction: context.stepper.direction,
        dot: context.stepper.dot
      };
    }
  })(Components);
}
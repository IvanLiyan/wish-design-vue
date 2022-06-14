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
        // use in stepper component
        index: -1
      };
    },
    created: function created() {
      this.stepper.$emit('addStep', this);
    },
    beforeDestroy: function beforeDestroy() {
      this.stepper.$emit('removeStep', this);
    },


    computed: {
      // 判断每个step的状态
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
      // 处理step的props
      return {
        index: context.index,
        status: context.currentStatus,
        space: context.stepper.space,
        direction: context.stepper.direction
      };
    }
  })(Components);
}
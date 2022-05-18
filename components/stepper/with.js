import createHoc from '@/utils/hoc';

export default function withStepper(name, Components) {
  return createHoc(
    {
      name,
      inject: ['stepper'],
      props: {
        status: String,
      },
      data() {
        return {
          index: -1, // use in stepper component
        };
      },
      created() {
        this.stepper.$emit('addStep', this);
      },

      beforeDestroy() {
        this.stepper.$emit('removeStep', this);
      },

      computed: {
        internalStatus() {
          if (this.index > -1) {
            const val = this.stepper.active;
            if (this.index < val) {
              return 'finish';
            } else if (this.index === val) {
              return this.stepper.status || 'process';
            } else if (this.index > val) {
              return 'wait';
            }
          }
        },
        currentStatus() {
          return this.status || this.internalStatus;
        },
      },
    },
    {
      mapStateToProps(context) {
        return {
          index: context.index,
          status: context.currentStatus,
          space: context.stepper.space,
          direction: context.stepper.direction,
          dot: context.stepper.dot,
        };
      },
    },
  )(Components);
}

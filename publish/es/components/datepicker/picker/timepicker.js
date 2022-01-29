import Picker from '../picker';
import TimePickerPanel from '../panel/Time/time';
import RangeTimePickerPanel from '../panel/Time/time-range';
import Options from '../time-mixins';

import { findComponentsDownward } from '@wish/wt-vue/es/utils/util';

export default {
  name: 'WtTimePicker',
  mixins: [Picker, Options],
  components: {
    TimePickerPanel: TimePickerPanel,
    RangeTimePickerPanel: RangeTimePickerPanel
  },
  props: {
    type: {
      validator: function validator(value) {
        return ['time', 'timerange'].indexOf(value) > -1;
      },

      default: 'time'
    }
  },
  computed: {
    panel: function panel() {
      var isRange = this.type === 'timerange';
      return isRange ? 'RangeTimePickerPanel' : 'TimePickerPanel';
    },
    ownPickerProps: function ownPickerProps() {
      return {
        disabledHours: this.disabledHours,
        disabledMinutes: this.disabledMinutes,
        disabledSeconds: this.disabledSeconds,
        hideDisabledOptions: this.hideDisabledOptions
      };
    }
  },
  watch: {
    visible: function visible(_visible) {
      var _this = this;

      if (_visible) {
        this.$nextTick(function () {
          var spinners = findComponentsDownward(_this, 'TimeSpinner');
          spinners.forEach(function (instance) {
            return instance.updateScroll();
          });
        });
      }
    }
  }
};
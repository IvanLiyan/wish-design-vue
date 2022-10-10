<template>
  <div :class="[panelPrefix + '-body-wrapper']" @mousedown.prevent>
    <div :class="[panelPrefix + '-body']">
      <div :class="[timePrefix + '-header']"
        v-if="showDate">{{ visibleDate }}</div>
      <div :class="[panelPrefix + '-content']">
        <time-spinner
          ref="timeSpinner"
          :show-seconds="showSeconds"
          :show-minutes="showMinutes"
          :steps="steps"
          :hours="timeSlots[0]"
          :minutes="timeSlots[1]"
          :seconds="timeSlots[2]"
          :disabled-hours="disabledHMS.disabledHours"
          :disabled-minutes="disabledHMS.disabledMinutes"
          :disabled-seconds="disabledHMS.disabledSeconds"
          :hide-disabled-options="hideDisabledOptions"
          @change="handleChange" />
      </div>
      <Confirm
        v-if="confirm"
        :show-btn-now="showBtnNow"
        @click-now="handlePickClickNow"
        @confirm="handlePickSuccess" />
      <div :class="[panelPrefix + '-footer']">
        <span v-if="showNow" type="primary" class="select-now" @click="handleSelectNow">
          Current time
        </span>
        <span v-else></span>
        <wt-button type="primary" :class="!confirmDisabled ? 'btn' : 'btn disabled'" :disabled="confirmDisabled"
          @click="handleConfirm">
          Confirm
        </wt-button>
      </div>
    </div>
  </div>
</template>
<script>
import TimeSpinner from '../../base/time-spinner.vue';
import Confirm from '../../base/confirm.vue';
import Options from '../../time-mixins';

import Mixin from '../panel-mixin';
import Locale from '@/mixins/locale';

import { initTimeDate } from '@/utils/date';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
const mergeDateHMS = (date, hours, minutes, seconds) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(seconds);
  return newDate;
};
const unique = (el, i, arr) => arr.indexOf(el) === i;
const returnFalse = () => false;

export default {
  name: 'TimePickerPanel',
  components: { TimeSpinner, Confirm },
  mixins: [ Mixin, Locale, Options ],
  props: {
    disabledDate: {
      type: Function,
      default: returnFalse,
    },
    steps: {
      type: Array,
      default: () => [],
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    value: {
      type: Array,
      required: true,
    },
    showNow: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      date: this.value[0] || initTimeDate(),
      showDate: false,
      confirmDisabled: true, // 确认按钮不可点击,
      newDate: '',
    };
  },
  computed: {
    timePrefix () {
      return this.config.getPrefixCls('time-picker');
    },
    showSeconds () {
      return !!(this.format || '').match(/s$/);
    },
    showMinutes () {
      return !!(this.format || '').match(/m/);
    },
    visibleDate () { // TODO
      const date = this.date;
      const month = date.getMonth() + 1;
      const tYear = this.t('el.datepicker.year');
      const tMonth = this.t(`el.datepicker.month${month}`);
      return `${date.getFullYear()}${tYear} ${tMonth}`;
    },
    timeSlots () {
      if (!this.value[0]) return [];
      return ['getHours', 'getMinutes', 'getSeconds']
        .map(slot => this.date[slot]());
    },
    disabledHMS () {
      const disabledTypes = [
        'disabledHours',
        'disabledMinutes',
        'disabledSeconds',
      ];
      if (this.disabledDate === returnFalse || !this.value[0]) {
        const disabled = disabledTypes.reduce((obj, type) => {
          obj[type] = this[type];
          return obj;
        }, {});
        return disabled;
      } else {
        const slots = [24, 60, 60];
        const disabled = ['Hours', 'Minutes', 'Seconds']
          .map(type => this[`disabled${type}`]);
        const disabledHMS = disabled.map((preDisabled, j) => {
          const slot = slots[j];
          const toDisable = preDisabled;
          for (let i = 0; i < slot; i += (this.steps[j] || 1)) {
            const hms = this.timeSlots.map((slot, x) => x === j ? i : slot);
            const testDateTime = mergeDateHMS(this.date, ...hms);
            if (this.disabledDate(testDateTime, true)) toDisable.push(i);
          }
          return toDisable.filter(unique);
        });
        return disabledTypes.reduce((obj, type, i) => {
          obj[type] = disabledHMS[i];
          return obj;
        }, {});
      }
    },
  },
  watch: {
    value (dates) {
      let newVal = dates[0] || initTimeDate();
      newVal = new Date(newVal);
      this.date = newVal;
      this.confirmDisabled = false;
    },
  },
  mounted () {
    if (this.$parent && this.$parent.$options.name === 'DatePicker') {
      this.showDate = true;
    }
  },
  methods: {
    handleChange (date, emit = true) {
      const newDate = new Date(this.date);
      this.newDate = newDate;
      Object.keys(date).forEach(
        type => newDate[`set${capitalize(type)}`](date[type]),
      );
      if (emit) this.$emit('pick', newDate, true);
    },
    handleConfirm () {
      this.$parent.$parent.$parent.handleOpenChange(false);
    },
    handleSelectNow () {
      const now = new Date();
      Object.keys(now).forEach(
        type => now[`set${capitalize(type)}`](now[type]),
      );
      this.$emit('pick', now, true);
    },
  },
};
</script>

<template>
  <div :class="classes" @mousedown.prevent>
    <div :class="[panelPrefix + '-body', panelPrefix + '-multiple-body']">
      <div :class="[panelPrefix + '-content', panelPrefix + '-multiple-content', panelPrefix + '-content-left']">
        <div :class="[timePrefix + '-header', timePrefix + '-multiple-header']">
          <template>{{ t('el.datepicker.startTime') }}</template>
        </div>
        <time-spinner
          ref="timeSpinner"
          :steps="steps"
          :show-seconds="showSeconds"
          :show-minutes="showMinutes"
          :hours="dateStart && dateStart.getHours()"
          :minutes="dateStart && dateStart.getMinutes()"
          :seconds="dateStart && dateStart.getSeconds()"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          :hide-disabled-options="hideDisabledOptions"
          @change="handleStartChange" />
      </div>
      <div :class="[panelPrefix + '-content', panelPrefix + '-multiple-content', panelPrefix + '-content-right']">
        <div :class="[timePrefix + '-header', timePrefix + '-multiple-header']">
          <template>{{ t('el.datepicker.endTime') }}</template>
        </div>
        <time-spinner
          ref="timeSpinnerEnd"
          :steps="steps"
          :show-seconds="showSeconds"
          :show-minutes="showMinutes"
          :hours="dateEnd && dateEnd.getHours()"
          :minutes="dateEnd && dateEnd.getMinutes()"
          :seconds="dateEnd && dateEnd.getSeconds()"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          :hide-disabled-options="hideDisabledOptions"
          @change="handleEndChange" />
      </div>
      <Confirm
        v-if="confirm"
        :show-btn-now="showBtnNow"
        @click-now="handlePickClickNow"
        @confirm="handlePickSuccess" />
    </div>
    <div :class="[panelPrefix + '-footer']">
      <span></span>
        <wt-button type="primary" :class="!confirmDisabled ? 'btn' : 'btn disabled'" :disabled="confirmDisabled"
          @click="handleConfirm">
          确认
        </wt-button>
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

export default {
  name: 'RangeTimePickerPanel',
  components: { TimeSpinner, Confirm },
  mixins: [ Mixin, Locale, Options ],
  props: {
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
  },
  data () {
    return {
      dateStart: undefined,
      dateEnd: undefined,
      confirmDisabled: true, // 确认按钮不可点击,
    };
  },
  computed: {
    timePrefix () {
      return this.config.getPrefixCls('time-picker');
    },
    classes () {
      const { panelPrefix, timePrefix } = this;
      return [
        `${panelPrefix}-body-wrapper`,
        `${timePrefix}-with-range`,
        {
          [`${timePrefix}-with-seconds`]: this.showSeconds,
        },
      ];
    },
    showSeconds () {
      return !!(this.format || '').match(/s$/);
    },
    showMinutes () {
      return !!(this.format || '').match(/m/);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (dates) {
        this.setDates(dates);
      },
    },
  },
  methods: {
    setDates (dates) {
      const [dateStart, dateEnd] = dates.slice();
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
    },
    handleConfirm () {
      this.$emit('pick-success', [this.dateStart, this.dateEnd]);
    },
    handleCancel () {
      this.setDates(this.value);
      this.$emit('canel');
    },
    handleChange (start, end) {
      this.confirmDisabled = false;
      const dateStart = new Date(this.dateStart || initTimeDate());
      const dateEnd = new Date(this.dateEnd || initTimeDate());

      // set dateStart
      Object.keys(start).forEach(type => {
        dateStart[`set${capitalize(type)}`](start[type]);
      });

      // set dateEnd
      Object.keys(end).forEach(type => {
        dateEnd[`set${capitalize(type)}`](end[type]);
      });
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.$emit('pick-time-range', [dateStart, dateEnd]);
    },
    handleStartChange (date) {
      this.handleChange(date, {});
    },
    handleEndChange (date) {
      this.handleChange({}, date);
    },
    updateScroll () {
      this.$refs.timeSpinner.updateScroll();
      this.$refs.timeSpinnerEnd.updateScroll();
    },
  },
};
</script>

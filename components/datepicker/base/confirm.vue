<template>
  <div :class="[prefix + '-confirm']">
    <slot>
      <wt-button v-if="showBtnNow" size="small" type="text-primary"
        @click="handleClickNow">
        {{ labels.now }}
      </wt-button>
      <wt-button
        size="small"
        type="primary"
        @click="handleSuccess"
        style="color: #fff;"
      >
        {{ labels.ok }}
      </wt-button>
    </slot>
  </div>
</template>
<script>
import WtButton from '@components/button';
import Locale from '@/mixins/locale';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  components: { WtButton },
  mixins: [Locale],
  props: {
    isTime: {
      type: Boolean,
      default: false,
    },
    timeDisabled: {
      type: Boolean,
      default: false,
    },
    showBtnNow: {
      type: Boolean,
      default: true,
    },
  },
  inject: {
    'CalendarPicker': {
      default: '',
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('picker');
    },
    timeClasses () {
      return `${this.prefix}-confirm-time`;
    },
    labels () {
      const labels = ['time', 'now', 'ok'];
      const values = [this.isTime ? 'selectDate' : 'selectTime', 'now', 'ok'];
      return labels.reduce((obj, key, i) => {
        obj[key] = this.t('el.datepicker.' + values[i]);
        return obj;
      }, {});
    },
  },
  methods: {
    handleClickNow () {
      this.$emit('click-now');
    },
    handleSuccess () {
      this.$emit('confirm');
    },
    handleToggleTime () {
      if (this.timeDisabled) return;
      this.$emit('toggle');
      if (this.CalendarPicker) {
        this.CalendarPicker.$emit('focus-input');
      }
    },
  },
};
</script>

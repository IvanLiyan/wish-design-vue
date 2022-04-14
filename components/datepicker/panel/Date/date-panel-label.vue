<template>
  <span :class="`${datePrefixCls}-current`">
    <span
      v-if="datePanelLabel"
      v-show="datePanelLabel.labels[0].type === 'year' ||
        currentView === 'date'"
      :class="[datePrefixCls + '-header-label']"
      @click="datePanelLabel.labels[0].handler"
    >
      {{ this.$props.currentView !== 'year' ? datePanelLabel.labels[0].label : yearRangeValue }}
    </span>
    <template
      v-if="datePanelLabel && currentView === 'date'"
    >
      {{ datePanelLabel.separator }}
    </template>
    <span
      v-if="datePanelLabel"
      v-show="datePanelLabel.labels[1].type === 'year' ||
        currentView === 'date'"
      :class="[datePrefixCls + '-header-label']"
      @click="datePanelLabel.labels[1].handler"
    >
      {{ datePanelLabel.labels[1].label }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    datePanelLabel: Object,
    currentView: String,
    datePrefixCls: String,
    position: String,
  },
  computed: {
    // 年份区间渲染
    yearRangeValue () {
      if (this.$props.currentView === 'year' && this.$props.position === 'right') {
        const startYear = parseInt(this.$props.datePanelLabel.labels[0].label.substr(0, 3) + '0') + 12;
        const endYear = startYear + 11;
        return startYear + ' - ' + endYear;
      } else {
        const startYear = Math.floor(parseInt(this.$props.datePanelLabel.labels[0].label) / 10) * 10;
        const endYear = parseInt(startYear) + 11;
        return startYear + ' - ' + endYear;
      };
    },
  },
};
</script>

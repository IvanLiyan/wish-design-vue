<template>
  <span :class="`${datePrefixCls}-current`" @click="clickHere">
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
  },
  computed: {
    yearRangeValue () {
      if (this.$props.currentView === 'year') {
        const startYear = this.$props.datePanelLabel.labels[0].label.substr(0, 3) + '0';
        const endYear = parseInt(startYear) + 11;
        return startYear + ' - ' + endYear;
      } else {
        return '';
      };
    },
  },
  methods: {
    clickHere () {
      console.log('123', this.$props);
    },
  },
};
</script>

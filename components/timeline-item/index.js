import TimelineItem from './timeline-item.vue';

/* istanbul ignore next */
TimelineItem.install = function (Vue) {
  Vue.component(TimelineItem.name, TimelineItem);
};

export default TimelineItem;

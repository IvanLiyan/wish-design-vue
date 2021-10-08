import Vue from 'vue'

export type TimelineItemType = 'master' | 'normal' | 'solid' | 'hollow'
export type TimelineItemPosition = 'left' | 'right'

export declare class TimelineItem extends Vue {
  static install (vue: any): void;
  static name: string

  type: TimelineItemType
  align: string
  title: string
  showTitle: boolean
  mode: string
}

export default TimelineItem;

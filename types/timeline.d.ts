import Vue from 'vue'

export type TimelineMode = 'right' | '' | 'alternate'

export declare class Timeline extends Vue {
  static install (vue: any): void;
  static name: string
  mode: TimelineMode
  showTitle: boolean
}
export default Timeline;

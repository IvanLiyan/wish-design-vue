import Vue from 'vue';

export type AnnouncementType = 'success' | 'warning' | 'error' | 'info';

export declare class Announcement extends Vue {
  static install (vue: any): void;
  static name: string

  title: string

  description?: string

  type?: AnnouncementType

  closable: Boolean

  showIcon?: boolean
}

export default Announcement;

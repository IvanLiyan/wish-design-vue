import Vue from 'vue';

export declare class Progress extends Vue {
  static install (vue: any): void;
  static name: string

  type?: 'line' | 'circle'
  color?: string
  strokeWidth?: number
  width?: number
  percentage?: number
  status?: string
}

export default Progress;

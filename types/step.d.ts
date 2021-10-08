import Vue from 'vue';

export declare class Step extends Vue {
  static install (vue: any): void;
  static name: string

  title?: string
  icon?: string
  description?: string
  status?: string
}

export default Step;

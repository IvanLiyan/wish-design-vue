import Vue from 'vue';

export declare class Option extends Vue {
  static install (vue: any): void;
  static name: string

  value: any

  label?: string

  disabled?: boolean
}

export default Option;

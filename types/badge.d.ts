import Vue from 'vue';

export declare class Badge extends Vue {
  static install (vue: any): void;
  static name: string

  value: string | number

  dot?: boolean

  max?: number

  hidden?: boolean
}

export default Badge;

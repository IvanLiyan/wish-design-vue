import Vue from 'vue';

export declare class Steps extends Vue {
  static install (vue: any): void;
  static name: string

  size?: string
  dot?: boolean
  type?: boolean
  space?: string | number
  direction?: string
  active?: number
  status?: string
  isCenter?: boolean
  simple?: boolean
}

export default Steps;

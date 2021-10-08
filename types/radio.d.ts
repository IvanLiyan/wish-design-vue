import Vue from 'vue';

export declare class Radio extends Vue {
  static install (vue: any): void;
  static name: string

  checked?: boolean
  name?: string
  value?: any
  disabled?: boolean
  size?: 'small'
}

export default Radio;

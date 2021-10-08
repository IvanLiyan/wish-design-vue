import Vue from 'vue';

export declare class Container extends Vue {
  static install (vue: any): void;
  static name: string

  direction: 'horizontal' | 'vertical'
}

export default Container;

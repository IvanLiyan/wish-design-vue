import Vue from 'vue';

export interface getTarget {
  (): HTMLElement
}

export declare class Affix extends Vue {
  static install (vue: any): void;
  static name: string

  offsetTop?: number;
  offsetBottom?: number;
  debounce?: number;
  getTarget?: getTarget;
}

export default Affix;

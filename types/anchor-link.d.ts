import Vue from 'vue';

export declare class AnchorLink extends Vue {
  static install (vue: any): void;
  static name: string

  href?: string;
  title?: string;
  scrollOffset?: number;
}

export default AnchorLink;

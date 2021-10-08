import Vue from 'vue';
export declare class Anchor extends Vue {
  static install (vue: any): void;
  static name: string;

  affix?: boolean;
  offsetTop?: number;
  offsetBottom?: number;
  bounds?: number;
  container?: any;
  showInk?: boolean;
  scrollOffset?: number;
}

export default Anchor;

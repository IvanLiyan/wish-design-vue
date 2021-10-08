import Vue, { VNode } from 'vue';

export interface CardSlots {
  /** Content of the card */
  default: VNode[],

  /** Title of the card */
  header: VNode[]

  [key: string]: VNode[]
}

export declare class Card extends Vue {
  static install (vue: any): void;
  static name: string;

  header?: string;

  shadow: 'always' | 'never' | 'hover';

  $slots: CardSlots;
}
export default Card;

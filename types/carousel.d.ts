import Vue from 'vue';

type Position = 'inside' | 'outside';
type Arrow = 'always' | 'hover' | 'never';

export declare class Carousel extends Vue {
  static install (vue: any): void
  static name: string
  initialIndex: number
  autoplay: boolean
  indicatorPosition: Position
  interval: number
  loop: boolean
  arrow: Arrow
  prev (): void
  next (): void
  setAciveItem (num: number): void
}

export default Carousel;

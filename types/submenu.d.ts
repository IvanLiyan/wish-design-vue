import Vue from 'vue';
export declare class Submenu extends Vue {
  static install (vue: any): void;
  static name: string

  name: string
  disabled?: boolean
  icon?: string
  closeDelay?: number
  openDelay?: number
}

export default Submenu;

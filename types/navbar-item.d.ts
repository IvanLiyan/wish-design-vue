import Vue from 'vue'
export type NavbarItemTrigger = 'click' | 'hover'

export type NavbarItemAlign = 'left' | 'right'

export declare class NavbarItem extends Vue {
  static install (vue: any): void;
  static name: string

  trigger?: NavbarItemTrigger

  align?: NavbarItemAlign

  linkClass?: string

  visible?: boolean

  active?: boolean

  dropdownClass?: string
}

export default NavbarItem;

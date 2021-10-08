import Vue from 'vue'
export type NavbarTheme = 'light' | 'dark'

export declare class Navbar extends Vue {
  static install (vue: any): void;
  static name: string

  theme?: NavbarTheme

  logo?: string

  logoProps?: Object

  avatar?: string

  username?: string

  userVisible?: boolean
}

export default Navbar;

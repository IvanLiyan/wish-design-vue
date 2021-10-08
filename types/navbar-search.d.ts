import Vue from 'vue'
import { NavbarItemAlign } from './navbar-item'

export declare class NavbarSearch extends Vue {
  static install (vue: any): void;
  static name: string

  value?: string | number

  align?: NavbarItemAlign
}

export default NavbarSearch;

import Vue from 'vue';

export type TagTheme = 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'purple'

export type TagSize = 'small' | 'normal' | 'large'
export type TagType = 'pure' | 'text' | 'unbordered'

export declare class Tag extends Vue {
  static install (vue: any): void;
  static name: string

  size?: TagSize
  theme?: TagTheme
  type?: TagType
  rounded?: boolean
  closable?: boolean
  disabled?: boolean
  // checkable?: boolean
  // checked?: boolean
}

export default Tag;

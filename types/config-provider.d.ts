import Vue from 'vue';
import { getPopupContainer } from './popper';
export interface ConfigOptions {
  prefixCls?: string;
  iconPrefixCls?: string;
  getPopupContainer?: getPopupContainer;
}

interface ConfigFn {
  config (options?: ConfigOptions): void;
}

export declare class ConfigProviderComponent extends Vue {
  static install (vue: any): void;
  static name: string
}

export declare const ConfigProvider: ConfigProviderComponent & ConfigFn;

export default ConfigProvider;

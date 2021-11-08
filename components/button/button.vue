<template>
  <component
    :href="href"
    :to="to"
    :is="tag"
    :class="[
      prefix,
      `${prefix}-${type}`,
      {
        [`${prefix}-icon`]: !$slots.default && icon,
        [`${prefix}-text-icon`]: $slots.default && icon,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-loading`]: _loading,
      },
    ]"
    :type="htmlType"
    :disabled="disabled || _loading"
    v-on="listen"
    v-bind="$attrs"
  >
    <i :class="`${prefix}-before ${prefix}-spin`" v-if="_loading"></i>
    <Icon :name="icon" v-if="!_loading && icon" :width="20" :height="20" />
    <span
      :class="[`${prefix}-content`, { [`${prefix}-link-small`]: linkSize === 'small' }]"
      v-if="$slots.default && !_loading"
      ><slot
    ></slot></span>
  </component>
</template>

<script>
import { isPromise, isArray } from '@/utils/type';
import { hasProps } from '@/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import Icon from '@components/icon';

export default {
  name: 'WdButton',
  components: {
    Icon,
  },
  inheritAttrs: false,
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'primary',
      validator: (val) =>
        ['primary', 'secondary', 'third', 'ghost', 'text', 'link', 'dashed', 'success', 'warning', 'danger'].includes(
          val,
        ),
    },
    // 按钮icon
    icon: String,
    // 按钮loading状态
    loading: Boolean,
    // 按钮disabled状态
    disabled: Boolean,
    // 按钮跳转地址
    href: String,
    // 按钮跳转路由地址
    to: [String, Object],
    // 链接按钮 文字大小
    linkSize: {
      type: String,
      default: 'normal',
      validator: (val) => ['normal', 'small'].includes(val),
    },
    // 按钮原生html type
    htmlType: {
      type: String,
      default: 'button',
    },
  },

  data() {
    return {
      innerLoading: false,
    };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('btn');
    },
    listen() {
      return {
        ...this.$listeners,
        click: this.handleClick,
      };
    },
    tag() {
      if (this.href !== undefined) {
        return 'a';
      } else {
        return 'button';
      }
    },
    _loading() {
      return hasProps(this, 'loading') ? this.loading : this.innerLoading;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    handleClick(e) {
      clearTimeout(this.timeout);
      const onClick = this.$listeners.click;
      const handler = () => {
        this.innerLoading = false;
      };
      if (isArray(onClick)) {
        const r = Promise.all(onClick.map((fn) => fn && fn(e)));
        this.innerLoading = true;
        r.then(handler, handler);
      } else if (onClick) {
        const r = onClick(e);
        if (isPromise(r)) {
          this.innerLoading = true;
          r.then(handler, handler);
        }
      }
    },
  },
};
</script>

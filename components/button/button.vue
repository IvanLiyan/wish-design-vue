<template>
  <component :href="href" :to="to" :is="tag"
    :class="[
      prefix,
      type ? `${prefix}-${type}` : '',
      size ? `${prefix}-${size}` : '',
      {
        [`${prefix}-dashed`]: dashed,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-loading`]: _loading,
        [`${prefix}-clicked`]: clicked,
        [`${prefix}-ghost`]: ghost,
        [`${prefix}-round`]: round,
        [`${prefix}-circle`]: circle,
      }
    ]"
    :type="htmlType"
    :disabled="disabled || _loading"
    v-on="listen"
    v-bind="$attrs"
  >
    <i :class="`${prefix}-before ${prefix}-spin`"
      v-if="_loading" /><span
      :class="`${prefix}-before`" v-if="!_loading && (icon || $slots.icon)"
    >
      <slot name="icon"><i :class="icon" /></slot>
    </span><span><slot /></span>
  </component>
</template>
<script>
import { isPromise, isArray } from '@/utils/type';
import { hasProps } from '@/utils/vnode';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'MtdButton',
  inheritAttrs: false,
  props: {
    href: String,
    to: [String, Object],
    ghost: Boolean,
    disabled: Boolean,
    size: String,
    htmlType: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    icon: String,
    type: String,
    dashed: Boolean,
    circle: Boolean,
    round: Boolean,
  },
  data () {
    return {
      clicked: false,
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
    prefix () {
      return this.config.getPrefixCls('btn');
    },
    listen () {
      return {
        ...this.$listeners,
        click: this.handleClick,
      };
    },
    tag () {
      if (this.to !== undefined) {
        return 'router-link';
      } else if (this.href !== undefined) {
        return 'a';
      } else {
        return 'button';
      }
    },
    _loading () {
      return hasProps(this, 'loading') ? this.loading : this.innerLoading;
    },
  },
  beforeDestroy () {
    clearTimeout(this.timeout);
  },
  methods: {
    handleClick (e) {
      clearTimeout(this.timeout);
      this.clicked = true;
      this.timeout = setTimeout(() => { this.clicked = false; }, 500);

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
    focus () {
      this.$el.focus();
    },
    blur () {
      this.$el.blur();
    },
  },
};
</script>

<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

import WtLineScale from './line-scale';
import WtCircle from './circle';

const SizeMapping = {
  default: {
    small: {
      size: 20,
    },
    default: {
      size: 26,
    },
    large: {
      size: 34,
      thickness: 3,
    },
  },
};

export default {
  name: 'WtLoading',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'circle',
      validator(v) {
        return !v || ['line-scale', 'circle'].indexOf(v) > -1;
      },
    },
    message: {
      type: String,
      default: '正在加载中',
    },
    loading: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: '',
      validator(v) {
        return !v || ['small', 'large', 'normal'].indexOf(v) > -1;
      },
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('loading');
    },
    loadingComponent() {
      return this.type === 'line-scale' ? WtLineScale : WtCircle;
    },
  },
  watch: {
    loading: {
      immediate: true,
      handler(v) {
        this.setLoading(v);
      },
    },
  },
  beforeDestroy() {
    clearTimeout(this.loadingTimer);
  },
  methods: {
    setLoading(v) {
      clearTimeout(this.loadingTimer);
      if (this.isLoading === v) {
        return;
      }
      if (this.delay) {
        this.loadingTimer = setTimeout(() => {
          this.isLoading = this.loading;
        }, this.delay);
      } else {
        this.isLoading = this.loading;
      }
    },
  },
  render() {
    const COMP = this.loadingComponent;
    const mapping = SizeMapping[this.type] || SizeMapping.default;
    const sizeProp = mapping[this.size] || mapping.default;
    const compProps = {
      attrs: {
        ...sizeProp,
        ...this.$attrs,
      },
    };
    const { message, prefix, isLoading: loading } = this;

    const m = this.$slots.message || message;

    const indicator = (
      <div class={prefix}>
        {this.$slots.indicator || <COMP {...compProps} />}
        {!!m && <div class={`${prefix}-message`}>{m}</div>}
      </div>
    );

    if (!this.$slots.default) {
      if (!loading) {
        return <div class={prefix}></div>;
      }
      return indicator;
    }

    return (
      <div class={`${prefix}-nested`}>
        {loading && indicator}
        <div key='container' class={`${prefix}-container ${loading ? `${prefix}-blur` : ''}`}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
};
</script>

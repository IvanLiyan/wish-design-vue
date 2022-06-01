import _extends from 'babel-runtime/helpers/extends';

import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

import WtLineScale from './line-scale';
import WtCircle from './circle';

var SizeMapping = {
  default: {
    small: {
      size: 20
    },
    default: {
      size: 26
    },
    large: {
      size: 34,
      thickness: 3
    }
  }
};

export default {
  name: 'WtLoading',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'circle',
      validator: function validator(v) {
        return !v || ['line-scale', 'circle'].indexOf(v) > -1;
      }
    },
    message: {
      type: String,
      default: '正在加载中'
    },
    loading: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '',
      validator: function validator(v) {
        return !v || ['small', 'large', 'normal'].indexOf(v) > -1;
      }
    }
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      isLoading: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('loading');
    },
    loadingComponent: function loadingComponent() {
      return this.type === 'line-scale' ? WtLineScale : WtCircle;
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler: function handler(v) {
        this.setLoading(v);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.loadingTimer);
  },

  methods: {
    setLoading: function setLoading(v) {
      var _this = this;

      clearTimeout(this.loadingTimer);
      if (this.isLoading === v) {
        return;
      }
      if (this.delay) {
        this.loadingTimer = setTimeout(function () {
          _this.isLoading = _this.loading;
        }, this.delay);
      } else {
        this.isLoading = this.loading;
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    var COMP = this.loadingComponent;
    var mapping = SizeMapping[this.type] || SizeMapping.default;
    var sizeProp = mapping[this.size] || mapping.default;
    var compProps = {
      attrs: _extends({}, sizeProp, this.$attrs)
    };
    var message = this.message,
        prefix = this.prefix,
        loading = this.isLoading;


    var m = this.$slots.message || message;

    var indicator = h(
      'div',
      { 'class': prefix },
      [this.$slots.indicator || h(COMP, compProps), !!m && h(
        'div',
        { 'class': prefix + '-message' },
        [m]
      )]
    );

    if (!this.$slots.default) {
      if (!loading) {
        return h('div', { 'class': prefix });
      }
      return indicator;
    }

    return h(
      'div',
      { 'class': prefix + '-nested' },
      [loading && indicator, h(
        'div',
        { key: 'container', 'class': prefix + '-container ' + (loading ? prefix + '-blur' : '') },
        [this.$slots.default]
      )]
    );
  }
};
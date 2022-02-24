<script>
import TabNav from './tab-nav';
import { warn } from '@/utils/console';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

function hasContent(panes, vnodes) {
  /* 当 pane 中子节点中有 v-if 时，pane.$slots.default 会为 undefined
   * 而 vnode 中的 componentOptions.children 会包含相关 vnode
   * to fix: https://tt.sankuai.com/ticket/detail?id=4028083
   */
  return panes.some((pane) => pane.hasContent);
}

function getTabPanes(vnodes) {
  return (vnodes || [])
    .filter((vnode) => {
      if (vnode.componentOptions) {
        const name = vnode.componentOptions.Ctor.options.name;
        return ['WtTabDrop', 'WtTabPane'].indexOf(name) > -1;
      }
      return false;
    })
    .map((vnode) => {
      // 必须要求 vnode 已经 mounted
      return vnode.componentInstance;
    });
}

export default {
  name: 'WtTab',

  components: {
    TabNav,
  },

  props: {
    type: String,
    closable: Boolean,
    addable: Boolean,
    value: [String, Number, Object, Array],
    tabPosition: {
      type: String,
      default: 'top',
    },
    size: {
      type: String,
      default: 'large',
    },
    lineSize: Number,
    // position left 数量
    verticalHeightNumber: {
      type: Number,
      default() {
        return 1000;
      },
    },
    dropAutosize: Boolean, // 未来将默认为 true，暂时不写属性说明
    tabComponent: {
      type: [String, Object],
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
      currentValue: this.value,
      panes: [],
      tabStyle: {
        height: null,
      },
      showPanel: true,
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('tabs');
    },
    hasInputListener() {
      return 'input' in this.$listeners;
    },
  },

  watch: {
    value(value) {
      this.setCurrentValue(value);
    },
  },

  created() {
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, { force: true }));
  },

  mounted() {
    // 判断是否需要
    this.$nextTick(() => {
      if (this.tabPosition === 'left') {
        const { offsetHeight } = this.$refs.nav.$el;
        this.tabStyle.height = offsetHeight + 'px';
      }
      const { panes } = this;
      const activeHave = panes.some((item) => {
        return item.active;
      });
      if (!activeHave) {
        if (panes[0]) {
          this.setCurrentValue(panes[0].value);
          warn(
            'Tabs',
            `no one pane has matched, activate the first item automatically. but this behavior will be removed in the future.${this.value}`,
          ); // eslint-disable-line max-len
        }
      }
    });
    this.calcPaneInstances();
  },

  updated() {
    this.calcPaneInstances();
  },

  methods: {
    calcPaneInstances(options) {
      const panes = getTabPanes(this.$slots.default);
      const changed = !(
        panes.length === this.panes.length &&
        panes.every((pane, index) => {
          return pane === this.panes[index];
        })
      );
      if (changed || (options && options.force)) {
        this.panes = panes;
        const nav = this.$refs.nav;
        nav && nav.updateNav();
        this.setCurrentValue(this.value);
        this.showPanel = this.panes && hasContent(this.panes, this.$slots.default);
      }
    },
    handleTabClick(event, tab, tabValue, index) {
      if (tab && tab.disabled) {
        return;
      }
      this.setValue(tabValue, index);
      this.$emit('tab-click', event, tab);
    },
    handleTabRemove(event, pane) {
      if (pane.disabled) return;
      event.stopPropagation();
      this.$emit('tab-remove', event, pane.value);
    },
    handlePrevClick(event) {
      this.$emit('prev-click', event);
    },
    handleNextClick(event) {
      this.$emit('next-click', event);
    },
    setValue(value, index) {
      if (this.value !== value) {
        this.$emit('input', value);
      }
      if (!this.hasInputListener) {
        // 兼容历史版本，后期移除 currentValue
        this.setCurrentValue(value, index);
        warn('Tabs', 'value is control props, it must has input event handler');
      }
    },
    setCurrentValue(value) {
      this.currentValue = value;
    },
    addTabButton(event) {
      this.$emit('tab-add', event);
    },
  },

  render(h) {
    const {
      type,
      handleTabClick,
      handleTabRemove,
      handlePrevClick,
      handleNextClick,
      currentValue,
      panes,
      closable,
      addable,
      tabPosition,
      size,
      $attrs,
      verticalHeightNumber,
      tabStyle,
      showPanel,
      lineSize,
      dropAutosize,
      prefix,
    } = this;
    const navData = {
      props: {
        currentValue,
        closable,
        addable,
        type,
        panes,
        size,
        lineSize,
        tabPosition,
        verticalHeightNumber,
        dropAutosize,
        prefix,
        getPrefixCls: this.config.getPrefixCls,
        tabComponent: this.tabComponent,
      },
      on: {
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        onPrevClick: handlePrevClick,
        onNextClick: handleNextClick,
      },
      ref: 'nav',
    };
    Object.assign(navData.props, $attrs);
    const borderStyle = {};

    if (!type) {
      if (tabPosition === 'top') {
        borderStyle['height'] = lineSize || lineSize === 0 ? `${lineSize}px` : '';
      } else {
        borderStyle['width'] = lineSize || lineSize === 0 ? `${lineSize}px` : '';
      }
    }

    const nav = (
      <div class={[`${prefix}-nav`, tabPosition]}>
        <tab-nav {...navData}></tab-nav>
        <div class={`${prefix}-bottom-border`} style={borderStyle}></div>
      </div>
    );
    const panels = (
      <div class={`${prefix}-content`} ref='panes' v-show={showPanel}>
        {this.$slots.default}
      </div>
    );
    return (
      <div
        class={{
          [`${prefix}`]: true,
          [`${prefix}-nocard`]: !type,
          [`${prefix}-card`]: type === 'card',
          [`${prefix}-border-card`]: type === 'border-card',
          [`${prefix}-left`]: this.tabPosition === 'left',
          [`${prefix}-${this.size}`]: this.size,
        }}
        style={tabStyle}
        ref='tab'
      >
        {[nav, panels]}
      </div>
    );
  },
};
</script>

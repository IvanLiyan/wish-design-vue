import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$assign from 'babel-runtime/core-js/object/assign';

import TabNav from './tab-nav';
import { warn } from '@wish/wt-vue/es/utils/console';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

function hasContent(panes, vnodes) {
  /* 当 pane 中子节点中有 v-if 时，pane.$slots.default 会为 undefined
   * 而 vnode 中的 componentOptions.children 会包含相关 vnode
   * to fix: https://tt.sankuai.com/ticket/detail?id=4028083
   */
  return panes.some(function (pane) {
    return pane.hasContent;
  });
}

function getTabPanes(vnodes) {
  return (vnodes || []).filter(function (vnode) {
    if (vnode.componentOptions) {
      var name = vnode.componentOptions.Ctor.options.name;
      return ['WtTabDrop', 'WtTabPane'].indexOf(name) > -1;
    }
    return false;
  }).map(function (vnode) {
    // 必须要求 vnode 已经 mounted
    return vnode.componentInstance;
  });
}

export default {
  name: 'WtTab',

  components: {
    TabNav: TabNav
  },

  props: {
    type: String,
    closable: Boolean,
    addable: Boolean,
    value: [String, Number, Object, Array],
    tabPosition: {
      type: String,
      default: 'top'
    },
    size: {
      type: String,
      default: 'large'
    },
    lineSize: Number,
    // position left 数量
    verticalHeightNumber: {
      type: Number,
      default: function _default() {
        return 1000;
      }
    },
    dropAutosize: Boolean, // 未来将默认为 true，暂时不写属性说明
    tabComponent: {
      type: [String, Object]
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
      currentValue: this.value,
      panes: [],
      tabStyle: {
        height: null
      },
      showPanel: true
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('tabs');
    },
    hasInputListener: function hasInputListener() {
      return 'input' in this.$listeners;
    }
  },

  watch: {
    value: function value(_value) {
      this.setCurrentValue(_value);
    }
  },

  created: function created() {
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, { force: true }));
  },
  mounted: function mounted() {
    var _this = this;

    // 判断是否需要
    this.$nextTick(function () {
      if (_this.tabPosition === 'left') {
        var offsetHeight = _this.$refs.nav.$el.offsetHeight;

        _this.tabStyle.height = offsetHeight + 'px';
      }
      var panes = _this.panes;

      var activeHave = panes.some(function (item) {
        return item.active;
      });
      if (!activeHave) {
        if (panes[0]) {
          _this.setCurrentValue(panes[0].value);
          warn('Tabs', 'no one pane has matched, activate the first item automatically. but this behavior will be removed in the future.' + _this.value); // eslint-disable-line max-len
        }
      }
    });
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  },


  methods: {
    calcPaneInstances: function calcPaneInstances(options) {
      var _this2 = this;

      var panes = getTabPanes(this.$slots.default);
      var changed = !(panes.length === this.panes.length && panes.every(function (pane, index) {
        return pane === _this2.panes[index];
      }));
      if (changed || options && options.force) {
        this.panes = panes;
        var nav = this.$refs.nav;
        nav && nav.updateNav();
        this.setCurrentValue(this.value);
        this.showPanel = this.panes && hasContent(this.panes, this.$slots.default);
      }
    },
    handleTabClick: function handleTabClick(event, tab, tabValue, index) {
      if (tab && tab.disabled) {
        return;
      }
      this.setValue(tabValue, index);
      this.$emit('tab-click', event, tab);
    },
    handleTabRemove: function handleTabRemove(event, pane) {
      if (pane.disabled) return;
      event.stopPropagation();
      this.$emit('tab-remove', event, pane.value);
    },
    handlePrevClick: function handlePrevClick(event) {
      this.$emit('prev-click', event);
    },
    handleNextClick: function handleNextClick(event) {
      this.$emit('next-click', event);
    },
    setValue: function setValue(value, index) {
      if (this.value !== value) {
        this.$emit('input', value);
      }
      if (!this.hasInputListener) {
        // 兼容历史版本，后期移除 currentValue
        this.setCurrentValue(value, index);
        warn('Tabs', 'value is control props, it must has input event handler');
      }
    },
    setCurrentValue: function setCurrentValue(value) {
      this.currentValue = value;
    },
    addTabButton: function addTabButton(event) {
      this.$emit('tab-add', event);
    }
  },

  render: function render(h) {
    var _ref;

    var type = this.type,
        handleTabClick = this.handleTabClick,
        handleTabRemove = this.handleTabRemove,
        handlePrevClick = this.handlePrevClick,
        handleNextClick = this.handleNextClick,
        currentValue = this.currentValue,
        panes = this.panes,
        closable = this.closable,
        addable = this.addable,
        tabPosition = this.tabPosition,
        size = this.size,
        $attrs = this.$attrs,
        verticalHeightNumber = this.verticalHeightNumber,
        tabStyle = this.tabStyle,
        showPanel = this.showPanel,
        lineSize = this.lineSize,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix;

    var navData = {
      props: {
        currentValue: currentValue,
        closable: closable,
        addable: addable,
        type: type,
        panes: panes,
        size: size,
        lineSize: lineSize,
        tabPosition: tabPosition,
        verticalHeightNumber: verticalHeightNumber,
        dropAutosize: dropAutosize,
        prefix: prefix,
        getPrefixCls: this.config.getPrefixCls,
        tabComponent: this.tabComponent
      },
      on: {
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        onPrevClick: handlePrevClick,
        onNextClick: handleNextClick
      },
      ref: 'nav'
    };
    _Object$assign(navData.props, $attrs);
    var borderStyle = {};

    if (!type) {
      if (tabPosition === 'top') {
        borderStyle['height'] = lineSize || lineSize === 0 ? lineSize + 'px' : '';
      } else {
        borderStyle['width'] = lineSize || lineSize === 0 ? lineSize + 'px' : '';
      }
    }

    var nav = h(
      'div',
      { 'class': [prefix + '-nav', tabPosition] },
      [h('tab-nav', navData), h('div', { 'class': prefix + '-bottom-border', style: borderStyle })]
    );
    var panels = h(
      'div',
      { 'class': prefix + '-content', ref: 'panes', directives: [{
          name: 'show',
          value: showPanel
        }]
      },
      [this.$slots.default]
    );
    return h(
      'div',
      {
        'class': (_ref = {}, _defineProperty(_ref, '' + prefix, true), _defineProperty(_ref, prefix + '-nocard', !type), _defineProperty(_ref, prefix + '-card', type === 'card'), _defineProperty(_ref, prefix + '-border-card', type === 'border-card'), _defineProperty(_ref, prefix + '-left', this.tabPosition === 'left'), _defineProperty(_ref, prefix + '-' + this.size, this.size), _ref),
        style: tabStyle,
        ref: 'tab'
      },
      [[nav, panels]]
    );
  }
};
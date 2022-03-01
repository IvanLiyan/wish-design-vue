import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _Object$assign from 'babel-runtime/core-js/object/assign';

import { cssStyle } from './style.js';
import TabBar from './tab-bar';
import TabPage from './tab-page';
import TabOne from './tab-one';
import TabDrop from './tab-drop';
import TabAdd from './tab-add';
import { addResizeListener, removeResizeListener } from '@wish/wt-vue/es/utils/resize-event';
import debounce from 'throttle-debounce/debounce';

var ONE_HUNDRED_PERCENTAGE = '100%';

export default {
  name: 'WtTabNav',

  components: {
    TabBar: TabBar,
    TabPage: TabPage,
    TabOne: TabOne,
    TabDrop: TabDrop,
    TabAdd: TabAdd
  },

  props: {
    currentValue: [String, Number, Object, Array],
    panes: Array,
    closable: Boolean,
    size: {
      type: String,
      default: 'normal'
    },
    type: String,
    lineSize: Number,
    scrollUnit: {
      type: Number,
      default: 1
    },
    tabPosition: String,
    // 垂直时，tab 数量限制
    verticalHeightNumber: Number,
    addable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      required: true
    },
    getPrefixCls: {
      type: Function,
      required: true
    },
    tabComponent: {
      type: [String, Object]
    }
  },

  data: function data() {
    return {
      fontSize: 0,
      containerWidth: 0,
      containerStyle: {},
      page: {
        offsetWidth: 0,
        offsetHeight: 0,
        pageStyle: {
          right: null,
          bottom: null,
          transform: null,
          padding: null
        }
      },
      scrollStyle: {
        'max-width': 0,
        height: null
      },
      animatedStyle: {
        transform: ''
      },
      animatedtranslate: 0,
      tabList: [],
      splitIndex: 0,
      firstIndex: 0,
      pageShow: true,
      // vertical tab height
      oneTabHeight: 0
    };
  },


  computed: {
    pageHaveShow: function pageHaveShow() {
      return this.tabPosition === 'left';
    },
    navStyle: function navStyle() {
      return {};
    },
    fixedWidth: function fixedWidth() {
      return this.page.offsetWidth;
    },
    prevStatus: function prevStatus() {
      return this.firstIndex !== 0;
    },
    scrollable: function scrollable() {
      var scrollStyle = this.scrollStyle,
          $refs = this.$refs;

      return $refs.animated.offsetWidth > scrollStyle['max-width'];
    }
  },

  watch: {
    firstIndex: function firstIndex(newValue, oldValue) {
      if (this.firstIndex < 0) {
        this.firstIndex = 0;
        return;
      }
      var widthSum = 0;
      for (var i = 0; i < this.firstIndex; i++) {
        if (this.tabPosition === 'left') {
          widthSum += this.oneTabHeight;
        } else {
          widthSum += this.tabList[i];
        }
      }
      this.animatedtranslate = -1 * widthSum;
    },
    panes: function panes() {
      var _this = this;

      // add tab 时updatetablist 数据用于计算翻页
      this.$nextTick(function () {
        _this.updateNav();
        var panes = _this.panes,
            tabList = _this.tabList;

        if (panes.length !== tabList.length) {
          _this.updateFirstIndex();
        }
        var bar = _this.$refs.bar;

        bar && bar.getStyle();
      });
    },
    animatedtranslate: function animatedtranslate() {
      var direction = '';

      switch (this.tabPosition) {
        case 'top':
          direction = 'X';
          break;
        case 'left':
          direction = 'Y';
          break;
      }
      _Object$assign(this.animatedStyle, {
        transform: 'translate' + direction + '(' + this.animatedtranslate + 'px)'
      });
    },
    currentValue: function currentValue(oldValue, newValue) {
      var _this2 = this;

      // 确保拿到当前激活的active
      this.$nextTick(function () {
        _this2.scrollToActiveTab();
      });
    }
  },

  created: function created() {
    this.isMounted = false;
    this.repaint = debounce(100, this.resetBarStyle);
  },
  mounted: function mounted() {
    var _this3 = this;

    addResizeListener(this.$el, this.updateNav);
    this.isMounted = true;
    // 等待nav 及组件 渲染结束，updateNav 内部使用子组件引用
    this.$nextTick(function () {
      _this3.updateNav();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isMounted) removeResizeListener(this.$el, this.updateNav);
  },


  methods: {
    updateFirstIndex: function updateFirstIndex() {
      var activeTabIndex = 0;
      for (var i = 0; i < this.panes.length; i++) {
        if (this.panes[i].value === this.currentValue) {
          activeTabIndex = i;
          break;
        }
      }
      var _$refs = this.$refs,
          container = _$refs.container,
          animated = _$refs.animated;

      this.updateList(container, animated);
      var list = this.tabList;
      var maxWidth = this.scrollStyle['max-width'];
      var scrollWidth = maxWidth === ONE_HUNDRED_PERCENTAGE ? 0 : parseFloat(maxWidth);
      if (scrollWidth === 0) {
        return null;
      }
      var someSum = 0;
      for (var _i = activeTabIndex; _i >= 0; _i--) {
        someSum += list[_i];
        if (someSum > scrollWidth) {
          this.firstIndex = _i + 1;
          break;
        }
      }
      if (someSum < scrollWidth) {
        this.firstIndex = 0;
      }
    },
    updateNav: function updateNav() {
      var _this4 = this;

      if (!this.isMounted) {
        return;
      }
      var tabPosition = this.tabPosition,
          verticalHeightNumber = this.verticalHeightNumber,
          prefix = this.prefix,
          $refs = this.$refs;
      var container = $refs.container,
          animated = $refs.animated,
          page = $refs.page;

      if (!container || !animated) {
        return;
      }
      var add = $refs.add;

      var page$el = page ? page.$el : undefined;

      var _ref = page$el || {},
          offsetWidth = _ref.offsetWidth,
          offsetHeight = _ref.offsetHeight;

      var list = ['margin-left', 'margin-right'];
      var style = cssStyle.apply(undefined, [page$el].concat(list));
      this.page = _Object$assign(this.page, {
        offsetWidth: offsetWidth + style['margin-left'] + style['margin-right'],
        offsetHeight: offsetHeight
      });
      this.updateList(container, animated);
      this.oneTabHeight = function () {
        for (var i = 0, len = animated.children.length; i < len; i++) {
          var item = animated.children[i];
          if (item.attributes.class.value.indexOf(prefix + '-item') !== -1) {
            var _list = ['margin-bottom'];
            var _style = cssStyle.apply(undefined, [item].concat(_list));
            return item.offsetHeight + _style['margin-bottom'];
          }
          continue;
        }
      }();

      // this.oneTabHeight 会触发tab add 渲染,更新,下面依赖渲染结果，so 添加nexttick
      this.$nextTick(function () {
        var list = ['margin-left', 'margin-right'];
        add = add || {};
        var style = cssStyle.apply(undefined, [add.$el].concat(list));
        var addWidth = add && add.$el ? add.$el.offsetWidth + style['margin-left'] + style['margin-right'] : 0;

        if (!animated) {
          // tofix https://tt.sankuai.com/ticket/detail?id=3747238
          return;
        }

        if (tabPosition === 'top') {
          var contentWidth = animated.scrollWidth + addWidth;
          var shouldShowPager = contentWidth > _this4.containerWidth;

          // 动态增加 tabs 是，由于之前没有翻页，所以在进入到次时挂载，所以 fixedWidth 会是 0。
          var pagerWidth = shouldShowPager ? Math.max(Math.min(_this4.fixedWidth || 0, 56), 56) : 0;

          var fixedWidth = pagerWidth + addWidth;

          _this4.scrollStyle['max-width'] = shouldShowPager ? _this4.containerWidth - fixedWidth + 'px' : ONE_HUNDRED_PERCENTAGE;
        } else {
          var _ref2 = page$el || { offsetWidth: 0, offsetHeight: 0 },
              _offsetWidth = _ref2.offsetWidth,
              _offsetHeight = _ref2.offsetHeight;

          _this4.scrollStyle['max-width'] = ONE_HUNDRED_PERCENTAGE;
          var isShowPage = verticalHeightNumber;
          var scrollHeight = _this4.oneTabHeight * verticalHeightNumber;
          var computedHeight = Math.min(scrollHeight, animated.offsetHeight);

          if (isShowPage && animated.offsetHeight > scrollHeight) {
            computedHeight += _offsetWidth;
            _Object$assign(_this4.scrollStyle, {
              height: scrollHeight + 'px'
            });
            _Object$assign(_this4.animatedStyle, {
              height: animated.offsetHeight + 'px'
            });
            _Object$assign(_this4.page.pageStyle, {
              bottom: (_offsetWidth - _offsetHeight) / 2 + 'px',
              right: '20px',
              transform: 'rotate(90deg)',
              padding: '2px 0'
            });
          } else {
            _this4.pageShow = false;
          }

          _this4.containerStyle = _extends({}, _this4.containerStyle, {
            height: computedHeight + 'px'
          });
        }
        // 等待 scrollStyle 应用在 scroll 元素上
        _this4.$nextTick(function () {
          // 初始化page状态
          _this4.computedPageShow();
        });
      });
    },
    updateList: function updateList(container, animated) {
      if (!this.isMounted || !container || !animated) {
        return;
      }
      var computedResult = this.computedMoreIndex(container, animated);

      for (var key in computedResult) {
        this[key] = computedResult[key];
      }
    },

    computedMoreIndex: function computedMoreIndex(container, animated) {
      if (!container || !animated) {
        return {};
      }
      var len = 0;
      var result = {
        splitIndex: this.splitIndex,
        tabList: [],
        containerWidth: this.containerWidth
      };
      // get container width

      result.containerWidth = container.offsetWidth;
      [].every.call(animated.children, function (el, index) {
        // 如果 margin-right 固定 style['margin-right']可做优化
        var list = ['margin-right'];
        var style = cssStyle.apply(undefined, [el].concat(list));
        var tabLength = el.offsetWidth + style['margin-right'];
        len = len + tabLength;

        if (len <= result.containerWidth) {
          result.splitIndex = index;
        }

        result.tabList.push(tabLength);
        return true;
      });

      var bar = this.$refs.bar;

      bar && result.tabList.shift();
      return result;
    },
    onPrevClick: function onPrevClick() {
      this.computedTranslate(-1);
    },
    onNextClick: function onNextClick() {
      this.computedTranslate(1);
    },
    computedTranslate: function computedTranslate(o) {
      this.firstIndex = this.firstIndex + o * this.scrollUnit;
    },
    scrollToActiveTab: function scrollToActiveTab() {
      var _this5 = this;

      // active 渲染结束
      this.$nextTick(function () {
        var tabPrefix = _this5.getPrefixCls('tab');
        var activeTab = _this5.$el.querySelector(tabPrefix + '-active');
        if (!activeTab) return;
        var navScroll = _this5.$refs.scroll;
        var activeTabBounding = activeTab.getBoundingClientRect();
        var navScrollBounding = navScroll.getBoundingClientRect();
        var animatedtranslate = _this5.animatedtranslate;

        var newOffset = animatedtranslate;

        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = animatedtranslate + (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          _this5.updateFirstIndex();
          var widthSum = 0;
          for (var i = 0; i < _this5.firstIndex; i++) {
            widthSum += _this5.tabList[i];
          }
          newOffset = -widthSum;
        }
        _this5.animatedtranslate = newOffset;
        _this5.$nextTick(function () {
          _this5.computedPageShow();
          var bar = _this5.$refs.bar;

          bar && bar.getStyle();
        });
      });
    },
    computedPageShow: function computedPageShow() {
      var $refs = this.$refs,
          pageHaveShow = this.pageHaveShow;
      var animated = $refs.animated,
          scroll = $refs.scroll;


      if (!animated || !scroll) {
        return;
      }
      // 比较 tab 总长度与 scroll 确定是否超长
      // pageHaveShow vertical 情况使用
      if (!pageHaveShow) {
        this.pageShow = parseFloat(animated.offsetWidth) > scroll.offsetWidth;
        if (!this.pageShow) {
          this.animatedtranslate = 0;
        }
      }
    },
    computedActive: function computedActive(currentValue, item) {
      var tabDropInfo = item.tabDropInfo;


      if (tabDropInfo) {
        return tabDropInfo.moreTabs.some(function (it) {
          var val = it.value || it.index;
          item.active = currentValue === val;
          return item.active;
        });
      }

      var val = item.value || item.index;
      item.active = currentValue === val;

      return item.active;
    },
    getNextStatus: function getNextStatus() {
      var animatedtranslate = this.animatedtranslate,
          scrollStyle = this.scrollStyle,
          $refs = this.$refs;

      var styleName = this.tabPosition === 'left' ? 'height' : 'width';
      var firstUpperCase = function firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
          return L.toUpperCase();
        });
      };
      // animatedLength 滚动剩余距离
      var cssStyleName = styleName === 'width' ? 'max-width' : styleName;
      var animatedLength = parseFloat(scrollStyle[cssStyleName]) + Math.abs(animatedtranslate);
      if (this.firstIndex === 0) {
        return true;
      } else {
        return $refs.animated && animatedLength < $refs.animated['offset' + firstUpperCase(styleName)];
      }
    },
    addClick: function addClick(event) {
      // this.computedPageShow();
      this.$parent.addTabButton(event);
    },
    resetBarStyle: function resetBarStyle() {
      this.$refs.bar && this.$refs.bar.getStyle();
    }
  },

  render: function render(h) {
    var _this6 = this;

    var type = this.type,
        size = this.size,
        panes = this.panes,
        lineSize = this.lineSize,
        scrollStyle = this.scrollStyle,
        animatedStyle = this.animatedStyle,
        prevStatus = this.prevStatus,
        pageShow = this.pageShow,
        tabPosition = this.tabPosition,
        containerStyle = this.containerStyle,
        closable = this.closable,
        addable = this.addable,
        oneTabHeight = this.oneTabHeight,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix,
        getPrefixCls = this.getPrefixCls,
        tabComponent = this.tabComponent;

    var nextStatus = pageShow ? this.getNextStatus() : false;
    var tabs = panes.map(function (item, index, all) {
      var active = _this6.computedActive(_this6.currentValue, item);
      var disabled = item.disabled,
          value = item.value,
          icon = item.icon,
          label = item.label,
          tabDropInfo = item.tabDropInfo,
          number = item.number;

      var tabValue = value || item.index || index;

      item.index = index + '';
      var tabOneData = {
        props: {
          size: size,
          disabled: disabled,
          active: active,
          icon: icon,
          number: number,
          label: label,
          pane: item, // vue 2.6+ 中 slot.label 取不到正确的值，故传递 pane 对象
          paneLabel: item.$slots.label,
          tabDropInfo: tabDropInfo,
          value: value,
          key: value,
          dropAutosize: dropAutosize,
          currentValue: _this6.currentValue,
          closable: item.$options && 'closable' in item.$options.propsData ? item.closable : closable,
          prefix: prefix,
          getPrefixCls: getPrefixCls,
          tabComponent: tabComponent
        },
        on: {
          tabClick: function tabClick(ev, activeValue) {
            // activeName select 使用
            tabValue = activeValue || tabValue;
            _this6.$emit('onTabClick', ev, item, tabValue, index);
          },
          tabRemove: function tabRemove(e) {
            _this6.$emit('onTabRemove', e, item);
          }
        },
        key: item.value,
        functional: true
      };
      return h(TabOne, tabOneData);
    });

    var barData = {
      props: {
        tabs: panes,
        lineSize: lineSize,
        tabPosition: tabPosition,
        prefix: this.prefix
      },
      ref: 'bar'
    };

    var pageData = {
      props: {
        size: size,
        prevStatus: prevStatus,
        nextStatus: nextStatus,
        pageStyle: this.page.pageStyle,
        prefix: this.prefix
      },
      on: {
        prevClick: function prevClick(event) {
          _this6.onPrevClick(event);
          _this6.$emit('onPrevClick', event);
        },
        nextClick: function nextClick(event) {
          _this6.onNextClick(event);
          _this6.$emit('onNextClick', event);
        }
      },
      ref: 'page'
    };

    var addData = {
      props: {
        width: oneTabHeight,
        prefix: this.prefix
      },
      ref: 'add'
    };

    return h(
      'div',
      {
        'class': _defineProperty({}, prefix + '-nav-container', true),
        style: containerStyle,
        ref: 'container'
      },
      [h(
        'div',
        {
          'class': _defineProperty({}, prefix + '-nav-scroll', true),
          style: scrollStyle,
          ref: 'scroll'
        },
        [h(
          'div',
          {
            'class': _defineProperty({}, prefix + '-nav-animated', true),
            style: animatedStyle,
            ref: 'animated'
          },
          [!type && h('tab-bar', barData), tabs]
        )]
      ), addable && h('tab-add', addData), pageShow && h('tab-page', pageData)]
    );
  }
};
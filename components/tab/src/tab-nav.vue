<script>
import { cssStyle } from './style.js';
import TabBar from './tab-bar';
import TabPage from './tab-page';
import TabOne from './tab-one';
import TabDrop from './tab-drop';
import TabAdd from './tab-add';
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';
import debounce from 'throttle-debounce/debounce';

const ONE_HUNDRED_PERCENTAGE = '100%';

export default {
  name: 'WtTabNav',

  components: {
    TabBar,
    TabPage,
    TabOne,
    TabDrop,
    TabAdd,
  },

  props: {
    currentValue: [String, Number, Object, Array],
    panes: Array,
    closable: Boolean,
    size: {
      type: String,
      default: 'normal',
    },
    type: String,
    lineSize: Number,
    scrollUnit: {
      type: Number,
      default: 1,
    },
    tabPosition: String,
    // 垂直时，tab 数量限制
    verticalHeightNumber: Number,
    addable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      required: true,
    },
    getPrefixCls: {
      type: Function,
      required: true,
    },
    tabComponent: {
      type: [String, Object],
    },
  },

  data() {
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
          padding: null,
        },
      },
      scrollStyle: {
        'max-width': 0,
        height: null,
      },
      animatedStyle: {
        transform: '',
      },
      animatedtranslate: 0,
      tabList: [],
      splitIndex: 0,
      firstIndex: 0,
      pageShow: true,
      // vertical tab height
      oneTabHeight: 0,
    };
  },

  computed: {
    pageHaveShow() {
      return this.tabPosition === 'left';
    },
    navStyle() {
      return {};
    },
    fixedWidth() {
      return this.page.offsetWidth;
    },
    prevStatus() {
      return this.firstIndex !== 0;
    },
    scrollable() {
      const { scrollStyle, $refs } = this;
      return $refs.animated.offsetWidth > scrollStyle['max-width'];
    },
  },

  watch: {
    firstIndex: function (newValue, oldValue) {
      if (this.firstIndex < 0) {
        this.firstIndex = 0;
        return;
      }
      let widthSum = 0;
      for (let i = 0; i < this.firstIndex; i++) {
        if (this.tabPosition === 'left') {
          widthSum += this.oneTabHeight;
        } else {
          widthSum += this.tabList[i];
        }
      }
      this.animatedtranslate = -1 * widthSum;
    },
    panes: function () {
      // add tab 时updatetablist 数据用于计算翻页
      this.$nextTick(() => {
        this.updateNav();
        const { panes, tabList } = this;
        if (panes.length !== tabList.length) {
          this.updateFirstIndex();
        }
        const { bar } = this.$refs;
        bar && bar.getStyle();
      });
    },
    animatedtranslate: function () {
      let direction = '';

      switch (this.tabPosition) {
        case 'top':
          direction = 'X';
          break;
        case 'left':
          direction = 'Y';
          break;
      }
      Object.assign(this.animatedStyle, {
        transform: `translate${direction}(${this.animatedtranslate}px)`,
      });
    },
    currentValue(oldValue, newValue) {
      // 确保拿到当前激活的active
      this.$nextTick(() => {
        this.scrollToActiveTab();
      });
    },
  },

  created() {
    this.isMounted = false;
    this.repaint = debounce(100, this.resetBarStyle);
  },

  mounted() {
    addResizeListener(this.$el, this.updateNav);
    this.isMounted = true;
    // 等待nav 及组件 渲染结束，updateNav 内部使用子组件引用
    this.$nextTick(() => {
      this.updateNav();
    });
  },

  beforeDestroy() {
    if (this.isMounted) removeResizeListener(this.$el, this.updateNav);
  },

  methods: {
    updateFirstIndex() {
      let activeTabIndex = 0;
      for (let i = 0; i < this.panes.length; i++) {
        if (this.panes[i].value === this.currentValue) {
          activeTabIndex = i;
          break;
        }
      }
      const { container, animated } = this.$refs;
      this.updateList(container, animated);
      const list = this.tabList;
      const maxWidth = this.scrollStyle['max-width'];
      const scrollWidth = maxWidth === ONE_HUNDRED_PERCENTAGE ? 0 : parseFloat(maxWidth);
      if (scrollWidth === 0) {
        return null;
      }
      let someSum = 0;
      for (let i = activeTabIndex; i >= 0; i--) {
        someSum += list[i];
        if (someSum > scrollWidth) {
          this.firstIndex = i + 1;
          break;
        }
      }
      if (someSum < scrollWidth) {
        this.firstIndex = 0;
      }
    },
    updateNav() {
      if (!this.isMounted) {
        return;
      }
      const { tabPosition, verticalHeightNumber, prefix, $refs } = this;
      const { container, animated, page } = $refs;
      if (!container || !animated) {
        return;
      }
      let { add } = $refs;
      const page$el = page ? page.$el : undefined;
      const { offsetWidth, offsetHeight } = page$el || {};
      const list = ['margin-left', 'margin-right'];
      const style = cssStyle(page$el, ...list);
      this.page = Object.assign(this.page, {
        offsetWidth: offsetWidth + style['margin-left'] + style['margin-right'],
        offsetHeight,
      });
      this.updateList(container, animated);
      this.oneTabHeight = (function () {
        for (let i = 0, len = animated.children.length; i < len; i++) {
          const item = animated.children[i];
          if (item.attributes.class.value.indexOf(`${prefix}-item`) !== -1) {
            const list = ['margin-bottom'];
            const style = cssStyle(item, ...list);
            return item.offsetHeight + style['margin-bottom'];
          }
          continue;
        }
      })();

      // this.oneTabHeight 会触发tab add 渲染,更新,下面依赖渲染结果，so 添加nexttick
      this.$nextTick(() => {
        const list = ['margin-left', 'margin-right'];
        add = add || {};
        const style = cssStyle(add.$el, ...list);
        const addWidth = add && add.$el ? add.$el.offsetWidth + style['margin-left'] + style['margin-right'] : 0;

        if (!animated) {
          // tofix https://tt.sankuai.com/ticket/detail?id=3747238
          return;
        }

        if (tabPosition === 'top') {
          const contentWidth = animated.scrollWidth + addWidth;
          const shouldShowPager = contentWidth > this.containerWidth;

          // 动态增加 tabs 是，由于之前没有翻页，所以在进入到次时挂载，所以 fixedWidth 会是 0。
          const pagerWidth = shouldShowPager ? Math.max(Math.min(this.fixedWidth || 0, 56), 56) : 0;

          const fixedWidth = pagerWidth + addWidth;

          this.scrollStyle['max-width'] = shouldShowPager
            ? this.containerWidth - fixedWidth + 'px'
            : ONE_HUNDRED_PERCENTAGE;
        } else {
          const { offsetWidth, offsetHeight } = page$el || { offsetWidth: 0, offsetHeight: 0 };
          this.scrollStyle['max-width'] = ONE_HUNDRED_PERCENTAGE;
          const isShowPage = verticalHeightNumber;
          const scrollHeight = this.oneTabHeight * verticalHeightNumber;
          let computedHeight = Math.min(scrollHeight, animated.offsetHeight);

          if (isShowPage && animated.offsetHeight > scrollHeight) {
            computedHeight += offsetWidth;
            Object.assign(this.scrollStyle, {
              height: scrollHeight + 'px',
            });
            Object.assign(this.animatedStyle, {
              height: animated.offsetHeight + 'px',
            });
            Object.assign(this.page.pageStyle, {
              bottom: (offsetWidth - offsetHeight) / 2 + 'px',
              right: '20px',
              transform: 'rotate(90deg)',
              padding: '2px 0',
            });
          } else {
            this.pageShow = false;
          }

          this.containerStyle = {
            ...this.containerStyle,
            height: computedHeight + 'px',
          };
        }
        // 等待 scrollStyle 应用在 scroll 元素上
        this.$nextTick(() => {
          // 初始化page状态
          this.computedPageShow();
        });
      });
    },
    updateList(container, animated) {
      if (!this.isMounted || !container || !animated) {
        return;
      }
      const computedResult = this.computedMoreIndex(container, animated);

      for (const key in computedResult) {
        this[key] = computedResult[key];
      }
    },
    computedMoreIndex: function (container, animated) {
      if (!container || !animated) {
        return {};
      }
      let len = 0;
      const result = {
        splitIndex: this.splitIndex,
        tabList: [],
        containerWidth: this.containerWidth,
      };
      // get container width

      result.containerWidth = container.offsetWidth;
      [].every.call(animated.children, (el, index) => {
        // 如果 margin-right 固定 style['margin-right']可做优化
        const list = ['margin-right'];
        const style = cssStyle(el, ...list);
        const tabLength = el.offsetWidth + style['margin-right'];
        len = len + tabLength;

        if (len <= result.containerWidth) {
          result.splitIndex = index;
        }

        result.tabList.push(tabLength);
        return true;
      });

      const { bar } = this.$refs;
      bar && result.tabList.shift();
      return result;
    },
    onPrevClick() {
      this.computedTranslate(-1);
    },
    onNextClick() {
      this.computedTranslate(1);
    },
    computedTranslate(o) {
      this.firstIndex = this.firstIndex + o * this.scrollUnit;
    },
    scrollToActiveTab() {
      // active 渲染结束
      this.$nextTick(() => {
        const tabPrefix = this.getPrefixCls('tab');
        const activeTab = this.$el.querySelector(`${tabPrefix}-active`);
        if (!activeTab) return;
        const navScroll = this.$refs.scroll;
        const activeTabBounding = activeTab.getBoundingClientRect();
        const navScrollBounding = navScroll.getBoundingClientRect();
        const { animatedtranslate } = this;
        let newOffset = animatedtranslate;

        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = animatedtranslate + (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          this.updateFirstIndex();
          let widthSum = 0;
          for (let i = 0; i < this.firstIndex; i++) {
            widthSum += this.tabList[i];
          }
          newOffset = -widthSum;
        }
        this.animatedtranslate = newOffset;
        this.$nextTick(() => {
          this.computedPageShow();
          const { bar } = this.$refs;
          bar && bar.getStyle();
        });
      });
    },
    computedPageShow() {
      const { $refs, pageHaveShow } = this;

      const { animated, scroll } = $refs;

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
    computedActive(currentValue, item) {
      const { tabDropInfo } = item;

      if (tabDropInfo) {
        return tabDropInfo.moreTabs.some((it) => {
          const val = it.value || it.index;
          item.active = currentValue === val;
          return item.active;
        });
      }

      const val = item.value || item.index;
      item.active = currentValue === val;

      return item.active;
    },
    getNextStatus() {
      const { animatedtranslate, scrollStyle, $refs } = this;
      const styleName = this.tabPosition === 'left' ? 'height' : 'width';
      const firstUpperCase = (str) => {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      };
      // animatedLength 滚动剩余距离
      const cssStyleName = styleName === 'width' ? 'max-width' : styleName;
      const animatedLength = parseFloat(scrollStyle[cssStyleName]) + Math.abs(animatedtranslate);
      if (this.firstIndex === 0) {
        return true;
      } else {
        return $refs.animated && animatedLength < $refs.animated[`offset${firstUpperCase(styleName)}`];
      }
    },
    addClick(event) {
      // this.computedPageShow();
      this.$parent.addTabButton(event);
    },
    resetBarStyle() {
      this.$refs.bar && this.$refs.bar.getStyle();
    },
  },

  render(h) {
    const {
      type,
      size,
      panes,
      lineSize,
      scrollStyle,
      animatedStyle,
      prevStatus,
      pageShow,
      tabPosition,
      containerStyle,
      closable,
      addable,
      oneTabHeight,
      dropAutosize,
      prefix,
      getPrefixCls,
      tabComponent,
    } = this;
    const nextStatus = pageShow ? this.getNextStatus() : false;
    const tabs = panes.map((item, index, all) => {
      const active = this.computedActive(this.currentValue, item);
      const { disabled, value, icon, label, tabDropInfo, number } = item;
      let tabValue = value || item.index || index;

      item.index = index + '';
      const tabOneData = {
        props: {
          size,
          disabled,
          active,
          icon,
          number,
          label,
          pane: item, // vue 2.6+ 中 slot.label 取不到正确的值，故传递 pane 对象
          paneLabel: item.$slots.label,
          tabDropInfo,
          value,
          key: value,
          dropAutosize,
          currentValue: this.currentValue,
          closable: item.$options && 'closable' in item.$options.propsData ? item.closable : closable,
          prefix,
          getPrefixCls,
          tabComponent,
        },
        on: {
          tabClick: (ev, activeValue) => {
            // activeName select 使用
            tabValue = activeValue || tabValue;
            this.$emit('onTabClick', ev, item, tabValue, index);
          },
          tabRemove: (e) => {
            this.$emit('onTabRemove', e, item);
          },
        },
        key: item.value,
        functional: true,
      };
      return <TabOne {...tabOneData}></TabOne>;
    });

    const barData = {
      props: {
        tabs: panes,
        lineSize,
        tabPosition,
        prefix: this.prefix,
      },
      ref: 'bar',
    };

    const pageData = {
      props: {
        size,
        prevStatus,
        nextStatus,
        pageStyle: this.page.pageStyle,
        prefix: this.prefix,
      },
      on: {
        prevClick: (event) => {
          this.onPrevClick(event);
          this.$emit('onPrevClick', event);
        },
        nextClick: (event) => {
          this.onNextClick(event);
          this.$emit('onNextClick', event);
        },
      },
      ref: 'page',
    };

    const addData = {
      props: {
        width: oneTabHeight,
        prefix: this.prefix,
      },
      ref: 'add',
    };

    return (
      <div
        class={{
          [`${prefix}-nav-container`]: true,
        }}
        style={containerStyle}
        ref='container'
      >
        <div
          class={{
            [`${prefix}-nav-scroll`]: true,
          }}
          style={scrollStyle}
          ref='scroll'
        >
          <div
            class={{
              [`${prefix}-nav-animated`]: true,
            }}
            style={animatedStyle}
            ref='animated'
          >
            {!type && <tab-bar {...barData}></tab-bar>}
            {tabs}
          </div>
        </div>
        {addable && <tab-add {...addData}></tab-add>}
        {pageShow && <tab-page {...pageData}></tab-page>}
      </div>
    );
  },
};
</script>

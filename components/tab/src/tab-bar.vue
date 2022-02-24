<script>
import { cssStyle, autoprefixer } from './style.js';
export default {
  name: 'WtTabBar',

  props: {
    tabs: Array,
    lineSize: Number,
    tabPosition: String,
    prefix: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      barStyle: {
        width: '',
        height: '',
        transform: '',
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getStyle();
    }, 0);
  },

  methods: {
    getStyle() {
      const barStyle = {};
      let offset = 0;
      let sizeName = 'width';
      let tabSize = 0;
      const firstUpperCase = (str) => {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      };
      // 过滤 $el
      if (this.tabPosition === 'top') {
        const styleList = ['padding-left', 'padding-right', 'margin-right'];

        let paddingWidth = null;
        let marginWidth = null;
        this.tabs.every((tab, index) => {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          const tabOne = tab.$tab;
          if (!tabOne) {
            // tofix: https://tt.sankuai.com/ticket/detail?id=3852483
            return;
          }
          const $el = tabOne.$el || tabOne;

          if (!$el) {
            return false;
          }

          const style = cssStyle($el, ...styleList);
          const getPaddingWidth = () => {
            const paddingLeft = style['padding-left'];
            const paddingRight = style['padding-right'];
            return paddingLeft === paddingRight ? paddingLeft : paddingLeft + paddingRight;
          };
          paddingWidth = getPaddingWidth();
          marginWidth = marginWidth || style['margin-right'];

          // if (index === this.tabs.length - 1) {
          //   offset -= tabSize / 2;
          //   // 最后一个tab bar 展示不全问题
          // }

          if (tab.active) {
            tabSize += $el[`client${firstUpperCase(sizeName)}`];
            if (sizeName === 'width' && this.tabs.length > 1) {
              tabSize -= paddingWidth * 2;
              // 计算头尾特殊tab 的line 的宽度
            }
            return false;
          }

          offset += $el[`client${firstUpperCase(sizeName)}`];
          offset += marginWidth;
          return true;
        });

        if (sizeName === 'width') {
          offset = offset + paddingWidth;
        }
        const transform = `translateX(${offset}px)`;
        barStyle[sizeName] = tabSize + 'px';
        barStyle['height'] = this.lineSize ? `${this.lineSize}px` : this.lineSize;
        barStyle.transform = transform;
        for (const key in barStyle) {
          this.barStyle[key] = barStyle[key];
        }
      } else if (this.tabPosition === 'left') {
        tabSize = 0;
        sizeName = 'height';
        let marginWidth = null;
        const styleList = ['margin-bottom'];
        this.tabs.every((tab, index) => {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          const tabOne = tab.$tab;
          const $el = tabOne.$el ? tabOne.$el : tabOne;

          if (!$el) {
            return false;
          }

          const style = cssStyle($el, ...styleList);

          marginWidth = marginWidth || style['margin-bottom'];
          if (tab.active) {
            tabSize += $el[`client${firstUpperCase(sizeName)}`];
            return false;
          }

          offset += $el[`client${firstUpperCase(sizeName)}`];
          offset += marginWidth;
          return true;
        });
        const transform = `translateY(${offset}px)`;
        barStyle[sizeName] = tabSize + 'px';
        barStyle['width'] = this.lineSize ? `${this.lineSize}px` : this.lineSize;
        barStyle.transform = transform;
        for (const key in barStyle) {
          this.barStyle[key] = barStyle[key];
        }
      }
    },
  },

  render(h) {
    const { barStyle, prefix } = this;
    return (
      <div
        class={{
          [`${prefix}-bar`]: true,
          [`${prefix}-bar-active`]: true,
        }}
        style={autoprefixer(barStyle)}
      ></div>
    );
  },
};
</script>

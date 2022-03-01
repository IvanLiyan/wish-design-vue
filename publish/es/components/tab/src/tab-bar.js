import _defineProperty from 'babel-runtime/helpers/defineProperty';

import { cssStyle, autoprefixer } from './style.js';
export default {
  name: 'WtTabBar',

  props: {
    tabs: Array,
    lineSize: Number,
    tabPosition: String,
    prefix: {
      type: String,
      required: true
    }
  },

  data: function data() {
    return {
      barStyle: {
        width: '',
        height: '',
        transform: ''
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.getStyle();
    }, 0);
  },


  methods: {
    getStyle: function getStyle() {
      var _this2 = this;

      var barStyle = {};
      var offset = 0;
      var sizeName = 'width';
      var tabSize = 0;
      var firstUpperCase = function firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
          return L.toUpperCase();
        });
      };
      // 过滤 $el
      if (this.tabPosition === 'top') {
        var styleList = ['padding-left', 'padding-right', 'margin-right'];

        var paddingWidth = null;
        var marginWidth = null;
        this.tabs.every(function (tab, index) {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          var tabOne = tab.$tab;
          if (!tabOne) {
            // tofix: https://tt.sankuai.com/ticket/detail?id=3852483
            return;
          }
          var $el = tabOne.$el || tabOne;

          if (!$el) {
            return false;
          }

          var style = cssStyle.apply(undefined, [$el].concat(styleList));
          var getPaddingWidth = function getPaddingWidth() {
            var paddingLeft = style['padding-left'];
            var paddingRight = style['padding-right'];
            return paddingLeft === paddingRight ? paddingLeft : paddingLeft + paddingRight;
          };
          paddingWidth = getPaddingWidth();
          marginWidth = marginWidth || style['margin-right'];

          // if (index === this.tabs.length - 1) {
          //   offset -= tabSize / 2;
          //   // 最后一个tab bar 展示不全问题
          // }

          if (tab.active) {
            tabSize += $el['client' + firstUpperCase(sizeName)];
            if (sizeName === 'width' && _this2.tabs.length > 1) {
              tabSize -= paddingWidth * 2;
              // 计算头尾特殊tab 的line 的宽度
            }
            return false;
          }

          offset += $el['client' + firstUpperCase(sizeName)];
          offset += marginWidth;
          return true;
        });

        if (sizeName === 'width') {
          offset = offset + paddingWidth;
        }
        var transform = 'translateX(' + offset + 'px)';
        barStyle[sizeName] = tabSize + 'px';
        barStyle['height'] = this.lineSize ? this.lineSize + 'px' : this.lineSize;
        barStyle.transform = transform;
        for (var key in barStyle) {
          this.barStyle[key] = barStyle[key];
        }
      } else if (this.tabPosition === 'left') {
        tabSize = 0;
        sizeName = 'height';
        var _marginWidth = null;
        var _styleList = ['margin-bottom'];
        this.tabs.every(function (tab, index) {
          // 注意 $el 与 compoment 的关系， 外面拼装list 的方式会对这里有影响
          var tabOne = tab.$tab;
          var $el = tabOne.$el ? tabOne.$el : tabOne;

          if (!$el) {
            return false;
          }

          var style = cssStyle.apply(undefined, [$el].concat(_styleList));

          _marginWidth = _marginWidth || style['margin-bottom'];
          if (tab.active) {
            tabSize += $el['client' + firstUpperCase(sizeName)];
            return false;
          }

          offset += $el['client' + firstUpperCase(sizeName)];
          offset += _marginWidth;
          return true;
        });
        var _transform = 'translateY(' + offset + 'px)';
        barStyle[sizeName] = tabSize + 'px';
        barStyle['width'] = this.lineSize ? this.lineSize + 'px' : this.lineSize;
        barStyle.transform = _transform;
        for (var _key in barStyle) {
          this.barStyle[_key] = barStyle[_key];
        }
      }
    }
  },

  render: function render(h) {
    var _ref;

    var barStyle = this.barStyle,
        prefix = this.prefix;

    return h('div', {
      'class': (_ref = {}, _defineProperty(_ref, prefix + '-bar', true), _defineProperty(_ref, prefix + '-bar-active', true), _ref),
      style: autoprefixer(barStyle)
    });
  }
};
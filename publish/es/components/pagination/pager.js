import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';
var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1, _obj$2, _obj$3, _obj$4;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-unborder"] = _vm.unBorderClass, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj) }, [_c('li', { class: [_vm.iconPrefix('left-thick'), _vm.prefix + "-item", _vm.prefix + "-prev", (_obj$1 = {}, _obj$1[_vm.prefix + "-disabled"] = _vm.currentPage <= 1, _obj$1)], on: { "click": _vm.prev } }, [_c('Icon', { staticStyle: { "margin-top": "4px" }, attrs: { "name": "chevron-left", "stroke-width": 1 } })], 1), _vm._v(" "), _vm.simple ? _c('li', { class: _vm.prefix + "-simple-item" }, [_vm.simpleReadonly ? _c('span', { class: _vm.prefix + "-simple-item-span" }, [_vm._v(_vm._s(_vm.currentPage))]) : _c('input', { class: _vm.prefix + "-simple-input " + _vm.pagPrefix + "-jumper-input", attrs: { "type": "number" }, domProps: { "value": _vm.currentPage }, on: { "keyup": _vm.handleKeyUp, "blur": _vm.handleChange } }), _vm._v(" "), _c('span', { class: _vm.prefix + "-simple-item-span" }, [_vm._v("/")]), _vm._v(" "), _c('span', { class: _vm.prefix + "-simple-item-span" }, [_vm._v(_vm._s(_vm.pageCount))])]) : [_vm.pageCount > 0 ? _c('li', { class: [_vm.prefix + "-item", _vm.prefix + "-number", (_obj$2 = {}, _obj$2[_vm.prefix + "-active"] = _vm.currentPage === 1, _obj$2)], on: { "click": function click($event) {
        return _vm.goTo(1);
      } } }, [_vm._v("1")]) : _vm._e(), _vm._v(" "), _vm.showPrevMore ? _c('li', { class: _vm.prefix + "-item " + _vm.prefix + "-quickprev", on: { "click": _vm.quickPrev } }, [_c('Icon', { attrs: { "name": "more-horizontal", "width": 16, "height": 16, "stroke-width": 2 } })], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.pagers, function (pager) {
    var _obj;
    return _c('li', { key: pager, class: [_vm.prefix + "-item", _vm.prefix + "-number", (_obj = {}, _obj[_vm.prefix + "-active"] = _vm.currentPage === pager, _obj)], on: { "click": function click($event) {
          return _vm.goTo(pager);
        } } }, [_vm._v(_vm._s(pager))]);
  }), _vm._v(" "), _vm.showNextMore ? _c('li', { class: _vm.prefix + "-item " + _vm.prefix + "-quicknext", on: { "click": _vm.quickNext } }, [_c('Icon', { attrs: { "name": "more-horizontal", "width": 16, "height": 16, "stroke-width": 2 } })], 1) : _vm._e(), _vm._v(" "), _vm.pageCount > 1 ? _c('li', { class: [_vm.prefix + "-item", _vm.prefix + "-number", (_obj$3 = {}, _obj$3[_vm.prefix + "-active"] = _vm.currentPage === _vm.pageCount, _obj$3)], on: { "click": function click($event) {
        return _vm.goTo(_vm.pageCount);
      } } }, [_vm._v(_vm._s(_vm.pageCount))]) : _vm._e()], _vm._v(" "), _c('li', { class: [_vm.prefix + "-item", _vm.prefix + "-next", "" + _vm.iconPrefix('right-thick'), (_obj$4 = {}, _obj$4[_vm.prefix + "-disabled"] = _vm.currentPage === _vm.pageCount, _obj$4)], on: { "click": _vm.next } }, [_c('Icon', { staticStyle: { "margin-top": "4px" }, attrs: { "name": "chevron-right", "stroke-width": 1 } })], 1)], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Pager',
  components: {
    Icon: Icon
  },
  props: {
    simple: Boolean,
    unborder: Boolean,
    size: String,
    currentPage: Number,
    pageCount: Number,
    simpleReadonly: Boolean,
    pagerCount: {
      type: Number,
      validator: function validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
      },

      default: 7
    }
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('pager');
    },
    pagPrefix: function pagPrefix() {
      return this.config.getPrefixCls('pagination');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },

    // 计算是否显示prev
    showPrevMore: function showPrevMore() {
      return this.pageCount > this.pagerCount && this.currentPage > (this.pagerCount + 1) / 2;
    },


    // 计算是否显示next
    showNextMore: function showNextMore() {
      return this.pageCount > this.pagerCount && this.currentPage < this.pageCount - (this.pagerCount - 1) / 2;
    },
    pagers: function pagers() {
      var array = [];
      if (!this.showPrevMore && this.showNextMore) {
        for (var i = 2; i < this.pagerCount; i++) {
          array.push(i);
        }
      } else if (this.showPrevMore && !this.showNextMore) {
        var startPage = this.pageCount - (this.pagerCount - 2);
        for (var _i = startPage; _i < this.pageCount; _i++) {
          array.push(_i);
        }
      } else if (this.showPrevMore && this.showNextMore) {
        var offset = Math.floor(this.pagerCount / 2) - 1;
        var start = this.currentPage - offset;
        var end = this.currentPage + offset;
        for (var _i2 = start; _i2 <= end; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < this.pageCount; _i3++) {
          array.push(_i3);
        }
      }
      return array;
    },
    unBorderClass: function unBorderClass() {
      return this.simple || this.unborder;
    }
  },

  methods: {
    goTo: function goTo(num) {
      var newPage = num > this.pageCount ? this.pageCount : num;
      if (newPage !== this.currentPage) {
        this.$emit('change', newPage);
      };
    },
    prev: function prev() {
      if (this.currentPage > 1) {
        var page = this.currentPage;
        this.goTo(page - 1);
      }
    },
    quickPrev: function quickPrev() {
      // 去掉首尾的个数
      var pagerCountOffset = this.pagerCount - 2;
      var page = this.currentPage - pagerCountOffset;
      this.goTo(page);
    },
    next: function next() {
      if (this.currentPage < this.pageCount) {
        var page = this.currentPage;
        this.goTo(page + 1);
      }
    },
    quickNext: function quickNext() {
      // 去掉首尾的个数
      var pagerCountOffset = this.pagerCount - 2;
      var page = this.currentPage + pagerCountOffset;
      this.goTo(page);
    },
    handleKeyUp: function handleKeyUp(e) {
      e.keyCode === 13 && this.goTo(Number(e.target.value));
    },
    handleChange: function handleChange(e) {
      e.target.value = ~~e.target.value;
      this.goTo(Number(e.target.value));
    }
  }
};
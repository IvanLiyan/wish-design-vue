module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 593);
/******/ })
/************************************************************************/
/******/ ({

/***/ 385:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/option");

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ }),

/***/ 467:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/select");

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pagination_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(594);


/* istanbul ignore next */
_pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name, _pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_pagination_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(595);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(596);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(436);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(597);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(602);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_3__);







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtPagination',
  components: {
    WtPage: _pager__WEBPACK_IMPORTED_MODULE_1__["default"],
    WtOptions: _options__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    size: {
      type: String
    },
    unborder: Boolean,
    simple: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOptions: {
      type: Array,
      default: function _default() {
        return [10, 20, 50, 100];
      }
    },
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    pagerCount: Number,
    selectClass: String,
    selectProps: Object,
    simpleReadonly: Boolean
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_3__["getPrefixCls"]
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('pagination');
    },
    defaultPageCount: function defaultPageCount() {
      var pageCount = Math.ceil(Number(this.total) / Number(this.pageSize));
      if (!isNaN(pageCount) && pageCount > 0) {
        return pageCount;
      }
      return 1;
    },
    defaultCurrentPage: function defaultCurrentPage() {
      if (isNaN(this.currentPage) || this.currentPage < 1) {
        this.handleCurrentChange(1);
        return 1;
      } else if (this.currentPage > this.defaultPageCount) {
        this.handleCurrentChange(this.defaultPageCount);
        return this.defaultPageCount;
      }
      return this.currentPage;
    },
    defaultPageSizeOptions: function defaultPageSizeOptions() {
      var psizeOptions = this.pageSizeOptions;
      if (this.pageSizeOptions.indexOf(this.pageSize) === -1) {
        psizeOptions.unshift(this.pageSize);
      }
      return psizeOptions;
    }
  },

  methods: {
    handleChange: function handleChange(e) {
      e.target.value = ~~e.target.value;
      this.handleCurrentChange(Number(e.target.value));
    },
    handleKeyup: function handleKeyup(e) {
      e.keyCode === 13 && this.handleCurrentChange(Number(e.target.value));
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var page = ~~(val > this.defaultPageCount ? this.defaultPageCount : val > 1 ? val : 1);
      if (page !== this.currentPage) {
        this.$emit('update:currentPage', page);
        this.$emit('change', page, this.pageSize);
      }
    },
    handlePageSizeChange: function handlePageSizeChange(val) {
      var pageCount = Math.max(1, Math.ceil(Number(this.total) / Number(val)));
      this.$emit('update:pageSize', val);
      var currentPage = pageCount < this.defaultCurrentPage ? pageCount : this.defaultCurrentPage;

      if (currentPage !== this.defaultCurrentPage) {
        this.$emit('update:currentPage', currentPage);
      }
      this.$emit('change', currentPage, val);

      // (pageCount >= this.defaultCurrentPage) &&
      //   this.$emit('change', this.currentPage, val);
    }
  },
  render: function render(h) {
    var size = this.size,
        simple = this.simple,
        prefix = this.prefix;

    var simpleClass = simple ? prefix + '-simple' : '';
    var sizeClass = size ? prefix + '-' + size : '';
    return h(
      'div',
      { 'class': prefix + ' ' + simpleClass + ' ' + sizeClass },
      [h(_pager__WEBPACK_IMPORTED_MODULE_1__["default"], babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([this.$attr, {
        attrs: {
          unborder: this.unborder,
          size: size,
          simple: simple,
          currentPage: this.defaultCurrentPage,
          pageCount: this.defaultPageCount,
          pagerCount: this.pagerCount,
          simpleReadonly: this.simpleReadonly
        },
        on: {
          'change': this.handleCurrentChange
        }
      }])), this.showQuickJumper && h(
        'span',
        { 'class': prefix + '-jumper' },
        [h('span', ['\u524D\u5F80']), h('input', {
          'class': prefix + '-jumper-input',
          attrs: { type: 'number'
          },
          domProps: {
            'value': this.defaultCurrentPage
          },
          on: {
            'keyup': this.handleKeyup,
            'blur': this.handleChange
          }
        })]
      ), this.showSizeChanger && h(_options__WEBPACK_IMPORTED_MODULE_2__["default"], {
        attrs: { size: size,
          selectProps: this.selectProps,
          pageSizeOptions: this.defaultPageSizeOptions,
          pageSize: this.pageSize
        },
        'class': this.selectClass || '',
        on: {
          'change': this.handlePageSizeChange
        }
      }), this.showTotal && h(
        'span',
        { 'class': prefix + '-total' },
        ['\u5171', this.total, '\u6761']
      )]
    );
  }
});

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(598);
/* harmony import */ var _pager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(600);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _pager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__["render"],
  _pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(599);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pager_vue_vue_type_template_id_4d956224___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj, _obj$1, _obj$2, _obj$3, _obj$4;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{class:( _obj = {}, _obj[_vm.prefix] = true, _obj[(_vm.prefix + "-unborder")] = _vm.unBorderClass, _obj[(_vm.prefix + "-" + _vm.size)] = _vm.size, _obj )},[_c('li',{class:[_vm.iconPrefix('left-thick'), (_vm.prefix + "-item"), (_vm.prefix + "-prev"), ( _obj$1 = {}, _obj$1[(_vm.prefix + "-disabled")] = _vm.currentPage <= 1, _obj$1 )],on:{"click":_vm.prev}},[_c('Icon',{staticStyle:{"margin-top":"4px"},attrs:{"name":"chevron-left","stroke-width":1}})],1),(_vm.simple)?_c('li',{class:(_vm.prefix + "-simple-item")},[(_vm.simpleReadonly)?_c('span',{class:(_vm.prefix + "-simple-item-span")},[_vm._v(_vm._s(_vm.currentPage))]):_c('input',{class:(_vm.prefix + "-simple-input " + _vm.pagPrefix + "-jumper-input"),attrs:{"type":"number"},domProps:{"value":_vm.currentPage},on:{"keyup":_vm.handleKeyUp,"blur":_vm.handleChange}}),_c('span',{class:(_vm.prefix + "-simple-item-span")},[_vm._v("/")]),_c('span',{class:(_vm.prefix + "-simple-item-span")},[_vm._v(_vm._s(_vm.pageCount))])]):[(_vm.pageCount > 0)?_c('li',{class:[(_vm.prefix + "-item"), (_vm.prefix + "-number"), ( _obj$2 = {}, _obj$2[(_vm.prefix + "-active")] = _vm.currentPage === 1, _obj$2 )],on:{"click":function($event){return _vm.goTo(1)}}},[_vm._v("1")]):_vm._e(),(_vm.showPrevMore)?_c('li',{class:(_vm.prefix + "-item " + _vm.prefix + "-quickprev"),on:{"click":_vm.quickPrev}},[_c('Icon',{attrs:{"name":"more-horizontal","width":16,"height":16,"stroke-width":2}})],1):_vm._e(),_vm._l((_vm.pagers),function(pager){
      var _obj;
return _c('li',{key:pager,class:[(_vm.prefix + "-item"), (_vm.prefix + "-number"), ( _obj = {}, _obj[(_vm.prefix + "-active")] = _vm.currentPage === pager, _obj )],on:{"click":function($event){return _vm.goTo(pager)}}},[_vm._v(_vm._s(pager))])}),(_vm.showNextMore)?_c('li',{class:(_vm.prefix + "-item " + _vm.prefix + "-quicknext"),on:{"click":_vm.quickNext}},[_c('Icon',{attrs:{"name":"more-horizontal","width":16,"height":16,"stroke-width":2}})],1):_vm._e(),(_vm.pageCount > 1)?_c('li',{class:[(_vm.prefix + "-item"), (_vm.prefix + "-number"), ( _obj$3 = {}, _obj$3[(_vm.prefix + "-active")] = _vm.currentPage === _vm.pageCount, _obj$3 )],on:{"click":function($event){return _vm.goTo(_vm.pageCount)}}},[_vm._v(_vm._s(_vm.pageCount))]):_vm._e()],_c('li',{class:[(_vm.prefix + "-item"), (_vm.prefix + "-next"), ("" + (_vm.iconPrefix('right-thick'))), ( _obj$4 = {}, _obj$4[(_vm.prefix + "-disabled")] = _vm.currentPage === _vm.pageCount, _obj$4 )],on:{"click":_vm.next}},[_c('Icon',{staticStyle:{"margin-top":"4px"},attrs:{"name":"chevron-right","stroke-width":1}})],1)],2)}
var staticRenderFns = []



/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_pager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Pager',
  components: {
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_1___default.a
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
      from: _utils_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_0__["getPrefixCls"],
        getIconCls: _utils_config__WEBPACK_IMPORTED_MODULE_0__["getIconCls"]
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
});

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(603);
/* harmony import */ var _options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(605);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__["render"],
  _options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(604);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_options_vue_vue_type_template_id_b079d102___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wt-select',_vm._b({class:(_vm.prefix + "-options"),attrs:{"value":_vm.pageSize,"size":_vm.size,"placeholder":"请选择"},on:{"input":_vm.handleChange}},'wt-select',_vm.selectProps,false),_vm._l((_vm.pageSizeOptions),function(item){return _c('wt-option',{key:item,attrs:{"label":item+'条/页',"value":item}})}),1)}
var staticRenderFns = []



/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(606);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(467);
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(385);
/* harmony import */ var _components_option__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_option__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PaginationOptions',

  components: {
    WtSelect: _components_select__WEBPACK_IMPORTED_MODULE_0___default.a,
    WtOption: _components_option__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  props: {
    pageSizeOptions: Array,
    pageSize: Number,
    size: {
      type: String
    },
    selectProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_2__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_2__["getPrefixCls"]
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('pagination');
    }
  },
  methods: {
    handleChange: function handleChange(val) {
      this.$emit('change', val);
    }
  }
});

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/config");

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/icon");

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ });
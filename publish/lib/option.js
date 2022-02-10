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
/******/ 	return __webpack_require__(__webpack_require__.s = 396);
/******/ })
/************************************************************************/
/******/ ({

/***/ 280:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/util");

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(397);


/* istanbul ignore next */
_option__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_option__WEBPACK_IMPORTED_MODULE_0__["default"].name, _option__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_option__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(398);
/* harmony import */ var _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(400);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__["render"],
  _option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(399);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_option_vue_vue_type_template_id_5d3b9530___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],class:( _obj = {}, _obj[_vm.dmi_p] = true, _obj[(_vm.dmi_p + "-selected")] = _vm.itemSelected, _obj[(_vm.dmi_p + "-disabled")] = _vm._disabled, _obj.hover = _vm.hover, _obj ),on:{"mouseenter":_vm.hoverItem,"click":function($event){$event.stopPropagation();return _vm.selectOptionClick.apply(null, arguments)}}},[(_vm.isCheckbox)?_c('wt-checkbox',{attrs:{"form-no-validate":true,"indeterminate":_vm.indeterminate,"checked":!!_vm.itemSelected,"disabled":_vm._disabled},on:{"input":_vm.selectOptionClick},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._t("default",function(){return [_c('span',[_vm._v(_vm._s(_vm.currentLabel))])]})],2):_c('span',{class:(_vm.prefix + "-label-wrapper")},[_vm._t("default",function(){return [_c('span',[_vm._v(_vm._s(_vm.currentLabel))])]}),(_vm.isMultiple && _vm.itemSelected)?_c('span',{class:(_vm.selectPrefix + "-selected-check " + (_vm.iconPrefix('check-thick')))}):_vm._e()],2)],1)}
var staticRenderFns = []



/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_type__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(280);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(402);
/* harmony import */ var _components_checkbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_checkbox__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_3__);
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
  name: 'WtOption',
  components: {
    WtCheckbox: _components_checkbox__WEBPACK_IMPORTED_MODULE_2___default.a
  },

  inject: {
    select: 'select',
    optionGroup: {
      default: null
    },
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_3__["getPrefixCls"],
        getIconCls: _utils_config__WEBPACK_IMPORTED_MODULE_3__["getIconCls"]
      }
    }
  },

  props: {
    value: [String, Number, Object, Boolean],
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },

    created: Boolean, // 用于标记是否自动创建

    isSelectAll: Boolean, // 是否全选 option
    indeterminate: Boolean // 是否半选状态，仅用于 全选时
  },

  data: function data() {
    return {
      visible: true,
      hover: false,
      hitState: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('option');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    selectPrefix: function selectPrefix() {
      return this.config.getPrefixCls('select');
    },
    dmi_p: function dmi_p() {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
    realValue: function realValue() {
      if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(this.value) && this.select.valueKey) {
        return Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__["getValueByPath"])(this.value, this.select.valueKey);
      }
      return this.value;
    },
    currentLabel: function currentLabel() {
      return Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isExist"])(this.label) ? this.label : Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isExist"])(this.value) ? this.value.toString() : '';
    },
    itemSelected: function itemSelected() {
      var _this = this;

      if (!this.select.selected) {
        return false;
      }
      if (!this.select.multiple) {
        return this.realValue === this.select.selected.realValue;
      } else {
        return this.select.selected.find(function (item) {
          return item.realValue === _this.realValue;
        });
      }
    },
    groupDisabled: function groupDisabled() {
      return this.optionGroup ? this.optionGroup.disabled : false;
    },
    _disabled: function _disabled() {
      return this.disabled || this.groupDisabled;
    },
    isMultiple: function isMultiple() {
      return this.select.multiple && !this.select.showCheckbox;
    },
    isCheckbox: function isCheckbox() {
      return this.select.multiple && this.select.showCheckbox;
    }
  },

  created: function created() {
    this.select.$emit('addOption', this);
  },
  beforeDestroy: function beforeDestroy() {
    this.select.$emit('removeOption', this);
  },


  methods: {
    hoverItem: function hoverItem() {
      if (!this._disabled) {
        this.select.$emit('hoverItem', this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (!this._disabled) {
        this.select.$emit('optionClick', this);
      }
    }
  }
});

/***/ }),

/***/ 402:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/checkbox");

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/type");

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/config");

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
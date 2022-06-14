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
/******/ 	return __webpack_require__(__webpack_require__.s = 733);
/******/ })
/************************************************************************/
/******/ ({

/***/ 227:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/popper");

/***/ }),

/***/ 613:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/lock-scroll");

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawer_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(734);
/* harmony import */ var _inside_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(739);



_drawer_vue__WEBPACK_IMPORTED_MODULE_0__["default"].COMPONENT = _inside_vue__WEBPACK_IMPORTED_MODULE_1__["default"];

/* istanbul ignore next */
_drawer_vue__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_drawer_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name, _drawer_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
};
/* harmony default export */ __webpack_exports__["default"] = (_drawer_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(735);
/* harmony import */ var _drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(737);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__["render"],
  _drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(736);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drawer_vue_vue_type_template_id_1efe8eda___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"name":"fade-in"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],class:_vm.mask ? (_vm.prefix + "-mask"): (_vm.prefix + "-wrapper"),style:({ 'z-index': _vm.zIndex }),on:{"click":_vm.handleMaskClick}})]),_c('transition',{attrs:{"name":("fade-in-" + _vm.placement)},on:{"after-leave":_vm.handleAfterLeave}},[(_vm.drawVisible)?_c('drawer',_vm._b({directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],attrs:{"placement":_vm.placement,"closable":_vm.closable,"z-index":_vm.zIndex},on:{"close":_vm.handleClickClose}},'drawer',_vm.$attrs,false),[(_vm.$slots.title)?_vm._t("title",null,{"slot":"title"}):_vm._e(),_vm._t("default")],2):_vm._e()],1)],1)}
var staticRenderFns = []



/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(738);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_lock_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(613);
/* harmony import */ var _utils_lock_scroll__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_lock_scroll__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_popper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(227);
/* harmony import */ var _utils_popper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_popper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _inside__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(739);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtDrawer',
  components: {
    Drawer: _inside__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  inheritAttrs: false,
  model: {
    prop: 'visible'
  },
  props: {
    placement: {
      type: String,
      default: 'right',
      validator: function validator(p) {
        return ['left', 'right', 'top', 'bottom'].indexOf(p) > -1;
      }
    },
    visible: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    appendToContainer: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_3__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_3__["getPrefixCls"]
      }
    }
  },
  data: function data() {
    return {
      drawVisible: this.visible,
      zIndex: 2000
    };
  },

  computed: {
    getContainer: function getContainer() {
      return this.getPopupContainer || this.config.getPContainer || Object(_utils_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().getPopupContainer;
    },
    prefix: function prefix() {
      return this.config.getPrefixCls('drawer');
    }
  },
  watch: {
    visible: function visible(val) {
      val ? this.openDrawer() : this.closeDrawer();
    }
  },
  created: function created() {
    this.$on('esc', this.handleEscClose);
  },
  mounted: function mounted() {
    this.init();
  },
  activated: function activated() {
    this.init();
  },
  deactivated: function deactivated() {
    this.destroy();
    this._modal = undefined;
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },

  methods: {
    init: function init() {
      if (this.visible) {
        this.openDrawer();
      }
    },
    destroy: function destroy() {
      this.closeDrawer(this);
      var parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    createDrawer: function createDrawer() {
      if (this.appendToContainer) {
        var parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    openDrawer: function openDrawer() {
      this.drawVisible = true;
      this.zIndex = _utils_popper__WEBPACK_IMPORTED_MODULE_1__["PopupManage"].nextZIndex();
      _utils_popper__WEBPACK_IMPORTED_MODULE_1__["PopupManage"].open(this);
      if (!this._drawer) {
        this._drawer = this.createDrawer();
      }
      if (this.lockScroll) {
        Object(_utils_lock_scroll__WEBPACK_IMPORTED_MODULE_0__["lock"])(document.body);
      }
      this.$emit('open');
    },
    closeDrawer: function closeDrawer() {
      _utils_popper__WEBPACK_IMPORTED_MODULE_1__["PopupManage"].close(this);
      if (this.lockScroll) {
        Object(_utils_lock_scroll__WEBPACK_IMPORTED_MODULE_0__["unlock"])(document.body);
      }
      this._drawer = false;
    },
    handleAfterLeave: function handleAfterLeave() {
      if (this.destroyOnClose) {
        this.drawVisible = false;
      }
    },
    handleMaskClick: function handleMaskClick() {
      if (this.maskClosable) {
        this.handleClickClose();
      }
    },
    handleClickClose: function handleClickClose() {
      this.$emit('input', false);
      this.$emit('close');
    },
    handleEscClose: function handleEscClose(e) {
      this.visible && this.closable && this.handleClickClose();
    }
  }
});

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(740);
/* harmony import */ var _inside_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(742);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _inside_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(741);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_inside_vue_vue_type_template_id_1bb1b59c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[_vm.prefix] = true, _obj[(_vm.prefix + "-" + _vm.placement)] = true, _obj ),style:(_vm.drawerStyle)},[(_vm.closable)?_c('div',{class:(_vm.prefix + "-close"),on:{"click":_vm.handleClickClose}},[_c('Icon',{attrs:{"name":"x"}})],1):_vm._e(),(_vm.title || _vm.$slots.title)?_c('div',{class:(_vm.prefix + "-header")},[_vm._t("title",function(){return [_vm._v(" "+_vm._s(_vm.title)+" ")]})],2):_vm._e(),_c('div',{class:(_vm.prefix + "-content")},[_vm._t("default")],2)])}
var staticRenderFns = []



/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_inside_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(743);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_inside_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_type__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_1__);
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
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtDrawer',
  components: {
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  props: {
    title: String,
    width: {
      type: [Number, String],
      default: 232
    },
    height: {
      type: [Number, String],
      default: 232
    },
    closable: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'right'
    },
    zIndex: Number
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
      return this.config.getPrefixCls('drawer');
    },
    isVertical: function isVertical() {
      return ['left', 'right'].indexOf(this.placement) > -1;
    },
    drawerStyle: function drawerStyle() {
      var style = {
        zIndex: this.zIndex
      };
      if (this.isVertical) {
        style.width = Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(this.width) ? this.width + 'px' : this.width;
      } else {
        style.height = Object(_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(this.height) ? this.height + 'px' : this.height;
      }
      return style;
    }
  },
  methods: {
    handleClickClose: function handleClickClose() {
      this.$emit('close');
    }
  }
});

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/type");

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
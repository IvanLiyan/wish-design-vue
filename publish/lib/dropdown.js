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
/******/ 	return __webpack_require__(__webpack_require__.s = 188);
/******/ })
/************************************************************************/
/******/ ({

/***/ 156:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/hoc");

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropdown_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(189);
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(195);


var WtDropdown = Object(_control__WEBPACK_IMPORTED_MODULE_1__["default"])('WtDropdown', _dropdown_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* istanbul ignore next */
WtDropdown.install = function (Vue) {
  Vue.component(WtDropdown.name, WtDropdown);
};
/* harmony default export */ __webpack_exports__["default"] = (WtDropdown);

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(190);
/* harmony import */ var _dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(192);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(191);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_dropdown_vue_vue_type_template_id_643c0f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Popper',_vm._b({ref:"popper",class:( _obj = {}, _obj[_vm.prefix] = true, _obj[(_vm.prefix + "-expended")] = _vm.visible, _obj ),attrs:{"visible":_vm.visible,"trigger":_vm.trigger,"placement":_vm.placement,"show-arrow":_vm.showArrow,"popper-disabled":_vm.disabled},on:{"update:visible":_vm.updateVisible,"clickoutside":_vm.clickoutside}},'Popper',_vm.$attrs,false),[_c('Reference',{ref:"reference"},[_vm._t("default")],2),_c('Drop',{class:[_vm.popperClass, (_vm.prefix + "-popper")],style:({ 'min-width': _vm.width }),attrs:{"use-show":_vm.useShow}},[_vm._t("dropdown")],2)],1)}
var staticRenderFns = []



/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(193);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(194);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_popper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_1__);
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
  name: 'WtDropdown',
  components: {
    Popper: _components_popper__WEBPACK_IMPORTED_MODULE_0__["Popper"],
    Drop: _components_popper__WEBPACK_IMPORTED_MODULE_0__["Drop"],
    Reference: _components_popper__WEBPACK_IMPORTED_MODULE_0__["Reference"]
  },
  inheritAttrs: false,
  model: {
    prop: 'visible'
  },
  props: {
    visible: Boolean,
    trigger: {
      type: String,
      default: 'click'
    },
    placement: String,
    popperClass: [String, Object, Array],
    showArrow: Boolean,
    disabled: Boolean,
    visibleOnMenuItemClick: {
      type: Boolean,
      default: false
    },

    shouldComputedWidth: {
      type: Boolean,
      default: true
    },
    useShow: Boolean // 暂时不确定属性名，谨慎使用
  },
  provide: function provide() {
    return {
      dropdown: this
    };
  },

  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_1__["getPrefixCls"]
      }
    }
  },
  data: function data() {
    return {
      width: 'auto'
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('dropdown');
    }
  },
  watch: {
    visible: function visible(v) {
      if (v && this.shouldComputedWidth) {
        var _$refs$reference$$el$ = this.$refs.reference.$el.getBoundingClientRect(),
            width = _$refs$reference$$el$.width;

        this.width = width + 'px';
      }
    }
  },
  mounted: function mounted() {
    this.$on('itemClick', this.handleMenuItemClick);
  },

  methods: {
    clickoutside: function clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    updateVisible: function updateVisible(v) {
      this.$emit('input', v);
    },
    handleMenuItemClick: function handleMenuItemClick() {
      if (!this.visibleOnMenuItemClick) {
        this.$emit('input', false);
      }
    },
    updatePopper: function updatePopper() {
      var popper = this.$refs.popper;

      if (this.visible && popper) {
        popper.updatePopper();
      }
    }
  }
});

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/popper");

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_hoc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(156);
/* harmony import */ var _utils_hoc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_hoc__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (name, Component) {
  return _utils_hoc__WEBPACK_IMPORTED_MODULE_0___default()({
    name: name,
    model: {
      prop: 'visible'
    },
    props: {
      defaultVisible: {
        type: Boolean,
        default: false
      },
      visible: Boolean
    },
    data: function data() {
      return {
        vs: this.defaultVisible
      };
    },

    computed: {
      isControlled: function isControlled() {
        return 'visible' in this.$options.propsData;
      },
      _visible: function _visible() {
        return this.isControlled ? this.visible : this.vs;
      }
    },
    methods: {
      handleInput: function handleInput(v) {
        this.$emit('input', v);
        if (!this.isControlled) {
          this.vs = v;
        }
      },
      updatePopper: function updatePopper() {
        var wrappedInstance = this.$refs.wrappedInstance;

        wrappedInstance && wrappedInstance.updatePopper();
      }
    }
  }, {
    withRef: true,
    mapStateToProps: function mapStateToProps(context) {
      return {
        visible: context._visible
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        input: context.handleInput
      };
    }
  })(Component);
});

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
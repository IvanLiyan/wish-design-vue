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
/******/ 	return __webpack_require__(__webpack_require__.s = 788);
/******/ })
/************************************************************************/
/******/ ({

/***/ 168:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/hoc");

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/popper");

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/transitions/expansion-transition");

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777);


/* istanbul ignore next */
_control_js__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_control_js__WEBPACK_IMPORTED_MODULE_0__["default"].name, _control_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_control_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_hoc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var _utils_hoc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_hoc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tooltip_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(778);



/* harmony default export */ __webpack_exports__["default"] = (_utils_hoc__WEBPACK_IMPORTED_MODULE_0___default()({
  name: 'WtStooltip',
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
    },
    getPopper: function getPopper() {
      var wrappedInstance = this.$refs.wrappedInstance;

      return wrappedInstance.$refs.popper;
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
})(_tooltip_vue__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(779);
/* harmony import */ var _tooltip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(781);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _tooltip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(780);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tooltip_vue_vue_type_template_id_29d3774f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('popper',_vm._b({ref:"popper",class:(_vm.prefix + "-rel"),attrs:{"tag":_vm.tag,"popper-disabled":_vm.disabled,"trigger":_vm.trigger,"show-arrow":_vm.showArrow,"visible":!_vm.disabled && _vm.visible,"open-delay":_vm.openDelay},on:{"update:visible":_vm.handleVisibleChange,"clickoutside":_vm.clickoutside}},'popper',_vm.$attrs,false),[_c('reference',[_vm._t("default")],2),_c('drop',{class:[_vm.prefix, ( _obj = {}, _obj[(_vm.prefix + "-" + _vm.size)] = _vm.size, _obj[(_vm.prefix + "-" + _vm.theme)] = _vm.theme, _obj ), _vm.popperClass]},[_vm._t("content",function(){return [_vm._v(_vm._s(_vm.content))]})],2)],1)}
var staticRenderFns = []



/***/ }),

/***/ 781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tooltip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(782);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_tooltip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(206);
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




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'WtStooltip',
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
    content: [String, Number],
    visible: Boolean,
    size: String,
    showArrow: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    popperClass: [String, Object, Array],
    disabled: Boolean,
    theme: {
      type: String
    },
    openDelay: {
      type: Number,
      default: 300
    },
    tag: {
      type: [String, Object],
      default: 'span'
    }
  },
  inject: {
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_1__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_1__["getPrefixCls"]
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('stooltip');
    }
  },
  methods: {
    clickoutside: function clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    handleVisibleChange: function handleVisibleChange(v) {
      this.$emit('input', v);
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

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _submenu_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(789);

/* istanbul ignore next */
_submenu_vue__WEBPACK_IMPORTED_MODULE_0__["default"].install = function (Vue) {
  Vue.component(_submenu_vue__WEBPACK_IMPORTED_MODULE_0__["default"].name, _submenu_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
};
/* harmony default export */ __webpack_exports__["default"] = (_submenu_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(790);
/* harmony import */ var _submenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(792);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _submenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(791);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_submenu_vue_vue_type_template_id_3275797b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 791:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
var _obj, _obj$1;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:[_vm.prefix, ( _obj = {}, _obj[(_vm.prefix + "-disabled")] = _vm.disabled, _obj[(_vm.prefix + "-expanded")] = _vm.isExpanded, _obj[(_vm.prefix + "-active")] = _vm.active || _vm.showChildActive, _obj )],on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave}},[_c('wt-stooltip',_vm._b({attrs:{"disabled":!_vm.enabledTip,"content":_vm.stooltip,"placement":_vm.tooltipPlacement,"tag":"div"}},'wt-stooltip',_vm.tooltipProps,false),[_c('div',{class:(_vm.prefix + "-title"),style:(_vm.style),on:{"click":_vm.handleClickTitle}},[(_vm.icon || _vm.$slots.icon)?_c('span',{class:(_vm.prefix + "-icon")},[_vm._t("icon",function(){return [_c('i',{class:_vm.icon})]})],2):_vm._e(),(_vm.level !== 0 || !_vm.isCollapse)?_c('div',{class:(_vm.prefix + "-text")},[_vm._t("title")],2):_vm._e(),_c('Icon',{class:[(_vm.prefix + "-direction"), ( _obj$1 = {}, _obj$1[(_vm.prefix + "-direction-expanded")] = _vm.isExpanded, _obj$1 )],attrs:{"name":"chevron-down","width":12,"height":12}})],1),_c('div',{attrs:{"slot":"content"},slot:"content"},[_vm._v(_vm._s(_vm.stooltip))])]),(!_vm.isPopup)?_c('wt-expansion-transition',{on:{"after-enter":_vm.handleAnimateEnd,"after-leave":_vm.handleAnimateEnd}},[(_vm.isMounted)?_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpanded),expression:"isExpanded"}],class:(_vm.prefix + "-content")},[_vm._t("default")],2):_vm._e()]):_vm._e(),(_vm.isPopup)?_c('dropdown-smenu',{attrs:{"visible":_vm.isExpanded,"lazy":_vm.lazy,"disabled":_vm.disabled,"placement":_vm.dropdownPlacement,"level":_vm.level,"popper-class":_vm.popperClass},on:{"mouseenter":_vm.clearTimer,"mouseleave":_vm.closePopup}},[_vm._t("default")],2):_vm._e()],1)}
var staticRenderFns = []



/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_submenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(793);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_submenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions_expansion_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(505);
/* harmony import */ var _transitions_expansion_transition__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_transitions_expansion_transition__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(794);
/* harmony import */ var _components_stooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(776);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85);
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_vnode__WEBPACK_IMPORTED_MODULE_5__);
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
  name: 'WtSsubmenu',
  inject: {
    smenu: 'smenu',
    ssubmenu: {
      default: ''
    },
    config: {
      from: _utils_config__WEBPACK_IMPORTED_MODULE_4__["CONFIG_PROVIDER"],
      default: {
        getPrefixCls: _utils_config__WEBPACK_IMPORTED_MODULE_4__["getPrefixCls"]
      }
    }
  },
  components: {
    WtExpansionTransition: _transitions_expansion_transition__WEBPACK_IMPORTED_MODULE_0___default.a,
    DropdownMenu: _drop__WEBPACK_IMPORTED_MODULE_1__["default"],
    WtStooltip: _components_stooltip__WEBPACK_IMPORTED_MODULE_2__["default"],
    Icon: _components_icon__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  props: {
    icon: String,
    name: [Number, String],
    disabled: Boolean,
    closeDelay: {
      type: Number,
      default: 100
    },
    openDelay: {
      type: Number,
      default: 0
    },
    stooltip: String,
    enabledTooltip: Boolean,
    tooltipProps: Object,
    popperClass: String
  },
  provide: function provide() {
    return {
      ssubmenu: this
    };
  },
  data: function data() {
    return {
      dropdownData: [],
      activeChild: null,
      isMounted: !this.smenu.lazy,
      animating: true
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('ssubmenu');
    },
    isExpanded: function isExpanded() {
      return this.smenu.isExpanded(this);
    },
    isCollapse: function isCollapse() {
      return this.smenu.isCollapse;
    },
    parent: function parent() {
      return this.ssubmenu || this.smenu;
    },
    level: function level() {
      return this.parent.level + 1;
    },
    paddingLeft: function paddingLeft() {
      return this.smenu.baseIndent + this.level * this.smenu.indent;
    },
    style: function style() {
      return this.smenu.getItemStyled(this);
    },
    active: function active() {
      if (this.level === 0 && (this.smenu.mode !== 'inline' || this.smenu.isCollapse)) {
        return this.hasChildActive;
      }
      return undefined;
    },
    isPopup: function isPopup() {
      return this.isCollapse || this.smenu.mode !== 'inline';
    },
    dropdownPlacement: function dropdownPlacement() {
      return this.level === 0 && this.smenu.mode === 'horizontal' ? 'bottom' : 'right-start';
    },
    isClickTrigger: function isClickTrigger() {
      return !this.isPopup;
    },
    tooltipPlacement: function tooltipPlacement() {
      if (!this.tooltipProps) {
        return 'right';
      }
      return this.tooltipProps.placement || 'right';
    },
    enabledTip: function enabledTip() {
      if (!this.stooltip) {
        return false;
      }
      return this.disabled ? this.enabledTooltip : this.smenu.mode !== 'horizontal';
    },
    hasChildActive: function hasChildActive() {
      return !!this.activeChild;
    },
    showChildActive: function showChildActive() {
      return this.hasChildActive && (this.isPopup || !this.isExpanded && !this.animating);
    },
    lazy: function lazy() {
      return this.smenu.lazy;
    }
  },
  watch: {
    isExpanded: {
      immediate: true,
      handler: function handler(n) {
        n && (this.isMounted = n);
        this.animating = true;
      }
    }
  },
  created: function created() {
    this.$on('activeChange', this.handleChildActiveChange);
    this.$on('menuItemClick', this.handleMenuItemClick);
    this.$on('ssubmenu-enter', this.handleMouseenter);
    this.$on('ssubmenu-leave', this.handleMouseleave);
  },
  mounted: function mounted() {
    this.computedActive();
  },
  updated: function updated() {
    this.computedActive();
  },
  destroyed: function destroyed() {
    clearTimeout(this.timer);
  },

  methods: {
    computedActive: function computedActive() {
      var _smenu = this.smenu,
          foundedActivedItem = _smenu.foundedActivedItem,
          isActive = _smenu.isActive,
          lazy = _smenu.lazy;

      if (lazy) {
        if (!foundedActivedItem) {
          var items = Object(_utils_vnode__WEBPACK_IMPORTED_MODULE_5__["findVNodesFromSlot"])(this.$slots.default, 'MtdMenuItem');
          var activeItem = items.find(function (item) {
            return isActive(Object(_utils_vnode__WEBPACK_IMPORTED_MODULE_5__["getProps"])(item));
          });
          if (activeItem) {
            this.activeChild = Object(_utils_vnode__WEBPACK_IMPORTED_MODULE_5__["getProps"])(activeItem);
          }
        }
        if (this.activeChild && !isActive(this.activeChild)) {
          this.activeChild = undefined;
        }
      }
    },
    handleChildActiveChange: function handleChildActiveChange(item) {
      if (item.active) {
        this.activeChild = item;
        this.ssubmenu && this.ssubmenu.$emit('activeChange', item);
      } else if (this.activeChild === item) {
        this.activeChild = null;
        this.ssubmenu && this.ssubmenu.$emit('activeChange', item);
      }
    },
    handleClickTitle: function handleClickTitle() {
      if (this.disabled) {
        return;
      }
      if (this.isPopup) {
        // 当处于需要展开菜单的模式时;
        if (!this.isClickTrigger) return;
        return;
      }
      // 不处于需要展开菜单的模式时才触发;
      if (this.isCollapse) {
        this.smenu.toggleCollapse();
      }
      this.smenu.toggleExpanded(this);
    },
    handleMouseenter: function handleMouseenter() {
      var _this = this;

      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('ssubmenu-enter');
      clearTimeout(this.timer);
      if (!this.isExpanded) {
        this.timer = setTimeout(function () {
          _this.smenu.toggleExpanded(_this);
        }, this.openDelay);
      }
    },
    handleMouseleave: function handleMouseleave() {
      var _this2 = this;

      if (this.isClickTrigger || this.disabled) return;
      this.parent.$emit('ssubmenu-leave');
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (_this2.isExpanded) {
          _this2.isExpanded && _this2.smenu.toggleExpanded(_this2);
        }
      }, this.closeDelay);
    },
    clearTimer: function clearTimer() {
      this.parent.$emit('ssubmenu-enter');
      this.timer && clearTimeout(this.timer);
    },
    closePopup: function closePopup() {
      this.handleMouseleave();
    },
    handleMenuItemClick: function handleMenuItemClick() {
      this.closePopup();
      this.ssubmenu && this.ssubmenu.$emit('menuItemClick', this);
    },
    handleAnimateEnd: function handleAnimateEnd() {
      this.animating = false;
    }
  }
});

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(795);
/* harmony import */ var _drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(797);
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(796);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drop_vue_vue_type_template_id_582785b3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Popper',{ref:"popper",attrs:{"popper-disabled":_vm.disabled,"placement":_vm.placement,"visible":_vm.v,"show-arrow":_vm.level === 0}},[_c('Drop',{class:_vm.dropClassName,attrs:{"tag":"ul","use-show":!_vm.lazy},on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave}},[_vm._t("default")],2)],1)}
var staticRenderFns = []



/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(798);
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_build_dependence_vue_source_doc_loader_index_js_drop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(206);
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




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DropdownMenu',
  components: {
    Popper: _components_popper__WEBPACK_IMPORTED_MODULE_0__["Popper"],
    Drop: _components_popper__WEBPACK_IMPORTED_MODULE_0__["Drop"]
  },
  inheritAttrs: false,
  props: {
    placement: String,
    level: Number,
    disabled: Boolean,
    visible: Boolean,
    lazy: Boolean,
    popperClass: String
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
      v: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('smenu');
    },
    dropClassName: function dropClassName() {
      var prefix = this.prefix;

      var submenu = this.config.getPrefixCls('ssubmenu');
      return [prefix, prefix + '-light', prefix + '-vertical', submenu + '-dropdown', this.popperClass];
    }
  },
  watch: {
    visible: function visible() {
      this.v = this.visible;
    }
  },
  mounted: function mounted() {
    this.$refs.popper.registerReference(this.$parent);
    this.v = this.visible;
    // this.$refs.popper.init();
  },

  methods: {
    handleMouseenter: function handleMouseenter(e) {
      this.$emit('mouseenter', e);
    },
    handleMouseleave: function handleMouseleave(e) {
      this.$emit('mouseleave', e);
    }
  }
});

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = require("@wish/wt-vue/lib/utils/vnode");

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
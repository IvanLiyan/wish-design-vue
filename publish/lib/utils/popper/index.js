'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupManage = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _popper = require('popper.js/dist/umd/popper');

var _popper2 = _interopRequireDefault(_popper);

var _dom = require('../dom');

var _popupManage = require('./popup-manage');

var _popupManage2 = _interopRequireDefault(_popupManage);

var _util = require('@wish/wd-vue/lib/utils/util');

var _config = require('@wish/wd-vue/lib/utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isServer = _vue2.default.prototype.$isServer;

var defaultPopperOptions = {
  computeStyle: {
    gpuAcceleration: false
  },
  preventOverflow: {
    // enabled: false,
    boundariesElement: 'viewport'
  },
  hide: {
    enabled: false
  }
  // flip: { behavior: ['right', 'left', 'bottom', 'top'] },
};
exports.PopupManage = _popupManage2.default;
exports.default = {
  props: {
    visible: Boolean,
    appendToContainer: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    placement: {
      type: String,
      default: 'bottom-start',
      validator: function validator(value) {
        return (/^(top|bottom|left|right)(-start|-end)?$/g.test(value)
        );
      }
    },
    popperOptions: Object,
    trigger: {
      // 暂定，触发 update:visible 事件的方式
      type: String,
      default: 'custom',
      validator: function validator(v) {
        return ['click', 'hover', 'focus', 'custom'].includes(v);
      }
    },
    popperDisabled: Boolean,
    showArrow: Boolean,
    openDelay: Number,
    closeDelay: {
      type: Number,
      default: 200 // 防止由于快速关闭而导致不能移入到 drop 元素上
    },
    toggleOnReferenceClick: {
      type: Boolean,
      default: true
    }
  },
  created: function created() {
    this.$on('esc', this.handleEscClose);
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },
  activated: function activated() {
    this.init();
  },


  // call destroy in keep-alive mode
  deactivated: function deactivated() {
    this.destroy();
  },


  inject: {
    config: {
      from: _config.CONFIG_PROVIDER,
      default: {}
    }
  },

  data: function data() {
    return {
      popperVisible: false,
      options: {} // popper options
    };
  },

  computed: {
    getContainer: function getContainer() {
      return this.getPopupContainer || this.config.getPContainer || (0, _config.getConfig)().getPopupContainer;
    }
  },
  watch: {
    visible: function visible(val) {
      val ? this.updatePopper() : this.destroyPopper();
    },
    popperDisabled: function popperDisabled(n) {
      n ? this.removePopperListener() : this.addPopperListener();
    },
    placement: function placement() {
      if (this.popperJS) {
        this.popperJS.options.placement = this.placement;
        this.updatePopper();
      }
    }
  },
  methods: {
    init: function init() {
      if (this.visible) {
        // 会存在 activated 后立即执行 beforeDestroy 的情况。
        // 详见: https://tt.sankuai.com/ticket/detail?id=3892540
        this.updatePopper();
      }
      var popperDisabled = this.popperDisabled;

      popperDisabled ? this.removePopperListener() : this.addPopperListener();
    },
    destroy: function destroy() {
      _popupManage2.default.close(this);
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
      this.removePopperListener();
    },
    getReference: function getReference() {
      return this.$refs.reference || this.reference;
    },
    getDrop: function getDrop() {
      return this.$refs.drop || this.drop;
    },
    createPopper: function createPopper() {
      var _this = this;

      var reference = this.getReference();
      var drop = this.getDrop();
      if (!reference || !drop) {
        console.error('need reference or drop element');
        return;
      }
      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy();
      }

      // append to popupcontainer
      if (this.appendToContainer) {
        var parent = this.getContainer();
        parent.appendChild(drop);
      }
      var options = this.options;

      var modifiers = (0, _util.mergeDeep)(
      // {
      //   ...defaultPopperOptions,
      // },
      (0, _util.deepCopy)(defaultPopperOptions), (0, _extends3.default)({}, this.popperOptions));
      modifiers.arrow = (0, _extends3.default)({}, modifiers.arrow, {
        enabled: this.showArrow
      });
      options.modifiers = modifiers;

      options.placement = this.placement;
      options.removeOnDestroy = true;
      options.onCreate = function () {
        _this.$nextTick(_this.updatePopper);
        _this.$emit('created', _this);
      };
      this.popperJS = new _popper2.default(reference, drop, options);
    },
    updatePopper: function updatePopper() {
      if (isServer || !this.visible) {
        // 存在 nextTick 中调用 updatePopper 的情况，此时 visible 有出现 false 的可能
        return;
      }
      var popperJS = this.popperJS;

      if (popperJS) {
        popperJS.enableEventListeners();
        popperJS.scheduleUpdate();
        if (!this.popperVisible) {
          _popupManage2.default.open(this);
          if (popperJS.popper) {
            popperJS.popper.style.zIndex = _popupManage2.default.nextZIndex();
          }
        }
        this.popperVisible = true;
      } else {
        this.createPopper();
      }
      this.$emit('show');
    },
    destroyPopper: function destroyPopper() {
      clearTimeout(this._timer);
      if (this.popperJS) {
        this.popperJS.disableEventListeners();
      }
      this.popperVisible = false;
      _popupManage2.default.close(this);
      this.$emit('hide');
    },
    handleEscClose: function handleEscClose() {
      this.visible && this.hideDrop();
    },
    handleReferenceClick: function handleReferenceClick() {
      if (this.toggleOnReferenceClick || !this.visible) {
        this.$emit('update:visible', !this.visible);
      }
    },
    handleDocumentClick: function handleDocumentClick(e) {
      if (!this.visible) {
        return;
      }
      var reference = this.getReference();
      var drop = this.getDrop();

      var target = e.target;

      if (reference.contains(target) || drop.contains(target)) {
        return;
      }
      this.$emit('clickoutside', e);
      this.$emit('update:visible', false);
    },
    handlerDropMouseEnter: function handlerDropMouseEnter() {
      /**
       * tofix: https://tt.sankuai.com/ticket/detail?id=4057761
       * 关闭延迟为 0 时，不可移入
       * */
      if (this.closeDelay === 0) {
        return;
      }
      this.showDrop();
    },
    showDrop: function showDrop() {
      var _this2 = this;

      clearTimeout(this._timer);
      if (this.visible) {
        return;
      }
      if (this.openDelay) {
        this._timer = setTimeout(function () {
          _this2.$emit('update:visible', true);
        }, this.openDelay);
      } else {
        this.$emit('update:visible', true);
      }
    },
    hideDrop: function hideDrop() {
      var _this3 = this;

      clearTimeout(this._timer);
      if (!this.visible) {
        return;
      }
      if (this.closeDelay) {
        this._timer = setTimeout(function () {
          _this3.$emit('update:visible', false);
        }, this.closeDelay);
      } else {
        this.$emit('update:visible', false);
      }
    },
    addPopperClickListener: function addPopperClickListener() {
      var reference = this.getReference();

      (0, _dom.on)(reference, 'click', this.handleReferenceClick);
      /* 这个地方必须用 mousedown 事件替换 click 事件，
        详见: https://tt.sankuai.com/ticket/detail?id=3846583
      */
      (0, _dom.on)(document, 'mousedown', this.handleDocumentClick);
    },
    addPopperHoverListener: function addPopperHoverListener() {
      var reference = this.getReference();
      var drop = this.getDrop();

      (0, _dom.on)(reference, 'mouseenter', this.showDrop);
      (0, _dom.on)(drop, 'mouseenter', this.handlerDropMouseEnter);
      (0, _dom.on)(reference, 'mouseleave', this.hideDrop);
      (0, _dom.on)(drop, 'mouseleave', this.hideDrop);
    },
    addPopperFocusListener: function addPopperFocusListener() {
      var reference = this.getReference();
      (0, _dom.on)(reference, 'focus', this.showDrop);
      (0, _dom.on)(reference, 'blur', this.hideDrop);
    },
    addPopperListener: function addPopperListener() {
      var reference = this.getReference();
      if (reference) {
        switch (this.trigger) {
          case 'click':
            this.addPopperClickListener();
            break;
          case 'hover':
            this.addPopperHoverListener();
            break;
          case 'focus':
            // 暂时不管能否 focus
            this.addPopperFocusListener();
            break;
        }
      }
    },
    removePopperListener: function removePopperListener() {
      var reference = this.getReference();
      var drop = this.getDrop();
      (0, _dom.off)(reference, 'click', this.handleReferenceClick);
      (0, _dom.off)(reference, 'mouseleave', this.hideDrop);
      (0, _dom.off)(reference, 'mouseenter', this.showDrop);
      (0, _dom.off)(drop, 'mouseleave', this.hideDrop);
      (0, _dom.off)(drop, 'mouseenter', this.showDrop);
      (0, _dom.off)(document, 'mousedown', this.handleDocumentClick);
    }
  }
};
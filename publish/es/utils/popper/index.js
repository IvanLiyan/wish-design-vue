import _extends from 'babel-runtime/helpers/extends';
import Vue from 'vue';
import PopperJS from 'popper.js/dist/esm/popper';
import { on, off } from '../dom';
import PopupManage from './popup-manage';
import { deepCopy, mergeDeep } from '@wish/wd-vue/es/utils/util';
import { getConfig, CONFIG_PROVIDER } from '@wish/wd-vue/es/utils/config';
var isServer = Vue.prototype.$isServer;

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
export { PopupManage };

export default {
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
      from: CONFIG_PROVIDER,
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
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
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
      PopupManage.close(this);
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

      var modifiers = mergeDeep(
      // {
      //   ...defaultPopperOptions,
      // },
      deepCopy(defaultPopperOptions), _extends({}, this.popperOptions));
      modifiers.arrow = _extends({}, modifiers.arrow, {
        enabled: this.showArrow
      });
      options.modifiers = modifiers;

      options.placement = this.placement;
      options.removeOnDestroy = true;
      options.onCreate = function () {
        _this.$nextTick(_this.updatePopper);
        _this.$emit('created', _this);
      };
      this.popperJS = new PopperJS(reference, drop, options);
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
          PopupManage.open(this);
          if (popperJS.popper) {
            popperJS.popper.style.zIndex = PopupManage.nextZIndex();
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
      PopupManage.close(this);
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

      on(reference, 'click', this.handleReferenceClick);
      /* 这个地方必须用 mousedown 事件替换 click 事件，
        详见: https://tt.sankuai.com/ticket/detail?id=3846583
      */
      on(document, 'mousedown', this.handleDocumentClick);
    },
    addPopperHoverListener: function addPopperHoverListener() {
      var reference = this.getReference();
      var drop = this.getDrop();

      on(reference, 'mouseenter', this.showDrop);
      on(drop, 'mouseenter', this.handlerDropMouseEnter);
      on(reference, 'mouseleave', this.hideDrop);
      on(drop, 'mouseleave', this.hideDrop);
    },
    addPopperFocusListener: function addPopperFocusListener() {
      var reference = this.getReference();
      on(reference, 'focus', this.showDrop);
      on(reference, 'blur', this.hideDrop);
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
      off(reference, 'click', this.handleReferenceClick);
      off(reference, 'mouseleave', this.hideDrop);
      off(reference, 'mouseenter', this.showDrop);
      off(drop, 'mouseleave', this.hideDrop);
      off(drop, 'mouseenter', this.showDrop);
      off(document, 'mousedown', this.handleDocumentClick);
    }
  }
};
import Vue from 'vue';
import PopperJS from 'popper.js/dist/esm/popper';
import { on, off } from '../dom';
import PopupManage from './popup-manage';
import { deepCopy, mergeDeep } from '@/utils/util';
import { getConfig, CONFIG_PROVIDER } from '@/utils/config';
const isServer = Vue.prototype.$isServer;

const defaultPopperOptions = {
  computeStyle: {
    gpuAcceleration: false,
  },
  preventOverflow: {
    // enabled: false,
    boundariesElement: 'viewport',
  },
  hide: {
    enabled: false,
  },
  // flip: { behavior: ['right', 'left', 'bottom', 'top'] },
};
export {
  PopupManage,
};

export default {
  props: {
    visible: Boolean,
    appendToContainer: {
      type: Boolean,
      default: true,
    },
    getPopupContainer: Function,
    placement: {
      type: String,
      default: 'bottom-start',
      validator: function (value) {
        return /^(top|bottom|left|right)(-start|-end)?$/g.test(value);
      },
    },
    popperOptions: Object,
    trigger: {
      // 暂定，触发 update:visible 事件的方式
      type: String,
      default: 'custom',
      validator (v) {
        return ['click', 'hover', 'focus', 'custom'].includes(v);
      },
    },
    popperDisabled: Boolean,
    showArrow: Boolean,
    openDelay: Number,
    closeDelay: {
      type: Number,
      default: 200, // 防止由于快速关闭而导致不能移入到 drop 元素上
    },
    toggleOnReferenceClick: {
      type: Boolean,
      default: true,
    },
  },
  created () {
    this.$on('esc', this.handleEscClose);
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.destroy();
  },

  activated () {
    this.init();
  },

  // call destroy in keep-alive mode
  deactivated () {
    this.destroy();
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {},
    },
  },

  data () {
    return {
      popperVisible: false,
      options: {}, // popper options
    };
  },
  computed: {
    getContainer () {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    },
  },
  watch: {
    visible (val) {
      val ? this.updatePopper() : this.destroyPopper();
    },
    popperDisabled (n) {
      n ? this.removePopperListener() : this.addPopperListener();
    },
    placement () {
      if (this.popperJS) {
        this.popperJS.options.placement = this.placement;
        this.updatePopper();
      }
    },
  },
  methods: {
    init () {
      if (this.visible) {
        // 会存在 activated 后立即执行 beforeDestroy 的情况。
        // 详见: https://tt.sankuai.com/ticket/detail?id=3892540
        this.updatePopper();
      }
      const { popperDisabled } = this;
      popperDisabled ? this.removePopperListener() : this.addPopperListener();
    },
    destroy () {
      PopupManage.close(this);
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
      this.removePopperListener();
    },
    getReference () {
      return this.$refs.reference || this.reference;
    },

    getDrop () {
      return this.$refs.drop || this.drop;
    },

    createPopper () {
      const reference = this.getReference();
      const drop = this.getDrop();
      if (!reference || !drop) {
        console.error('need reference or drop element');
        return;
      }
      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy();
      }

      // append to popupcontainer
      if (this.appendToContainer) {
        const parent = this.getContainer();
        parent.appendChild(drop);
      }
      const { options } = this;
      const modifiers = mergeDeep(
        // {
        //   ...defaultPopperOptions,
        // },
        deepCopy(defaultPopperOptions),
        { ...this.popperOptions },
      );
      modifiers.arrow = {
        ...modifiers.arrow,
        enabled: this.showArrow,
      };
      options.modifiers = modifiers;

      options.placement = this.placement;
      options.removeOnDestroy = true;
      options.onCreate = () => {
        this.$nextTick(this.updatePopper);
        this.$emit('created', this);
      };
      this.popperJS = new PopperJS(reference, drop, options);
    },

    updatePopper () {
      if (isServer || !this.visible) {
        // 存在 nextTick 中调用 updatePopper 的情况，此时 visible 有出现 false 的可能
        return;
      }
      const { popperJS } = this;
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

    destroyPopper () {
      clearTimeout(this._timer);
      if (this.popperJS) {
        this.popperJS.disableEventListeners();
      }
      this.popperVisible = false;
      PopupManage.close(this);
      this.$emit('hide');
    },

    handleEscClose () {
      this.visible && this.hideDrop();
    },

    handleReferenceClick () {
      if (this.toggleOnReferenceClick || !this.visible) {
        this.$emit('update:visible', !this.visible);
      }
    },
    handleDocumentClick (e) {
      if (!this.visible) {
        return;
      }
      const reference = this.getReference();
      const drop = this.getDrop();

      const { target } = e;
      if (reference.contains(target) || drop.contains(target)) {
        return;
      }
      this.$emit('clickoutside', e);
      this.$emit('update:visible', false);
    },
    handlerDropMouseEnter () {
      /**
       * tofix: https://tt.sankuai.com/ticket/detail?id=4057761
       * 关闭延迟为 0 时，不可移入
       * */
      if (this.closeDelay === 0) {
        return;
      }
      this.showDrop();
    },
    showDrop () {
      clearTimeout(this._timer);
      if (this.visible) {
        return;
      }
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.$emit('update:visible', true);
        }, this.openDelay);
      } else {
        this.$emit('update:visible', true);
      }
    },
    hideDrop () {
      clearTimeout(this._timer);
      if (!this.visible) {
        return;
      }
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.$emit('update:visible', false);
        }, this.closeDelay);
      } else {
        this.$emit('update:visible', false);
      }
    },
    addPopperClickListener () {
      const reference = this.getReference();

      on(reference, 'click', this.handleReferenceClick);
      /* 这个地方必须用 mousedown 事件替换 click 事件，
        详见: https://tt.sankuai.com/ticket/detail?id=3846583
      */
      on(document, 'mousedown', this.handleDocumentClick);
    },
    addPopperHoverListener () {
      const reference = this.getReference();
      const drop = this.getDrop();

      on(reference, 'mouseenter', this.showDrop);
      on(drop, 'mouseenter', this.handlerDropMouseEnter);
      on(reference, 'mouseleave', this.hideDrop);
      on(drop, 'mouseleave', this.hideDrop);
    },
    addPopperFocusListener () {
      const reference = this.getReference();
      on(reference, 'focus', this.showDrop);
      on(reference, 'blur', this.hideDrop);
    },

    addPopperListener () {
      const reference = this.getReference();
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

    removePopperListener () {
      const reference = this.getReference();
      const drop = this.getDrop();
      off(reference, 'click', this.handleReferenceClick);
      off(reference, 'mouseleave', this.hideDrop);
      off(reference, 'mouseenter', this.showDrop);
      off(drop, 'mouseleave', this.hideDrop);
      off(drop, 'mouseenter', this.showDrop);
      off(document, 'mousedown', this.handleDocumentClick);
    },
  },
};

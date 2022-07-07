import tabMore from './tab-more';
import Tab from './tab';
import Icon from '@components/icon';

export default {
  name: 'WtTabOne',

  components: {
    tabMore,
    Icon,
  },

  props: {
    size: String,
    disabled: Boolean,
    active: Boolean,
    label: String,
    pane: {
      type: Object,
      required: true,
    },
    paneLabel: Array,
    icon: String,
    tabDropInfo: Object,
    currentValue: [String, Number, Object, Array],
    closable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      required: true,
    },
    getPrefixCls: {
      type: Function,
      required: true,
    },
    tabComponent: [String, Object],
    number: Number,
  },

  data() {
    return {
      labelContent: null,
    };
  },
  updated() {
    this.$parent.repaint && this.$parent.repaint();
  },

  mounted() {
    this.$parent.addTabs && this.$parent.addTabs(this);
    this.pane.$tab = this;
  },

  methods: {
    emitTabClick(e) {
      const value = !this.tabDropInfo ? this.pane.value : this.tabDropInfo.$parent.currentValue;
      !this.disabled && this.$emit('tabClick', e, value);
    },
    handleClick(e) {
      const { moreTabs } = this.tabDropInfo || {};
      if (!moreTabs || !moreTabs.length) {
        this.emitTabClick(e);
      }
    },
    closeClick(e) {
      !this.disabled && this.$emit('tabRemove', e);
    },
  },
  render(h) {
    const {
      size,
      disabled,
      active,
      icon,
      label,
      paneLabel,
      emitTabClick,
      handleClick,
      tabDropInfo,
      currentValue,
      closable,
      closeClick,
      dropAutosize,
      prefix,
      tabComponent,
      number,
    } = this;
    const { moreTabs, $parent } = tabDropInfo || {};
    let tabMoreData = null;
    $parent && ($parent.currentValue = currentValue);
    if (moreTabs && moreTabs.length) {
      tabMoreData = {
        props: {
          moreTabs,
          currentValue,
          label,
          icon,
          disabled,
          size,
          dropAutosize,
          prefix,
          tabComponent,
          number,
        },
        on: {
          tabSelectClick: (value) => {
            if (value) {
              $parent.currentValue = value;
              emitTabClick(undefined, value);
            }
          },
        },
        ref: 'more',
      };
    }

    // 如多每次都重新复制，会导致多次渲染问题
    // [Vue warn]: You may have an infinite update loop
    // in a component render function.

    // this.labelContent = this.labelContent || (
    //   <tab-more {...tabMoreData}></tab-more>
    // );
    const tabPrefix = this.getPrefixCls('tab');
    const children = (
      <div class={`${prefix}-item-label`}>
        {tabMoreData && <tab-more {...tabMoreData}></tab-more>}
        {!tabMoreData && icon && <icon name={icon} width={18} height={18}></icon>}
        {!tabMoreData && (paneLabel && paneLabel.length ? paneLabel : label)}
        {closable && <icon name='mtdicon-error-o' class={`${prefix}-tab-close`} onClick={closeClick} />}
        {number > 0 && <span class={`${prefix}-item-number`}>{number}</span>}
      </div>
    );
    const attrs = {
      class: [
        {
          [`${prefix}-item`]: true,
          [`${prefix}-item-${size}`]: true,
          [`${prefix}-item-disabled`]: disabled,
          [`${tabPrefix}-active`]: active,
          [`${prefix}-closable`]: closable,
        },
        this.pane.labelClass,
      ],
      on: {
        click: (ev) => {
          handleClick(ev);
        },
      },
      props: {
        tab: this.pane,
      },
    };
    const Component = tabComponent || Tab;
    return <Component {...attrs}>{children}</Component>;
  },
};

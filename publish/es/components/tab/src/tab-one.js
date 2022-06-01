import _defineProperty from 'babel-runtime/helpers/defineProperty';
import tabMore from './tab-more';
import Tab from './tab';
import Icon from '@wish/wt-vue/es/components/icon';

export default {
  name: 'WtTabOne',

  components: {
    tabMore: tabMore,
    Icon: Icon
  },

  props: {
    size: String,
    disabled: Boolean,
    active: Boolean,
    label: String,
    pane: {
      type: Object,
      required: true
    },
    paneLabel: Array,
    icon: String,
    tabDropInfo: Object,
    currentValue: [String, Number, Object, Array],
    closable: Boolean,
    dropAutosize: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      required: true
    },
    getPrefixCls: {
      type: Function,
      required: true
    },
    tabComponent: [String, Object],
    number: Number
  },

  data: function data() {
    return {
      labelContent: null
    };
  },
  updated: function updated() {
    this.$parent.repaint && this.$parent.repaint();
  },
  mounted: function mounted() {
    this.$parent.addTabs && this.$parent.addTabs(this);
    this.pane.$tab = this;
  },


  methods: {
    emitTabClick: function emitTabClick(e) {
      var value = !this.tabDropInfo ? this.pane.value : this.tabDropInfo.$parent.currentValue;
      !this.disabled && this.$emit('tabClick', e, value);
    },
    handleClick: function handleClick(e) {
      var _ref = this.tabDropInfo || {},
          moreTabs = _ref.moreTabs;

      if (!moreTabs || !moreTabs.length) {
        this.emitTabClick(e);
      }
    },
    closeClick: function closeClick(e) {
      !this.disabled && this.$emit('tabRemove', e);
    }
  },
  render: function render(h) {
    var _ref3;

    var size = this.size,
        disabled = this.disabled,
        active = this.active,
        icon = this.icon,
        label = this.label,
        paneLabel = this.paneLabel,
        emitTabClick = this.emitTabClick,
        handleClick = this.handleClick,
        tabDropInfo = this.tabDropInfo,
        currentValue = this.currentValue,
        closable = this.closable,
        closeClick = this.closeClick,
        dropAutosize = this.dropAutosize,
        prefix = this.prefix,
        tabComponent = this.tabComponent,
        number = this.number;

    var _ref2 = tabDropInfo || {},
        moreTabs = _ref2.moreTabs,
        $parent = _ref2.$parent;

    var tabMoreData = null;
    $parent && ($parent.currentValue = currentValue);
    if (moreTabs && moreTabs.length) {
      tabMoreData = {
        props: {
          moreTabs: moreTabs,
          currentValue: currentValue,
          label: label,
          icon: icon,
          disabled: disabled,
          size: size,
          dropAutosize: dropAutosize,
          prefix: prefix,
          tabComponent: tabComponent,
          number: number
        },
        on: {
          tabSelectClick: function tabSelectClick(value) {
            if (value) {
              $parent.currentValue = value;
              emitTabClick(undefined, value);
            }
          }
        },
        ref: 'more'
      };
    }

    // 如多每次都重新复制，会导致多次渲染问题
    // [Vue warn]: You may have an infinite update loop
    // in a component render function.

    // this.labelContent = this.labelContent || (
    //   <tab-more {...tabMoreData}></tab-more>
    // );
    var tabPrefix = this.getPrefixCls('tab');
    var children = h(
      'div',
      { 'class': prefix + '-item-label' },
      [tabMoreData && h('tab-more', tabMoreData), !tabMoreData && icon && h('icon', {
        attrs: { name: icon, width: '18', height: '18' }
      }), !tabMoreData && (paneLabel && paneLabel.length ? paneLabel : label), closable && h('icon', {
        attrs: { name: 'mtdicon-error-o' },
        'class': prefix + '-tab-close', on: {
          'click': closeClick
        }
      }), number > 0 && h(
        'span',
        { 'class': prefix + '-item-number' },
        [number]
      )]
    );
    var attrs = {
      class: [(_ref3 = {}, _defineProperty(_ref3, prefix + '-item', true), _defineProperty(_ref3, prefix + '-item-' + size, true), _defineProperty(_ref3, prefix + '-item-disabled', disabled), _defineProperty(_ref3, tabPrefix + '-active', active), _defineProperty(_ref3, prefix + '-closable', closable), _ref3), this.pane.labelClass],
      on: {
        click: function click(ev) {
          handleClick(ev);
        }
      },
      props: {
        tab: this.pane
      }
    };
    var Component = tabComponent || Tab;
    return h(
      Component,
      attrs,
      [children]
    );
  }
};
<template>
  <div
    :style="width && { width: `${width}px` }"
    :class="{
      [prefix]: true,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-multiple`]: multiple,
      [`${prefix}-multiple-invalid`]: multiple && invalid,
      [`${prefix}-multiple-focus`]: multiple && opened,
    }"
    @click="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      :class="[
        `${prefix}-tags`,
        {
          [`${prefix}-search-focus`]: opened,
        },
      ]"
      v-if="multiple"
      ref="tags"
    >
      <ul :class="`${prefix}-tags-ul`">
        <template>
          <ChoiceTag
            v-for="(item, index) in filteredSelected"
            :key="index"
            :option="item"
            :disabled="disabled"
            @close="handleClearClick"
          >
            <template slot-scope="scope" slot="tag" v-if="$scopedSlots.tag">
              <slot name="tag" v-bind="scope"></slot>
            </template>
            {{ formatterOption(item) }}
          </ChoiceTag>
        </template>
        <li :class="`${prefix}-search-line`">
          <div :class="`${prefix}-search-field-wrap`">
            <input
              :class="`${prefix}-search-field`"
              v-model="query"
              :readonly="readonly"
              :style="{ width: inputLength + 'px', 'max-width': tagInputWidth + 'px' }"
              autocomplete="off"
              tabindex="-1"
              @focus="handleFocus"
              @keyup="handleQueryInput"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.enter.prevent="selectOption"
              @keydown.esc.prevent="focused = false"
              @keydown.delete="deletePrevTag"
              ref="tagInput"
            />
          </div>
        </li>
      </ul>
    </div>
    <popper :visible="opened" :append-to-container="true" ref="popper" :close-delay="0">
      <reference>
        <wt-input
          ref="reference"
          v-bind="$attrs"
          :label="label"
          v-model="showValue"
          :disabled="disabled"
          :placeholder="currentPlaceholder"
          :loading="loading"
          :invalid="invalid"
          :new-height="newHeight"
          @clear="handleInputClear"
          @focus="handleFocus"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
          @keyup="handleInputChange"
          @keydown="handleKeydown"
          @keydown.down.stop.prevent="navigateOptions('next')"
          @keydown.up.stop.prevent="navigateOptions('prev')"
          @keydown.enter.prevent="selectOption"
          @keydown.esc.stop.prevent="focused = false"
          @keydown.tab="focused = false"
          :class="{ [`${prefix}-search-focus`]: focused }"
        >
          <span slot="suffix" :class="`${prefix}-suffix-inner`">
            <Icon v-if="!loading" name="chevron-down" />
            <wt-loading v-else message="" size="small" />
          </span>
        </wt-input>
      </reference>
      <drop
        ref="drop"
        :class="[`${prefix}-dropdown`]"
        :use-show="true"
        :style="{
          'min-width': minWidth,
        }"
      >
        <ul :class="`${dropdownPrefix}-menu`" ref="menu">
          <wt-option
            :value="SELECT_ALL_VALUE"
            created
            is-select-all
            v-show="!_isEmpty && !query && !loading"
            v-if="canSelectAll"
            >全选</wt-option
          >
          <div v-show="!loading && !emptyText">
            <slot></slot>
          </div>
          <slot name="empty" v-if="!loading && emptyText">
            <li :class="`${dropdownPrefix}-menu-item ${prefix}-dropdown-empty`">
              {{ emptyText }}
            </li>
          </slot>
          <slot name="loading" v-if="loading">
            <li :class="`${dropdownPrefix}-menu-item ${prefix}-dropdown-loading`">
              {{ loadingText }}
            </li>
          </slot>
        </ul>
      </drop>
    </popper>
  </div>
</template>
<script>
import { Popper, Drop, Reference } from '@components/popper';
import WtInput from '../input';
import Clickoutside from '@/utils/clickoutside';
import NavigationMixin from './navigation-mixin';
import debounce from 'throttle-debounce/debounce';
import { getValueByPath } from '@/utils/util';
import { isObject, isExist } from '@/utils/type';
import WtOption from '@components/option';
import { on, off } from '@/utils/dom';
import { subtraction } from '@/utils/array';
import { notKeys } from '@/utils/key-codes';
import ChoiceTag from './select-tag';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';
import Icon from '@components/icon';

export default {
  name: 'WtSelect',
  components: {
    WtInput,
    Popper,
    Drop,
    Reference,
    WtOption,
    ChoiceTag,
    Icon,
  },
  directives: { Clickoutside },
  mixins: [NavigationMixin],
  props: {
    // select当前选中值
    value: [String, Number, Object, Array, Boolean],
    // 设置宽度
    width: Number,
    // 仅当 value 值为 object、object[]时生效，作为value唯一标识的键名
    valueKey: String,
    // select标题
    label: String,
    // 是否禁用
    disabled: Boolean,
    // 占位符
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 是否可搜索
    filterable: Boolean,
    // 是否远程搜索
    remote: Boolean,
    // 远程搜索的方法
    remoteMethod: Function,
    // 搜索条件无匹配时显示的文字
    noMatchText: {
      type: String,
      default: '暂无搜索结果',
    },
    // 是否正在从远程获取数据
    loading: Boolean,
    // 搜索中文案
    loadingText: {
      type: String,
      default: '搜索中',
    },
    // 是否校验通过，用于非空校验
    invalid: Boolean,
    // 选项为空时显示的文字
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    // 是否多选
    multiple: Boolean,
    // 默认可见
    defaultVisible: Boolean,
    // 格式化当前输入框中显示的内容
    formatter: Function,
    // 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
    reserveKeyword: Boolean,
    // 显示全选
    showSelectAll: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  data() {
    return {
      options: [], // 选项
      filteredOptionsCount: 0, // 搜到选项输
      focused: this.defaultVisible, // 是否聚焦
      inputLength: 20, // input字符长度
      showValue: '', // input显示值
      inputWidth: 0, // input宽度
      tagInputWidth: 0, // tag宽度
      query: '', // 搜索匹配文字
      previousQuery: null, // 上一条查询
      minWidth: 0, // 最小宽度
      isOnComposition: false, // 正在输入
      selected: this.multiple ? [] : {}, // 选中值
      scrollListener: false, // 是否滚动
      SELECT_ALL_VALUE: '__SELECT_ALL__', // 常量 全部
      isSelectAll: false, // 是否全选
      isMounted: false, // 是否mounted
      tagsHeight: 36, // tag默认高度
      newHeight: this.label ? 44 : 36, // 计算高度
      showCheckbox: true, // 是否显示checkbox
      isEmpty: false, // 是否手动设置选项为空
    };
  },
  provide() {
    return {
      select: this,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('select');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    inputPrefix() {
      return this.config.getPrefixCls('input');
    },
    dropdownPrefix() {
      return this.config.getPrefixCls('dropdown');
    },
    // 是否可以全选
    canSelectAll() {
      return this.showSelectAll && this.multiple;
    },
    // 过滤选项
    filteredOptions() {
      if (this.canSelectAll) {
        return this.options.filter((option) => !option.isSelectAll);
      }
      return this.options;
    },
    // 过滤选中的
    filteredSelected() {
      if (!this.canSelectAll) {
        return this.selected;
      }
      return this.selected.filter((item) => {
        return item.value !== this.SELECT_ALL_VALUE;
      });
    },
    // 只读
    readonly() {
      return !this.filterable;
    },
    // 是否为空
    _isEmpty() {
      if ('isEmpty' in this.$options.propsData) {
        return this.isEmpty;
      } else if (!this.isMounted) {
        return false;
      }
      return !this.filteredOptions.length;
    },
    // 是否无匹配
    isNoMatched() {
      return this.filterable && this.query && !this.remote && this.filteredOptionsCount === 0;
    },
    // 空数据文案
    emptyText() {
      if (this._isEmpty) {
        if (this.filterable && this.remote) {
          return this.query ? this.noMatchText : '';
        }
        return this.noDataText;
      }
      if (this.isNoMatched) {
        return this.noMatchText;
      }
      return '';
    },
    // 当前占位符
    currentPlaceholder() {
      if (this.multiple) {
        if (!this.isOnComposition && !this.query && (!this.value || !this.value.length)) {
          return this.placeholder;
        }
        return '';
      }
      return isExist(this.value) ? this.formatterOption(this.getOption(this.value)) : this.placeholder;
    },
    // 是否打开选项
    opened() {
      if (this.filterable && this.remote) {
        return this.focused && !!(this.query || (this.options && this.options.length));
      }
      return this.focused;
    },
  },
  watch: {
    // 监听获取焦点逻辑
    focused(val) {
      if (val && !this.readonly) {
        this.$refs.tagInput && this.$refs.tagInput.focus();
      }
      if (!val) {
        this.resetHover();
        this.showValue = this.formatterOption(this.selected);
        this.query = '';
        this.$emit('blur');
      } else {
        if (this.options.length) {
          this.setHoverOption(this.options[0]);
        }
        if (this.filterable) {
          if (!this.multiple) {
            const { __DEFAULT_OPTION__, currentLabel = '' } = this.selected;
            const { formatter } = this;
            this.showValue = __DEFAULT_OPTION__ && formatter ? formatter(this.selected) : currentLabel;
          } else {
            this.showValue = '';
          }
          this.query = this.remote ? this.showValue : '';
          this.handleQueryChange(this.query);
        }
        this.getInputWidth();
        this.addScrollListenter();
      }
    },
    // 打开选项
    opened(val) {
      this.$emit('update:visible', val);
    },
    // 监听选项变化
    options() {
      this.setSelected();
      if (this.opened && this.$refs.popper) {
        this.updatePopper();
        if (this.options.length) {
          const first = this.options.find((item) => item.visible);
          first && this.setHoverOption(first);
        }
      }
    },
    // 监听value变化
    value() {
      this.setSelected();
    },
    // 监听选中变化
    selected(val, old) {
      if (this.multiple) {
        this.updatePopper();
      } else if (!this.focused) {
        this.showValue = this.formatterOption(this.selected);
        this.previousQuery = this.showValue || null;
      }
    },
    // input宽度
    inputWidth() {
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
    },
    // tags容器高度
    tagsHeight(val, old) {
      if (val !== old) {
        this.newHeight = val;
      }
    },
  },
  created() {
    this.$on('addOption', this.addOption);
    this.$on('removeOption', this.onOptionDestroy);
    this.$on('optionClick', this.handleOptionClick);

    this.debouncedQueryChange = this.debounce
      ? debounce(this.debounce, this.handleQueryChange)
      : this.handleQueryChange;
  },
  mounted() {
    this.isMounted = true;
    if (this.defaultVisible) {
      this.$refs.reference && this.$refs.reference.focus();
    }
    this.getInputWidth();
    this.setSelected(); // 防止由于没有 options 从而导致默认值不显示问题
  },
  deactivated() {
    this.removeScrollListener();
  },
  beforeDestroy() {
    this.isMounted = false;
    this.removeScrollListener();
  },
  methods: {
    /**
     * 添加选项
     */
    addOption(option) {
      this.options.push(option);
    },
    /**
     * 处理选项数据
     */
    formatterOption(option) {
      if (option.length) {
        return '';
      } else if (!isExist(option.value) && option.__DEFAULT_OPTION__) {
        return '';
      }
      return this.formatter
        ? this.formatter({ value: option.value, label: option.currentLabel })
        : option.currentLabel || '';
    },
    /**
     * 设置全选
     */
    setSelectedAll() {
      const options = this.filteredOptions.filter((o) => !o._disabled);
      if (this.canSelectAll && this.value && this.value.length && this.value.length >= options.length) {
        const realValues = this.value.map((val) => this.getRealValue(val, this.realValue));
        this.isSelectAll = options.every((option) => {
          return realValues.indexOf(option.realValue) > -1;
        });
        return;
      }
      this.isSelectAll = false;
    },
    /**
     * 设置选中
     */
    setSelected() {
      this.setSelectedAll();
      const value = this.isSelectAll ? [this.SELECT_ALL_VALUE, ...this.value] : this.value;
      const next = this.multiple ? (value || []).map(this.getOption) : this.getOption(value);

      this.selected = next;
    },
    /**
     * 聚焦
     */
    handleFocus(event) {
      if (!this.disabled && this.filterable && !this.focused) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },
    /**
     * 设置关闭
     */
    handleClose() {
      this.focused = false;
    },
    /**
     * 监控按键
     */
    handleKeydown(e) {
      if (!this.disabled && !this.focused) {
        if (notKeys(e, ['enter', 'tab', 'esc', 'delete'])) {
          this.focused = true;
        }
      }
    },
    /**
     * 处理输入事件
     */
    handleInputChange(e) {
      if (this.focused && this.filterable && this.query !== this.showValue) {
        this.query = this.showValue;
        this.debouncedQueryChange(this.query);
      }
    },
    /**
     * 处理输入拼音
     */
    handleComposition(e) {
      const { type } = e;
      if (type === 'compositionend') {
        this.isOnComposition = false;
        // 当混合输入前后值不变时，不会触发后续的 input 事件，所以需要再次触发 query
        this.debouncedQueryChange(e.target.value);
      } else {
        this.isOnComposition = true;
      }
    },
    /**
     * 处理多选更新选项
     */
    handleQueryInput(e) {
      if (e && e.target) {
        this.query = e.target.value;
      }
      const { query } = this;
      const length = query.length * 14 + 5;
      this.inputLength = length;
      this.multiple && this.updatePopper();
      this.debouncedQueryChange(this.query);
    },
    /**
     * 获取匹配选项
     */
    getOption(value) {
      const realValue = this.getRealValue(value, this.valueKey);
      const equal = (option) => {
        return realValue === option.realValue;
      };

      let opt = this.options.find(equal);
      if (!opt) {
        const cached = Array.isArray(this.selected) ? this.selected : [this.selected];

        opt = cached.find(equal);
      } else {
        opt = {
          value: opt.value,
          realValue: opt.realValue,
          label: opt.label,
          currentLabel: opt.currentLabel,
          disabled: opt.disabled,
        };
      }
      return (
        opt || {
          value: value,
          realValue: realValue,
          label: !isExist(value) ? '' : value.toString(),
          currentLabel: !isExist(value) ? '' : value.toString(),
          __DEFAULT_OPTION__: true,
        }
      );
    },
    /**
     * 处理选中选项
     */
    handleOptionClick(option) {
      if (this.disabled) {
        return;
      }

      const { value: optionValue, realValue: optionRealValue } = option;
      if (option.isSelectAll) {
        // 取反
        const allValues = this.options
          .filter((option) => {
            return !option.isSelectAll && !option._disabled;
          })
          .map((option) => {
            return option.value;
          });

        let nextValues = [];
        if (this.isSelectAll) {
          // 已经全选则清空
          nextValues = subtraction(allValues, this.value, (a, b) => {
            return a === b || this.getRealValue(a) === this.getRealValue(b);
          });
        } else {
          // 全选
          const diffValues = subtraction(this.value, allValues, (a, b) => {
            return a === b || this.getRealValue(a) === this.getRealValue(b);
          });
          nextValues = [...(this.value || []), ...diffValues];
        }

        this.$emit('input', nextValues);
        this.$emit('change', nextValues);
      } else if (this.multiple) {
        const copyiedValue = this.value ? [...this.value] : [];
        const realValues = copyiedValue.map((val) => {
          return this.getRealValue(val, this.valueKey);
        });

        let index = -1;
        realValues.some((v, i) => {
          const r = v === optionRealValue;
          if (r) {
            index = i;
          }
          return r;
        });
        if (index > -1) {
          copyiedValue.splice(index, 1);
        } else {
          copyiedValue.push(optionValue);
        }
        if (!this.reserveKeyword) {
          this.query = '';
          this.handleQueryInput();
        }
        this.$emit('input', copyiedValue);
        this.$emit('change', copyiedValue);
      } else {
        const realValue = this.getRealValue(this.value, this.valueKey);
        if (realValue !== optionRealValue) {
          this.$emit('input', option.value);
          this.$emit('change', option.value);
        }
        this.focused = false;
      }
      const input = this.$refs.tagInput;
      if (input) {
        input.focus();
      }
    },
    /**
     * 选项点击事件
     */
    selectOption() {
      if (!this.opened) {
        this.toggleMenu();
      } else if (!this.isOnComposition && this.hoverOption && this.hoverOption.visible) {
        this.handleOptionClick(this.hoverOption);
      }
    },
    /**
     * 清空全部选项
     */
    handleInputClear() {
      this.$emit('clear');
      this.$emit('input', this.multiple ? [] : '');
      this.$emit('change', this.multiple ? [] : '');
    },
    /**
     * 触发删除tag
     */
    deletePrevTag(e) {
      if (this.disabled) {
        return;
      }
      if (e.target.value.length <= 0) {
        const { filteredSelected } = this;
        if (!filteredSelected || !filteredSelected.length) {
          return;
        }
        const last = filteredSelected[filteredSelected.length - 1];

        if (!last.hitState) {
          this.$set(last, 'hitState', true);
        } else if (!last.disabled) {
          this.handleClearClick(last);
        }
      }
    },
    /**
     * 删除某个tag
     */
    handleClearClick(tag) {
      if (this.disabled) {
        return;
      }
      const index = this.filteredSelected.indexOf(tag);
      if (index > -1) {
        const value = [...this.value];
        value.splice(index, 1);
        this.$emit('input', value);
        this.$emit('change', value);
        this.$emit('remove', tag.value);
      }
    },
    /**
     * 更新选项列表
     */
    updatePopper() {
      this.$nextTick(() => {
        if (this.focused) {
          this.$refs.popper.updatePopper();
        }
        this.tagsHeight = this.$refs.tags.offsetHeight;
      });
    },
    /**
     * 处理选项变更
     */
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else {
        const filteredOptions = this.options.filter((item) => {
          if (item.isSelectAll) {
            item.visible = !val;
            return false;
          }
          if (item.created) {
            return false;
          }
          item.visible = val !== '' ? this.filterMethod(val, item.currentLabel) : true;
          return item.visible;
        });
        this.filteredOptionsCount = filteredOptions.length;
        // 如果是可创建的，则自动 hover 创建的，否则找到第一个可显示的
        if (this.filteredOptionsCount) {
          this.setHoverOption(filteredOptions[0]);
        }
        this.updatePopper();
      }
      this.$emit('filter', val);
    },
    /**
     * 显隐选项
     */
    toggleMenu() {
      if (!this.disabled) {
        if (!this.filterable || !this.focused) {
          this.focused = !this.focused;
        }
        if (this.focused) {
          this.$refs.tagInput && this.$refs.tagInput.focus();
        }
      }
    },
    /**
     * 获取input宽度
     */
    getInputWidth() {
      const { selectedItemFirst, selectedItemTag, reference } = this.$refs;
      let inputWidth = reference.$el.getBoundingClientRect().width;
      this.inputWidth = inputWidth;
      if (selectedItemFirst && selectedItemFirst.$el) {
        inputWidth += selectedItemFirst.$el.getBoundingClientRect().width;
      }
      if (selectedItemTag) {
        inputWidth += selectedItemTag.getBoundingClientRect().width;
      }
      const width = inputWidth - 42; // right icon size
      this.tagInputWidth = width > 0 ? width : 0;
    },
    /**
     * 销毁选项
     */
    onOptionDestroy(option) {
      const index = this.options.indexOf(option);
      if (this.hoverOption === option) {
        this.resetHover();
      }
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },
    /**
     * 添加滚动监听
     */
    addScrollListenter() {
      const { 'scroll-bottom': scrollBottom, scroll } = this.$listeners;
      const { dropdownPrefix } = this;
      if ((scrollBottom || scroll) && this.$refs.drop) {
        const scrollElement = this.$refs.drop.$el.querySelector(`.${dropdownPrefix}-menu`);
        if (scrollElement) {
          on(scrollElement, 'scroll', this.handleScroll);
          this.scrollListener = true;
        }
      }
    },
    /**
     * 移除滚动监听
     */
    removeScrollListener() {
      if (this.scrollListener) {
        const { dropdownPrefix } = this;
        const scrollElement = this.$refs.drop.$el.querySelector(`.${dropdownPrefix}-menu`);
        off(scrollElement, 'scroll', this.handleScroll);
      }
      this.scrollListener = false;
    },
    /**
     * 滚动事件
     */
    handleScroll(event) {
      this.$emit('scroll', event);
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollTop + clientHeight + 20 >= scrollHeight) {
        this.$emit('scroll-bottom', event);
      }
    },
    /**
     * 聚焦
     */
    focus() {
      const { reference, tagInput } = this.$refs;
      this.focused = true;
      if (this.multiple) {
        tagInput.focus();
        return;
      }
      reference.focus();
    },
    /**
     * 失焦
     */
    blur() {
      const { reference, tagInput } = this.$refs;
      this.focused = false;
      if (this.multiple) {
        tagInput.blur();
        return;
      }
      reference.blur();
    },
    /**
     * 过滤方法
     */
    filterMethod(query, value) {
      const parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      return new RegExp(parsedQuery, 'i').test(value);
    },
    /**
     * 获取value为对象时唯一key
     */
    getRealValue(value, valueKey) {
      return isObject(value) && valueKey ? getValueByPath(value, valueKey) : value;
    },
  },
};
</script>

<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}-${size}`]: size,
      [`${prefix}-multiple-${genre}`]: genre,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-multiple`]: multiple,
      [`${prefix}-multiple-invalid`]: multiple && invalid,
      [`${prefix}-multiple-focus`]: multiple && opened,
    }"
    @click="toggleMenu"
    v-clickoutside="handleClose"
  >
    <legend v-if="label" :class="[{ [`${prefix}-invalid`]: invalid, [`${prefix}-focus`]: opened }]">
      {{ label }}
    </legend>
    <div
      :class="[
        `${prefix}-tags`,
        {
          [`${prefix}-tags-${size}`]: size,
          [`${prefix}-search-focus`]: opened,
        },
      ]"
      v-if="multiple"
      ref="tags"
    >
      <ul :class="`${prefix}-tags-ul`">
        <template v-if="!collapseTags">
          <ChoiceTag
            v-for="(item, index) in filteredSelected"
            :key="index"
            :option="item"
            theme=""
            :size="size"
            :closable="!item.disabled && closableFn(item)"
            :disabled="disabled"
            @close="handleClearClick"
          >
            <template slot-scope="scope" slot="tag" v-if="$scopedSlots.tag">
              <slot name="tag" v-bind="scope"></slot>
            </template>
            {{ formatterOption(item) }}
          </ChoiceTag>
        </template>
        <ChoiceTag
          v-if="collapseTags && filteredSelected.length"
          :option="filteredSelected[0]"
          theme=""
          :size="size"
          :disabled="disabled"
          @close="handleClearClick"
          ref="selectedItemFirst"
        >
          <template slot-scope="scope" slot="tag" v-if="$scopedSlots.tag">
            <slot name="tag" v-bind="scope"></slot>
          </template>
          {{ formatterOption(filteredSelected[0]) }}
        </ChoiceTag>
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
        <li :class="`${prefix}-tags-li`" v-if="collapseTags && filteredSelected.length" ref="selectedItemTag">
          <!-- <wt-tooltip placement="top" theme="light" :popper-class="`${prefix}-tags-popper`">
            <div slot="content">
              <ul :class="`${prefix}-tags-ul`" :style="{ width: tooltipWidth + 'px' }">
                <li :class="`${prefix}-choice`" v-for="(item, index) in filteredSelected" :key="index">
                  <wt-tag
                    theme=""
                    :size="size"
                    :closable="!item.disabled && closableFn(item)"
                    @close="handleClearClick(item)"
                  >
                    {{ formatterOption(item) }}
                  </wt-tag>
                </li>
              </ul>
            </div>
            <span :class="`${prefix}-tags-text`">
              <slot name="maxTagPlaceholder" :omitted-values="omittedValues" :selected="filteredSelected"
                >已选择{{ filteredSelected.length }}项</slot
              >
            </span>
          </wt-tooltip> -->
        </li>
      </ul>
      <span :class="`${inputPrefix}-suffix-inner`">
        <Icon :name="`${prefix}-clear ${iconPrefix('error-circle')}`" @click.stop="handleInputClear" v-if="showClear" />
        <Icon :name="sIcon" v-else />
      </span>
    </div>
    <popper
      :visible="opened"
      :append-to-container="appendToContainer"
      :get-popup-container="getPopupContainer"
      :placement="placement"
      ref="popper"
      :close-delay="0"
      :popper-options="popperOptions"
    >
      <reference>
        <wt-select-input
          ref="reference"
          v-bind="$attrs"
          :genre="genre"
          :name="name"
          :suffix-icon="multiple ? undefined : sIcon"
          v-model="showValue"
          :disabled="disabled"
          :readonly="readonly || multiple"
          :placeholder="currentPlaceholder"
          :clearable="clearable"
          :size="size"
          :loading="loading"
          :invalid="invalid"
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
          <slot name="prefix" slot="prefix" v-if="$slots.prefix"></slot>
        </wt-select-input>
      </reference>
      <drop
        ref="drop"
        :class="[`${prefix}-dropdown`, popperClass]"
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
            :indeterminate="!isSelectAll && value && !!value.length"
            v-show="!_isEmpty && !query && !loading"
            v-if="canSelectAll"
            >全选</wt-option
          >
          <div v-show="!loading && !emptyText">
            <wt-option v-if="showNewOption" :value="query" :label="query" created />
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
import WtSelectInput from '../select-input';
import Clickoutside from '@/utils/clickoutside';
import NavigationMixin from './navigation-mixin';
import scrollIntoView from '@/utils/scroll-into-view';
import WtTag from '@components/tag';
// import MtdTooltip from '@components/tooltip';
import debounce from 'throttle-debounce/debounce';
import { getValueByPath } from '@/utils/util';
import { isFunction, isObject, isExist } from '@/utils/type';
import WtOption from '@components/option';
import { on, off } from '@/utils/dom';
import { subtraction } from '@/utils/array';
import { hasProps } from '@/utils/vnode';
import { notKeys } from '@/utils/key-codes';
import ChoiceTag from './select-tag';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';
import Icon from '@components/icon';

function getRealValue(value, valueKey) {
  return isObject(value) && valueKey ? getValueByPath(value, valueKey) : value;
}

const SELECT_ALL_VALUE = '__SELECT_ALL__';
export default {
  name: 'WtSelect',
  components: {
    WtSelectInput,
    // MtdTooltip,
    Popper,
    Drop,
    Reference,
    WtTag,
    WtOption,
    ChoiceTag,
    Icon,
  },
  directives: { Clickoutside },
  mixins: [NavigationMixin],
  props: {
    icon: String,
    name: String,
    value: [String, Number, Object, Array, Boolean],
    defaultActiveFirstOption: {
      type: Boolean,
      default: true,
    },
    valueKey: String,
    label: String,
    size: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default() {
        return '请选择';
      },
    },
    placement: String,
    filterable: Boolean,
    autoClearQuery: {
      type: Boolean,
      default: false,
    },
    clearable: Boolean,
    closeable: [Boolean, Function], // 兼容历史
    closable: {
      type: [Boolean, Function],
      default: true,
    },
    debounce: {
      type: Number,
      default: 0,
    },
    filterMethod: {
      type: Function,
      default(query, value) {
        const parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        return new RegExp(parsedQuery, 'i').test(value);
      },
    },
    remote: Boolean,
    remoteMethod: Function,
    noMatchText: {
      type: String,
      default() {
        return '暂无搜索结果';
      },
    },
    loading: Boolean,
    loadingText: {
      type: String,
      default() {
        return '搜索中';
      },
    },
    invalid: Boolean,
    noDataText: {
      type: String,
      default() {
        return '暂无数据';
      },
    },
    multiple: Boolean,
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    multipleLimit: {
      type: Number,
      default() {
        return 0;
      },
    },
    collapseTags: Boolean,
    popperClass: String,
    appendToContainer: {
      type: Boolean,
      default: true,
    },
    getPopupContainer: Function,
    defaultVisible: Boolean,
    isEmpty: Boolean,
    formatter: Function,
    reserveKeyword: Boolean,
    allowCreate: Boolean,
    popperOptions: Object,
    showSelectAll: {
      type: Boolean,
      // default: true,
    },
    genre: String,
    collapseMaxSearchWidth: {
      // 将在 1.0 中移除
      type: Number,
      default: 50,
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
      options: [],
      filteredOptionsCount: 0,
      focused: this.defaultVisible,
      inputLength: 20,
      showValue: '',
      inputWidth: 0,
      tagInputWidth: 0,
      query: '',
      previousQuery: null,

      minWidth: 0,
      isOnComposition: false,
      selected: this.multiple ? [] : {},

      scrollListener: false,

      SELECT_ALL_VALUE: SELECT_ALL_VALUE,
      isSelectAll: false,
      isMounted: false,
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
    sIcon() {
      return hasProps(this, 'icon') ? this.icon : 'chevron-down';
    },
    canSelectAll() {
      return this.showSelectAll && this.multiple;
    },
    filteredOptions() {
      if (this.canSelectAll) {
        return this.options.filter((option) => !option.isSelectAll);
      }
      return this.options;
    },
    filteredSelected() {
      if (!this.canSelectAll) {
        return this.selected;
      }
      return this.selected.filter((item) => {
        return item.value !== SELECT_ALL_VALUE;
      });
    },
    readonly() {
      return !this.filterable;
    },
    tooltipWidth() {
      return this.inputWidth;
    },
    _isEmpty() {
      if ('isEmpty' in this.$options.propsData) {
        return this.isEmpty;
      } else if (!this.isMounted) {
        return false;
      }
      return !this.filteredOptions.length;
    },
    isNoMatched() {
      return this.filterable && this.query && !this.remote && !this.allowCreate && this.filteredOptionsCount === 0;
    },
    emptyText() {
      if (this._isEmpty) {
        if (this.filterable && this.remote) {
          // tofix: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40370097
          return this.query ? this.noMatchText : '';
        }
        return this.noDataText;
      }
      if (this.isNoMatched) {
        return this.noMatchText;
      }
      return '';
    },
    currentPlaceholder() {
      if (this.multiple) {
        if (!this.isOnComposition && !this.query && (!this.value || !this.value.length)) {
          return this.placeholder;
        }
        return '';
      }
      return isExist(this.value) ? this.formatterOption(this.getOption(this.value)) : this.placeholder;
    },
    opened() {
      if (this.filterable && this.remote) {
        return this.focused && !!(this.query || (this.options && this.options.length));
      }
      return this.focused;
    },
    shouldClearQuery() {
      return this.autoClearQuery;
    },
    canClosed() {
      return 'closeable' in this.$options.propsData ? this.closeable : this.closable;
    },
    omittedValues() {
      if (this.multiple && this.collapseTags) {
        // collapseTags 模式下只显示一个 tag
        const omittedLength = this.selected.length - 1;
        if (omittedLength > 0) {
          return this.selected.slice(1);
        }
      }
      return [];
    },
    showNewOption() {
      if (!this.allowCreate || !this.filterable || !this.query) {
        return false;
      }
      const hasExistingOption = this.options.some((option) => !option.created && option.currentLabel === this.query);
      return !hasExistingOption;
    },
    showClear() {
      return this.clearable && !this.disabled && this.selected && this.selected.length && this.opened;
    },
  },
  watch: {
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
        if (this.options.length && this.defaultActiveFirstOption) {
          this.setHoverOption(this.options[0]);
        }
        if (this.filterable) {
          if (this.shouldClearQuery) {
            this.showValue = '';
          } else if (!this.multiple) {
            // tofix ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3305664
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
    opened(val) {
      this.$emit('update:visible', val);
    },
    options() {
      this.setSelected();
      if (this.opened && this.$refs.popper) {
        this.updatePopper();
        if (this.options.length && this.defaultActiveFirstOption) {
          const { showNewOption } = this;
          const first = this.options.find((item) => (showNewOption ? item.created : item.visible));
          first && this.setHoverOption(first);
        }
      }
    },
    value() {
      this.setSelected();
    },
    selected(val, old) {
      if (this.multiple) {
        if (!this.collapseTags) {
          this.updatePopper();
        }
      } else if (!this.focused) {
        this.showValue = this.formatterOption(this.selected);
        this.previousQuery = this.showValue || null;
      }
    },
    inputWidth() {
      this.minWidth = this.$refs.reference.$el.getBoundingClientRect().width + 'px';
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
    addOption(option) {
      this.options.push(option);
    },
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
    setSelectedAll() {
      const options = this.filteredOptions.filter((o) => !o._disabled);
      if (this.canSelectAll && this.value && this.value.length && this.value.length >= options.length) {
        const realValues = this.value.map((val) => getRealValue(val, this.realValue));
        this.isSelectAll = options.every((option) => {
          return realValues.indexOf(option.realValue) > -1;
        });
        return;
      }
      this.isSelectAll = false;
    },
    setSelected() {
      this.setSelectedAll();
      const value = this.isSelectAll ? [SELECT_ALL_VALUE, ...this.value] : this.value;
      const next = this.multiple ? (value || []).map(this.getOption) : this.getOption(value);

      this.selected = next;
    },
    handleFocus(event) {
      if (!this.disabled && this.filterable && !this.focused) {
        this.focused = true;
      }
      this.$emit('focus', event);
    },
    handleClose() {
      this.focused = false;
    },
    handleKeydown(e) {
      if (!this.disabled && !this.focused) {
        if (notKeys(e, ['enter', 'tab', 'esc', 'delete'])) {
          this.focused = true;
        }
      }
    },
    handleInputChange(e) {
      if (this.focused && this.filterable && this.query !== this.showValue) {
        this.query = this.showValue;
        this.debouncedQueryChange(this.query);
      }
    },
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
    handleQueryInput(e) {
      if (e && e.target) {
        // to fix vue 2.5.22 下多选输入抖动 bug。
        // ones: https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3016033
        this.query = e.target.value;
      }
      const { query } = this;
      // todo: 需要修改成当前字体大小
      const length = query.length * 14 + 5;
      this.inputLength = this.collapseTags ? Math.min(this.collapseMaxSearchWidth, length) : length;
      this.multiple && !this.collapseTags && this.updatePopper();
      this.debouncedQueryChange(this.query);
    },
    getOption(value) {
      // todo: 后续需要确认 value=null 时的处理逻辑
      const realValue = getRealValue(value, this.valueKey);
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
            return a === b || getRealValue(a) === getRealValue(b);
          });
        } else {
          // 全选
          const diffValues = subtraction(this.value, allValues, (a, b) => {
            return a === b || getRealValue(a) === getRealValue(b);
          });
          nextValues = [...(this.value || []), ...diffValues];
        }

        // const nextValues = this.isSelectAll ? []
        //   : this.options.filter((option) => {
        //     return !option.isSelectAll && !option._disabled;
        //   }).map((option) => option.value);

        this.$emit('input', nextValues);
        this.$emit('change', nextValues);
      } else if (this.multiple) {
        const copyiedValue = this.value ? [...this.value] : [];
        const realValues = copyiedValue.map((val) => {
          return getRealValue(val, this.valueKey);
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
        } else if (!this.multipleLimit || copyiedValue.length < this.multipleLimit) {
          copyiedValue.push(optionValue);
        }
        if (!this.reserveKeyword) {
          this.query = '';
          this.handleQueryInput();
        }
        this.$emit('input', copyiedValue);
        this.$emit('change', copyiedValue);
      } else {
        const realValue = getRealValue(this.value, this.valueKey);
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
    selectOption() {
      if (!this.opened) {
        this.toggleMenu();
      } else if (!this.isOnComposition && this.hoverOption && this.hoverOption.visible) {
        this.handleOptionClick(this.hoverOption);
      }
    },
    handleInputClear() {
      this.$emit('clear');
      this.$emit('input', this.multiple ? [] : '');
      this.$emit('change', this.multiple ? [] : '');
    },
    deletePrevTag(e) {
      if (this.disabled) {
        return;
      }
      if (!this.collapseTags && e.target.value.length <= 0) {
        const { filteredSelected } = this;
        if (!filteredSelected || !filteredSelected.length) {
          return;
        }
        const last = filteredSelected[filteredSelected.length - 1];

        if (!last.hitState) {
          this.$set(last, 'hitState', true);
        } else if (!last.disabled && this.closableFn(last)) {
          this.handleClearClick(last);
        }
      }
    },
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
    updatePopper() {
      this.$nextTick(() => {
        if (this.focused) {
          this.$refs.popper.updatePopper();
        }
      });
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
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
        if (this.defaultActiveFirstOption) {
          // 如果是可创建的，则自动 hover 创建的，否则找到第一个可显示的
          if (this.showNewOption) {
            const first = this.options.find((item) => item.created);
            first && this.setHoverOption(first);
          } else if (this.filteredOptionsCount) {
            this.setHoverOption(filteredOptions[0]);
          }
        }
        this.updatePopper();
      }
      this.$emit('filter', val);
    },
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
    onOptionDestroy(option) {
      const index = this.options.indexOf(option);
      if (this.hoverOption === option) {
        this.resetHover();
      }
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },
    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        const menu = this.$refs.menu;
        scrollIntoView(menu, target);
      }
      // this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    closableFn(item) {
      return isFunction(this.canClosed) ? this.canClosed(item) : this.canClosed;
    },

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
    removeScrollListener() {
      if (this.scrollListener) {
        const { dropdownPrefix } = this;
        const scrollElement = this.$refs.drop.$el.querySelector(`.${dropdownPrefix}-menu`);
        off(scrollElement, 'scroll', this.handleScroll);
      }
      this.scrollListener = false;
    },

    handleScroll(event) {
      this.$emit('scroll', event);
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollTop + clientHeight + 20 >= scrollHeight) {
        this.$emit('scroll-bottom', event);
      }
    },

    focus() {
      const { reference, tagInput } = this.$refs;
      this.focused = true;
      if (this.multiple) {
        tagInput.focus();
        return;
      }
      reference.focus();
    },
    blur() {
      const { reference, tagInput } = this.$refs;
      this.focused = false;
      if (this.multiple) {
        tagInput.blur();
        return;
      }
      reference.blur();
    },
  },
};
</script>

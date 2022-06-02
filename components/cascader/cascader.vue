<template>
  <popper
    :class="{
      [`${prefix}`]: true,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-${size}`]: size,
      focus: visible,
    }"
    :popper-disabled="disabled"
    :visible="visible"
    trigger="click"
    ref="popper"
    :placement="placement"
    @clickoutside="handleClickoutside"
  >
    <Reference>
      <div>
        <wt-input
          :size="size"
          ref="input"
          v-model="inputValue"
          :placeholder="currentPlaceholder"
          :disabled="disabled"
          :readonly="!filterable"
          :clearable="clearable"
          :label="label"
          :invalid="invalid"
          @focus="handleFocus"
          @click.native="handleInputClick"
          @clear="handleClear"
          @input="handleInput"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
        >
          <wt-icon name="chevron-down" slot="suffix" />
        </wt-input>
      </div>
    </Reference>
    <Drop :use-show="multiple" :class="[`${prefix}-popper`]">
      <wt-cascader-menus
        ref="menus"
        :filterable="filterable && !remote"
        :filter="filter"
        :filter-method="filterMethod"
        :filter-parent="!changeOnSelect"
        :menu-width="inputWidth"
        :data="data"
        :props="fieldNames"
        :change-on-select="changeOnSelect"
        :expand-trigger="expandTrigger"
        :load-data="loadData"
        :loading="loading"
        :loading-text="loadingText"
        :no-data-text="noDataText"
        :no-match-text="noMatchText"
        :expanded-value="expandedValue"
        @expanded-change="handleExpandedChange"
        :value="expandedValue"
        @select="handleSelect"
        @click="handleClickItem"
        :checked-values="value"
      >
        <template slot-scope="{ node, data }">
          <slot :node="node" :data="data">
            <span>{{ node.label }}</span>
          </slot>
        </template>
      </wt-cascader-menus>
    </Drop>
  </popper>
</template>
<script>
import { Popper, Reference, Drop } from '@components/popper';
import WtInput from '@components/input';
import Menus from './menus';
import { DEFAULT_FIELD_NAMES, getActivePaths } from './util.js';
import debounce from 'throttle-debounce/debounce';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'Cascader',
  components: {
    Popper,
    Reference,
    Drop,
    WtInput,
    WtCascaderMenus: Menus,
  },
  props: {
    icon: String,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    label: String,
    noDataText: String,
    changeOnSelect: Boolean,
    expandTrigger: String,
    formatter: Function,
    separator: {
      type: String,
      default: ' / ',
    },
    loadData: Function,
    filterable: Boolean,
    debounce: {
      type: Number,
      default: 300,
    },
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    noMatchText: String,
    invalid: Boolean,
    loading: Boolean,
    loadingText: String,
    disabled: Boolean,
    clearable: Boolean,
    size: String,
    placeholder: {
      type: String,
      default() {
        return '请选择';
      },
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    visible: Boolean,
    multiple: Boolean,
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
      inputValue: '',
      expandedValue: this.value,
      focused: false,
      previousQuery: null,
      filter: '',
      inputWidth: '',
      valueStrs: '',
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('cascader');
    },
    fieldNames() {
      return {
        ...DEFAULT_FIELD_NAMES,
      };
    },
    currentPlaceholder() {
      return !this.filterable || !this.focused ? this.placeholder : this.valueStrs[0] || this.placeholder;
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(n) {
        n ? this.handleMenuVisible() : this.handleMenuHidden();
      },
    },
    value: {
      immediate: true,
      handler(n, v) {
        this.updateValueStrs();
      },
    },
    valueStrs: {
      immediate: true,
      handler(n, old) {
        if (!old || n[0] !== old[0]) {
          this.setInputValue(n, { force: true });
        }
      },
    },
    expandedValue() {
      this.$nextTick(() => {
        this.updatePopper();
      });
    },
    data(n, v) {
      if ((!v || !v.length) && (n || n.length)) {
        this.updateValueStrs();
      }
      if (this.visible && n !== v) {
        this.expandedValue = this.value;
      }
    },
  },
  created() {
    this.debouncedQuery = !this.debounce ? this.handleQuery : debounce(this.debounce, this.handleQuery);
  },
  methods: {
    openMenu() {
      if (!this.visible) {
        this.$emit('update:visible', true);
      }
    },
    closeMenu() {
      if (this.visible) {
        this.$emit('update:visible', false);
      }
    },
    handleMenuVisible() {
      this.expandedValue = this.value;
      this.focused = true;
      this.setInputValue(['']);
      const { input } = this.$refs;
      if (input) {
        this.inputWidth = `${input.$el.getBoundingClientRect().width}px`;
      }
      this.$nextTick(this.scrollMenu);
    },
    handleMenuHidden() {
      this.setInputValue(this.valueStrs);
      this.focused = false;
      this.filter = '';
      this.previousQuery = '';
    },
    handleClickoutside(e) {
      if (this.disabled) {
        return;
      }
      this.closeMenu();
      this.$emit('clickoutside', e);
      this.$emit('blur', e);
    },
    handleFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    handleClear() {
      // 如果是过滤中点击清空按钮则清空当前搜索条件，否则清空当前值
      if (this.visible && this.filterable && this.inputValue) {
        this.setInputValue(['']);
      } else {
        this.$emit('clear');
        this.setValue([], [], []);
      }
    },
    handleInput(v) {
      if (!this.visible) {
        // to fix: https://tt.sankuai.com/ticket/detail?id=5934989
        this.openMenu();
      }
      this.debouncedQuery(this.inputValue);
    },
    handleInputChange(v) {
      this.inputValue = v;
      this.$nextTick(this.updatePopper);
      this.handleInput(v);
    },
    handleComposition(e) {
      const { type } = e;
      if (type === 'compositionend') {
        this.isOnComposition = false;
        // 当混合输入前后值不变时，不会触发后续的 input 事件，所以需要再次触发 query
        this.debouncedQuery(this.inputValue);
      } else {
        this.isOnComposition = true;
      }
    },
    handleInputClick() {
      if (this.disabled) {
        return;
      }
      if (!this.visible) {
        this.openMenu();
      } else if (!this.filterable) {
        this.closeMenu();
      }
    },
    handleQuery(val) {
      if (this.previousQuery === val || this.isOnComposition) {
        return;
      }
      this.previousQuery = val;
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(val);
      } else {
        this.filter = val;
      }
      // 如果通过样式修改面板高为不定高后，依赖此方法重新定位
      this.$nextTick(() => {
        this.updatePopper();
      });
      this.$emit('filter', val);
    },

    setValue(values, nodes) {
      this.$emit('input', values);
      const datas = nodes.map((node) => node.data);
      this.$emit('change', values, datas, nodes);
    },
    setInputValue(values, option = {}) {
      if (this.filterable || option.force) {
        this.inputValue = values[0];
      }
    },
    handleSelect(value, nodes) {
      this.setValue(value, nodes);
      this.closeMenu();
    },
    handleClickItem(value, nodes) {
      this.setValue(value, nodes);
    },
    handleExpandedChange(values, nodes) {
      this.expandedValue = values;
      const datas = nodes.map((node) => node.data);
      // 展开项发生变化
      this.$emit('active-item-change', datas);
    },
    scrollMenu() {
      const menus = this.$refs.menus;
      if (menus) {
        menus.scrollIntoView();
      }
    },
    focus() {
      this.$refs.input.focus();
      this.openMenu();
    },
    blur() {
      this.$refs.input.blur();
      this.closeMenu();
    },
    updatePopper() {
      if (this.visible) {
        this.$refs.popper.updatePopper();
      }
    },
    updateValueStrs() {
      const labelField = this.fieldNames.label;
      const values = [this.value];
      this.valueStrs = values.map((value) => {
        const actived = getActivePaths(this.data, value, this.fieldNames);
        const labels = actived.map((item) => item[labelField]);
        if (this.formatter) {
          return this.formatter(labels, actived, value);
        }
        return labels.join(`${this.separator}`);
      });
    },
  },
};
</script>

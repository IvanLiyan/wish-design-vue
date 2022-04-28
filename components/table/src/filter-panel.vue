<template>
  <wt-dropdown
    trigger="click"
    placement="bottom-end"
    :visible="visible"
    :disabled="disabled"
    @input="handleVisibleChange"
    @click.native.stop
    ref="dropdown"
>
    <div
      :class="[`${prefix}-column-filter-trigger`, {
        hover: visible,
        [`${prefix}-column-filter-trigger-filtered`]: value && value.length,
      }]"
    >
      <slot name="filter-icon" :active="visible" :filtered="filtered"><Icon name="filter" /></slot>
    </div>
    <div slot="dropdown">
      <slot name="filter-dropdown"
        :confirm="confirmFilter" :clear="clearFilter"
        :setSelected="handleSelect" :selectedValue="value"
      >
        <wt-checkbox-group v-model="value"
          :class="`${prefix}-filter-checkbox-group`" v-if="multiple">
          <wt-checkbox v-for="item in column.filters" :key="item.value"
            :class="dropdownPrefix"
            :value="item.value"
          >
            {{ item.text }}
          </wt-checkbox>
        </wt-checkbox-group>
        <div v-else>
          <div v-for="item in column.filters" :key="item.value"
            :class="[dropdownPrefix, {
              [`${dropdownPrefix}-selected`]: item.value === value[0],
            }]"
            @click="selectSingleValue(item.value)"
          >
              <span>{{ item.text }}</span>
          </div>
        </div>
        <div :class="`${prefix}-filter-footer`" v-show="showActions">
          <a :class="`${prefix}-filter-footer-confirm`"
            @click="confirmFilter" v-if="multiple">确定</a>
          <a :class="`${prefix}-filter-footer-clear`" @click="clearFilter">重置</a>
        </div>

      </slot>
    </div>
  </wt-dropdown>
</template>
<script>
import WtDropdown from '@components/dropdown';
import WtCheckboxGroup from '@components/checkbox-group';
import WtCheckbox from '@components/checkbox';
import Icon from '@components/icon';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'FilerPanel',
  components: {
    WtDropdown,
    WtCheckboxGroup,
    WtCheckbox,
    Icon,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    fixed: Boolean,
    disabled: Boolean,
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data () {
    return {
      value: this.column.filteredValue || [], // 保存用户在点击确定或关闭下拉前的操作值
    };
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('table');
    },
    dropdownPrefix () {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
    table () {
      // $parent is table-header;
      return this.$parent.table;
    },
    visible () {
      return !this.disabled && this.column.filterDropdownVisible;
    },
    filtered () {
      return this.value && this.value.length;
    },
    multiple () {
      return this.column.filterMultiple;
    },
    showActions () {
      return this.multiple || this.column.showFilterActions;
    },
  },
  watch: {
    'column.filteredValue' (filteredValue) {
      if (this.value !== filteredValue) {
        this.value = filteredValue;
        this.table.store.computedFilteredData();
      }
    },
    visible (nVisible, oVisible) {
      if (!nVisible && this.value !== this.column.filteredValue) {
        this.table.store.computedFilteredData();
      }
    },
  },
  mounted () {
    !this.disabled &&
      this.table.bodyWrapper.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    !this.disabled &&
      this.table.bodyWrapper.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      this.updatePopper();
    },
    updateFilteredValue (filteredValue) {
      if (this.column.filteredValue !== filteredValue) {
        this.column.updateFilteredValue(filteredValue);
        // 由于受控模式下是在 watch 中进行 value 值的同步，故需要使用 nextTick
        this.$nextTick(() => {
          this.value = this.column.filteredValue;
          this.table.store.computedFilteredData();
          const {
            filters, sortOrder, sortingColumn,
          } = this.table.store.states;
          const { prop, order } = sortOrder || {};
          this.table.$emit('change', filters || {},
            { prop, order, column: sortingColumn });
        });
      }
    },
    close () {
      this.column.updateFilterDropdownVisible(false);
    },
    handleVisibleChange (visible) {
      this.column.updateFilterDropdownVisible(visible);
      if (!visible) {
        this.confirmFilter({ closed: false });
      }
    },
    confirmFilter (options) {
      const { closed = true } = options || {};
      closed && this.close();
      // todo: 可判断是否变更后在更新
      this.updateFilteredValue(this.value);
    },
    clearFilter (options) {
      const { closed = true } = options || {};
      closed && this.close();
      this.updateFilteredValue([]);
    },
    handleSelect (value) {
      this.value = value;
    },
    selectSingleValue (value) {
      this.value = [value];
      this.confirmFilter();
    },
    updatePopper () {
      this.$refs.dropdown.updatePopper();
    },
  },
};
</script>

<template>
  <wt-select
    v-bind="selectProps"
    :class="`${prefix}-options`"
    :value="pageSize"
    :size="size"
    @input="handleChange"
    placeholder="请选择">
    <wt-option
      v-for="item in pageSizeOptions"
      :key="item"
      :label="item+'条/页'"
      :value="item" />
  </wt-select>
</template>

<script>
import WtSelect from '@components/select';
import WtOption from '@components/option';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'PaginationOptions',

  components: {
    WtSelect,
    WtOption,
  },
  props: {
    pageSizeOptions: Array,
    pageSize: Number,
    size: {
      type: String,
    },
    selectProps: {
      type: Object,
      default () {
        return {};
      },
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('pagination');
    },
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val);
    },
  },
};
</script>

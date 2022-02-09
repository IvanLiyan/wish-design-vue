<template>
  <wt-select v-model="value" :formatter="formatter" filterable value-key="id">
    <wt-option v-for="item in options" :key="item.id" :value="item" :label="item.name" />
  </wt-select>
</template>
<script>
import MtdSelect from '@components/select';
import MtdOption from '@components/option';

export default {
  components: {
    MtdSelect,
    MtdOption,
  },
  data() {
    return {
      value: {
        id: '1',
        name: '李白',
      },
      options: [
        {
          id: '1',
          name: '李白',
        },
        {
          id: '2',
          name: '李贺',
        },
        {
          id: '3',
          name: '杜甫',
        },
        {
          id: '4',
          name: '白居易',
        },
        {
          id: '5',
          name: '屈原',
        },
      ],
    };
  },
  methods: {
    formatter(option) {
      return `name: ${option.value.name}`;
    },
  },
};
</script>

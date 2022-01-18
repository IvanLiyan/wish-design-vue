<template>
  <wt-select v-model="value" value-key="id">
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
  props: {
    options: {
      type: Array,
      default() {
        return [
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
        ];
      },
    },
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>

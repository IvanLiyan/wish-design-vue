<template>
  <div>
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.value">{{ lang.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'StyleSelector',
  inheritAttrs: false,
  props: {},
  data: () => {
    return {
      langs: [
        {
          label: '中文',
          value: 'chinese',
        },
        {
          label: 'English',
          value: 'english',
        },
      ],
    };
  },
};
</script>

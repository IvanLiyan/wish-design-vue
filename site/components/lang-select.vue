<template>
  <div>
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in Object.keys(this.$i18n.messages)" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'StyleSelector',
  inheritAttrs: false,
  props: {},
};
</script>

<template>
  <wt-form label-position="top">
    <wt-form-item label="文案1">
      <wt-input type="text" v-model="text" />
    </wt-form-item>
    <wt-form-item label="文案2">
      <wt-select type="text" v-model="fields1.value">
        <wt-option :value="1" label="option1" />
        <wt-option :value="2" label="option2" />
        <wt-option :value="3" label="option3" />
        <wt-option :value="4" label="option4" />
      </wt-select>
    </wt-form-item>
  </wt-form>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      fields1: {
        value: '',
      },
    };
  },
};
</script>

<template>
  <checkbox-group v-bind="$attrs">
    <checkbox value="1" />
    <checkbox value="2" name="other" />
    <checkbox value="3" disabled />
    <checkbox value="4" checked />
  </checkbox-group>
</template>
<script>
import CheckboxGroup, { withCheckboxGroup } from '../../index.js';

const TestCheckbox = withCheckboxGroup('checkbox', {
  name: 'DumbCheckbox',
  props: {
    value: [String, Number],
    disabled: Boolean,
    checked: Boolean,
    name: String,
  },
  methods: {
    handleClick (v) {
      this.$emit('input', !this.checked);
    },
  },
  render (h) {
    return h('div', {
      on: {
        click: this.handleClick,
      },
    });
  },
});

export default {
  name: 'SlotTest',
  components: {
    checkbox: TestCheckbox,
    CheckboxGroup,
  },
};
</script>

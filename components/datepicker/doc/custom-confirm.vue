<template>
  <div class="demo-container">
    <wt-date-picker type="date" v-model="value1" confirm :open.sync="open" placeholder="选择时间">
      <template v-slot:confirm>
        <wt-button-group>
          <wt-button type="text" @click="clear">清空</wt-button>
          <wt-button type="primary" @click="submit">确定</wt-button>
        </wt-button-group>
      </template>
    </wt-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: new Date(),
      open: false,
    };
  },
  methods: {
    clear() {
      this.value1 = undefined;
      this.open = false;
    },
    submit() {
      this.open = false;
    },
  },
};
</script>

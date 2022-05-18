<template>
  <div>
    <wt-stepper :active="active">
      <wt-step title="步骤 1" />
      <wt-step title="步骤 2" />
      <wt-step title="步骤 3" />
    </wt-stepper>
    <div style="margin-top: 30px">
      <wt-button @click="prev">上一步</wt-button>
      <wt-button type="primary" style="margin-left: 24px" @click="next">下一步</wt-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      if (this.active-- < 1) this.active = 3;
    },
  },
};
</script>

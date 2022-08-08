<template>
  <div>
    <wt-stepper :active="active">
      <wt-step title="Step 1" />
      <wt-step title="Step 2" />
      <wt-step title="Step 3" />
    </wt-stepper>
    <div style="margin-top: 30px">
      <wt-button @click="prev">Previous Step</wt-button>
      <wt-button type="primary" style="margin-left: 24px" @click="next">Next Step</wt-button>
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

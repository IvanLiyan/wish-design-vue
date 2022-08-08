<template>
  <div>
    <wt-button type="primary" @click="openDialog1">Click</wt-button>
    <wt-dialog title="Confirm submit?" v-model="visible1" width="400px">
      <div>After submitting the application content of the logistics provider price, we will wait for the approval of the customer service, and the result can be viewed in one working day.</div>
      <div slot="footer" class="demo-dialog-footer">
        <wt-button type="primary" @click="closeDialog1">OK</wt-button>
        <wt-button type="secondary" @click="closeDialog1">Cancel</wt-button>
      </div>
    </wt-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible1: false,
    };
  },
  methods: {
    openDialog1() {
      this.visible1 = true;
    },
    closeDialog1() {
      this.visible1 = false;
    },
  },
};
</script>

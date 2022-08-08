<template>
  <div>
    <wt-button type="primary" @click="openDialog5">Async closing</wt-button>
    <wt-dialog :mask-closable="false" width="400px" v-model="visible5" title="Dialog box that is closed async">
      Be nice to yourself even if you make an enemy of the whole world.
      <div slot="footer" class="demo-dialog-footer">
        <wt-button type="primary" :loading="submitting" @click="submitDialog5">Submit</wt-button>
        <wt-button type="secondary" @click="cancelDialog5">Cancel</wt-button>
      </div>
    </wt-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible5: false,
      submitting: false,
    };
  },
  methods: {
    openDialog5() {
      this.visible5 = true;
    },
    cancelDialog5() {
      this.visible5 = false;
    },
    submitDialog5() {
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
        this.visible5 = false;
      }, 3000);
    },
  },
};
</script>

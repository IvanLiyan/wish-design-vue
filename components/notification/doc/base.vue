<template>
  <div class="demo-container">
    <wt-button type="success" @click="clickSuccess">success</wt-button>
    <wt-button type="warning" @click="clickWarning">warning</wt-button>
    <wt-button type="error" @click="clickError">error</wt-button>
    <wt-button type="secondary" @click="clickInfo">info</wt-button>
  </div>
</template>

<script>
export default {
  methods: {
    clickSuccess: function (e) {
      this.$wt.notify({
        type: 'success',
        message: 'I am a success notification',
      });
    },
    clickWarning: function (e) {
      this.$wt.notify({
        type: 'warning',
        message: 'I am a warning notification',
      });
    },
    clickError: function (e) {
      this.$wt.notify({
        type: 'error',
        message: 'I am an error notification',
      });
    },
    clickInfo: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am an info notification',
      });
    },
  },
};
</script>

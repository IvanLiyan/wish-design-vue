<template>
  <div class="demo-container">
    <wt-button type="success" @click="clickSuccess">success</wt-button>
    <wt-button type="warning" @click="clickWarning">warning</wt-button>
    <wt-button type="danger" @click="clickDanger">danger</wt-button>
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
    clickDanger: function (e) {
      this.$wt.notify({
        type: 'danger',
        message: 'I am a danger notification',
      });
    },
    clickInfo: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
      });
    },
  },
};
</script>

<template>
  <div>
    <h2>diff type</h2>
    <div class="demo-container">
      <wt-button type="success" @click="click1">success</wt-button>
      <wt-button type="warning" @click="click2">warning</wt-button>
      <wt-button type="danger" @click="click3">danger</wt-button>
      <wt-button type="secondary" @click="click4">info</wt-button>
    </div>
    <div>
      <h2>duration time</h2>
      <div class="demo-container">
        <wt-button @click="click5">0s</wt-button>
        <wt-button @click="click6">3s</wt-button>
        <wt-button @click="click7">5s</wt-button>
        <wt-button @click="click8">7s</wt-button>
      </div>
    </div>
    <div>
      <h2>position</h2>
      <div class="demo-container">
        <wt-button @click="click9">top-left</wt-button>
        <wt-button @click="click11">top-center</wt-button>
        <wt-button @click="click10">top-right</wt-button>
        <wt-button @click="click12">bottom-left</wt-button>
        <wt-button @click="click17">bottom-center</wt-button>
        <wt-button @click="click18">bottom-right</wt-button>
      </div>
    </div>
    <div>
      <h2>offset</h2>
      <div class="demo-container">
        <wt-button @click="click13">0px</wt-button>
        <wt-button @click="click14">30px</wt-button>
        <wt-button @click="click15">50px</wt-button>
        <wt-button @click="click16">100px</wt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    click1: function (e) {
      this.$wt.notify({
        type: 'success',
        message: 'I am a success notification',
      });
    },
    click2: function (e) {
      this.$wt.notify({
        type: 'warning',
        message: 'I am a warning notification',
      });
    },
    click3: function (e) {
      this.$wt.notify({
        type: 'danger',
        message: 'I am a danger notification',
      });
    },
    click4: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
      });
    },
    click5: function (e) {
      this.$wt.notify({
        type: 'success',
        message: 'I am a success notification',
        duration: 0,
      });
    },
    click6: function (e) {
      this.$wt.notify({
        type: 'warning',
        message: 'I am a warning notification',
        duration: 3000,
      });
    },
    click7: function (e) {
      this.$wt.notify({
        type: 'danger',
        message: 'I am a danger notification',
        duration: 5000,
      });
    },
    click8: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
        duration: 7000,
      });
    },

    click9: function (e) {
      this.$wt.notify({
        type: 'success',
        message: 'I am a success notification',
        position: 'top-left',
      });
    },
    click10: function (e) {
      this.$wt.notify({
        type: 'warning',
        message: 'I am a warning notification',
        position: 'top-right',
      });
    },
    click11: function (e) {
      this.$wt.notify({
        type: 'danger',
        message: 'I am a danger notification',
        position: 'top-center',
      });
    },
    click12: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
        position: 'bottom-left',
      });
    },
    click17: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
        position: 'bottom-center',
      });
    },
    click18: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
        position: 'bottom-right',
      });
    },
    click13: function (e) {
      this.$wt.notify({
        type: 'success',
        message: 'I am a success notification',
        offset: 0,
      });
    },
    click14: function (e) {
      this.$wt.notify({
        type: 'warning',
        message: 'I am a warning notification',
        offset: 30,
      });
    },
    click15: function (e) {
      this.$wt.notify({
        type: 'danger',
        message: 'I am a danger notification',
        offset: 50,
      });
    },
    click16: function (e) {
      this.$wt.notify({
        type: 'info',
        message: 'I am a info notification',
        offset: 100,
      });
    },
  },
};
</script>

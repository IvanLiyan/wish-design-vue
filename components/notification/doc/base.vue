<template>
  <div>
    <wt-notification.com @click="click">text</wt-notification.com>
  </div>
</template>

<script>
export default {
  methods: {
    click: function (e) {
      this.$wt.notify({
        title: 'title',
        message: 'message',
      });
    },
  },
};
</script>

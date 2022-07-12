<template>
  <wt-button @click="handleClick" type="primary">submit</wt-button>
</template>
<script>
export default {
  methods: {
    async handleClick() {
      try {
        await this.ajax();
      } catch (e) {
      }
    },
    ajax() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
  },
};
</script>

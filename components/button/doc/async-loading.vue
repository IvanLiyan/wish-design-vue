<template>
  <wt-button @click="handleClick" type="primary">submit</wt-button>
</template>
<script>
export default {
  methods: {
    async handleClick() {
      // 请注意必须 catch error，否则 vue 自身将捕获到相应的错误并报错。
      try {
        await this.ajax();
      } catch (e) {
        // do something
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

<template>
  <div>
    <div class="demo-box">
      <wt-progress :percentage="value1" :status="status1" />
    </div>
    <wt-button @click="handleClick1">预览效果</wt-button>
    <div class="demo-box">
      <wt-progress :percentage="value2" :status="status2" />
    </div>
    <wt-button @click="handleClick2">预览效果</wt-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 10,
      value2: 10,
      status1: '',
      status2: '',
    };
  },
  methods: {
    handleClick1 () {
      this.value1 = 0;
      this.status1 = '';
      const f1 = () => {
        setTimeout(() => {
          if (this.value1 < 100) {
            this.value1 = this.value1 + 1;
            f1();
          } else {
            this.status1 = 'success';
          }
        }, 200);
      };
      f1();
    },
    handleClick2 () {
      this.value2 = 0;
      this.status2 = '';
      const f1 = () => {
        setTimeout(() => {
          if (this.value2 < 50) {
            this.value2 = this.value2 + 1;
            f1();
          } else {
            this.status2 = 'error';
          }
        }, 200);
      };
      f1();
    },
  },
};
</script>
<style lang="scss">
  .demo-box{
    width: 350px;
    margin-left: 20px;
    display: inline-block;
    margin-bottom: 40px;
  }
</style>

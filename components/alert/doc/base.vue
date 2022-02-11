<template>
  <div class="demo-container-left">
    <wt-alert @close="close">
      <span slot="title">联运物流商春节放假通知</span>
      <p slot="description">
        为了确保您的产品能及时进入海外仓、保证服务质量，Uni-Freight（联运）物流服务商将于2021年2月5日截单（停止收货），若您需使用Uni-Freight（联运）服务，请提前下单，并确保产品在2月4日18:00前送达联运仓库。
      </p>
    </wt-alert>
    <wt-alert @close="close">
      <p slot="description">我是一个不会自动消失的信息提示</p>
    </wt-alert>
  </div>
</template>

<script>
export default {
  methods: {
    close: function () {
      this.$wt.notify({
        type: 'success',
        message: 'Close alert success',
      });
    },
  },
};
</script>

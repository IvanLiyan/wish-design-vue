<template>
  <div class="demo-container-left">
    <wt-alert type="warning" @close="close">
      <span slot="title">Spring Festival holiday notice for intermodal logistics providers</span>
      <p slot="description">
        In order to ensure that your products can enter overseas warehouses in time and ensure service quality,
        Uni-Freight (intermodal) logistics service providers will cut off orders (stop receiving goods) on February 5,
        2021. If you need to use Uni-Freight (intermodal) service, please place an order in advance and ensure that the
        product arrives at the intermodal warehouse before 18:00 on February 4.
      </p>
    </wt-alert>
    <wt-alert type="success" @close="close">
      <span slot="title">Spring Festival holiday notice for intermodal logistics providers</span>
      <p slot="description">
        In order to ensure that your products can enter overseas warehouses in time and ensure service quality,
        Uni-Freight (intermodal) logistics service providers will cut off orders (stop receiving goods) on February 5,
        2021. If you need to use Uni-Freight (intermodal) service, please place an order in advance and ensure that the
        product arrives at the intermodal warehouse before 18:00 on February 4.
      </p>
    </wt-alert>
    <wt-alert type="error" @close="close">
      <span slot="title">Spring Festival holiday notice for intermodal logistics providers</span>
      <p slot="description">
        In order to ensure that your products can enter overseas warehouses in time and ensure service quality,
        Uni-Freight (intermodal) logistics service providers will cut off orders (stop receiving goods) on February 5,
        2021. If you need to use Uni-Freight (intermodal) service, please place an order in advance and ensure that the
        product arrives at the intermodal warehouse before 18:00 on February 4.
      </p>
    </wt-alert>
    <wt-alert type="info" @close="close">
      <span slot="title">Spring Festival holiday notice for intermodal logistics providers</span>
      <p slot="description">
        In order to ensure that your products can enter overseas warehouses in time and ensure service quality,
        Uni-Freight (intermodal) logistics service providers will cut off orders (stop receiving goods) on February 5,
        2021. If you need to use Uni-Freight (intermodal) service, please place an order in advance and ensure that the
        product arrives at the intermodal warehouse before 18:00 on February 4.
      </p>
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

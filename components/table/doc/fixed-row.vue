<template>
  <div>
    <wt-table :data="tableData" height="180px" :pagination="pagination">
      <wt-table-column
        prop="orderId"
        label="WOSP order id"
        width="160" />
      <wt-table-column
        prop="logId"
        label="Logistics tracking number"
        width="170" />
      <wt-table-column
        prop="logStatus"
        label="Logistics status"
        width="140" />
      <wt-table-column
        prop="orderStatus"
        width="90"
        label="Order status" />
      <wt-table-column
        prop="channelNum"
        width="120"
        label="Channel Number" />
      <wt-table-column
        prop="name"
        label="Recipient"
        width="170" />
      <wt-table-column
        prop="addTime"
        label="Create time"
        width="160" />
      <wt-table-column
        prop="control"
        label="Control" />
    </wt-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      tableData: [{
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="error">Cancel</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost order has been generated',
        orderStatus: <wt-tag type="success">Complete</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }],
      pagination: {
        total: 60,
        showTotal: true,
        showQuickJumper: true,
        showSizeChanger: true,
        currentPage: this.currentPage,
        onChange: this.onPageChange,
      },
    };
  },
  methods: {
    onPageChange(current, size) {
      console.log('current:', current, ';size:', size);
    },
  },
};
</script>

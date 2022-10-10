<template>
  <div>
    <wt-table :data="tableData" :sort-order.sync="orderData" :pagination="pagination">
      <wt-table-column
        prop="orderId"
        label="WOSP order id"
        sortable
        width="160" />
      <wt-table-column
        prop="logId"
        label="Logistics tracking number"
        sortable
        width="190" />
      <wt-table-column
        prop="logStatus"
        label="Logistics status"
        sortable
        width="140" />
      <wt-table-column
        prop="orderStatus"
        width="130"
        sortable
        label="Order status" />
      <wt-table-column
        prop="channelNum"
        width="140"
        sortable
        label="Channel number" />
      <wt-table-column
        prop="name"
        label="Recipient"
        sortable
        width="170" />
      <wt-table-column
        prop="addTime"
        label="Create time"
        sortable
        width="160" />
      <wt-table-column
        prop="control"
        label="Control"
        width="100" />
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
      }],
      orderData: {
        prop: 'orderId',
        order: 'descending',
      },
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
    sort (row1, row2) {
      return row1.date > row2.date ? 1 : -1;
    },
    onPageChange(current, size) {
      console.log('current:', current, ';size:', size);
    },
  },
};
</script>

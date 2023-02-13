<template>
  <div>
    <wt-table :data="tableData" :auto-paging="true" :items-per-page="5">
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
        width="70"
        label="Channel number" />
      <wt-table-column
        prop="name"
        label="Recipient"
        width="170" />
      <wt-table-column
        prop="addTime"
        label="Create time"
        width="160" />
    </wt-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
      tableData: [],
    };
  },
  created () {
    const dataArr = [];
    for (let i = 0; i < 100; i++) {
      dataArr.push({
        orderId: 'WOSP021700118DEU' + i,
        logId: 'WI0011177002FPL' + i,
        logStatus: 'Wishpost order has been generated',
        orderStatus: i % 2 === 0 ? <wt-tag type="success">Complete</wt-tag> : <wt-tag type="error">Cancel</wt-tag>,
        channelNum: '53' + i,
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
      });
    };
    this.tableData = dataArr;
  },
};
</script>

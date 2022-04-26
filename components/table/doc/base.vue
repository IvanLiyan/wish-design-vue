<template>
  <div>
    <wt-table :data="tableData">
      <wt-table-column
        prop="orderId"
        label="WOSP订单ID"
        width="200" />
      <wt-table-column
        prop="logId"
        label="物流追踪单号"
        width="180" />
      <wt-table-column
        prop="logStatus"
        label="物流状态"
        width="160" />
      <wt-table-column
        prop="orderStatus"
        width="100"
        label="订单状态" />
      <wt-table-column
        prop="channelNum"
        label="渠道号" />
      <wt-table-column
        prop="name"
        label="收件人"
        width="170" />
      <wt-table-column
        prop="addTime"
        label="创建时间"
        width="160" />
      <wt-table-column
        prop="control"
        label="操作" />
    </wt-table>
    <wt-pagination
      size="small"
      :total="60"
      :show-total="false"
      :current-page.sync="currentPage"
    />
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
        logStatus: 'Wishpost订单已生成',
        orderStatus: <wt-tag type="error">用户取消</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: '',
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost订单已生成',
        orderStatus: <wt-tag type="success">已完成</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: '',
      }],
    };
  },
};
</script>

<template>
  <div>
    <wt-table :data="tableData" :pagination="pagination">
      <wt-table-column
        prop="orderId"
        label="WOSP订单ID"
        width="160" />
      <wt-table-column
        prop="logId"
        label="物流追踪单号"
        width="140" />
      <wt-table-column
        prop="logStatus"
        label="物流状态"
        width="140" />
      <wt-table-column
        prop="orderStatus"
        width="90"
        label="订单状态" />
      <wt-table-column
        prop="channelNum"
        width="70"
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
        fixed="right"
        prop="control"
        label="操作" />
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
        logStatus: 'Wishpost订单已生成',
        orderStatus: <wt-tag type="error">用户取消</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost订单已生成',
        orderStatus: <wt-tag type="success">已完成</wt-tag>,
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

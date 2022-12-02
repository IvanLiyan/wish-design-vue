<template>
  <div>
    <wt-table
      class="expandsTable"
      :data="tableData"
      :row-key="getRowKeys"
      :expandable="expandable"
      :expand-row-keys="expands"
      :pagination="pagination">
      <wt-table-column type="expand">
        <template slot-scope="scope" slot="expand">
          <div @click="scope.toggle" class="expand-wrapper">
              <wt-icon @click="testPrint(scope)" :class="scope.expanded && 'expanded-icon'" name="chevron-right" :width="20" :height="20" :stroke-width="1" />
          </div>
        </template>
        <template slot-scope="props">
          {{ props.row.expandText }}
        </template>
      </wt-table-column>
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
      <wt-table-column
        fixed="right"
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
      tableData: [
        {
          orderId: 'WOSP021700118221DEU',
          logId: 'WI001117700472FPL',
          logStatus: 'Wishpost order has been generated',
          orderStatus: <wt-tag type="error">Cancel</wt-tag>,
          channelNum: '5301',
          name: 'F.lli Gregorio Giuseppe',
          addTime: '2020-08-25 00:00:00',
          control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
          expandText: 'The logistics has been terminated.',
        }, {
          orderId: 'WOSP021700118221DES',
          logId: 'WI001117700473FPL',
          logStatus: 'Wishpost order has been generated',
          orderStatus: <wt-tag type="success">Complete</wt-tag>,
          channelNum: '5301',
          name: 'F.lli Gregorio Giuseppe',
          addTime: '2020-08-25 00:00:00',
          control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
          expandText: 'Need to confirm again.',
        }, {
          orderId: 'WOSP021700118221DEK',
          logId: 'WI001117700474FPL',
          logStatus: 'Wishpost order has been generated',
          orderStatus: <wt-tag type="success">Complete</wt-tag>,
          channelNum: '5301',
          name: 'F.lli Gregorio Giuseppe',
          addTime: '2020-08-25 00:00:00',
          control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
        },
      ],
      expands: [],
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
    getRowKeys (row) {
      return row.orderId;
    },
    expandable (row, index) {
      return index > -1 && index !== 2;
    },
    onPageChange(current, size) {
      console.log('current:', current, ';size:', size);
    },
    testPrint(scope) {
      console.log('scope', scope);
    },
  },
};
</script>

<style>
  .expandsTable .wt-table-expanded-cell td {
    background-color: #F7F8FC;
  }
</style>

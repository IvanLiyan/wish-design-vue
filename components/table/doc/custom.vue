<template>
  <wt-table :data="tableData" :pagination="pagination">
    <wt-table-column
      prop="orderId"
      label="WOSP订单ID"
      width="240" />
    <wt-table-column label="物流追踪单号" width="320">
      <template slot-scope="scope">
        <wt-input v-model="scope.row.logId" placeholder="Plase input log_id" />
      </template>
    </wt-table-column>
    <wt-table-column label="订单状态" width="240">
      <template slot-scope="scope">
        <wt-popover trigger="hover">
          <div slot="content" class="name-wrapper">
            <wt-tag size="small" :type="scope.row.orderStatus === 1 ? 'success' : 'error'">{{ scope.row.orderStatus === 1 ? '已完成' : '用户取消' }}</wt-tag>
          </div>
        </wt-popover>
      </template>
    </wt-table-column>
    <wt-table-column label="操作" width="280">
      <template slot-scope="scope">
        <wt-button class="cell-control-open" size="small" type="secondary" @click="handleOpen(scope.$index, scope.row)">Open</wt-button>
        <wt-button class="cell-control-confirm" size="small" type="success" @click="handleConfirm(scope.$index, scope.row)">Confirm</wt-button>
      </template>
    </wt-table-column>
  </wt-table>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          orderId: 'WOSP021700118221DEU',
          logId: 'WI001117700472FPL',
          orderStatus: 1,
        },
        {
          orderId: 'WOSP021700118221DEU',
          logId: 'WI001117700472FPL',
          orderStatus: 2,
        },
        {
          orderId: 'WOSP021700118221DEU',
          logId: 'WI001117700472FPL',
          orderStatus: 1,
        },
        {
          orderId: 'WOSP021700118221DEU',
          logId: 'WI001117700472FPL',
          orderStatus: 1,
        },
      ],
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
    handleOpen(index, row) {
      console.log('Click index:', index, ';Click row:', row);
    },
    handleConfirm(index, row) {
      console.log('Click index:', index, ';Click row:', row);
    },
    onPageChange(current, size) {
      console.log('current:', current, ';size:', size);
    },
  },
};
</script>

<style scoped>
  .cell-control-open {
    min-width: 78px !important;
    width: 72px;
    height: 28px;
    font-size: 12px;
  }
  .cell-control-confirm {
    min-width: 78px !important;
    width: 72px;
    height: 28px;
    margin-left: 16px;
    font-size: 12px;
  }
</style>

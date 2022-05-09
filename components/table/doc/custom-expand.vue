<template>
  <div>
    <wt-table
      class="expandsTable"
      :data="tableData"
      :row-key="getRowKeys"
      :expandable="expandable"
      :expand-row-keys="expands">
      <wt-table-column type="expand">
        <template slot-scope="scope" slot="expand">
          <div @click="scope.toggle" class="expand-wrapper">
              <!-- <i class="wticon wticon-right-thick"></i> -->
              <wt-icon class="wticon mtdicon-right-thick" name="chevron-right" width="20" height="20" strokeWidth="1" />
          </div>
        </template>
        <template slot-scope="props">
          <p>
            是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。
            滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。
            是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中。
          </p>
        </template>
      </wt-table-column>
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
        prop="control"
        label="操作"
        width="100" />
    </wt-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
        orderId: 'WOSP021700118221DES',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost订单已生成',
        orderStatus: <wt-tag type="success">已完成</wt-tag>,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: <div class="control"><wt-icon name="eye" width="20" height="20" /><wt-icon name="download" width="20" height="20" /><wt-icon name="x-circle" width="20" height="20" /></div>,
      }],

      // 要展开的行，数值的元素是row的key值
      expands: [],
    };
  },
  methods: {
    // 获取row的key值
    getRowKeys (row) {
      return row.orderId;
    },
    expandable (row, index) {
      return index > -1;
    },
  },
};
</script>

<style>
  .expandsTable .wt-table-expanded-cell td {
    /* padding: 10px 0px 10px 40px; */
    background-color: #F7F8FC;
  }
</style>

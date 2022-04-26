<template>
  <mtd-row>
    <mtd-col :span="20">
      <wt-table :data="tableData"
        style="margin-bottom: 20px;"
        row-key="number"
        :selection="selection"
        reserve-selection
        :index-of-selection="indexOfSelection"
        height="500px">
        <wt-table-column type="expand" width="40">
          <template slot-scope="props">
            <div>hello world</div>
          </template>
        </wt-table-column>
        <wt-table-column
          type="selection"
          width="34" />
        <wt-table-column
          prop="number"
          label="编号"
          width="60" />
        <wt-table-column
          prop="name"
          label="姓名"
          width="180" />
        <wt-table-column
          prop="address"
          label="地址" />
        <wt-table-column
          prop="tag"
          label="标签"
          width="60" />
      </wt-table>
      <mtd-pagination
        :total="200"
        :show-total="false"
        :current-page.sync="currentPage"
        style="float: right;" />
    </mtd-col>
    <mtd-col :span="4" style="text-align: left; padding: 0px 8px;">
      当前选中:<br />
      <mtd-tag v-for="item in selection" :key="item.number" style="margin-right: 4px;margin-bottom: 4px;">
        {{ item.number }}
      </mtd-tag>
    </mtd-col>
  </mtd-row>
</template>
<script>
export default {
  name: 'DemoReserveSelection',
  data () {
    return {
      selection: [],
      currentPage: 1,
      tableData: this.getTableData(1),
    };
  },
  watch: {
    currentPage (n) {
      this.tableData = this.getTableData(n);
    },
  },
  methods: {
    indexOfSelection (row, selection) {
      return selection.map((s) => s.number).indexOf(row.number);
    },
    getTableData (page) {
      const data = [];
      const tags = ['家', '公司', '地铁'];
      for (let i = 0; i < 20; i++) {
        data.push({
          number: `${page}-${i}`,
          name: '美小团',
          province: '北京',
          city: '朝阳区',
          address: '北京市朝阳区望京东路四号',
          zip: 200333 + i,
          tag: tags[i % tags.length],
        });
      }
      return data;
    },
  },
};
</script>

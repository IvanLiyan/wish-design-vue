<template>
  <div>
    <p>无边框</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page.sync="currentPage"
      :unborder="true"
    />
    <br />
    <p>当前页数（示例：默认为第3页）</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page="3"
    />
    <br />
    <p>每页个数选择器（示例：[10,15,30,60]）</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page.sync="currentPage"
      show-size-changer
      :page-size-options="[10,15,30,60]"
    />
    <br />
    <p>展示总条数</p>
    <wt-pagination
      :total="300"
      :show-total="true"
      :current-page.sync="currentPage"
    />
    <br />
    <p>页码按钮的数量（示例：设置为9）</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page.sync="currentPage"
      :pager-count="9"
    />
    <br />
    <p>快速跳转</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page.sync="currentPage"
      :show-quick-jumper="true"
    />
    <br />
    <p>页码 或 每页条数改变时触发</p>
    <wt-pagination
      :total="300"
      :show-total="false"
      :current-page.sync="currentPage"
      @change="pageChange"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
    };
  },
  methods: {
    pageChange (current, size) {
      console.log(current, size);
    },
  },
};
</script>

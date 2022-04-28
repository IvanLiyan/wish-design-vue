<template>
<div style="text-align: left;">
  <div style="display: inline-block; width: 49%;margin-bottom: 20px; ">
    <p>有边框</p>
    <mtd-pagination
      :total="60"
      :current-page.sync="currentPage3" />
  </div>
  <div style="display: inline-block; width: 49%;margin-bottom: 20px;">
    <p>无边框</p>
    <mtd-pagination
      unborder
      :total="60"
      :current-page.sync="currentPage4" />
  </div>
  <div style="display: inline-block; width: 49%;">
    <p>简洁</p>
    <mtd-pagination
      simple
      :total="60"
      :current-page.sync="currentPage4" />
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      currentPage3: 1,
      currentPage4: 1,
    };
  },
};
</script>

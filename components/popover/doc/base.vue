<template>
  <div>
    <mtd-popover trigger="hover" placement="top">
      <mtd-button style="margin-right: 40px;">
        hover 出现
      </mtd-button>
      <div slot="content" class="demo-popover-content">
        hover时出现的弹出框的内容详情。
      </div>
    </mtd-popover>
    <mtd-popover trigger="click" title="标题" placement="top" @clickoutside="clickoutside">
      <mtd-button>
        click 出现
      </mtd-button>
      <div slot="content" class="demo-popover-content">
        click时出现的弹出框的内容详情。
      </div>
    </mtd-popover>
  </div>
</template>
<script>
export default {
  methods: {
    clickoutside (e) {
      console.log(e);
    },
  },
};
</script>

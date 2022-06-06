<template>
  <div>
    <p>demo1:显示值value=12</p>
    <wt-badge class="example-badge" :value="12">
      <span>未读消息</span>
    </wt-badge>

    <br /><br /><br />
    <p>demo2:超出最大值（最大值99，实际120）</p>
    <wt-badge class="example-badge" :value="120" :max="99">
      <span>未读消息</span>
    </wt-badge>

    <br /><br /><br />
    <p>demo3:是否隐藏hidden=true（不展示）</p>
    <wt-badge class="example-badge" :value="12" :hidden="true">
      <span>未读消息</span>
    </wt-badge>
  </div>
</template>

<template>
  <div class="tooltip-align-wrapper">
    <wt-tooltip content="不显示箭头" placement="top" :show-arrow="false">
      <span>不显示箭头</span>
    </wt-tooltip>
    <wt-tooltip content="显示箭头" placement="top" :show-arrow="true">
      <span>显示箭头</span>
    </wt-tooltip>
    <wt-tooltip content="默认展示" placement="top" :show-arrow="false" default-visible>
      <span>默认展示</span>
    </wt-tooltip>
     <wt-tooltip content="禁用" placement="top" :show-arrow="false" disabled>
      <span>禁用</span>
    </wt-tooltip>
    <wt-tooltip content="2022.03" placement="top" :show-arrow="true">
      <span>显示位置:Top</span>
    </wt-tooltip>
    <wt-tooltip content="2022.03" placement="right" :show-arrow="true">
      <span>显示位置:Right</span>
    </wt-tooltip>
    <wt-tooltip content="2022.03" placement="left" :show-arrow="true">
      <span>显示位置:Left</span>
    </wt-tooltip>
    <wt-tooltip content="2022.03" placement="bottom" :show-arrow="true">
      <span>显示位置:Bottom</span>
    </wt-tooltip>
    <wt-tooltip content="触发行为：click" placement="top" :show-arrow="false" trigger="click">
      <span>触发行为：click</span>
    </wt-tooltip>
     <wt-tooltip content="触发延迟-1000毫秒" placement="top" :show-arrow="false" :open-delay="1000">
      <span>触发延迟-1000毫秒</span>
    </wt-tooltip>
    <wt-tooltip content="关闭延迟-1000毫秒" placement="top" :show-arrow="false" :close-delay="1000">
      <span>关闭延迟-1000毫秒</span>
    </wt-tooltip>
    <wt-tooltip content="visible 发生改变时触发" placement="top" :show-arrow="false" @input="handleVisibleChange">
      <span>visible 发生改变时触发</span>
    </wt-tooltip>
    <wt-tooltip content="trigger='click' 点击外部元素关闭弹出框时触发" placement="top" :show-arrow="false" trigger="click" @clickoutside="handleClickOut">
      <span>trigger='click' 点击外部元素关闭弹出框时触发</span>
    </wt-tooltip>

    <wt-tooltip content="不显示箭头" placement="top" :show-arrow="false">
      <span>不显示箭头</span>
    </wt-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    handleVisibleChange (e) {
      console.log('visible-open', e);
    },
    handleClickOut (e) {
      console.log('click-out', e);
    },
  },
};
</script>

<template>
  <div class="demo-timeline-wrap">
    <mtd-timeline>
      <mtd-timeline-item type="master" title="12月">
        <p>
          12:45:24
          <mtd-tag type="unbordered" size="small" theme="green">最新</mtd-tag>
        </p>
        <div><b>开始发布分组</b></div>
        <div>
          <i class="mtdicon-success-circle demo-timeline-success"></i>
          开始发布分组内容
        </div>
      </mtd-timeline-item>
      <mtd-timeline-item>
        12:45:24
        <div><b>开始发布分组</b></div>
        <div>
          <i class="mtdicon-error-circle demo-timeline-error"></i>
          开始发布分组内容</div>
      </mtd-timeline-item>
      <mtd-timeline-item type="master" title="8月">
        12:45:24
        <div><b>开始发布分组</b></div>
        <div>开始发布分组内容</div>
      </mtd-timeline-item>
      <mtd-timeline-item>
        12:45:24
        <div><b>开始发布分组</b></div>
        <div>
          <i class="mtdicon-warning-circle demo-timeline-warning"></i>
          开始发布分组内容</div>
      </mtd-timeline-item>
      <mtd-timeline-item>
        12:45:24
        <div><b>开始发布分组</b></div>
        <div>
          <i class="mtdicon-loading demo-timeline-primary"></i>
          正在发布
        </div>

      </mtd-timeline-item>
    </mtd-timeline>
  </div>
</template>
<style lang="scss">
  .demo-timeline-success {
    color: #5ABB3C;
  }
  .demo-timeline-error {
    color: #FF6459
  }
  .demo-timeline-warning {
    color: #FF9801;
  }
  .demo-timeline-primary {
    color: #4E73FF;
  }
</style>

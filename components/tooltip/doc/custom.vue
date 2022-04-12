<template>
  <div class="tooltip-wrapper">
    <wt-tooltip placement="top">
      <span>自定义内容1</span>
      <div slot="content" class="adb">
        <p>99.99%</p>
        <hr />
        <p>盘亏产品数：10</p>
        <p>盘盈产品数：10</p>
        <p>系统在库数：200,000</p>
      </div>
    </wt-tooltip>
    <wt-tooltip placement="top">
      <span>自定义内容2</span>
      <div slot="content">
        <p>2022.05.05</p>
        <hr />
        <p class="flex-line"><wt-icon name="circle" color="#E0BC00" :width="12" :height="12" />&nbsp;HQDG 30%</p>
        <p class="flex-line"><wt-icon name="circle" color="#E52533" :width="12" :height="12" />&nbsp;WPDG 90%</p>
        <p class="flex-line"><wt-icon name="circle" color="#10774C" :width="12" :height="12" />&nbsp;WPHZ 95%</p>
        <p class="flex-line"><wt-icon name="circle" color="#FFC72C" :width="12" :height="12" />&nbsp;HQDG2 50%</p>
        <p class="flex-line"><wt-icon name="circle" color="#0090D9" :width="12" :height="12" />&nbsp;DGW 80%</p>
        <p class="flex-line"><wt-icon name="circle" color="#D0000F" :width="12" :height="12" />&nbsp;HZW 70%</p>
      </div>
    </wt-tooltip>
  </div>
</template>

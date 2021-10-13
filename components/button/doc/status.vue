<template>
  <wd-row>
    <wd-col :span="12">
      <wd-button type="primary">基础按钮</wd-button>
      <wd-button type="primary" loading>基础按钮</wd-button>
      <wd-button type="primary" disabled>基础按钮</wd-button>
    </wd-col>
    <wd-col :span="12">
      <wd-button>次要按钮</wd-button>
      <wd-button loading>次要按钮</wd-button>
      <wd-button disabled>次要按钮</wd-button>
    </wd-col>
    <wd-col :span="12" style="margin-top: 40px;">
      <wd-button type="text-primary">文字按钮</wd-button>
      <wd-button type="text-primary" loading>文字按钮</wd-button>
      <wd-button type="text-primary" disabled>文字按钮</wd-button>
    </wd-col>
  </wd-row>
</template>

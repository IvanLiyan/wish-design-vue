<template>
  <div>
    <wt-upload
      class="base-upload"
      :show-file-list="false"
      action="https://jsonplaceholder.typicode.com/posts/">
      <wt-button icon="wticon-export-o">点击上传</wt-button>
    </wt-upload>
    <wt-upload
      class="base-drag-upload"
      :show-file-list="false"
      drag
      action="https://jsonplaceholder.typicode.com/posts/">
      <i class="wticon-export-o"></i>
      <div class="wt-upload-text">点击或将文件拖拽到这里上传</div>
    </wt-upload>
  </div>
</template>
<style>
.base-upload{
  float: left;
  width: 50%;
}
.base-drag-upload {
  width: 50%;
  float:right;
}
.base-drag-upload .wt-upload-dragger {
  width:240px;
  height: 120px;
}
.base-drag-upload .wticon-export-o {
  font-size: 26px;
  margin: 20px 0 0;
}
</style>

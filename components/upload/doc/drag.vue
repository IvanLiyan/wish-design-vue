<template>
  <wt-upload
    class="drag-upload"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple>
    <i class="wticon-export-o"></i>
    <div class="wt-upload-text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="wt-upload-text sub-title">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
  </wt-upload>
</template>
<style>
.drag-upload {
  text-align:left;
  width:360px;
}
.drag-upload .sub-title{
  font-size: 12px;
  color: #ADADAD;
}
</style>

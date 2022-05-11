<template>
  <wt-upload
    class="upload-demo"
    ref="upload"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :auto-upload="false">
    <wt-button slot="trigger" icon="wticon-export-o">选取文件</wt-button>
    <wt-button style="margin-left: 10px;" @click="submitUpload">开始上传</wt-button>
  </wt-upload>
</template>
<script>
export default {
  methods: {
    submitUpload () {
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
  },
};
</script>
<style>
.upload-demo{
  width: 360px;
  text-align:left;
}
</style>

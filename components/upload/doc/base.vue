<template>
  <wt-upload
    class="upload-base"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :show-file-down="true"
    :file-list="fileList"
  >
    <wt-button icon="share" type="third">点击上传</wt-button>
  </wt-upload>
</template>
<script>
export default {
  data () {
    return {
      multiple: true,
      fileList: [],
    };
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    beforeRemove (file, fileList) {
      console.log('BeforeRemove');
    },
    clickHere () {
      console.log('hhh');
    },
  },
};
</script>
<style>
.upload-base{
  width: 360px;
  text-align: left;
}
</style>

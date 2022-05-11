<template>
  <wt-upload
    class="upload-file-picture"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :show-file-down="true"
    :file-list="fileList"
  >
    <wt-button icon="paperclip" type="third">
      <span>点击上传</span>
    </wt-button>
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
.upload-file {
  width: 360px;
  text-align: left;
}
.upload-file button {
  width: 240px;
  max-width: 240px;
  height: 36px;
  text-align: left;
  padding: 0 9px;
}
.upload-file button span {
  margin-left: 5px;
  color: #BFCDD4;
}
</style>

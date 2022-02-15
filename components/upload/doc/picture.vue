<template>
  <div class="picture-wrapper">
    <wt-upload
      class="picture-list"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      list-type="picture-card"
      :http-request="uploadPdf"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList">
      <i class="wticon-add"></i>
    </wt-upload>
    <wt-modal v-model="dialogVisible">
      <img :src="dialogImageUrl" />
    </wt-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
    };
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style>
.picture-wrapper {
  width: 104px;
  height: 104px;
  border: 1px solid #BFCDD4;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.picture-list{
  text-align:left;
}
</style>

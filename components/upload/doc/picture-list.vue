<template>
  <div class="picture-list-wrapper">
    <wt-upload
      class="picture-list"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      input-type="input"
      multiple
      :http-request="uploadPdf"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList">
      <!-- <Icon name="paperclip" :width="18" :height="18" class="picture-list-icon" />
      <span>点击上传</span> -->
    </wt-upload>
    <wt-modal v-model="dialogVisible">
      <img :src="dialogImageUrl" />
    </wt-modal>
  </div>
</template>
<script>
import Icon from '@components/icon';

export default {
  components: {
    Icon,
  },
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
.picture-list-wrapper {
  width: 240px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.picture-list{
  text-align: left;
  position: relative;
}
</style>

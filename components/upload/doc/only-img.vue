<template>
  <wt-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    accept="image/*"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="wticon-add avatar-uploader-icon"></i>
    <span class="avatar-uploader-text">上传图像</span>
  </wt-upload>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
    };
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError (err, file, fileList) {
      console.log(err);
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$wt.message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .wt-upload {
  background: #F7F8FC;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .wt-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #B5BBD1;
  width: 100px;
  height: 100px;
  line-height: 80px;
  text-align: center;
}
.avatar-uploader-text{
  width: 100px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 25px;
  font-size: 12px;
  color: #6F6F6F;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<template>
  <wt-upload
    class="upload-base"
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :show-file-down="true"
    :file-list="fileList">
    <wt-button icon="wticon-export-o">点击上传</wt-button>
    <!-- <div slot="tip" class="wt-upload-tip">上传文件提示信息</div> -->
  </wt-upload>
</template>
<script>
export default {
  data () {
    return {
      multiple: true,
      fileList: [
        {
          name: 'food.jpeg',
          /* eslint-disable */
          url: 'https://img1.baidu.com/it/u=1024825769,347931310&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
          /* eslint-disable */
        },
        {
          name: 'food2.jpeg',
          /* eslint-disable */
          url: 'https://img2.baidu.com/it/u=1476158892,3155909481&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
          /* eslint-disable */
        },
      ],
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
      return this.$wt.confirm({
        title: '删除文件',
        message: `确定移除${file.name}？`,
      });
    },
  },
};
</script>
<style>
.upload-base{
  width: 360px;
  text-align:left;
}
</style>

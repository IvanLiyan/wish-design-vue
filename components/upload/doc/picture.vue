<template>
  <div class="picture-wrapper">
    <wt-upload
      class="picture-list"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      input-type="picture-card"
      :http-request="uploadPdf"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :value="fileList">
      <i class="wticon-add"></i>
    </wt-upload>
    <!-- <wt-modal v-model="dialogVisible">
      <img :src="dialogImageUrl" />
    </wt-modal> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      dialogVisible: false,
      fileList: [{
        name: 'test.jpg',
        percentage: 100,
        raw: {
          uid: 1645171975770,
          lastModified: 1644907336299,
          lastModifiedDate: new Date(),
          name: 'test.jpg',
          size: 88596,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
        size: 88596,
        status: 'success',
        uid: 1645171975770,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      }],
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

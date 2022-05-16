<template>
  <div class="picture-demo-box">
    <wt-upload
      class="picture-list"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      input-type="picture-card"
      v-model="fileList" />
    <wt-upload
      class="picture-list"
      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
      input-type="picture-card"
      v-model="fileList2" />
  </div>
</template>
<script>
export default {
  data () {
    return {
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
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-6df7121d5e4955182c835d77f826c773_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648022745&t=133c8d77690506243fd8c32e31df7e1a',
      }],
      fileList2: [{
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
        status: 'fail',
        uid: 1645171975770,
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-6df7121d5e4955182c835d77f826c773_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648022745&t=133c8d77690506243fd8c32e31df7e1a',
      }],
    };
  },
};
</script>

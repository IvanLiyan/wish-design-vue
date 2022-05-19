<template>
  <wt-upload
    class="upload-base"
    action="https://jsonplaceholder.typicode.com/posts/"
    v-model="fileList"
  />
</template>
<script>
export default {
  data () {
    return {
      fileList: [{
        name: 'test.jpeg',
        raw: {
          type: 'image/jpeg',
        },
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      },
      {
        name: 'test.jpeg',
        raw: {
          type: 'image/jpeg',
        },
        status: 'fail',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      },
      {
        name: 'test.txt',
        raw: {
          type: 'txt',
        },
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      },
      {
        name: 'test.txt',
        raw: {
          type: 'txt',
        },
        status: 'fail',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a0b5e8c681ea8012165183f807a.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647763053&t=57ce7af82e614f2a1373b7f83d338fb5',
      }],
    };
  },
};
</script>

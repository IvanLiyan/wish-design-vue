import Vue from 'vue';
import 'babel-polyfill';
import MTD from '@/index.js';
import router from './routes';
import App from './app';
import DemoBlok from './components/demo-block';
import VueHighlightJS from 'vue-highlight.js';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import vue from 'vue-highlight.js/lib/languages/vue';
import 'highlight.js/styles/default.css';
import ApiDoc from './components/api-doc';

Vue.config.devtools = true;
Vue.use(MTD);
Vue.component('demo-block', DemoBlok);
Vue.component('api-doc', ApiDoc);
Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    css,
    javascript,
    vue,
  },
});

if (window.MTD_Frame) {
  window.MTD_Frame.mount({
    project: 'component-vue',
    nav: {
      subBar: {
        tabs: {
          activeValue: '',
          list: [{
            title: '组件示例',
            value: 'components',
          },
          {
            title: '开发文档',
            value: 'doc',
          },
          {
            title: '代码仓库 <i class="mtdicon mtdicon-forward-o"></i>',
            value: 'code',
            href: 'https://dev.sankuai.com/code/repo-detail/ss/mtd-vue/file/list',
            target: '_blank',
          }],
        },
      },
    },
    // feedback: {
    //   feedback: 'https://tt.sankuai.com/ticket/create?cid=112&tid=2189&iid=9445',
    //   feedback_list: 'https://tt.sankuai.com/ticket/handle?filter=createdBy',
    //   dxQRCode: 'https://msstest.sankuai.com/v1/mss_d895c43e068542d6986e312787d9109d/test/ss-home/qrcode.png',
    // },
    env: process.env.NODE_ENV,
    sso: true,
    onSuccess: () => {
      new Vue({ // eslint-disable-line
        render: h => h(App),
        router,
      }).$mount('#app');
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

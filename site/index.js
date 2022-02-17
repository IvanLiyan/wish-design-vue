import Vue from 'vue';
import 'babel-polyfill';
import WT from '@/index.js';
import router from './routes';
import App from './app';
import DemoBlok from './components/demo-block';
// import VueHighlightJS from 'vue-highlight.js';
// import css from 'highlight.js/lib/languages/css';
// import javascript from 'highlight.js/lib/languages/javascript';
// import vue from 'vue-highlight.js/lib/languages/vue';
import 'highlight.js/styles/default.css';
import VueI18n from 'vue-i18n';
import ApiDoc from './components/api-doc';
import LangMessage from './lang.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'chinese', // set locale
  messages: LangMessage, // set locale messages
});

Vue.config.devtools = true;
Vue.use(WT);

Vue.component('demo-block', DemoBlok);
Vue.component('api-doc', ApiDoc);
// Vue.use(VueHighlightJS, {
//   // Register only languages that you want
//   languages: {
//     css,
//     javascript,
//     vue,
//   },
// });

new Vue({
  // eslint-disable-line
  render: (h) => h(App),
  router,
  i18n,
}).$mount('#app');

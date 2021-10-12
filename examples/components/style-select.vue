<template>
  <mtd-select class="select" v-model="theme"
    style="width: 150px">
    <mtd-option
      v-for="item in themes"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </mtd-select>
</template>

<script>
import Cookies from 'js-cookie';
import {
  setStyle,
} from '../utils/style';

const themes = [
  { value: 'theme-chalk', label: 'MTDUI 1.0 主题' },
  { value: 'theme2', label: 'MTDUI 2.0 主题' },
];
export default {
  name: 'StyleSelector',
  inheritAttrs: false,
  props: {
  },
  inject: {
    router: {
      from: 'router',
      default () {
        return {
          route: { query: {} },
          $router: function () {},
        };
      },
    },
  },
  data () {
    window.MTD_THEME = this.router.route.query.theme || Cookies.get('MTD_THEME');
    return {
      themes,
      theme: (themes.find((t) => t.value === window.MTD_THEME) || themes[1]).value,
    };
  },
  watch: {
    theme: {
      immediate: true,
      handler (theme) {
        // eslint-disable-next-line
        // whatchout important 在这里设置了样式的引入
        import(`!css-loader!postcss-loader!sass-loader?modules!@components/${theme}/index.scss`).then((file) => {
          const style = file.default.toString(); // eslint-disable-line
          setStyle(style, theme);
        });
        this.$emit('theme', theme);
      },
    },
  },
};
</script>

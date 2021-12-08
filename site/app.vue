<template>
  <div
    class="app"
    :class="{
      'hide-top-nav': hideTopNav,
    }"
    ref="scroll"
  >
    <div class="app-menu">
      <div>
        <router-link to="/components">组件示例</router-link>
        <router-link to="/doc">开发文档</router-link>
        <a key="code" href="https://github.com/ContextLogic/wish-design-vue" target="_blank"
          ><span>代码仓库</span><wt-icon name="external-link" :stroke-width="1.5" :width="14" :height="14"
        /></a>
        <a
          key="design"
          href="https://www.figma.com/file/MYiBNyNKoXtYWF4nnOOYyj/%F0%9F%8C%B1-Wishpost-Style-%26-Components"
          target="_blank"
          ><span>设计</span><wt-icon name="external-link" :stroke-width="1.5" :width="14" :height="14"
        /></a>
        <a key="wnpm" href="http://npm.bjs.i.wish.com/-/web/detail/@wish/wt-vue" target="_blank"
          ><span>npm源</span><wt-icon name="external-link" :stroke-width="1.5" :width="14" :height="14"
        /></a>
      </div>

      <Submenu />
    </div>

    <router-view />
  </div>
</template>
<script>
import dom from './utils/dom';
import { setLink } from './utils/style';

import eventhub from './utils/eventhub';

import Vue from 'vue';
import Submenu from './components/submenu.vue';
import '@components/theme/index.scss';

function parseSearch(search) {
  if (!search) return {};
  return search
    .substr(1)
    .split('&')
    .reduce((state, str) => {
      const [key, value] = str.split('=');
      state[key] = value;
      return state;
    }, {});
}

export default {
  name: 'App',
  components: {
    Submenu: Submenu,
  },
  provide() {
    return {
      app: this,
    };
  },
  data() {
    const query = parseSearch(location.search);

    return {
      hideSidebar: query.hideSidebar === 'true',
      hideTopNav: query.hideTopNav === 'true',
    };
  },
  computed: {
    theme() {
      return this.submenu ? this.submenu.theme : '';
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(n, v) {
        const routes = this.$route.matched;
        const navbarRoute = routes.find((route) => route.meta.navbar);
        if (navbarRoute && window.MTD_Frame) {
          window.MTD_Frame.update('mtd_update:tab', navbarRoute.meta.navbar);
        }

        // sync to submenu
        if (this.submenu) {
          this.submenu.route = n;
        }
      },
    },
    '$route.query': {
      handler(n) {
        this.hideTopNav = this.$route.query.hideTopNav === 'true';
        this.hideSidebar = this.$route.query.hideSidebar === 'true';
      },
    },
    hideTopNav: {
      immediate: true,
      handler(value) {
        window.MTD_Frame && window.MTD_Frame.update('mtd_update:nav', !value);
      },
    },
  },
  created() {
    window.MTD_Frame &&
      window.MTD_Frame.mountSlot('subbar-slot', (dom) => {
        const SubmenuConstructor = Vue.extend(Submenu);
        const instance = new SubmenuConstructor({
          data: {
            route: this.$route,
            $router: this.$router,
          },
        });
        instance.$mount(dom);
        this.submenu = instance;
      });
  },
  mounted() {
    this.emitScroll = dom.throttle(() => {
      eventhub.$emit('check-scroll');
    }, 100);
    dom.on(this.$refs.scroll, 'scroll', this.emitScroll);

    this.handleRouterChange = () => {
      if (this.$route.name === 'sidebar-example') {
        return;
      }
      this.$refs.scroll.scrollTop = 0;
    };
    eventhub.$on('change-router', this.handleRouterChange);

    // use in theme tools
    window.addEventListener(
      'message',
      (event) => {
        // if (!event.origin.includes('sankuai.com')) {
        //   return;
        // }
        if (event.data && event.data.name === 'themeStyleURL') {
          const url = event.data.value;
          setLink(url);
        }
      },
      false,
    );

    this.listenFrameTabChange();
  },
  beforeDestroy() {
    dom.off(this.$refs.scroll, 'scroll', this.emitScroll);
    eventhub.$off('change-router', this.handleRouterChange);
  },
  methods: {
    listenFrameTabChange() {
      window.MTD_Frame &&
        window.MTD_Frame.on('mtd_change:tab', (value) => {
          if (value === 'code') {
            return;
          }
          this.$router.push('/' + value);
        });
    },
    handleThemeChange(theme) {
      this.theme = theme;
    },
  },
};
</script>
<style lang="scss">
@import './styles/var.scss';
.app {
  height: 100vh;
  padding-top: $header-height;
  overflow: auto;
  overflow-x: hidden;
}
.app-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 24px;
  z-index: 999;
  font-size: $font-size-2;
  display: flex;
  justify-content: space-between;
  a {
    margin-right: 20px;
    line-height: 48px;
    height: 48px;
    box-sizing: border-box;
    display: inline-block;
    color: $color-text-1;
    text-decoration: none;
    display: inline-flex;
    align-items: center;

    align-items: center;
    & > i {
      color: #ccc;
      margin-left: 2px;
    }
    &:hover {
      color: $color-primary-1;
      & > i {
        color: $color-primary-1;
      }
    }
    &.router-link-active {
      font-weight: $font-weight-medium;
      color: $color-primary-1;
      border-bottom: solid $color-primary-1 4px;
    }
  }
}
.hide-top-nav {
  padding-top: 0;
}
.right-menu {
  float: right;
}
html,
body {
  // height: 100%;
  min-width: $min-width;
}
h1,
h2,
h3 {
  font-weight: $font-weight-medium;
  color: $color-text-1;
  line-height: 1.5;
}

@media screen and (max-width: $screen-md) {
  body,
  html {
    min-width: auto;
  }
}
.doc-warning {
  border-left: 5px solid $color-danger-1;
  padding: 12px 16px;
  line-height: 20px;
  background: #f8f9fc;
  border-radius: 6px;
}

// page style
.aside {
  position: fixed;
  top: $header-height;
  left: 0;
  bottom: 0;
  overflow: auto;
  width: $sidebar-width;
  background: #fff;
  z-index: $sidebar-index;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  transition: width 0.3s ease-in-out, padding-left 0.2s ease-out;
}
.hide-top-nav {
  .aside {
    top: 0;
  }
}
.sidebar {
  height: 100%;
}
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  padding-top: 20px;
}
.sidebar-search-wrap {
  width: 100%;
  flex: 0 0 auto;
  padding: 0 20px;
  padding-bottom: 10px;
}
.sidebar-navs {
  overflow: auto;
  font-size: 14px;
  line-height: 20px;
  list-style: none;
  white-space: nowrap;
  margin: 0;
  width: 100%;
  padding-bottom: 40px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    color: $color-text-1;
    text-decoration: none;
    font-weight: $font-weight-regular;
    transition: padding-left 0.5s ease;
    padding: $nav-item-padding;
    display: block;
    &:hover {
      color: $color-primary;
      text-decoration: none;
    }
  }
  .router-link-active {
    color: $color-primary;
    background: rgba(10, 112, 245, 0.04);
    font-weight: $font-weight-medium;
  }
}
.sidebar-nav-item-text {
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  padding: $nav-item-padding;
}

.page-content {
  margin-left: $sidebar-width;
}
.no-sidebar {
  margin-left: 0;
}

.narrow-scrren-expand-bar.mtd-btn {
  display: none;
  position: fixed;
  top: 120px;
  z-index: 9999;
  left: 0;
  &.expanded {
    left: $sidebar-width;
  }
}
@media screen and (max-width: $screen-md) {
  .aside {
    width: 0;
    z-index: -1;
  }
  .page-content {
    margin-left: 0;
  }
  .narrow-scrren-expand-bar.mtd-btn {
    display: inline-block;
  }
  .narrow-screen-expanded {
    width: auto;
    z-index: 1999;
  }
}
</style>

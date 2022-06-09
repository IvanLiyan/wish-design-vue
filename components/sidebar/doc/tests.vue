<template>
  <div class="demo-sidebar-container">
    <div class="demo-sidebar-aside">
      <wt-sidebar :data="data"
        :collapse="true"
        :active-key.sync="activeKey"
        @menu-item-click="handleItemClick"
        @menu-expand-change="handleExpandChange" />
    </div>
    <div class="demo-sidebar-main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'data': [{
        icon: 'home',
        title: '一级菜单',
        id: '1',
        children: [{
          title: '二级菜单',
          id: '1-1',
          route: '/components/sidebar/1-1',
        }, {
          title: '二级菜单',
          id: '1-2',
          route: '/components/sidebar/1-2',
        }],
      }, {
        icon: 'home',
        title: '一级菜单',
        id: '2',
        children: [{
          icon: 'home',
          title: '二级菜单',
          id: '2-1',
          route: '/components/sidebar/2-1',
        }, {
          title: '二级菜单',
          id: '2-2',
          route: '/components/sidebar/2-2',
        }],
      }, {
        icon: 'home',
        title: '一级菜单',
        id: '3',
        children: [{
          icon: 'home',
          title: '二级菜单',
          id: '3-1',
          route: '/components/sidebar/3-1',
        }, {
          title: '二级菜单',
          id: '3-2',
          route: '/components/sidebar/3-2',
        }],
      }, {
        icon: 'home',
        title: '一级菜单',
        id: '4',
        children: [{
          icon: 'home',
          title: '二级菜单',
          id: '4-1',
          route: '/components/sidebar/4-1',
        }, {
          title: '二级菜单',
          id: '4-2',
          route: '/components/sidebar/4-2',
        }],
      }, {
        icon: 'home',
        title: '一级菜单',
        id: '5',
        children: [{
          icon: 'home',
          title: '二级菜单',
          id: '5-1',
          route: '/components/sidebar/5-1',
        }, {
          title: '二级菜单',
          id: '5-2',
          route: '/components/sidebar/5-2',
        }],
      }],
    };
  },
  computed: {
    activeKey () {
      return this.$route.params.name;
    },
  },
  methods: {
    handleItemClick ({key, item}) {
      console.log('click', key, item);
    },
    handleExpandChange ({expandKeys, key, item, expanded}) {
      console.log('expand', expandKeys, key, item, expanded);
    },
  },
};
</script>
<style lang='scss' scoped>
  .demo-sidebar-container {
    display: flex;
    height: 300px;
  }

  .demo-sidebar-aside {
    flex: 0 0 auto;
    position: relative;
    z-index: 1;
  }

  .demo-sidebar-main {
    min-width: 0;
    flex: 1 1 auto;
    background-color: #f7f8fc;
    padding: 20px;
  }
</style>

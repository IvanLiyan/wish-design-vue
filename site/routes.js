import Vue from 'vue';
import VueRouter from 'vue-router';
import navConfig from './nav.config.json';
import eventhub from './utils/eventhub';
import SidebarExample from './pages/sidebar-example.vue';
import DocsPage from './pages/docs.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

function loadDocs(component) {
  return (r) => {
    require.ensure(
      [],
      () => {
        let comp;
        try {
          comp = require(`../components/${component}/index.md`);
        } catch (e) {
          // try {
          //   comp = require(`../components/${component}/doc/demo.vue`);
          // } catch (e) {
          console.error(`不能获取到组件 ${component} 的文档`, e);
          // }
        }
        r(comp);
      },
      'demo',
    );
  };
}

function loadPage(component) {
  return (r) => {
    require.ensure([], () => r(require(`./pages/${component}.vue`)), 'demo');
  };
}

/**
 *
 * route: {
 *   path: '/component',
 *   component: import from './pages/component.vue',
 *   child: registerRoute(navConfig)
 * }
 */
function toRoute(navs) {
  function createRoute(page, { isPage } = {}) {
    const { path } = page;
    const componentName = path.charAt('0') === '/' ? path.substr(1) : path;
    const component = isPage ? loadPage(componentName) : loadDocs(componentName);
    let children;
    if (componentName === 'sidebar') {
      children = [
        {
          path: ':name',
          name: 'sidebar-example',
          component: SidebarExample,
        },
      ];
    }
    return {
      ...page,
      groups: undefined,
      path: path,
      meta: {
        title: page.title || page.name,
        description: page.description,
      },
      component: component.default || component,
      children,
    };
  }

  return navs.reduce((routes, nav) => {
    if (!nav.href) {
      const route = createRoute(nav, { isPage: true });
      route.meta.navbar = nav.name;
      if (nav.groups) {
        const children = [];
        nav.groups.forEach((group) => {
          Array.prototype.push.apply(
            children,
            group.list.map((nav) => {
              return createRoute(nav);
            }),
          );
        });
        route.children = children;
      }
      routes.push(route);
    }
    return routes;
  }, []);
}

Vue.use(VueRouter);

const navRoute = toRoute(navConfig);

const defaultPath = '/components';
const routes = navRoute.concat([
  {
    path: '/',
    redirect: defaultPath,
  },
  {
    path: '/doc',
    component: DocsPage,
    redirect: '/doc/getting-started',
    name: 'doc',
    meta: {
      navbar: 'doc',
    },
    children: [
      {
        path: 'getting-started',
        name: 'getting-started',
        component: (r) => {
          require.ensure([], () => r(require('../wiki/getting-started.md')), 'started');
        },
      },
      {
        path: 'customize-theme',
        name: 'customize-theme',
        component: (r) => {
          require.ensure([], () => r(require('../wiki/customize-theme.md')), 'started');
        },
      },
      {
        path: 'changelog',
        name: 'changelog',
        component: (r) => {
          require.ensure([], () => r(require('../CHANGELOG.md')), 'started');
        },
      },
      {
        path: 'compatibility',
        name: 'compatibility',
        component: (r) => {
          require.ensure([], () => r(require('../wiki/compatibility.md')), 'started');
        },
      },
      {
        path: 'recommendation',
        name: 'recommendation',
        component: (r) => {
          require.ensure([], () => r(require('../wiki/recommendation.md')), 'started');
        },
      },
    ],
  },
  {
    path: '*',
    redirect: defaultPath,
  },
]);

const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  eventhub.$emit('change-router');
  next();
});

export default router;

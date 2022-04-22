<template>
  <div class="page-mk">
    <div class="mk-content"><slot></slot></div>
    <!-- docs右侧定位导航
   <ex-an-click v-if="htitles.length" :usedata="htitles" />-->
    <hr class="bottom-divider" />
  </div>
</template>

<script>
// import ExAnClick from './anclick.vue';
import { scrollTop } from '@/utils/util';

function getTitle(element) {
  return element.innerText.split('\n')[0].replace('#', '').trim();
}

function getHref(element) {
  const a = element.querySelector('a');
  return a.href ? '#' + a.href.split('#')[1] : '';
}

export default {
  components: {
    // ExAnClick,
  },
  data() {
    return {
      htitles: [],
    };
  },
  computed: {
    key() {
      return this.$route.name;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.$nextTick(() => {
          const result = this.obtaintitles();
          this.htitles = result;
          this.scrollToAnchor();
        });
      },
    },
  },
  methods: {
    obtaintitles() {
      const h2nodes = document.querySelectorAll('.mk-content section > h2');
      const h3nodes = document.querySelectorAll('.mk-content section h3');
      const section = document.querySelector('.mk-content section');
      const anchors = [];
      const sectionChild = section ? [...section.children] : [];
      const h2Index = [];
      for (let i = 0; i < h2nodes.length; i++) {
        const h2 = h2nodes[i];
        const href = getHref(h2);
        if (!href) {
          continue;
        }
        const childdata = {
          title: getTitle(h2),
          href: href,
          children: [],
        };
        h2Index.push(sectionChild.indexOf(h2));
        anchors.push(childdata);
      }
      let now = 0;
      for (let j = 0; j < h3nodes.length; j++) {
        const h3 = h3nodes[j];
        const item = {
          title: getTitle(h3),
        };
        if (h3.children.length !== 0) {
          item.href = getHref(h3);
          let index = sectionChild.indexOf(h3);
          if (index === -1) {
            let parent = h3.parentElement;

            while ((index = sectionChild.indexOf(parent)) === -1) {
              parent = parent.parentElement;
            }
          }
          if (index > -1) {
            while (index > h2Index[now + 1]) {
              now = now + 1;
            }
            const h2 = anchors[now];
            if (h2) {
              h2.children.push(item);
            }
          }
        }
      }
      return anchors;
    },

    scrollToAnchor() {
      const hash = this.$route.hash;
      if (hash) {
        const el = document.getElementById(hash.substr(1));
        if (el) {
          const top = el.offsetTop;
          const scroll = document.scrollingElement;
          const offset = 60; // header height;
          const to = top - offset;
          scrollTop(scroll, scroll.scrollTop, to);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '../styles/var.scss';
$border: 1px solid $color-line-1;

.bottom-divider {
  border: none;
  border-bottom: $border;
  height: 0;
  margin-top: 64px;
}
.demo-block {
  margin-bottom: 48px;
}

// add anchor
.mk-content {
  h1,
  h2,
  h3 {
    font-weight: 500;
    .anchor {
      opacity: 0;
      transition: opacity 0.3s ease;
      &:hover {
        text-decoration: none;
      }
    }
    &:hover {
      .anchor {
        opacity: 1;
      }
    }
  }
}
.page-mk {
  padding: 0 20px;
}
// reset markdown page css
.mk-content {
  width: $content-width;
  padding-bottom: 20px;
  margin: 0 auto;
  box-sizing: content-box;
  background-color: #fff;
  text-align: left;
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin-top: 0;
  }
  h1 {
    font-size: 30px;
    position: relative;
    margin-bottom: 40px;
    margin-top: 32px;
    &:after {
      content: ' ';
      display: inline-block;
      height: 4px;
      width: 30px;
      background-color: $color-primary;
      left: 0;
      bottom: -8px;
      position: absolute;
    }
  }
  h2 {
    font-size: 24px;
    margin-top: 48px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 12px;
  }
  .demo-table {
    p {
      margin: 10px 0px 5px 0px;
      text-align: left;
    }
  }
  pre code {
    display: block;
    padding: 20px;
    background-color: #f8f9fc;
    color: $color-text-2;
  }
  blockquote {
    margin: 0;
    padding-left: 10px;
    border-left: 3px solid $color-line-1;

    margin-top: -30px;
    margin-bottom: 40px;
    color: #969cae;
    line-height: 24px;
  }
  p + blockquote {
    margin-top: 0;
  }
  // a{
  //   text-decoration: none;
  // }
  .table {
    width: 100%;
    // table-layout: fixed;
    border-expansion: expansion;
    margin-bottom: 45px;
    color: #333;
    th {
      text-align: left;
      padding: 20px 32px;
      line-height: 20px;
      border-bottom: $border;
      color: $color-text-4;
      font-weight: $font-weight-medium;
      white-space: nowrap;
    }
    td {
      padding: 20px 32px;
      line-height: 20px;
      border-bottom: $border;
      max-width: 200px;
    }
  }
  .wticon-link {
    font-size: 12px;
  }
}

@media screen and (max-width: $screen-md) {
  .mk-content {
    width: 100%;
    min-width: 500px;
  }
}
</style>

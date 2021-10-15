<template>
  <div class="demo-block" :class="blockClass">
    <div class="demo-source">
      <slot name="source" />
    </div>
    <demo-transition>
      <div class="demo-highlight" v-show="showCode" ref="highlight">
        <div class="demo-desc" v-if="$slots.default">
          <slot />
        </div>
        <slot name="highlight" />
      </div>
    </demo-transition>
    <div class="demo-block-control" ref="control" :class="classObj" @click="handleClickControl">
      <!-- <wd-tooltip content="复制代码" placement="top">
        <wd-icon-button
          icon="icon icon-copy"
          class="demo-btn-copy"
          type="secondary"
          @click.stop="handleClickCopy"
        />
      </wd-tooltip> -->
      <div class="code-bar">
        <i class="wdicon wdicon-code-off" v-if="showCode" />
        <i class="wdicon wdicon-code" v-else />
        <span>{{ controlText }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import DemoTransition from './demo-transition.vue';
import eventhub from '../utils/eventhub';
import dom from '../utils/dom';

export default {
  name: 'DemoBlock',
  components: {
    DemoTransition,
  },
  data () {
    return {
      hovering: false,
      showCode: false,
      onfixed: false,
      controlHeight: 0,
    };
  },
  computed: {
    blockClass () {
      return `demo-${this.$route.path.split('/').pop()}`;
    },
    controlText () {
      return this.showCode ? '隐藏代码' : '显示代码';
    },
    classObj () {
      return { onfixed: this.onfixed };
    },
  },
  mounted () {
    eventhub.$on('check-scroll', this.checkScroll);
    this.controlHeight = this.$refs.control.scrollHeight;
  },
  beforeDestroy () {
    eventhub.$off('check-scroll', this.checkScroll);
  },
  methods: {
    handleClickControl () {
      this.showCode = !this.showCode;
      this.checkScroll();
    },
    // handleClickCopy () {
    //   const code = this.$el.querySelector('.demo-desc .hljs');
    //   dom.copy(code.textContent);
    //   this.$wd.message({
    //     message: '复制成功',
    //     type: 'success',
    //     duration: 1000,
    //   });
    // },
    checkScroll () {
      this.$nextTick(() => {
        if (
          this.onfixed !==
          (this.showCode &&
            dom.appear(this.$refs.highlight, this.controlHeight))
        ) {
          this.onfixed = !this.onfixed;
        }
      });
    },
  },
};
</script>
<style lang='scss'>
$content-width: 960px;
$demo-control-padding: 8px;
$demo-control-height: 50px;
$color-line-2: #edf0f7;
$text-color: #464646;
$color-silvery900: #808ab1;
$color-text-2: rgba(0, 0, 0, .75);
.demo-btn-copy {
  font-size: 18px;
}

.demo-block {
  border: 1px solid $color-line-2;
  border-radius: 6px;
  overflow: hidden;
  // &.demo-active, &:hover {
  //   box-shadow: 0 5px 10px 0 rgba(205,208,212,0.16);
  // }
  .demo-source {
    text-align: center;
    padding: 40px;
    overflow: auto;
  }

  .code-bar {
    i {
      margin-right: 4px;
      font-size: 18px;
    }

    i,
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.demo-desc {
  line-height: 24px;
  color: $color-text-2;
  border-radius: 2px;

  p {
    margin: 0;
  }

  code {
    background-color: #e6ebff;
    padding: 2px 5px;
    margin: 4px;
  }
}

.demo-highlight {
  transition: height 0.2s ease-out;
  overflow: hidden;
  background-color: #f8f9fc;
  border-top: 1px solid $color-line-2;
  padding: 20px;
  font-size: 14px;

  .highlight {
    > pre {
      margin: 0;
      padding: 0;
      overflow: auto;
      box-sizing: border-box;
    }
  }
}

.demo-block-control {
  position: relative;
  padding: 0px $demo-control-padding;
  color: #808AB1;
  background: #fff;
  cursor: pointer;
  text-align: center;
  border-top: 1px solid $color-line-2;
  line-height: $demo-control-height;

  .wd-tooltip-rel {
    float: right;
    margin-left: 12px;
  }

  &.onfixed {
    width: $content-width - 2px;
    position: fixed;
    bottom: 0;
  }
}

.hljs-built_in,
.hljs-doctag,
.hljs-keyword,
.hljs-name,
.hljs-section,
.hljs-selector-class,
.hljs-selector-id,
.hljs-selector-tag,
.hljs-strong,
.hljs-tag,
.hljs-title,
.hljs-type {
  color: #5e8ccd;
}
</style>

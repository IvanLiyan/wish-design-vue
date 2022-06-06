<template>
  <div>
    <p>自定义标题</p>
    <wt-button type="primary" @click="visible = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible" title="自定义标题">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>自定义宽度-380px</p>
    <wt-button type="primary" @click="visible2 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible2" title="标题" :width="380">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>自定义高度-380px</p>
    <wt-button type="primary" @click="visible3 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible3" title="标题" placement="bottom" :height="380">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>不显示右上角的X 且 不支持esc关闭</p>
    <wt-button type="primary" @click="visible4 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible4" title="标题" :closable="false">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>不显示蒙层</p>
    <wt-button type="primary" @click="visible5 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible5" title="标题" :mask="false">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>不允许点击遮罩层关闭</p>
    <wt-button type="primary" @click="visible6 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible6" title="标题" :mask-closable="false">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>抽屉关闭时销毁 Drawer 里的子元素</p>
    <wt-button type="primary" @click="visible7 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible7" title="标题" :destroy-on-close="true">
      <div>
        <p>输入内容，关闭后重新打开将会清空</p>
        <input />
      </div>
    </wt-drawer>
    <br /><br />
    <p>点击遮罩层或右上角叉的事件</p>
    <wt-button type="primary" @click="visible8 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible8" title="标题" @close="closeDrawer">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
    <br /><br />
    <p>打开抽屉时触发</p>
    <wt-button type="primary" @click="visible9 = true">打开抽屉</wt-button>
    <wt-drawer v-model="visible9" title="标题" @open="openDrawer">
      <div>
        <p>内容</p>
      </div>
    </wt-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
    };
  },
  methods: {
    closeDrawer () {
      console.log('关闭了抽屉');
    },
    openDrawer () {
      console.log('打开了抽屉');
    },
  },
};
</script>

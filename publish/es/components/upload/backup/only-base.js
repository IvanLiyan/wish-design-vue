var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-upload', { ref: "upload", staticClass: "only-base-upload", attrs: { "limit": 1, "file-list": _vm.fileList, "multiple": "", "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76" } }, [_c('wt-button', { attrs: { "slot": "trigger", "icon": "wt-export-o" }, on: { "click": _vm.clearFiles }, slot: "trigger" }, [_vm._v("点击上传")])], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      multiple: true,
      fileList: [{
        name: 'food.jpeg',
        /* eslint-disable */
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        /* eslint-disable */
      }]
    };
  },

  methods: {
    clearFiles: function clearFiles() {
      this.$refs.upload.clearFiles();
    }
  }
};
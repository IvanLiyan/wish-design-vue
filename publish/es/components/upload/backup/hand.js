var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-upload', { ref: "upload", staticClass: "upload-demo", attrs: { "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76", "on-preview": _vm.handlePreview, "on-remove": _vm.handleRemove, "auto-upload": false } }, [_c('wt-button', { attrs: { "slot": "trigger", "icon": "wticon-export-o" }, slot: "trigger" }, [_vm._v("选取文件")]), _vm._v(" "), _c('wt-button', { staticStyle: { "margin-left": "10px" }, on: { "click": _vm.submitUpload } }, [_vm._v("开始上传")])], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  methods: {
    submitUpload: function submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview: function handlePreview(file) {
      console.log(file);
    }
  }
};
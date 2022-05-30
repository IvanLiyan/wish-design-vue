var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-upload', { staticClass: "upload-file-picture", attrs: { "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76", "multiple": "", "on-preview": _vm.handlePreview, "on-remove": _vm.handleRemove, "before-remove": _vm.beforeRemove, "show-file-down": true, "file-list": _vm.fileList } }, [_c('wt-button', { attrs: { "icon": "paperclip", "type": "third" } }, [_c('span', [_vm._v("点击上传")])])], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      multiple: true,
      fileList: []
    };
  },

  methods: {
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview: function handlePreview(file) {
      console.log(file);
    },
    beforeRemove: function beforeRemove(file, fileList) {
      console.log('BeforeRemove');
    },
    clickHere: function clickHere() {
      console.log('hhh');
    }
  }
};
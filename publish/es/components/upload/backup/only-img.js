var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-upload', { staticClass: "avatar-uploader", attrs: { "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76", "accept": "image/*", "show-file-list": false, "on-success": _vm.handleAvatarSuccess, "on-error": _vm.handleAvatarError, "before-upload": _vm.beforeAvatarUpload } }, [_vm.imageUrl ? _c('img', { staticClass: "avatar", attrs: { "src": _vm.imageUrl } }) : _c('i', { staticClass: "wticon-add avatar-uploader-icon" }), _vm._v(" "), _c('span', { staticClass: "avatar-uploader-text" }, [_vm._v("上传图像")])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      imageUrl: ''
    };
  },

  methods: {
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError: function handleAvatarError(err, file, fileList) {
      console.log(err);
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$wt.message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
};
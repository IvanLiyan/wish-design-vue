import WtProgress from '@wish/wt-vue/es/components/progress';
import Icon from '@wish/wt-vue/es/components/icon';
import Loading from '@wish/wt-vue/es/components/loading';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition-group', { directives: [{ name: "show", rawName: "v-show", value: _vm.files && _vm.files.length, expression: "files && files.length" }], class: [_vm.prefix + "-list", _vm.prefix + "-list-" + _vm.listType, { 'is-disabled': _vm.disabled }], attrs: { "tag": "ul", "name": _vm.prefix + "-list" } }, _vm._l(_vm.files, function (file) {
    var _obj;
    return _c('li', { key: file.uid, class: [_vm.prefix + "-list-item", _vm.prefix + "-list-item-" + file.status, _vm.focusing ? 'focusing' : '', _vm.getPictureClass(_vm.prefix, file, _vm.inputType)], attrs: { "tabindex": "0" }, on: { "keydown": function keydown($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) {
            return null;
          }!_vm.disabled && _vm.$emit('remove', file);
        }, "focus": function focus($event) {
          _vm.focusing = true;
        }, "blur": function blur($event) {
          _vm.focusing = false;
        }, "click": function click($event) {
          _vm.focusing = false;
        }, "mouseover": function mouseover($event) {
          return _vm.changeShowBtn(file.uid, true);
        }, "mouseout": function mouseout($event) {
          return _vm.changeShowBtn(file.uid, false);
        } } }, [_c('a', { directives: [{ name: "show", rawName: "v-show", value: _vm.listType !== 'picture-card' && file.raw.type.substr(0, 5) !== 'image', expression: "(listType !== 'picture-card') && (file.raw.type.substr(0, 5) !== 'image')" }], class: _vm.prefix + "-list-item-name", attrs: { "title": file.name }, on: { "click": function click($event) {
          return _vm.handleClick(file);
        } } }, [_vm._v("\n      " + _vm._s(_vm.renderFileName(file.name)) + "\n    ")]), _vm._v(" "), _c('img', { directives: [{ name: "show", rawName: "v-show", value: file.raw.type.substr(0, 5) === 'image' && file.status === 'success', expression: "(file.raw.type.substr(0, 5) === 'image') && (file.status === 'success')" }], class: [_vm.prefix + "-list-item-image-picture", _vm.prefix + "-list-item-image-picture-" + _vm.inputType], attrs: { "src": file.url, "alt": "" } }), _vm._v(" "), _c('img', { directives: [{ name: "show", rawName: "v-show", value: file.raw.type.substr(0, 5) === 'image' && file.status !== 'success' && _vm.inputType !== 'picture-card', expression: "(file.raw.type.substr(0, 5) === 'image') && (file.status !== 'success') && (inputType !== 'picture-card')" }], class: _vm.prefix + "-list-item-image-picture", attrs: { "src": "@site/assets/noImage.png", "alt": "" } }), _vm._v(" "), _vm.listType === 'picture-card' && file.status === 'uploading' ? _c('div', { class: _vm.prefix + "-list-item-loading-wrapper" }, [_c('Loading', { class: _vm.prefix + "-list-item-loading", attrs: { "size": "small" } }), _vm._v(" "), _c('span', [_vm._v("上传中")])], 1) : _vm.listType !== 'picture-card' && file.raw.type.substr(0, 5) === 'image' ? _c('div', { class: _vm.prefix + "-list-item-image-info", attrs: { "title": file.name } }, [_c('p', [_vm._v(_vm._s(_vm.renderFileName(file.name)))]), _vm._v(" "), _c('p', { class: file.status === 'fail' ? _vm.prefix + "-list-item-image-info-fail" : _vm.prefix + "-list-item-image-info-status" }, [_vm._v("\n        " + _vm._s(_vm.STATUS_ENUM[file.status]) + "\n      ")])]) : _c('span', { class: [_vm.prefix + "-list-item-status", file.status === 'fail' && _vm.prefix + "-list-item-status-fail"] }, [_vm._v("\n      " + _vm._s(_vm.STATUS_ENUM[file.status]) + "\n    ")]), _vm._v(" "), _c('transition', { attrs: { "name": "fade" } }, [_vm.listType === 'text' && !_vm.disabled ? _c('label', { directives: [{ name: "show", rawName: "v-show", value: _vm.showBtn.indexOf(file.uid) > -1, expression: "showBtn.indexOf(file.uid) > -1" }], class: _vm.prefix + "-list-item-status-text" }, [_c('Icon', { directives: [{ name: "show", rawName: "v-show", value: file.status === 'fail', expression: "file.status === 'fail'" }], class: _vm.prefix + "-list-item-status-text-icon", attrs: { "name": "refresh-cw", "width": 20, "height": 20 }, on: { "click": function click() {
          _vm.$emit('retry', file);
        } } }), _vm._v(" "), _c('Icon', { class: _vm.prefix + "-list-item-status-text-icon", attrs: { "name": file.status === 'ready' || file.status === 'uploading' ? 'x' : 'trash-2', "width": 20, "height": 20 }, on: { "click": function click($event) {
          return _vm.$emit('remove', file);
        } } })], 1) : _vm._e()]), _vm._v(" "), _vm.listType === 'picture-card' ? _c('span', { class: (_obj = {}, _obj[_vm.prefix + "-list-item-actions"] = true, _obj[_vm.prefix + "-list-item-fail"] = file.status === 'fail', _obj) }, [_vm.listType === 'picture-card' && file.status === 'fail' && !_vm.disabled ? _c('span', { class: _vm.prefix + "-list-item-retry", on: { "click": function click($event) {
          return _vm.$emit('retry', file);
        } } }, [_c('Icon', { attrs: { "color": "#FFF", "name": "refresh-cw" } })], 1) : _vm._e(), _vm._v(" "), !_vm.disabled ? _c('span', { class: _vm.prefix + "-list-item-delete", on: { "click": function click($event) {
          return _vm.$emit('remove', file);
        } } }, [file.status === 'ready' || file.status === 'uploading' ? _c('Icon', { attrs: { "name": "x", "color": "#FFF" } }) : _c('Icon', { attrs: { "color": "#FFF", "name": "trash-2" } })], 1) : _vm._e()]) : _vm._e()], 1);
  }), 0);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtUploadList',

  components: {
    WtProgress: WtProgress,
    Icon: Icon,
    Loading: Loading
  },

  props: {
    prefix: {
      type: String,
      required: true
    },
    getIconCls: {
      type: Function,
      required: true
    },
    files: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    inputType: String,
    listType: String,
    showFileDown: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      focusing: false,
      showBtn: [],
      STATUS_ENUM: {
        ready: '准备中',
        uploading: '上传中',
        success: '',
        fail: '上传失败'
      }
    };
  },

  methods: {
    parsePercentage: function parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick: function handleClick(file) {
      // this.handlePreview && this.handlePreview(file);
    },

    // 判断是否为非图片卡形式控件且上传文件类型为image，为item添加class
    getPictureClass: function getPictureClass(prefix, file, inputType) {
      if (inputType !== 'picture-card' && file.raw.type.substr(0, 5) === 'image') {
        return prefix + '-list-item-image';
      }
    },

    // 改变文件列表按钮展示状态
    changeShowBtn: function changeShowBtn(uid, e) {
      if (e) {
        this.showBtn = [uid];
      } else {
        this.showBtn = [];
      }
    },

    // 截取文件名 - 只展示
    renderFileName: function renderFileName(fileName) {
      var pointIndex = fileName.lastIndexOf('.'); // 获取后缀的位置
      console.log('pointIndex', pointIndex);
      if (pointIndex <= 6) {
        // 如果名称长度不超过6，则直接展示
        console.log('fileName1', fileName);
        return fileName;
      } else {
        console.log(fileName.substr(0, 6) + '...' + fileName.substring(pointIndex + 1, fileName.length + 1));
        return fileName.substr(0, 6) + '...' + fileName.substring(pointIndex + 1, fileName.length + 1);
      };
    }
  }
};
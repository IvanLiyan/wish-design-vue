import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$keys from 'babel-runtime/core-js/object/keys';

import ajax from './ajax';
import UploadDragger from './upload-dragger';
import Icon from '@wish/wt-vue/es/components/icon';

export default {
  inject: ['uploader'],
  components: {
    UploadDragger: UploadDragger
  },
  props: {
    type: String, // 文件类型
    action: { // 上传地址
      type: String,
      required: true
    },
    id: String, // 文件id
    name: { // 文件名字段
      type: String,
      default: 'file'
    },
    data: Object, // 附加参数
    headers: Object, // 请求头
    method: String, // 请求方法
    withCredentials: Boolean, // 是否附带cookie凭证信息
    multiple: Boolean, // 是否可多选文件
    accept: String, // 接受的文件类型
    prefix: {
      type: String,
      required: true
    },
    getIconCls: {
      type: Function,
      required: false
    },

    onFileSelect: Function, // 选择文件
    onStart: Function, // 开始上传
    onProgress: Function, // 上传中
    onSuccess: Function, // 上传成功
    onError: Function, // 上传失败
    beforeUpload: Function, // 上传前
    repeatUpload: Function, // 重新上传
    drag: Boolean, // 展示弹窗
    onPreview: { // 预览文件
      type: Function,
      default: function _default() {}
    },
    onRemove: { // 删除已上传文件
      type: Function,
      default: function _default() {}
    },
    onRetry: { // 重试
      type: Function,
      default: function _default() {}
    },
    fileList: Array, // 已上传文件列表
    autoUpload: Boolean, // 自动上传
    listType: String, // 已上传文件列表类型
    httpRequest: { // 网络请求
      type: Function,
      default: ajax
    },
    disabled: Boolean, // 禁用
    limit: Number, // 限制数量
    onExceed: Function // 超出数量时触发
  },

  data: function data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },


  methods: {
    // 文件变化
    handleChange: function handleChange(ev) {
      var files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },

    // 上传过程
    uploadFiles: function uploadFiles(files) {
      var _this = this;

      // 超出限制大小
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      // 拿到待上传列表
      var postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      // 无文件
      if (postFiles.length === 0) {
        return;
      }

      if (this.onFileSelect && this.onFileSelect(postFiles) === false) {
        return;
      }
      // 开始走上传流程
      postFiles.forEach(function (rawFile) {
        _this.onStart(rawFile);
        if (_this.autoUpload) _this.upload(rawFile);
      });
    },

    // 实际上传过程
    upload: function upload(rawFile) {
      var _this2 = this;

      // 先把待上传列表清空
      this.$refs.input.value = null;

      // 非上传前，则调用post
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      // 上传前拿待上传文件列表
      var before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          var fileType = Object.prototype.toString.call(processedFile);

          // 文件类型是文件对象或blob对象
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            // blob对象new一个文件File
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (var p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            _this2.post(processedFile);
          } else {
            _this2.post(rawFile);
          }
        }, function () {
          _this2.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },

    // 中止上传
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        _Object$keys(reqs).forEach(function (uid) {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },

    // 发送文件
    post: function post(rawFile) {
      var _this3 = this;

      var uid = rawFile.uid;

      var options = {
        method: this.method,
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: function onProgress(e) {
          _this3.onProgress(e, rawFile);
        },
        onSuccess: function onSuccess(res) {
          _this3.onSuccess(res, rawFile);
          delete _this3.reqs[uid];
        },
        onError: function onError(err) {
          // this.onError(err, rawFile); // 注释
          _this3.onSuccess(err, rawFile);
          delete _this3.reqs[uid];
        }
      };
      var req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },

    // 点击文件
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },

    // 空格或回车等同点击文件
    handleKeydown: function handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    }
  },

  render: function render(h) {
    var id = this.id,
        handleClick = this.handleClick,
        drag = this.drag,
        name = this.name,
        handleChange = this.handleChange,
        multiple = this.multiple,
        accept = this.accept,
        listType = this.listType,
        uploadFiles = this.uploadFiles,
        disabled = this.disabled,
        handleKeydown = this.handleKeydown,
        prefix = this.prefix;

    var data = {
      class: _defineProperty({}, prefix, true),
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class[prefix + '-' + listType] = true;

    return h(
      'div',
      _mergeJSXProps([data, {
        attrs: { tabindex: '0' }
      }]),
      [drag ? h(
        'upload-dragger',
        {
          attrs: {
            prefix: this.prefix,
            disabled: disabled
          },
          on: {
            'file': uploadFiles
          }
        },
        [this.$slots.default]
      ) : this.$slots.default, h('input', { 'class': prefix + '-input',
        attrs: { type: 'file',

          id: id,
          name: name,

          multiple: multiple,
          accept: accept
        },
        ref: 'input', on: {
          'change': handleChange
        }
      }), listType === 'picture-card' && h(
        'div',
        { 'class': prefix + '-info' },
        [h(Icon, { 'class': prefix + '-info-icon', attrs: { name: 'plus', color: '#0E161C' }
        }), h(
          'span',
          { 'class': prefix + '-info-text' },
          ['\u70B9\u51FB\u4E0A\u4F20']
        )]
      )]
    );
  }
};
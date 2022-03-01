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
    type: String,
    action: {
      type: String,
      required: true
    },
    id: String,
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    method: String,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    prefix: {
      type: String,
      required: true
    },
    getIconCls: {
      type: Function,
      required: false
    },

    onFileSelect: Function,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    repeatUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    onRetry: {
      type: Function,
      default: function _default() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },

  data: function data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },


  methods: {
    handleChange: function handleChange(ev) {
      var files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles: function uploadFiles(files) {
      var _this = this;

      // 超出限制大小
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      var postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      if (this.onFileSelect && this.onFileSelect(postFiles) === false) {
        return;
      }
      postFiles.forEach(function (rawFile) {
        _this.onStart(rawFile);
        if (_this.autoUpload) _this.upload(rawFile);
      });
    },
    upload: function upload(rawFile) {
      var _this2 = this;

      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      var before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          var fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
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
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
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
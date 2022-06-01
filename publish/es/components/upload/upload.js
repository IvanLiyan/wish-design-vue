
import UploadList from './upload-list';
import UploadDefault from './upload-default';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

function noop() {}

export default {
  name: 'WtUpload',

  components: {
    UploadList: UploadList,
    UploadDefault: UploadDefault
  },

  provide: function provide() {
    return {
      uploader: this
    };
  },


  inject: {
    form: {
      default: ''
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },

  props: {
    action: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'button'
    },
    headers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    method: {
      type: String,
      default: 'post'
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    showFileDown: {
      type: Boolean,
      default: false
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onRetry: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text'
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    },
    onFileSelect: {
      type: Function,
      default: noop
    },
    elementId: String
  },

  data: function data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('upload');
    },
    getIconCls: function getIconCls() {
      return this.config.getIconCls;
    },
    uploadDisabled: function uploadDisabled() {
      return this.disabled || (this.wtForm || {}).disabled;
    }
  },

  watch: {
    value: {
      immediate: true, // 在最初绑定值的时候也执行函数
      handler: function handler(value) {
        var _this = this;

        this.uploadFiles = value.map(function (item) {
          item.uid = item.uid || Date.now() + _this.tempIndex++;
          item.status = item.status || 'success';
          return item;
        });
      }
    }
  },

  beforeDestroy: function beforeDestroy() {
    this.uploadFiles.forEach(function (file) {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },


  methods: {
    handleStart: function handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      var file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      if (this.listType === 'picture-card' || this.listType === 'text') {
        try {
          file.url = URL.createObjectURL(rawFile);
        } catch (err) {
          console.error('error', err);
          return;
        }
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress: function handleProgress(ev, rawFile) {
      var file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess: function handleSuccess(res, rawFile) {
      var file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
        this.$emit('input', this.uploadFiles);
        this.$emit('change', this.uploadFiles);
      }
    },
    handleError: function handleError(err, rawFile) {
      var file = this.getFile(rawFile);

      file.status = 'fail';

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
      this.$emit('input', this.uploadFiles);
      this.$emit('change', this.uploadFiles);
    },
    handleRemove: function handleRemove(file, raw) {
      var _this2 = this;

      if (raw) {
        file = this.getFile(raw);
      }
      var doRemove = function doRemove() {
        _this2.abort(file);
        var value = _this2.uploadFiles;
        value.splice(value.indexOf(file), 1);
        _this2.onRemove(file, value);
        _this2.$emit('input', _this2.uploadFiles);
        _this2.$emit('change', _this2.uploadFiles);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        var before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(function () {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    handleRetry: function handleRetry(file) {
      file.status = 'ready';
      this.submit();
    },
    getFile: function getFile(rawFile) {
      var value = this.uploadFiles;
      var target = void 0;
      value.every(function (item) {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort: function abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles: function clearFiles() {
      this.uploadFiles = [];
    },
    submit: function submit() {
      var _this3 = this;

      this.uploadFiles.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this3.$refs['upload-inner'].upload(file.raw);
      });
    },
    transListType: function transListType(inputType) {
      if (inputType === 'button' || inputType === 'input') {
        return 'text';
      } else {
        return 'picture-card';
      }
    },
    renderStatusClass: function renderStatusClass() {
      if (this.uploadFiles.length === 1 && this.uploadFiles[0].status === 'success') {
        return this.prefix + '-uploadlist-' + this.inputType + '-success';
      } else if (this.uploadFiles.length === 1 && this.uploadFiles[0].status === 'fail') {
        return this.prefix + '-uploadlist-' + this.inputType + '-fail';
      } else {
        return this.prefix + '-uploadlist-' + this.inputType + '-ready';
      }
    }
  },

  render: function render(h) {
    var uploadList = void 0;

    if (this.showFileList) {
      uploadList = h(
        'div',
        { 'class': [this.prefix + '-uploadlist-' + this.inputType, this.inputType === 'picture-card' && this.renderStatusClass()] },
        [h(UploadList, {
          attrs: {
            prefix: this.prefix,
            getIconCls: this.getIconCls,
            disabled: this.uploadDisabled,
            inputType: this.inputType,
            listType: this.transListType(this.inputType),
            files: this.uploadFiles,
            showFileDown: this.showFileDown,

            handlePreview: this.onPreview },
          on: {
            'remove': this.handleRemove,
            'retry': this.handleRetry
          }
        })]
      );
    }

    var uploadData = {
      props: {
        id: this.elementId,
        type: this.type,
        drag: this.drag,
        action: this.action,
        inputType: this.inputType,
        multiple: this.multiple,
        'before-upload': this.beforeUpload, // 上传前
        'with-credentials': this.withCredentials,
        headers: this.headers,
        method: this.method,
        name: this.name,
        data: this.data,
        accept: this.accept,
        value: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.transListType(this.inputType),
        disabled: this.uploadDisabled,
        limit: this.limit,
        prefix: this.prefix,
        getIconCls: this.getIconCls,
        'on-exceed': this.onExceed, // 超出数量限制
        'on-start': this.handleStart, // 开始上传
        'on-progress': this.handleProgress, // 上传过程
        'on-success': this.handleSuccess, // 上传成功
        'on-error': this.handleError, // 上传失败
        'on-preview': this.onPreview, // 预览文件
        'on-remove': this.handleRemove, // 删除文件
        'on-retry': this.handleRetry, // 重新上传
        'on-file-select': this.onFileSelect, // 选取文件
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };
    var uploadComponent = h(
      UploadDefault,
      uploadData,
      [this.inputType === 'input' ? h(
        'wt-button',
        {
          attrs: { type: 'third' },
          'class': 'upload-input' },
        [h('wt-icon', { 'class': 'upload-input-icon', attrs: { name: 'paperclip', width: 18, height: 18 }
        }), h(
          'span',
          { 'class': 'upload-input-text' },
          ['\u70B9\u51FB\u4E0A\u4F20']
        )]
      ) : this.inputType === 'picture-card' ? '' : h(
        'wt-button',
        {
          attrs: { icon: 'share', type: 'third' }
        },
        ['\u70B9\u51FB\u4E0A\u4F20']
      )]
    );

    return h('div', [this.inputType === 'picture-card' && uploadList, this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.inputType === 'button' || this.inputType === 'input' ? uploadList : '']);
  }
};
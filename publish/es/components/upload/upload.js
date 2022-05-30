
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


  // 注入
  inject: {
    // 表单
    form: {
      default: ''
    },
    // 配置
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },

  props: {
    // 上传地址
    action: {
      type: String,
      required: true
    },
    // 控件类型
    inputType: {
      type: String,
      default: 'button'
    },
    // 请求头
    headers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // 请求方法 （默认POST）
    method: {
      type: String,
      default: 'post'
    },
    // 附带参数
    data: Object,
    // 是否可多选文件
    multiple: Boolean,
    // 上传的文件字段名
    name: {
      type: String,
      default: 'file'
    },
    // 支持发送cookie凭证信息
    withCredentials: Boolean,
    // 是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: true
    },
    // 接受的文件类型
    accept: String,
    // 上传前触发
    beforeUpload: Function,
    // 删除前触发
    beforeRemove: Function,
    // 删除时触发
    onRemove: {
      type: Function,
      default: noop
    },
    // 重新上传时触发
    onRetry: {
      type: Function,
      default: noop
    },
    // 上传后触发
    onChange: {
      type: Function,
      default: noop
    },
    // 预览
    onPreview: {
      type: Function
    },
    // 上传成功
    onSuccess: {
      type: Function,
      default: noop
    },
    // 上传中
    onProgress: {
      type: Function,
      default: noop
    },
    // 上传失败
    onError: {
      type: Function,
      default: noop
    },
    // 文件列表
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 已上传列表类型
    listType: {
      type: String,
      default: 'text'
    },
    // 禁用
    disabled: Boolean,
    // 限制上传的个数
    limit: Number,
    // 超出数量时触发
    onExceed: {
      type: Function,
      default: noop
    },
    // 选择文件时触发
    onFileSelect: {
      type: Function,
      default: noop
    },
    // 节点ID
    elementId: String
  },

  data: function data() {
    return {
      uploadFiles: [], // 已上传文件
      tempIndex: 1
    };
  },


  computed: {
    // 前缀class
    prefix: function prefix() {
      return this.config.getPrefixCls('upload');
    },

    // 图标class
    getIconCls: function getIconCls() {
      return this.config.getIconCls;
    },

    // 禁用
    uploadDisabled: function uploadDisabled() {
      return this.disabled || (this.wtForm || {}).disabled;
    }
  },

  watch: {
    // 已上传文件对应表单value值
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
    // 删除文件时操作
    this.uploadFiles.forEach(function (file) {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },


  methods: {
    // 选择文件
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

    // 上传中-获取上传进度
    handleProgress: function handleProgress(ev, rawFile) {
      var file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },

    // 上传成功
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

    // 上传失败
    handleError: function handleError(err, rawFile) {
      var file = this.getFile(rawFile);

      file.status = 'fail';

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
      this.$emit('input', this.uploadFiles);
      this.$emit('change', this.uploadFiles);
    },

    // 删除文件
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

    // 重新上传
    handleRetry: function handleRetry(file) {
      file.status = 'ready';
      this.submit();
    },

    // 获取文件信息
    getFile: function getFile(rawFile) {
      var value = this.uploadFiles;
      var target = void 0;
      value.every(function (item) {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },

    // 中止上传
    abort: function abort(file) {
      this.$refs['upload-inner'].abort(file);
    },

    // 清空文件列表
    clearFiles: function clearFiles() {
      this.uploadFiles = [];
    },

    // 提交
    submit: function submit() {
      var _this3 = this;

      this.uploadFiles.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this3.$refs['upload-inner'].upload(file.raw);
      });
    },

    // 获取文件列表类型，如果是button或input就给出列表格式，picture-card给出图片卡形式
    transListType: function transListType(inputType) {
      if (inputType === 'button' || inputType === 'input') {
        return 'text';
      } else {
        return 'picture-card';
      }
    },

    // 文件上传状态
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
        [h(
          UploadList,
          {
            attrs: {
              prefix: this.prefix // 前缀
              , getIconCls: this.getIconCls // 图标
              , disabled: this.uploadDisabled // 禁用
              , inputType: this.inputType // 控件类型
              , listType: this.transListType(this.inputType) // 文件列表类型
              , files: this.uploadFiles // 文件列表
              , showFileDown: this.showFileDown // 文件可下载
              , // 重新上传
              handlePreview: this.onPreview },
            on: {
              'remove': this.handleRemove,
              'retry': this.handleRetry
            }
          },
          [' // \u9884\u89C8']
        )]
      );
    }

    var uploadData = {
      props: {
        id: this.elementId,
        type: this.type, // 类型
        drag: this.drag, // 弹窗
        action: this.action, // 上传地址
        inputType: this.inputType, // 控件类型
        multiple: this.multiple, // 是否可多选文件
        'before-upload': this.beforeUpload, // 上传前
        'with-credentials': this.withCredentials, // 发送cookie凭证
        headers: this.headers, // 请求头
        method: this.method, // 请求方法
        name: this.name, // 文件名字段
        data: this.data, // 附加数据
        accept: this.accept, // 接受的文件类型
        value: this.uploadFiles, // 已上传文件
        autoUpload: this.autoUpload, // 自动上传
        listType: this.transListType(this.inputType), // 已上传文件列表类型
        disabled: this.uploadDisabled, // 禁用
        limit: this.limit, // 限制数量
        prefix: this.prefix, // 前缀
        getIconCls: this.getIconCls, // 图标
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
<script>
import UploadList from './upload-list.vue';
import UploadDefault from './upload-default.vue';
import { CONFIG_PROVIDER,
  getPrefixCls,
  getIconCls,
} from '@/utils/config';

function noop () {}

export default {
  name: 'WtUpload',

  components: {
    UploadList,
    UploadDefault,
  },

  provide () {
    return {
      uploader: this,
    };
  },

  inject: {
    form: {
      default: '',
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },

  props: {
    action: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      default: 'button',
    },
    headers: {
      type: Object,
      default () {
        return {};
      },
    },
    method: {
      type: String,
      default: 'post',
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file',
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true,
    },
    showFileDown: {
      type: Boolean,
      default: false,
    },
    accept: String,
    type: {
      type: String,
      default: 'select',
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop,
    },
    onRetry: {
      type: Function,
      default: noop,
    },
    onChange: {
      type: Function,
      default: noop,
    },
    onPreview: {
      type: Function,
    },
    onSuccess: {
      type: Function,
      default: noop,
    },
    onProgress: {
      type: Function,
      default: noop,
    },
    onError: {
      type: Function,
      default: noop,
    },
    value: {
      type: Array,
      default () {
        return [];
      },
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String,
      default: 'text',
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop,
    },
    onFileSelect: {
      type: Function,
      default: noop,
    },
    elementId: String,
  },

  data () {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1,
    };
  },

  computed: {
    prefix () {
      return this.config.getPrefixCls('upload');
    },
    getIconCls () {
      return this.config.getIconCls;
    },
    uploadDisabled () {
      return this.disabled || (this.wtForm || {}).disabled;
    },
  },

  watch: {
    value: {
      immediate: true, // 在最初绑定值的时候也执行函数
      handler (value) {
        this.uploadFiles = value.map(item => {
          item.uid = item.uid || (Date.now() + this.tempIndex++);
          item.status = item.status || 'success';
          return item;
        });
      },
    },
  },

  beforeDestroy () {
    this.uploadFiles.forEach(file => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },

  methods: {
    handleStart (rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      const file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile,
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
    handleProgress (ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess (res, rawFile) {
      const file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
        this.$emit('input', this.uploadFiles);
      }
    },
    handleError (err, rawFile) {
      const file = this.getFile(rawFile);

      file.status = 'fail';

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
      this.$emit('input', this.uploadFiles);
    },
    handleRemove (file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      const doRemove = () => {
        this.abort(file);
        const value = this.uploadFiles;
        value.splice(value.indexOf(file), 1);
        this.onRemove(file, value);
        this.$emit('input', this.uploadFiles);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    handleRetry (file) {
      file.status = 'ready';
      this.submit();
    },
    getFile (rawFile) {
      const value = this.uploadFiles;
      let target;
      value.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort (file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles () {
      this.uploadFiles = [];
    },
    submit () {
      this.uploadFiles
        .filter(file => file.status === 'ready')
        .forEach(file => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    },
    transListType (inputType) {
      if (inputType === 'button' || inputType === 'input') {
        return 'text';
      } else {
        return 'picture-card';
      }
    },
  },

  render (h) {
    let uploadList;

    if (this.showFileList) {
      uploadList = (
        <div class={`${this.prefix}-uploadlist-${this.inputType}`}>
          <UploadList
            prefix={this.prefix}
            getIconCls={this.getIconCls}
            disabled={this.uploadDisabled}
            inputType={this.inputType}
            listType={this.transListType(this.inputType)}
            files={this.uploadFiles}
            showFileDown={this.showFileDown}
            on-remove={this.handleRemove}
            on-retry={this.handleRetry}
            handlePreview={this.onPreview}>
          </UploadList>
        </div>
      );
    }

    const uploadData = {
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
        'http-request': this.httpRequest,
      },
      ref: 'upload-inner',
    };
    const uploadComponent =
    <UploadDefault {...uploadData}>
      {/* 输入控件的渲染逻辑 */}
      {
        this.inputType === 'input'
          ? <wt-button type="third" class="upload-input">
            <wt-icon class="upload-input-icon" name="paperclip" width={18} height={18} />
            <span class="upload-input-text">点击上传</span>
          </wt-button>
          : (this.inputType === 'picture-card'
            ? ''
            : <wt-button icon="share" type="third">点击上传</wt-button>)
      }
      {/* End---输入控件的渲染逻辑---End */}
    </UploadDefault>;

    return (
      <div>
        { this.inputType === 'picture-card' && uploadList }
        {
          this.$slots.trigger
            ? [uploadComponent, this.$slots.default]
            : uploadComponent
        }
        {this.$slots.tip}
        { (this.inputType === 'button') || (this.inputType === 'input') ? uploadList : ''}
      </div>
    );
  },
};
</script>

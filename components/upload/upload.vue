<script>
import UploadList from './upload-list.vue';
import UploadDefault from './upload-default.vue';
import { CONFIG_PROVIDER,
  getPrefixCls,
  getIconCls,
} from '@/utils/config';
import Icon from '@components/icon';

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
    fileList: {
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
    fileList: {
      immediate: true,
      handler (fileList) {
        this.uploadFiles = fileList.map(item => {
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
      }
    },
    handleError (err, rawFile) {
      const file = this.getFile(rawFile);

      file.status = 'fail';

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove (file, raw) {
      console.log('REMOVE');
      if (raw) {
        file = this.getFile(raw);
      }
      const doRemove = () => {
        this.abort(file);
        const fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
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
      const fileList = this.uploadFiles;
      let target;
      fileList.every(item => {
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
  },

  render (h) {
    let uploadList;

    if (this.showFileList) {
      uploadList = (
        <UploadList
          prefix={this.prefix}
          getIconCls={this.getIconCls}
          disabled={this.uploadDisabled}
          listType={this.listType}
          files={this.uploadFiles}
          showFileDown={this.showFileDown}
          on-remove={this.handleRemove}
          on-retry={this.handleRetry}
          handlePreview={this.onPreview}>
        </UploadList>
      );
    }

    const uploadData = {
      props: {
        id: this.elementId,
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        method: this.method,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        prefix: this.prefix,
        getIconCls: this.getIconCls,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'on-retry': this.handleRetry,
        'on-file-select': this.onFileSelect,
        'http-request': this.httpRequest,
      },
      ref: 'upload-inner',
    };
    const files = this.uploadFiles;
    console.log('files', files);
    const STATUS_ENUM = {
      ready: '准备中',
      uploading: '上传中',
      success: '',
      fail: '上传失败',
    };
    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent =
    <UploadDefault {...uploadData}>{trigger}</UploadDefault>;

    return (
      <div>
        { this.listType === 'picture-card' ? uploadList : ''}
        { this.listType === 'picture-list' ? uploadList : ''}
        {
          this.$slots.trigger
            ? [uploadComponent, this.$slots.default]
            : uploadComponent
        }
        {this.$slots.tip}
        { this.listType === 'text' ? uploadList : ''}
        { (this.listType === 'picture-list' && files.length !== 0) && <div class="wt-upload-picture-list-control">
          <div class="wt-upload-picture-list-control-info">
            <p class="file-name">{ files[0].name }</p>
            { files[0].status !== 'success' && <p class={files[0].status !== 'fail' ? 'file-status status-uploading' : 'file-status status-fail'}>{ STATUS_ENUM[files[0].status] }</p> }
          </div>
          <div class="wt-upload-picture-list-control-button-wrapper">
            {
              (files[0].status === 'ready' || files.status === 'uploading') &&
              <Icon class="wt-upload-picture-list-control-button" name="x" width={20} height={20} onClick={this.handleRemove} />
            }
            {
              files[0].status === 'success' &&
              <Icon class="wt-upload-picture-list-control-button" name="trash-2" width={20} height={20} onClick={this.handleRemove} />
            }
            {
              files[0].status === 'fail' &&
              <Icon class="wt-upload-picture-list-control-button" name="refresh-cw" width={20} height={20} onClick={() => this.handleRetry(files[0])} />
            }
            {
              files[0].status === 'fail' &&
              <Icon class="wt-upload-picture-list-control-button" name="trash-2" width={20} height={20} onClick={this.handleRemove} />
            }
          </div>
        </div> }
      </div>
    );
  },
};
</script>

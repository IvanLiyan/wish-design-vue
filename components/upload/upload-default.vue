<script>
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';
import Icon from '@components/icon';

export default {
  inject: ['uploader'],
  components: {
    UploadDragger,
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true,
    },
    id: String,
    name: {
      type: String,
      default: 'file',
    },
    data: Object,
    headers: Object,
    method: String,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    prefix: {
      type: String,
      required: true,
    },
    getIconCls: {
      type: Function,
      required: false,
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
      default: function () {},
    },
    onRemove: {
      type: Function,
      default: function () {},
    },
    onRetry: {
      type: Function,
      default: function () {},
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax,
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
  },

  data () {
    return {
      mouseover: false,
      reqs: {},
    };
  },

  methods: {
    handleChange (ev) {
      const files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles (files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

      if (postFiles.length === 0) { return; }

      if (this.onFileSelect && this.onFileSelect(postFiles) === false) {
        return;
      }
      postFiles.forEach(rawFile => {
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    upload (rawFile) {
      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type,
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort (file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post (rawFile) {
      const { uid } = rawFile;
      const options = {
        method: this.method,
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        },
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown (e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    },
  },

  render (h) {
    const {
      id,
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown,
      prefix,
      fileList,
    } = this;
    const data = {
      class: {
        [prefix]: true,
      },
      on: {
        click: handleClick,
        keydown: handleKeydown,
      },
    };
    data.class[`${prefix}-${listType}`] = true;
    if ((listType === 'picture-list') && (fileList.length === 1)) {
      data.class[`${prefix}-${listType}-uploaded`] = true;
    };

    return (
      <div {...data} tabindex="0" >
        {
          drag
            ? <upload-dragger
              prefix={this.prefix}
              disabled={disabled}
              on-file={uploadFiles}>
              {this.$slots.default}</upload-dragger>
            : this.$slots.default
        }
        <input class={`${prefix}-input`}
          type="file"
          ref="input"
          id={id}
          name={name}
          on-change={handleChange}
          multiple={multiple}
          accept={accept}>
        </input>
        {listType === 'picture-card' && <div class={`${prefix}-info`}>
          <Icon class={`${prefix}-info-icon`} name="plus" color="#0E161C" />
          <span class={`${prefix}-info-text`}>点击上传</span>
        </div>}
      </div>
    );
  },
};
</script>

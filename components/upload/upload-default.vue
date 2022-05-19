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
    type: String, // 文件类型
    action: { // 上传地址
      type: String,
      required: true,
    },
    id: String, // 文件id
    name: { // 文件名字段
      type: String,
      default: 'file',
    },
    data: Object, // 附加参数
    headers: Object, // 请求头
    method: String, // 请求方法
    withCredentials: Boolean, // 是否附带cookie凭证信息
    multiple: Boolean, // 是否可多选文件
    accept: String, // 接受的文件类型
    prefix: {
      type: String,
      required: true,
    },
    getIconCls: {
      type: Function,
      required: false,
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
      default: function () {},
    },
    onRemove: { // 删除已上传文件
      type: Function,
      default: function () {},
    },
    onRetry: { // 重试
      type: Function,
      default: function () {},
    },
    fileList: Array, // 已上传文件列表
    autoUpload: Boolean, // 自动上传
    listType: String, // 已上传文件列表类型
    httpRequest: { // 网络请求
      type: Function,
      default: ajax,
    },
    disabled: Boolean, // 禁用
    limit: Number, // 限制数量
    onExceed: Function, // 超出数量时触发
  },

  data () {
    return {
      mouseover: false,
      reqs: {},
    };
  },

  methods: {
    // 文件变化
    handleChange (ev) {
      const files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    // 上传过程
    uploadFiles (files) {
      // 超出限制大小
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      // 拿到待上传列表
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

      // 无文件
      if (postFiles.length === 0) { return; }

      if (this.onFileSelect && this.onFileSelect(postFiles) === false) {
        return;
      }
      // 开始走上传流程
      postFiles.forEach(rawFile => {
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    // 实际上传过程
    upload (rawFile) {
      // 先把待上传列表清空
      this.$refs.input.value = null;

      // 非上传前，则调用post
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      // 上传前拿待上传文件列表
      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          // 文件类型是文件对象或blob对象
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            // blob对象new一个文件File
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
    // 中止上传
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
    // 发送文件
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
          // this.onError(err, rawFile); // 注释
          this.onSuccess(err, rawFile);
          delete this.reqs[uid];
        },
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    // 点击文件
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    // 空格或回车等同点击文件
    handleKeydown (e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    },
  },

  render (h) {
    const {
      id, // id
      handleClick, // 点击文件
      drag, // 弹窗
      name, // 文件名字段
      handleChange, // 文件变化
      multiple, // 多选文件
      accept, // 接受的文件类型
      listType, // 已上传列表类型
      uploadFiles, // 已上传的文件列表
      disabled, // 禁用
      handleKeydown, // 键盘按键触发
      prefix,
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

    return (
      <div {...data} tabindex="0">
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
          accept={accept}
        >
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

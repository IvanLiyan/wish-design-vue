<template>
  <div>
    <p>自定义action为https://wish.com/</p>
    <wt-upload
      class="upload-base"
      action="https://wish.com/"
      input-type="button"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>设置上传的请求头</p>
    <wt-upload
      class="upload-base"
      action="https://wish.com/"
      :headers="{'token':'abcdefghijklmnopqrstuvwxyz'}"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>支持多选文件</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>额外附带参数</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :data="data"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>上传的文件字段名testFileName</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      name="testFileName"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>发送cookie</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      with-credentials
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>不显示上传文件列表</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>接受上传的文件类型：如只接受jpg</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      accept="jpg"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>事件测试（看控制面板）</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>file-list</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>禁用</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      disabled
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
    <p>最大允许上传个数-3个</p>
    <wt-upload
      class="upload-base"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :limit="3"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-down="true"
      :file-list="fileList"
    >
      <wt-button icon="share" type="third">点击上传</wt-button>
    </wt-upload>
    <br />
  </div>
</template>
<script>
export default {
  data () {
    return {
      multiple: true,
      fileList: [],
      data: {
        id: 102,
        name: 'Alice',
      },
    };
  },
  methods: {
    handlePreview (file) {
      console.log('handlePreview', file);
    },
    handleRemove (file, fileList) {
      console.log('handleRemove', file, fileList);
    },
    handleSuccess (file, fileList) {
      console.log('handleSuccess', file, fileList);
    },
    handleError () {
      console.log('handleError');
    },
    handleProgress () {
      console.log('progress');
    },
    handleChange () {
      console.log('handleChange');
    },
    beforeUpload () {
      console.log('beforeUpload');
    },
    beforeRemove (file, fileList) {
      console.log('beforeRemove');
    },
  },
};
</script>
<style>
.upload-base{
  width: 360px;
  text-align: left;
}
.picture-list-wrapper {
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.picture-list{
  text-align: left;
  position: relative;
}
.picture-wrapper {
  width: 104px;
  height: 104px;
  border: 1px solid #BFCDD4;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

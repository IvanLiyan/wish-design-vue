import Vue from 'vue';

export declare class Upload extends Vue {
  static install (vue: any): void;
  static name: string

  action: string
  headers: object
  data: object
  multiple: boolean
  name: string
  drag: boolean
  dragger: boolean
  withCredentials: boolean
  showFileList: boolean
  showFileDown: boolean
  accept: string
  type: string
  beforeUpload: Function
  beforeRemove: Function
  onRemove: Function
  onRetry: Function
  onChange: Function
  onPreview: Function
  onSuccess: Function
  onProgress: Function
  onError: Function
  fileList: any[]
  autoUpload: boolean
  listType: string
  httpRequest: Function
  disabled: boolean
  limit: number
  onExceed: Function
}

export default Upload;

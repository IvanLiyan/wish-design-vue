<template>
  <transition-group
    tag="ul"
    v-show="files && files.length"
    :class="[
      `${prefix}-list`,
      `${prefix}-list-` + listType,
      { 'is-disabled': disabled }
    ]"
    :name="`${prefix}-list`"
  >
    <li
      v-for="file in files"
      :class="[`${prefix}-list-item`,
      `${prefix}-list-item-` + file.status,
      focusing ? 'focusing' : '',
      getPictureClass(prefix, file, inputType)]"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
      @mouseover="changeShowBtn(file.uid, true)"
      @mouseout="changeShowBtn(file.uid, false)"
    >
      <!-- <img
        :class="`${prefix}-list-item-thumbnail`"
        v-if="file.status !== 'uploading' && file.status !== 'fail'
        && listType === 'picture-card'"
        :src="file.url" alt=""
      /> -->
      <a
        :class="`${prefix}-list-item-name`"
        @click="handleClick(file)"
        v-show="(listType !== 'picture-card') && (file.raw.type.substr(0, 5) !== 'image')"
        :title="file.name"
      >
        {{ renderFileName(file.name) }}
      </a>
      <img
        :class="[`${prefix}-list-item-image-picture`, `${prefix}-list-item-image-picture-${inputType}`]"
        v-show="(file.raw.type.substr(0, 5) === 'image') && (file.status === 'success')"
        :src="file.url"
        alt=""
      />
      <!-- 列表形式占位图 Start -->
      <img
        :class="`${prefix}-list-item-image-picture`"
        v-show="(file.raw.type.substr(0, 5) === 'image') && (file.status !== 'success') && (inputType !== 'picture-card')"
        src="@site/assets/noImage.png"
        alt=""
      />
      <!-- 列表形式占位图 End -->
      <div
        v-if="(listType === 'picture-card') && (file.status === 'uploading')"
        :class="`${prefix}-list-item-loading-wrapper`"
      >
        <Loading :class="`${prefix}-list-item-loading`" size="small" />
        <span>上传中</span>
      </div>
      <div
        v-else-if="(listType !== 'picture-card') && (file.raw.type.substr(0, 5) === 'image')"
        :class="`${prefix}-list-item-image-info`"
        :title="file.name"
      >
        <p>{{ renderFileName(file.name) }}</p>
        <p :class="file.status === 'fail' ? `${prefix}-list-item-image-info-fail` : `${prefix}-list-item-image-info-status`">
          {{ STATUS_ENUM[file.status] }}
        </p>
      </div>
      <span
        :class="[`${prefix}-list-item-status`,file.status === 'fail' && `${prefix}-list-item-status-fail`]"
        v-else
      >
        {{ STATUS_ENUM[file.status] }}
      </span>
      <transition name="fade">
        <label
          :class="`${prefix}-list-item-status-text`"
          v-if="listType === 'text' && !disabled"
          v-show="showBtn.indexOf(file.uid) > -1"
        >
          <Icon
            name="refresh-cw"
            :class="`${prefix}-list-item-status-text-icon`"
            :width="20"
            :height="20"
            v-show="file.status === 'fail'"
            @click="() => {$emit('retry', file)}"
          />
          <Icon
            :name="(file.status === 'ready' || file.status === 'uploading') ? 'x' : 'trash-2'"
            :class="`${prefix}-list-item-status-text-icon`"
            :width="20"
            :height="20"
            @click="$emit('remove', file)"
          />
        </label>
      </transition>
      <span :class="{
        [`${prefix}-list-item-actions`]: true,
        [`${prefix}-list-item-fail`]: file.status === 'fail'
        }"
        v-if="listType === 'picture-card'">
        <span
          :class="`${prefix}-list-item-retry`"
          v-if="listType === 'picture-card' &&
          file.status === 'fail' &&
          !disabled"
          @click="$emit('retry', file)"
        >
          <Icon color="#FFF" name="refresh-cw" />
        </span>
        <span
          v-if="!disabled"
          :class="`${prefix}-list-item-delete`"
          @click="$emit('remove', file)"
        >
          <Icon v-if="(file.status === 'ready') || (file.status === 'uploading')" name="x" color="#FFF" />
          <Icon v-else color="#FFF" name="trash-2" />
        </span>
      </span>
    </li>
  </transition-group>
</template>
<script>
import WtProgress from '@components/progress';
import Icon from '@components/icon';
import Loading from '@components/loading';

export default {
  name: 'WtUploadList',

  components: {
    WtProgress,
    Icon,
    Loading,
  },

  props: {
    prefix: {
      type: String,
      required: true,
    },
    getIconCls: {
      type: Function,
      required: true,
    },
    // 文件列表
    files: {
      type: Array,
      default () {
        return [];
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 预览
    handlePreview: Function,
    // 上传控件类型
    inputType: String,
    // 已上传文件列表类型
    listType: String,
    // 是否允许下载文件
    showFileDown: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      focusing: false,
      showBtn: [], // 展示按钮
      STATUS_ENUM: { // 状态枚举
        ready: '准备中',
        uploading: '上传中',
        success: '',
        fail: '上传失败',
      },
    };
  },
  methods: {
    // 上传进度百分比
    parsePercentage (val) {
      return parseInt(val, 10);
    },
    // 点击图片预览功能，产品无此需求，暂时注释
    handleClick (file) {
      // this.handlePreview && this.handlePreview(file);
    },
    // 判断是否为非图片卡形式控件且上传文件类型为image，为item添加class
    getPictureClass (prefix, file, inputType) {
      if ((inputType !== 'picture-card') && (file.raw.type.substr(0, 5) === 'image')) {
        return `${prefix}-list-item-image`;
      }
    },
    // 改变文件列表按钮展示状态
    changeShowBtn (uid, e) {
      if (e) {
        this.showBtn = [uid];
      } else {
        this.showBtn = [];
      }
    },
    // 截取文件名 - 文件名超长的展示逻辑
    renderFileName (fileName) {
      const pointIndex = fileName.lastIndexOf('.'); // 获取后缀的位置
      console.log('pointIndex', pointIndex);
      if (pointIndex <= 6) { // 如果名称长度不超过6，则直接展示
        console.log('fileName1', fileName);
        return fileName;
      } else {
        console.log(fileName.substr(0, 6) + '...' + fileName.substring(pointIndex + 1, fileName.length + 1));
        return fileName.substr(0, 6) + '...' + fileName.substring(pointIndex + 1, fileName.length + 1);
      };
    },
  },
};
</script>

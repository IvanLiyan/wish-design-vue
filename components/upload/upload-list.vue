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
      `${prefix}-list-item-` + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
      @mouseover="hover = true"
      @mouseout="hover = false"
    >
      <!-- <img
        :class="`${prefix}-list-item-thumbnail`"
        v-if="file.status !== 'uploading' && file.status !== 'fail'
        && listType === 'picture-card'"
        :src="file.url" alt=""
      /> -->
      <a :class="`${prefix}-list-item-name`" @click="handleClick(file)">
        {{ file.name }}
      </a>
      <div
        v-if="(listType === 'picture-card') && (file.status === 'uploading')"
        :class="`${prefix}-list-item-loading-wrapper`"
      >
        <Loading :class="`${prefix}-list-item-loading`" size="small" />
        <span>上传中</span>
      </div>
      <i v-else-if="listType === 'picture-list'"></i>
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
          v-show="hover"
        >
          <!-- <i @click="$emit('remove', file)"
          :class="{
            [getIconCls('item-text')]: file.status === 'success',
            [getIconCls('fail')]: file.status === 'fail',
            [getIconCls('error-circle')]:true,
          }"></i> -->
          <Icon
            name="refresh-cw"
            :class="`${prefix}-list-item-status-text-icon`"
            :width="18"
            :height="18"
            v-show="file.status === 'fail'"
            @click="() => {$emit('retry', file)}"
          />
          <Icon
            :name="(file.status === 'ready' || file.status === 'uploading') ? 'x' : 'trash-2'"
            :class="`${prefix}-list-item-status-text-icon`"
            :width="18"
            :height="18"
            @click="$emit('remove', file)"
          />
          <!-- <i @click="() => {
            file.status === 'fail' ? $emit('retry', file) : $emit('remove', file)
            }"
          :class="{
            [getIconCls('item-text-hover')]: true,
            [getIconCls('refresh-cw')]: file.status === 'fail',
            [getIconCls('error-circle')]:file.status !== 'fail'
          }"></i> -->
        </label>
      </transition>
      <!-- <span :class="`${prefix}-list-item-text`"
        v-if="listType === 'picture-card' && file.status === 'uploading'">
        上传中</span> -->
      <!-- <wt-progress
        v-if="file.status === 'uploading'"
        type="line"
        :stroke-width="listType === 'picture-card' ? 4 : 2"
        :percentage="parsePercentage(file.percentage)" /> -->
      <span :class="{
        [`${prefix}-list-item-actions`]: true,
        [`${prefix}-list-item-fail`]: file.status === 'fail'
        }"
        v-if="listType === 'picture-card'">
        <!-- <span
          :class="`${prefix}-list-item-preview`"
          v-if="handlePreview &&
          listType === 'picture-card' &&
          file.status !== 'fail'"
          @click="handlePreview(file)"
        >
          <Icon name="visibility-on-o" />
        </span> -->
        <span
          :class="`${prefix}-list-item-retry`"
          v-if="listType === 'picture-card' &&
          file.status === 'fail' &&
          !disabled"
          @click="$emit('retry', file)"
        >
          <Icon name="refresh-cw" />
        </span>
        <span
          v-if="!disabled"
          :class="`${prefix}-list-item-delete`"
          @click="$emit('remove', file)"
        >
          <Icon v-if="(file.status === 'ready') || (file.status === 'uploading')" name="x" />
          <Icon v-else name="trash-2" />
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
    files: {
      type: Array,
      default () {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    handlePreview: Function,
    listType: String,
    showFileDown: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      focusing: false,
      hover: false,
      STATUS_ENUM: {
        ready: '准备中',
        uploading: '上传中',
        success: '',
        fail: '上传失败',
      },
    };
  },
  methods: {
    parsePercentage (val) {
      return parseInt(val, 10);
    },
    handleClick (file) {
      this.handlePreview && this.handlePreview(file);
    },
  },
};
</script>

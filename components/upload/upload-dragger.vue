<template>
  <div
    :class="[`${prefix}-dragger`, {
      'is-dragover': dragover
    }]"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot></slot>
    <span>hah</span>
  </div>
</template>
<script>
export default {
  name: 'WtUploadDrag',
  props: {
    disabled: Boolean,
    prefix: {
      type: String,
      required: true,
    },
    getIconCls: {
      type: Function,
      required: true,
    },
  },
  inject: {
    uploader: {
      default: '',
    },
  },
  data () {
    return {
      dragover: false,
    };
  },
  methods: {
    onDragover () {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop (e) {
      if (this.disabled || !this.uploader) return;
      const accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
        const { type, name } = file;
        const extension = name.indexOf('.') > -1
          ? `.${name.split('.').pop()}`
          : '';
        const baseType = type.replace(/\/.*$/, '');
        return accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType;
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '');
            }
            if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
              return type === acceptedType;
            }
            return false;
          });
      }));
    },
  },
};
</script>

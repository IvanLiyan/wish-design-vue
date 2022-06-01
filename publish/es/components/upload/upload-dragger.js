var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix + "-dragger", {
      'is-dragover': _vm.dragover
    }], on: { "drop": function drop($event) {
        $event.preventDefault();return _vm.onDrop.apply(null, arguments);
      }, "dragover": function dragover($event) {
        $event.preventDefault();return _vm.onDragover.apply(null, arguments);
      }, "dragleave": function dragleave($event) {
        $event.preventDefault();_vm.dragover = false;
      } } }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtUploadDrag',
  props: {
    disabled: Boolean,
    prefix: {
      type: String,
      required: true
    },
    getIconCls: {
      type: Function,
      required: false
    }
  },
  inject: {
    uploader: {
      default: ''
    }
  },
  data: function data() {
    return {
      dragover: false
    };
  },

  methods: {
    onDragover: function onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop: function onDrop(e) {
      if (this.disabled || !this.uploader) return;
      var accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter(function (file) {
        var type = file.type,
            name = file.name;

        var extension = name.indexOf('.') > -1 ? '.' + name.split('.').pop() : '';
        var baseType = type.replace(/\/.*$/, '');
        return accept.split(',').map(function (type) {
          return type.trim();
        }).filter(function (type) {
          return type;
        }).some(function (acceptedType) {
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
    }
  }
};
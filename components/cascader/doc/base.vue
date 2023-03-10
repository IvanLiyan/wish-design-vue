<template>
  <wt-cascader :label="'Address'" :data="options" v-model="value" @change="handleChange" />
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'zhinan',
          label: 'Guide',
          children: [
            {
              value: 'shejiyuanze',
              label: 'Design principles',
              disabled: true,
              children: [
                {
                  value: 'yizhi',
                  label: 'Consistent',
                },
                {
                  value: 'fankui',
                  label: 'Feedback',
                },
                {
                  value: 'xiaolv',
                  label: 'Efficiency',
                },
                {
                  value: 'kekong',
                  label: 'Controllable',
                },
              ],
            },
            {
              value: 'daohang',
              label: 'Navigation',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: 'Lateral navigation',
                },
                {
                  value: 'dingbudaohang',
                  label: 'Top navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              disabled: true,
              children: [
                {
                  value: 'layout',
                  label: 'Layout',
                },
                {
                  value: 'color',
                  label: 'Color',
                },
                {
                  value: 'typography',
                  label: 'Typography',
                },
                {
                  value: 'icon',
                  label: 'Icon',
                },
                {
                  value: 'button',
                  label: 'Button',
                },
              ],
            },
            {
              value: 'form',
              label: 'Form',
              isLeaf: true,
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table',
                },
                {
                  value: 'tag',
                  label: 'Tag',
                },
                {
                  value: 'progress',
                  label: 'Progress',
                },
                {
                  value: 'tree',
                  label: 'Tree',
                },
                {
                  value: 'pagination',
                  label: 'Pagination',
                },
                {
                  value: 'badge',
                  label: 'Badge',
                },
              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert',
                },
                {
                  value: 'loading',
                  label: 'Loading',
                },
                {
                  value: 'message',
                  label: 'Message',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox',
                },
                {
                  value: 'notification',
                  label: 'Notification',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu',
                },
                {
                  value: 'tabs',
                  label: 'Tabs',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown',
                },
                {
                  value: 'steps',
                  label: 'Steps',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip',
                },
                {
                  value: 'popover',
                  label: 'Popover',
                },
                {
                  value: 'card',
                  label: 'Card',
                },
                {
                  value: 'carousel',
                  label: 'Carousel',
                },
                {
                  value: 'collapse',
                  label: 'Collapse',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: 'Resources',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: 'Component interaction doc',
            },
          ],
        },
      ],
      value: [],
    };
  },
  methods: {
    handleChange(value, selectOptons) {
    },
  },
};
</script>

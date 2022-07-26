<template>
  <wt-row>
    <wt-col :span="12">
      <p>Hover to expand</p>
      <wt-cascader :data="options" v-model="value" expand-trigger="hover" />
    </wt-col>
    <wt-col :span="12">
      <p>Click to expand</p>
      <wt-cascader :data="options" v-model="value2" />
    </wt-col>
  </wt-row>
</template>
<script>
export default {
  data() {
    return {
      value: ['ziyuan', 'jiaohu'],
      value2: ['ziyuan', 'jiaohu'],
      options: [
        {
          value: 'zhinan',
          label: 'guide',
          children: [
            {
              value: 'shejiyuanze',
              label: 'design principles',
              disabled: true,
              children: [
                {
                  value: 'yizhi',
                  label: 'consistent',
                },
                {
                  value: 'fankui',
                  label: 'feedback',
                },
                {
                  value: 'xiaolv',
                  label: 'efficiency',
                },
                {
                  value: 'kekong',
                  label: 'controllable',
                },
              ],
            },
            {
              value: 'daohang',
              label: 'navigation',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: 'lateral navigation',
                },
                {
                  value: 'dingbudaohang',
                  label: 'top navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: 'component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
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
              value: 'Affix',
              label: 'Affix',
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
          label: 'resources',
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
              label: 'Component interaction document',
            },
          ],
        },
      ],
    };
  },
};
</script>

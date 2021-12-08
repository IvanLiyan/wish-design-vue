export default {
  chinese: {
    button: {
      componnent_desc: '按钮用于触发某一行为动作。按钮上显示的文案(button label)需和这一行为动作相一致',
      module1: {
        title: '基础样式',
        desc1: '根据按钮的组成，分为文字按钮，图标文字按钮，图标按钮',
      },
      module2: {
        title: '状态',
        desc1: '根据按钮的状态，分为正常，加载中，和不可点击',
      },
      module3: {
        title: '类型',
        desc1: '根据按钮的类型，分为主按钮、次级按钮、三级按钮、幽灵按钮、虚线按钮、文字按钮、链接按钮、强调按钮',
        desc2: '幽灵与次级按钮相似，区别：幽灵按钮背景色是透明，次级按钮背景色是白色',
        desc3: '链接和文字按钮很相似，链接按钮没有边距宽度',
      },
      module4: {
        title: '强调按钮',
        desc1: '用不同的颜色（红，黄，绿）来表示三种不同的强调含义（危险，警告，成功）',
      },
      module5: {
        title: '按钮组合',
        desc1: '一组相关联的操作聚合在一起成为按钮组，方便快捷操作',
      },
      module6: {
        title: '异步状态',
        desc1: '点击后按钮进入 loading 状态，当异步结束后恢复正常',
      },
    },
    icon: {
      componnent_desc: 'Tetris主要使用线性图标',
      module1: {
        title: '基础样式',
      },
      module2: {
        title: '类型与用法',
        subtitle1: '颜色',
        subtitle2: '大小&粗细',
      },
    },
    grid: {
      componnent_desc: '通过基础的 24 分栏，迅速简便地创建布局',
      module1: {
        title: '基础布局',
        desc1:
          '使用单一分栏创建基础的栅格布局。 通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局',
      },
      module2: {
        title: '类型与用法',
        subtitle1: '分栏间隔',
        desc1: '分栏之间存在间隔。 Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0',
        subtitle2: '混合布局',
        desc2: '通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局',
        subtitle3: '分栏偏移',
        desc3: '支持偏移指定的栏数。 通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数',
        subtitle4: '对齐方式',
        desc4:
          "通过 flex 布局来对分栏进行灵活的对齐。 将 type 属性赋值为 'flex'，可以启用 flex 布局，并可通过 justify 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式",
        subtitle5: '响应式布局',
        desc5: '参照了 Bootstrap 的 响应式设计，预设了六个响应尺寸：xs、sm、md、lg、xl、xxl',
      },
    },
  },
  english: {
    button: {
      componnent_desc: 'Button is used for starting an action. The button label text should reflect the action.',
      module1: {
        title: 'Basic Style',
        desc1: 'The button component includes: Text Button, Text + Icon Button, and Icon Button.',
      },
      module2: {
        title: 'Status',
        desc1: 'The button component has normal, loading, and disable status.',
      },
      module3: {
        title: 'Type',
        desc1:
          'Button component includes 8 different types: Primary Button, Secondary Button, Tertiary Button, Ghost Button, Dashed-line Button, Text Button, Link Button, and Emphasis Button.',
        desc2:
          'Ghost button is similar to secondary button, the main difference here is that ghost button has a transparent background while the secondary button has a white background.',
        desc3: 'Link is similar to text button, but without paddings.',
      },
      module4: {
        title: 'Emphasis Button',
        desc1:
          'We use three different colors (Red, Yellow, Green) to emphasis different status (Danger, Warning, Success).',
      },
      module5: {
        title: 'Button Group',
        desc1: 'A series of related actions can be combined into button groups, to improve usability.',
      },
      module6: {
        title: 'Loading Status',
        desc1:
          'You can also add a loading status to a clicked button to imform the user the system is running, after the loading complete, the button is back to normal status.',
      },
    },
    icon: {
      componnent_desc: 'Tetris mainly uses line icon.',
      module1: {
        title: 'Basic Style',
      },
      module2: {
        title: 'Type and Use Cases',
        subtitle1: 'Color',
        subtitle2: 'Size & Thickness',
      },
    },
    grid: {
      componnent_desc: 'Use the 24-column system to create layout easily.',
      module1: {
        title: 'Basic Grid',
        desc1:
          'Use row to create simple horizontal containers. Within row, use col and span to create different combinations of elements that span any number of columns.',
      },
      module2: {
        title: 'Type and Use Cases',
        subtitle1: 'Gutter',
        desc1: 'Gutters exist between columns。 You can set gutters under row component, the default gutter is 0.',
        subtitle2: 'Mixed Grid',
        desc2: 'By mixing columns with differnt span under the 24-grid system, you can easily create different layout.',
        subtitle3: 'Offset',
        desc3: 'Support column starting from specific position by specifying offset.',
        subtitle4: 'Alignment',
        desc4:
          'Use flex property to have flexible alginment, by adding flex as well as justify value (start, center, end, space-between, space-around), you can define the layout alignment as shown below.',
        subtitle5: 'Responsive',
        desc5:
          'Tetris grid system referes to Bootstrap Responsive Design，and have 6 responsive presets：xs、sm、md、lg、xl、xxl。',
      },
    },
  },
};

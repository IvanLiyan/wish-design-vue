# 自定义主题

###

> 目前开发阶段只有一套默认主题，后续会增加其它主题，敬请期待。

如需自定义主题，请联系 UI（Simiao Liu） 配置相关主题色变量，开发人员将配合支持该自定义主题。

## 默认主题色变量配置

```
## @type font-weight 字重

$font-family:Noto Sans SC,Avenir,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semi-bold:600;
$font-weight-bold: 700;

## @type font-size 字体大小

$display0-font-size: 64px;
$display1-font-size: 48px;
$display2-font-size: 36px;
$h1-font-size: 28px;
$h2-font-size: 24px;
$h3-font-size: 20px;
$h4-font-size: 16px;

$font-size-1: 16px;
$font-size-2: 14px;
$font-size-3: 13px;
$font-size-4: 12px;

$font-size-default: $font-size-2 !default;

## @type line-height 行高

$display0-line-height: 92px;
$display1-line-height: 72px;
$display2-line-height: 48px;
$h1-line-height: 40px;
$h2-line-height: 32px;
$h3-line-height: 30px;
$h4-line-height: 24px;

$line-height-1: 24px;
$line-height-2: 20px;
$line-height-3: 18px;
$line-height-4: 16px;

$line-height-default: $line-height-2 / $font-size-2 !default;

## @type border-width 边框

$border-width-0: 0;
$border-width-1: 1px;
$border-width-2: 2px;

## @type border-radius 圆角

$border-radius-0: 0px !default;
$border-radius-1: 1px !default;
$border-radius-2: 2px !default;
$border-radius-3: 4px !default;
$border-radius-round: 2000px !default;
$border-radius-half: 50% !default;

## @type shadow 阴影

$shadow-0: none !default;
$shadow-1: 0px 2px 1px -1px rgba(25, 42, 50, 0.2), 0px 1px 1px rgba(25, 42, 50, 0.14), 0px 1px 3px rgba(25, 42, 50, 0.12);  
$shadow-2: 0px 3px 1px -2px rgba(25, 42, 50, 0.2), 0px 2px 2px rgba(25, 42, 50, 0.14), 0px 1px 5px rgba(25, 42, 50, 0.12);
$shadow-3: 0px 2px 4px -1px rgba(25, 42, 50, 0.2), 0px 4px 5px rgba(25, 42, 50, 0.14), 0px 1px 10px rgba(25, 42, 50, 0.12);
$shadow-4: 0px 3px 5px -1px rgba(25, 42, 50, 0.2), 0px 6px 10px rgba(25, 42, 50, 0.14), 0px 1px 18px rgba(25, 42, 50, 0.12);
$shadow-5: 0px 5px 5px -3px rgba(25, 42, 50, 0.2), 0px 8px 10px 1px rgba(25, 42, 50, 0.14), 0px 3px 14px 2px rgba(25, 42, 50, 0.12);
$shadow-6: 0px 8px 10px -5px rgba(25, 42, 50, 0.2), 0px 16px 24px 2px rgba(25, 42, 50, 0.14), 0px 6px 30px 5px rgba(25, 42, 50, 0.12);
$shadow-7: 0px 10px 13px -6px rgba(25, 42, 50, 0.2), 0px 20px 31px 3px rgba(25, 42, 50, 0.14), 0px 8px 38px 7px rgba(25, 42, 50, 0.12);

## @type color 色彩

### @category base

$color-white: #fff !default;
$color-black: #0E161C !default;
$color-transparent: transparent !default;

### @category primary 主色

$color-primary: $color-primary-1;
$color-primary-1: #305BEF;
$color-primary-2: #022786;

### @category secondary 辅色

$color-secondary: $color-secondary1!default;
$color-secondary-1: #ADC0FD;

### @category text 文字

$color-text-default:$color-secondary3 !default;
$color-text-1: #0E161C;
$color-text-2: #1C2C36;
$color-text-3: #3F5663;
$color-text-4: #6B828F;
$color-text-5: #98ABB6;
$color-text-6: #BFCDD4;

### @category line 线条

$color-line-default: $color-line-1 !default;
$color-line-1: #BFCDD4;
$color-line-2: $color-primary-1;

### @category fill 填充

$color-fill-default:$color-fill-1 !default;
$color-fill-1: $color-primary-1;
$color-fill-2: #F7F9FA;
$color-fill-3: #EFF4F6;
$color-fill-4: #E5ECFF;

### @category link 链接

$color-link: $color-primary-1;
$color-link-hover: $color-primary-2;
$color-link-pressed: $color-primary-2;
$color-link-active: $color-primary-1;

### @category info 信息

$color-info: #0090D9;
$color-info-1: #00579E;
$color-info-2: #8BD9F7;
$color-info-3: #E6F8FF;

### @category success 成功

$color-success: #2EAA77;
$color-success-1: #10774C;
$color-success-2: #9cf0CD;
$color-success-3: #E6FFF4;

### @category danger 危险

$color-danger: #E52533;
$color-danger-1: #D0000F;
$color-danger-2: #FCB9Be;
$color-danger-3: #FFEBEC;

### @category warning 警告

$color-warning: #FFC72C;
$color-warning-1: #B15500;
$color-warning-2: #E3812B;
$color-warning-3: #FFF8E6;
```

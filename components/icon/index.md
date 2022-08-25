<script>
const icons = [
  "activity","airplay","alert-circle","alert-octagon","alert-triangle","align-center","align-justify","align-left","align-right","anchor","aperture","archive","arrow-down-circle","arrow-down-left","arrow-down-right","arrow-down","arrow-left-circle","arrow-left","arrow-right-circle","arrow-right","arrow-up-circle","arrow-up-left","arrow-up-right","arrow-up","at-sign","award","bar-chart-2","bar-chart","battery-charging","battery","bell-off","bell","bluetooth","bold","book-open","book","bookmark","box","briefcase","calendar","camera-off","camera","cast","check-circle","check-square","check","chevron-down","chevron-left","chevron-right","chevron-up","chevrons-down","chevrons-left","chevrons-right","chevrons-up","chrome","circle","clipboard","clock","cloud-drizzle","cloud-lightning","cloud-off","cloud-rain","cloud-snow","cloud","code","codepen","codesandbox","coffee","columns","command","compass","copy","corner-down-left","corner-down-right","corner-left-down","corner-left-up","corner-right-down","corner-right-up","corner-up-left","corner-up-right","cpu","credit-card","crop","crosshair","database","delete","disc","divide-circle","divide-square","divide","dollar-sign","download-cloud","download","dribbble","droplet","edit-2","edit-3","edit","external-link","eye-off","eye","facebook","fast-forward","feather","figma","file-minus","file-plus","file-text","file","film","filter","flag","folder-minus","folder-plus","folder","framer","frown","gift","git-branch","git-commit","git-merge","git-pull-request","github","gitlab","globe","grid","hard-drive","hash","headphones","heart","help-circle","hexagon","home","image","inbox","info","instagram","italic","key","layers","layout","life-buoy","link-2","link","linkedin","list","loader","lock","log-in","log-out","mail","map-pin","map","maximize-2","maximize","meh","menu","message-circle","message-square","mic-off","mic","minimize-2","minimize","minus-circle","minus-square","minus","monitor","moon","more-horizontal","more-vertical","mouse-pointer","move","music","navigation-2","navigation","octagon","package","paperclip","pause-circle","pause","pen-tool","percent","phone-call","phone-forwarded","phone-incoming","phone-missed","phone-off","phone-outgoing","phone","pie-chart","play-circle","play","plus-circle","plus-square","plus","pocket","power","printer","radio","refresh-ccw","refresh-cw","repeat","rewind","rotate-ccw","rotate-cw","rss","save","scissors","search","send","server","settings","share-2","share","shield-off","shield","shopping-bag","shopping-cart","shuffle","sidebar","skip-back","skip-forward","slack","slash","sliders","smartphone","smile","speaker","square","star","stop-circle","sun","sunrise","sunset","tablet","tag","target","terminal","thermometer","thumbs-down","thumbs-up","toggle-left","toggle-right","tool","trash-2","trash","trello","trending-down","trending-up","triangle","truck","tv","twitch","twitter","type","umbrella","underline","unlock","upload-cloud","upload","user-check","user-minus","user-plus","user-x","user","users","video-off","video","voicemail","volume-1","volume-2","volume-x","volume","watch","wifi-off","wifi","wind","x-circle","x-octagon","x-square","x","youtube","zap-off","zap","zoom-in","zoom-out"
];
export default {
  inject: ['app'],
  data () {
    return {
      icons: icons,
    };
  },
  methods:{
    // click:function(e){
    //   console.log('dddd',e)
    // }
  },
  computed: {
    theme () {
      return this.app.theme;
    },
  },
}
</script>

# 图标 / Icon

<span>{{$t('icon.component_desc')}}</span>

## <span>{{$t('button.module1.title')}}</span>

:::demo

```html
<wt-icon name="arrow-right"></wt-icon>
<wt-icon name="bar-chart"></wt-icon>
<wt-icon name="alert-circle"></wt-icon>
<wt-icon name="camera"></wt-icon>
```

:::

## <span>{{$t('icon.module2.title')}}</span>

### <span>{{$t('icon.module2.subtitle1')}}</span>

:::demo

```html
<wt-icon name="arrow-right" color="royalblue"></wt-icon>
<wt-icon name="bar-chart" color="#5abb3c"></wt-icon>
<wt-icon name="alert-circle" color="rgb(255, 152, 1)"></wt-icon>
<wt-icon name="camera" color="hsl(360,60%,60%)"></wt-icon>
```

:::

### <span>{{$t('icon.module2.subtitle2')}}</span>

:::demo

```html
<wt-icon name="arrow-right" :stroke-width="1" :width="18" :height="18"></wt-icon>
<wt-icon name="bar-chart" :stroke-width="2" :width="24" :height="24"></wt-icon>
<wt-icon name="alert-circle" :stroke-width="2" :width="35" :height="35"></wt-icon>
<wt-icon name="camera" :stroke-width="3" :width="40" :height="40"></wt-icon>
```

:::

## API

<api-doc name="Icon" :doc="require('./api.json')"></api-doc>

### <span>{{$t('icon.module3.subtitle1')}}</span>

**<span>{{$t('icon.module3.desc1')}}</span>** <a href="https://feathericons.com/" target="_blank">Feather-v4.28.0</a>

<ul class='icon-list'>
  <li v-for='icon in icons' :key='icon' class='icon-item'>
    <wt-icon :name='icon'></wt-icon>
    <span class='icon-name'>{{icon}}</span>
  </li>
</ul>

<style>
  .icon-list{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .icon-item{
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    width: 20%;
    text-align: center;
    margin-bottom: 10px;
    padding: 20px;
  }
  .icon-name{
    display: block;
  }
  .demo-icon .source >i {
    font-size: 24px;
    margin: 0px 20px;
  }
</style>

<template>
  <div>
    <wt-tab @input="input" @tab-click="click" v-model="activeName1" style="background: #f7f9fa; padding: 20px">
      <wt-tab-pane label="Tab" value="Tab">
        example:<br />
        When is the moon? Ask Qingtian about the wine. I don't know what season it would be in the heavens on this
        night.
      </wt-tab-pane>
      <wt-tab-pane icon="file" label="Tab2" value="Tab2">
        example:<br />
        I want to go back in the wind, and I'm afraid that the Qionglouyuyu will be too cold at the height. Dancing and
        making clear shadows are like living in the world!
      </wt-tab-pane>
      <wt-tab-pane number="20" label="Tab3" value="Tab3">
        example:<br />
        The moon rounds the red mansion Stoops to silk-pad doors, Shines upon the sleepless Bearing no grudge. Why does
        the moon tend to be full when people are apart?
      </wt-tab-pane>
      <wt-tab-pane number="20" icon="bell" label="Tab4" value="Tab4">
        example:<br />
        People may have sorrow or joy, be near or far apart, the moon may be dim or bright, wax or wane, This has been
        going on since the beginning of time. May we all be blessed with longevity. Though far apart, we are still able
        to share the beauty of the moon together..
      </wt-tab-pane>
    </wt-tab>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName1: 'Tab',
    };
  },
  methods: {
    input(val) {
      console.log('input event', val);
    },
    click() {
      console.log('click event');
    },
  },
};
</script>

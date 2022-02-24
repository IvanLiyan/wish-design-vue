<template>
  <wt-tab
    v-model="activeName8"
    @prev-click="prevClick"
    @next-click="nextClick"
    style="background: #f7f9fa; padding: 20px"
  >
    <wt-tab-pane label="Tab1" value="Tab1">
      example:<br />
      When is the moon? Ask Qingtian about the wine. I don't know what season it would be in the heavens on this night.
    </wt-tab-pane>
    <wt-tab-pane label="Tab2" value="Tab2">
      example:<br />
      I want to go back in the wind, and I'm afraid that the Qionglouyuyu will be too cold at the height. Dancing and
      making clear shadows are like living in the world!
    </wt-tab-pane>
    <wt-tab-pane label="Tab3" value="Tab3">
      example:<br />
      The moon rounds the red mansion Stoops to silk-pad doors, Shines upon the sleepless Bearing no grudge. Why does
      the moon tend to be full when people are apart?
    </wt-tab-pane>
    <wt-tab-pane label="Tab4" value="Tab4">
      example:<br />
      People may have sorrow or joy, be near or far apart, the moon may be dim or bright, wax or wane, This has been
      going on since the beginning of time. May we all be blessed with longevity. Though far apart, we are still able to
      share the beauty of the moon together..
    </wt-tab-pane>
    <wt-tab-pane label="Tab5" value="Tab5">
      example:<br />
      The bright moon in front of the bed is suspected to be frost on the ground. Raising my head, I see the moon so
      bright; withdrawing my eyes, my nostalgia comes around.
    </wt-tab-pane>
    <wt-tab-pane label="Tab6" value="Tab6">
      example:<br />
      The Jade Terrace produces white dew and invades the stockings for a long time at night. But under the crystal
      curtain, Linglong looks at the autumn moon.
    </wt-tab-pane>
    <wt-tab-pane label="Tab7" value="Tab7">
      example:<br />
      Lushui is pure, the moon is bright, and egrets fly. Lang listens to Cailing girl and returns with a night song.
    </wt-tab-pane>
    <wt-tab-pane label="Tab8" value="Tab8">
      example:<br />
      The fire shines on heaven and earth, and the red stars are in chaos. Nanlang bright moon night, the song moves the
      cold river.
    </wt-tab-pane>
    <wt-tab-pane label="Tab9" value="Tab9">
      example:<br />
      White hair three thousand feet, edge sorrow like a long. I don't know where to get autumn frost in the mirror.
    </wt-tab-pane>
    <wt-tab-pane label="Tab10" value="Tab10">
      example:<br />
      Qiupu Tian sheweng, fishing and sleeping in the water. His wife, Zhang Baiyin, settled Yingshen bamboo.
    </wt-tab-pane>
    <wt-tab-pane label="Tab11" value="Tab11">
      example:<br />
      When is the moon? Ask Qingtian about the wine. I don't know what season it would be in the heavens on this night.
    </wt-tab-pane>
    <wt-tab-pane label="Tab12" value="Tab12">
      example:<br />
      I want to go back in the wind, and I'm afraid that the Qionglouyuyu will be too cold at the height. Dancing and
      making clear shadows are like living in the world!
    </wt-tab-pane>
    <wt-tab-pane label="Tab13" value="Tab13">
      example:<br />
      The moon rounds the red mansion Stoops to silk-pad doors, Shines upon the sleepless Bearing no grudge. Why does
      the moon tend to be full when people are apart?
    </wt-tab-pane>
    <wt-tab-pane label="Tab14" value="Tab14">
      example:<br />
      People may have sorrow or joy, be near or far apart, the moon may be dim or bright, wax or wane, This has been
      going on since the beginning of time. May we all be blessed with longevity. Though far apart, we are still able to
      share the beauty of the moon together..
    </wt-tab-pane>
    <wt-tab-pane label="Tab15" value="Tab15">
      example:<br />
      The bright moon in front of the bed is suspected to be frost on the ground. Raising my head, I see the moon so
      bright; withdrawing my eyes, my nostalgia comes around.
    </wt-tab-pane>
    <wt-tab-pane label="Tab16" value="Tab16">
      example:<br />
      The Jade Terrace produces white dew and invades the stockings for a long time at night. But under the crystal
      curtain, Linglong looks at the autumn moon.
    </wt-tab-pane>
    <wt-tab-pane label="Tab17" value="Tab17">
      example:<br />
      Lushui is pure, the moon is bright, and egrets fly. Lang listens to Cailing girl and returns with a night song.
    </wt-tab-pane>
  </wt-tab>
</template>
<script>
export default {
  data() {
    return {
      activeName8: 'Tab1',
    };
  },
  methods: {
    prevClick() {
      console.log('prevClick event');
    },
    nextClick() {
      console.log('nextClick event');
    },
  },
};
</script>

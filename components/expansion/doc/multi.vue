<template>
  <div>
    <wt-expansion v-model="activeValue2">
      <wt-expansion-item title="Spring" value="1">
        <pre>
          <pre>
          Spring is the first season in the year.
          In our country, it lasts from March to May.
          In spring, the weather is comfortable, but it changes a lot. It rains sometimes.
          Many things come into life in spring.
          The trees turn green.
          People like to go outdoors to have fun.
          Besides, farmers are busy in spring, because it’s time for them to plant crops.
          All people are preparing for the whole year.
        </pre>
        </pre>
      </wt-expansion-item>
      <wt-expansion-item title="Summer" value="2">
        <pre>
          Summer is the second season in the year.
          In the Northern Hemisphere, summer goes from June to August.
          Summer is the hottest season in the year.
          Sometimes, the temperature reaches 40°C. Many people can not stand such hot weather.
          So they always stay indoors.
          At night, people would go out for a walk.
          Swimming is the most popular sport in summer. It brings cool to people.
        </pre>
      </wt-expansion-item>
      <wt-expansion-item title="Autumn" value="3">
        <pre>
          Autumn is the third season in the year. It lasts from September to November.
          When the autumn comes, the leaves begin to turn yellow and then fall.
          The weather becomes cool. It makes people feel comfortable.
          So many people like autumn and enjoy this season.
          Besides, autumn is a season of harvest. The crops turn to rip.
          Farmers are busy with the harvest. And they begin to prepare for the winter and the New Year.
        </pre>
      </wt-expansion-item>
      <wt-expansion-item value="4">
        <div slot="title">Winter</div>
        <pre>
          Winter is the fourth season in the year. It begins around December.
          In the northern part of China, it usually snows in winter, so it’s a white season.
          There are many snow games to have fun in the winter.
          But in the south, it hardly snows. When it rains, it becomes very cold.
          People barely go to the outdoors.
        </pre>
      </wt-expansion-item>
    </wt-expansion>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeValue2: [],
    };
  },
};
</script>

<template>
  <div>
    <wt-expansion v-model="activeValue1" @input="input">
      <wt-expansion-item title="Spring" value="1">
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
      </wt-expansion-item>
    </wt-expansion>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeValue1: '1',
    };
  },
};
</script>

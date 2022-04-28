<template>
  <div>
    <div class="type-and-use-size">
      <p>线性</p>
      <wt-select v-model="value">
        <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
      </wt-select>
    </div>
    <div class="type-and-use-size">
      <p>面型</p>
      <wt-select v-model="value2" genre="area">
        <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
      </wt-select>
    </div>
    <div class="type-and-use-size">
      <p>单线</p>
      <wt-select v-model="value3" genre="line">
        <wt-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled" />
      </wt-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'apple',
          label: 'apple',
        },
        {
          value: 'orange',
          label: 'orange',
        },
        {
          value: 'watermelon',
          label: 'watermelon',
          disabled: true,
        },
        {
          value: 'grape',
          label: 'grape',
        },
        {
          value: 'banana',
          label: 'banana',
        },
      ],
      value: '',
      value2: '',
      value3: '',
    };
  },
};
</script>

<style lang="scss">
.type-and-use-size p {
  font-size: 14px;
  color: #464646;
  letter-spacing: 0;
}
.type-and-use-size {
  margin: 0 20px;
  display: inline-block;
  width: 25%;
  text-align: left;
  vertical-align: top;
}
</style>

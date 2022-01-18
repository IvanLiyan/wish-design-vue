<template>
  <div>
    <div class="type-and-use-size">
      <p>线性</p>
      <wt-select v-model="value">
        <wt-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </wt-select>
    </div>
    <div class="type-and-use-size">
      <p>面型</p>
      <wt-select v-model="value2" genre="area">
        <wt-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </wt-select>
    </div>
    <div class="type-and-use-size">
      <p>单线</p>
      <wt-select v-model="value3" genre="line">
        <wt-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
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
          value: '李白',
          label: '李白',
        },
        {
          value: '李贺',
          label: '李贺',
        },
        {
          value: '杜甫',
          label: '杜甫',
          disabled: true,
        },
        {
          value: '白居易',
          label: '白居易',
        },
        {
          value: '屈原',
          label: '屈原',
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

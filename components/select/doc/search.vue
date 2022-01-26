<template>
  <div>
    <div class="type-and-use-size">
      <wt-select v-model="value" class="select-width" :filterable="true" label="本地搜索" multiple>
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
      <wt-select
        v-model="value2"
        class="select-width"
        :loading="loading"
        :filterable="true"
        :remote="true"
        :remote-method="remoteMethod"
        label="异步搜索"
        multiple
      >
        <wt-option
          v-for="item in options2"
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
    const options = [
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
    ];
    return {
      options: options,
      options2: options,
      value: '',
      value2: undefined,
      loading: false,
    };
  },
  methods: {
    remoteMethod(query) {
      clearTimeout(this.remoteTimer);
      this.loading = false;
      if (query) {
        this.loading = true;
        this.remoteTimer = setTimeout(() => {
          this.options2 = this.options.filter((item) => {
            return item.label.toLowerCase().indexOf(query && query.toLowerCase()) > -1;
          });
          this.loading = false;
        }, 1000);
      } else {
        this.options2 = this.options;
      }
    },
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

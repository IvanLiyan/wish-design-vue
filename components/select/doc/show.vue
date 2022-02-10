<template>
  <div>
    <div class="line">
      <div class="type-and-use-size">
        <wt-select v-model="value" label="国家">
          <wt-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </wt-select>
      </div>
      <div class="type-and-use-size">
        <wt-select v-model="value2" label="国家" disabled placeholder="选择国家">
          <wt-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </wt-select>
      </div>
      <div class="type-and-use-size">
        <wt-select
          v-model="value3"
          validation-text="还没进行选择哦"
          label="国家"
          :invalid="isInvalid"
          placeholder="选择国家"
        >
          <wt-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </wt-select>
      </div>
    </div>
    <div class="line">
      <div class="type-and-use-size">
        <wt-select v-model="value4" :filterable="true" :auto-clear-query="true" multiple label="本地搜索">
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
          v-model="value5"
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
      <div class="type-and-use-size">
        <wt-select v-model="value6" :filterable="true" :show-select-all="true" multiple label="显示全选">
          <wt-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </wt-select>
      </div>

      <div class="line">
        <div class="type-and-use-size">
          <wt-select
            v-model="value7"
            :filterable="true"
            :auto-clear-query="true"
            multiple
            label="选项为空时显示的文字"
            placeholder="本地搜索"
            no-data-text="没有数据哦"
          >
            <wt-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </wt-select>
        </div>
        <div class="type-and-use-size">
          <wt-select
            v-model="value8"
            :loading="loading"
            :filterable="true"
            label="无匹配时显示的文字"
            placeholder="本地搜索"
            no-match-text="没有搜索到数据哦"
            multiple
          >
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
            v-model="value9"
            :loading="loading"
            :filterable="true"
            :remote="true"
            label="保留当前的搜索关键词"
            no-match-text="没有搜索到数据哦"
            :remote-method="remoteMethod"
            placeholder="异步搜索"
            multiple
            :reserve-keyword="true"
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
      <div class="line">
        <div class="type-and-use-size">
          <wt-select
            v-model="value10"
            :filterable="true"
            :auto-clear-query="true"
            multiple
            label="change事件"
            placeholder="本地搜索"
            @change="change"
          >
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
            v-model="value12"
            :loading="loading"
            :filterable="true"
            :remote="true"
            label="remove事件"
            no-match-text="没有搜索到数据哦"
            :remote-method="remoteMethod"
            placeholder="异步搜索"
            multiple
            :reserve-keyword="true"
            @remove="remove"
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
        <div class="type-and-use-size">
          <wt-select
            v-model="value11"
            :loading="loading"
            :filterable="true"
            label="focus/blur事件"
            placeholder="本地搜索"
            no-match-text="没有搜索到数据哦"
            multiple
            @blur="blur"
            @focus="focus"
          >
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'DemoSelectBase',
  data() {
    const options = [
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
    ];
    const options3 = [
      {
        value: 'China',
        label: 'China',
      },
      {
        value: 'America',
        label: 'America',
      },
      {
        value: 'Japan',
        label: 'Japan',
        disabled: true,
      },
      {
        value: 'France',
        label: 'France',
      },
      {
        value: 'Russia',
        label: 'Russia',
      },
    ];
    return {
      options: options,
      options2: options,
      options3: options3,
      options4: [],
      value: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      loading: false,
    };
  },
  computed: {
    isInvalid() {
      if (this.value3 !== '') {
        return false;
      } else {
        return true;
      }
    },
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
        }, 2000);
      } else {
        this.options2 = this.options;
      }
    },
    change(val) {
      console.log('change val', val);
    },
    remove(val) {
      console.log('remove val', val);
    },
    update(val) {
      console.log('update val', val);
    },
    focus(val) {
      console.log('focus val', val.target.value);
    },
    blur() {
      console.log('blur');
    },
  },
};
</script>
<style scope lang="scss">
.line {
  margin: 20px 0;
}
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

<template>
  <div>
    <wt-select v-model="value" placeholder="请选择" multiple show-checkbox>
      <wt-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
      <template slot="tag" slot-scope="scope">
        <wt-tooltip :content="scope.option.label">
          <wt-tag
            :class="{ focus: scope.option.hitState }"
            :closable="scope.closable"
            :disabled="scope.disabled"
            @close="scope.onClose"
            theme=""
          >
            {{ scope.option.label }}
          </wt-tag>
        </wt-tooltip>
      </template>
    </wt-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupOptions: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海',
            },
            {
              value: 'Beijing',
              label: '北京',
            },
          ],
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都',
            },
            {
              value: 'Shenzhen',
              label: '深圳',
            },
            {
              value: 'Guangzhou',
              label: '广州',
            },
            {
              value: 'Dalian',
              label: '大连',
            },
          ],
        },
      ],
      value: [],
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
    };
  },
};
</script>
<style lang="scss">
.group-hr {
  opacity: 0.8;
  height: 1px;
  border: none;
  background-color: #d8dde7;
  border-radius: 2px;
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

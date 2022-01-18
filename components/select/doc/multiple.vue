<template>
  <div>
    <p>可创建并选中多个选项条目。</p>
    <div class="type-and-use-size">
      <p>多选为标签可删除</p>
      <wt-select v-model="value" placeholder="请选择" multiple clearable>
        <wt-option-group v-for="(group, index) in groupOptions" :key="group.label" :label="group.label">
          <template slot="hr" v-if="index !== groupOptions.length - 1">
            <hr class="group-hr" />
          </template>
          <wt-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </wt-option-group>
      </wt-select>
    </div>

    <div class="type-and-use-size">
      <p>多选为标签为不可删除</p>
      <wt-select v-model="value2" placeholder="请选择" multiple collapse-tags :closable="false">
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
      <p>显示多选 checkbox</p>
      <wt-select v-model="value3" placeholder="请选择" multiple show-checkbox>
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
      value2: [],
      value3: [],
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

<template>
  <ul
    :class="{
      [prefix]: true,
      [`${prefix}-unborder`]: unBorderClass,
      [`${prefix}-${size}`]: size,
    }">
    <li
      :class="[iconPrefix('left-thick'), `${prefix}-item`, `${prefix}-prev`, {
        [`${prefix}-disabled`]: currentPage <= 1
      }]"
      @click="prev"
    >
      <Icon name="chevron-left" :stroke-width="1" style="margin-top: 4px;" />
    </li>
    <li :class="`${prefix}-simple-item`"
        v-if="simple">
      <span v-if="simpleReadonly"
            :class="`${prefix}-simple-item-span`">{{ currentPage }}</span>
      <input v-else
        :class="`${prefix}-simple-input ${pagPrefix}-jumper-input`"
        type="number"
        :value="currentPage"
        @keyup="handleKeyUp"
        @blur="handleChange" />
      <span :class="`${prefix}-simple-item-span`">/</span>
      <span :class="`${prefix}-simple-item-span`">{{ pageCount }}</span>
    </li>
    <template v-else>
      <li
        :class="[`${prefix}-item`, `${prefix}-number`, {
          [`${prefix}-active`]: currentPage === 1
        }]"
        @click="goTo(1)"
        v-if="pageCount > 0">1</li>
      <li
        :class="`${prefix}-item ${prefix}-quickprev`"
        v-if="showPrevMore" @click="quickPrev">
        <Icon name="ellipsis" />
        <Icon name="fast-backward" />
      </li>
      <li
        :class="[`${prefix}-item`, `${prefix}-number`, {
          [`${prefix}-active`]: currentPage === pager
        }]"
        v-for="pager in pagers"
        @click="goTo(pager)"
        :key="pager">{{ pager }}</li>
      <li
        :class="`${prefix}-item ${prefix}-quicknext`"
        @click="quickNext"
        v-if="showNextMore">
        <Icon name="ellipsis" />
        <Icon name="fast-forward" />
      </li>
      <li @click="goTo(pageCount)"
        :class="[`${prefix}-item`, `${prefix}-number`, {
          [`${prefix}-active`]: currentPage === pageCount
        }]"
        v-if="pageCount > 1">{{ pageCount }}</li>
    </template>
    <li @click="next"
      :class="[`${prefix}-item`, `${prefix}-next`, `${iconPrefix('right-thick')}`, {
        [`${prefix}-disabled`]: currentPage === pageCount
      }]">
        <Icon name="chevron-right" :stroke-width="1" style="margin-top: 4px;" />
      </li>
  </ul>
</template>

<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
  getIconCls,
} from '@/utils/config';
import Icon from '@components/icon';
export default {
  name: 'Pager',
  components: {
    Icon,
  },
  props: {
    simple: Boolean,
    unborder: Boolean,
    size: String,
    currentPage: Number,
    pageCount: Number,
    simpleReadonly: Boolean,
    pagerCount: {
      type: Number,
      validator (value) {
        return (value | 0) === value &&
        value > 4 && value < 22 && (value % 2) === 1;
      },
      default: 7,
    },
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },

  computed: {
    prefix () {
      return this.config.getPrefixCls('pager');
    },
    pagPrefix () {
      return this.config.getPrefixCls('pagination');
    },
    iconPrefix () {
      return this.config.getIconCls;
    },
    // 计算是否显示prev
    showPrevMore () {
      return this.pageCount > this.pagerCount &&
      this.currentPage > (this.pagerCount + 1) / 2;
    },

    // 计算是否显示next
    showNextMore () {
      return this.pageCount > this.pagerCount &&
      this.currentPage < this.pageCount - (this.pagerCount - 1) / 2;
    },

    pagers () {
      const array = [];
      if (!this.showPrevMore && this.showNextMore) {
        for (let i = 2; i < this.pagerCount; i++) {
          array.push(i);
        }
      } else if (this.showPrevMore && !this.showNextMore) {
        const startPage = this.pageCount - (this.pagerCount - 2);
        for (let i = startPage; i < this.pageCount; i++) {
          array.push(i);
        }
      } else if (this.showPrevMore && this.showNextMore) {
        const offset = Math.floor(this.pagerCount / 2) - 1;
        const start = this.currentPage - offset;
        const end = this.currentPage + offset;
        for (let i = start; i <= end; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < this.pageCount; i++) {
          array.push(i);
        }
      }
      return array;
    },
    unBorderClass () {
      return this.simple || this.unborder;
    },
  },

  methods: {
    goTo (num) {
      const newPage = (num > this.pageCount) ? this.pageCount : num;
      if (newPage !== this.currentPage) {
        this.$emit('change', newPage);
      };
    },

    prev () {
      if (this.currentPage > 1) {
        const page = this.currentPage;
        this.goTo(page - 1);
      }
    },

    quickPrev () {
      // 去掉首尾的个数
      const pagerCountOffset = this.pagerCount - 2;
      const page = this.currentPage - pagerCountOffset;
      this.goTo(page);
    },

    next () {
      if (this.currentPage < this.pageCount) {
        const page = this.currentPage;
        this.goTo(page + 1);
      }
    },

    quickNext () {
      // 去掉首尾的个数
      const pagerCountOffset = this.pagerCount - 2;
      const page = this.currentPage + pagerCountOffset;
      this.goTo(page);
    },

    handleKeyUp (e) {
      (e.keyCode === 13) && this.goTo(Number(e.target.value));
    },

    handleChange (e) {
      e.target.value = ~~(e.target.value);
      this.goTo(Number(e.target.value));
    },
  },
};
</script>

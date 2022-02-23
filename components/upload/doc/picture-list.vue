<template>
  <div class="picture-list-wrapper">
    <wt-upload
      class="picture-list"
      action="https://jsonplaceholder.typicode.com/posts/"
      input-type="input"
      v-model="fileList"
      @input="handleInput"
      :on-change="handleChange"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileList: [],
    };
  },
  methods: {
    handleInput () {
    },
    handleChange () {
    },
  },
};
</script>

<template>
  <wt-upload
    class="upload-base"
    action="https://jsonplaceholder.typicode.com/posts/"
    input-type="button"
    :value="fileList"
  />
</template>
<script>
export default {
  data () {
    return {
      multiple: true,
      fileList: [],
    };
  },
};
</script>

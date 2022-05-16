<template>
  <wt-pagination
    :total="300"
    :show-total="false"
    :current-page.sync="currentPage"
  />
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
    };
  },
};
</script>

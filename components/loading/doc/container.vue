<template>
  <div class="content">
    <wt-switch v-model="loading" class="switch" />
    <wt-loading message="loading" :loading="loading" :delay="500">
      <wt-card class="card" title="Container shows loading title" subtitle="Container shows loading subtitle" />
    </wt-loading>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .card {
    background-color: #eff8ff;
    color: #042866;
  }
  .switch {
    display: block;
    margin-bottom: 20px;
  }
}
</style>

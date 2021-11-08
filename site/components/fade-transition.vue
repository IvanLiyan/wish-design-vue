<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: 'FadeTransition',
};
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>

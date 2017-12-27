<template>
  <div class="app">
    <transition name="router-fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="router-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <footGuide v-show="$route.meta.isTop"></footGuide>
  </div>
</template>

<script>
  import footGuide from 'components/footGuide/footGuide'

  export default {
    components: {
      footGuide
    },
  }
</script>

<style lang="scss">
  .app {
    .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-to {
      opacity: 0;
    }
  }
</style>

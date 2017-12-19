<template>
  <div>
    <ele-header/>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
  import header from './components/header/header.vue'

  export default {
    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    .tab-item
      display: inline-block
      .router-link-active
        color: red
</style>
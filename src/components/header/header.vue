<template>
  <div>
    header component
    <p>{{seller}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {

    computed: {
      ...mapState(['seller'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
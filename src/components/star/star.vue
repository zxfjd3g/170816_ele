<template>
  <div class="stars" :class="`star-${size}`">
    <span class="star" v-for="(sc, index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>
<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    // 设计props
    props: {
      score: Number,
      size: Number
    },
    /*
    3.4: 3 + 0 + 2
    3.5: 3 + 1 + 1
    starClasses: []
    */
    computed: {
      starClasses () {
        const scs = []
        const {score} = this
        const scoreInteger = Math.floor(score)
        // 添加类名CLASS_ON
        for (let i = 0; i< scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        // 添加类名CLASS_HALF
        if(score*10-scoreInteger*10>=5) {
          scs.push(CLASS_HALF)
        }
        // 添加类名CLASS_OFF
        while(scs.length<5) {
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .stars
    &.star-48
      text-align center
      .star
        display inline-block
        vertical-align middle
        width 20px
        height 19px
        margin-right 22px
        background-repeat no-repeat
        background-size 20px 19px
      .star:last-child
        margin-right 0
      .on
        bg-star(star48_on)
      .half
        bg-star(star48_half)
      .off
        bg-star(star48_off)

    &.star-36
      text-align center
      .star
        display inline-block
        vertical-align middle
        width 15px
        height 15px
        margin-right 22px
        background-repeat no-repeat
        background-size 15px 15px
      .star:last-child
        margin-right 0
      .on
        bg-star(star36_on)
      .half
        bg-star(star36_half)
      .off
        bg-star(star36_off)

    &.star-24
      text-align center
      .star
        display inline-block
        vertical-align middle
        width 10px
        height 10px
        margin-right 22px
        background-repeat no-repeat
        background-size 10px 10px
      .star:last-child
        margin-right 0
      .on
        bg-star(star24_on)
      .half
        bg-star(star24_half)
      .off
        bg-star(star24_off)


</style>
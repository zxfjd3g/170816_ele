<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="./avatar.jpg" >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">粥品香坊（回龙观）</span>
        </div>
        <div class="description">蜂鸟专送/38分钟送达</div>
        <div class="supports">
          <span class="icon discount"></span>
          <span class="text">在线支付满28减5</span>
        </div>
        <div class="supports-count">
          <span class="count">5个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">
        粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
      </span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img src="./avatar.jpg" alt="">
    </div>
    <div class="mask">
      <div class="mask-wrapper">
        <div class="mask-main">
          <h1>粥品香坊（回龙观）</h1>
          <div class="stars-wrapper">
            <div class="stars star-48">
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star half"></span>
              <span class="star off"></span>
            </div>

          </div>
          <div class="info">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="list">
            <li>
              <span class="iocn decrease"></span>
              <span>在线支付满28减5</span>
            </li>
            <li>
              <span class="iocn discount"></span>
              <span>VC无限橙果汁全场8折</span>
            </li>
            <li>
              <span class="iocn guarantee"></span>
              <span>单人精彩套餐</span>
            </li>
            <li>
              <span class="iocn invoice"></span>
              <span>该商家支持发票,请下单写好发票抬头</span>
            </li>
            <li>
              <span class="iocn special"></span>
              <span>已加入“外卖保”计划,食品安全保障</span>
            </li>
          </ul>
          <div class="info">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="context">
            <p class="text">
              粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
            </p>
          </div>

        </div>
      </div>
      <div class="mask-footer">
        <span class="icon-close"></span>
      </div>
    </div>
    <!--<p>{{seller}}</p>-->
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
  @import "../../common/stylus/mixins.styl"

  .header
    position relative
    background-color rgba(7,17,27,0.5)
    color #fff
    overflow hidden
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      overflow hidden
      .avatar
        float left
        width 64px
        height 64px
        &>img
          width 100%
          height 100%
          border-radius 2px
      .content
        float left
        margin-left 16px
        .title
          margin-top 2px
          margin-bottom 8px
          .brand
            display inline-block
            vertical-align middle
            width 30px
            height 18px
            background-size 30px 18px
            background-repeat no-repeat
            bg-image(brand)

          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          font-size 12px
          line-height 12px
          font-weight 200
        .supports
          margin-top 10px
          margin-bottom 2px
          .icon
            display inline-block
            vertical-align middle
            width 12px
            height 12px
            background-repeat no-repeat
            background-size 12px 12px
          .decrease
            bg-image(decrease_1)
          .discount
            bg-image(discount_1)
          .guarantee
            bg-image(guarantee_1)
          .invoice
            bg-image(invoice_1)
          .special
            bg-image(special_1)

          .text
            font-size 10px
            line-height 12px
            font-weight 200
        .supports-count
          position absolute
          right 12px
          bottom 18px
          background: rgba(0,0,0,0.2);
          border-radius 8px
          padding 7px 8px
          height 24px
          box-sizing border-box
          line-height 10px
          font-size 10px
          font-weight 200
          .count
            margin-right 2px




    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      background-color rgba(7,17,27,0.2)
      padding 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        vertical-align middle
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 100% 100%
        bg-image(bulletin)

      .bulletin-text
        margin 0 4px
        font-size 10px
        font-weight 200
      .icon-keyboard_arrow_right
        position absolute
        right 7px
        top 8px


    .bg
      position absolute
      top: 0
      left 0
      width 100%
      height 100%
      z-index -1
      &>img
        width 100%
        height 100%
        filter blur(10px)


    .mask
      display none
      z-index 100
      position fixed
      top:0
      left 0
      width 100%
      height 100%
      background-color rgba(7,17,27,0.8)
      .mask-wrapper
        min-height 100%
        .mask-main
          padding 64px 36px 32px
          &>h1
            font-size 16px
            line-height 16px
            font-weight 700
            text-align center
            margin-bottom 16px
          .stars-wrapper
            height 24px
            .star-48
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

            .star-36
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

            .star-24
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


          .info
            margin-top 28px
            margin-bottom 24px
            overflow hidden
            .line
              float left
              width 112px
              height 2px
              background: rgba(255,255,255,0.2);
              margin-top 6px
            .text
              float left
              font-size 14px
              font-weight 700
              line-height 14px
              margin 0 11px


          .list
            padding 0 12px
            &>li
              height 16px
              margin-bottom 12px
              .iocn
                display inline-block
                vertical-align middle
                width 16px
                height 16px
                background-repeat no-repeat
                background-size 100% 100%
              .decrease
                bg-image(decrease_2)
              .discount
                bg-image(discount_2)
              .guarantee
                bg-image(guarantee_2)
              .invoice
                bg-image(invoice_2)
              .special
                bg-image(special_2)


              &>span
                margin-left 6px
                font-size 12px
                line-height 12px
                font-weight 200
          .context
            padding 0 12px
            .text
              font-size 12px
              line-height 24px
              font-weight 200




      .mask-footer
        margin-top -64px
        text-align center
        &>span
          font-size 32px
          color rgba(255,255,255,0.5)

</style>

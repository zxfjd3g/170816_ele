<template>
  <div class="msite">

    <head-top signinUp='msite'>
      <router-link class="link_search" :to="'/search/' + geohash" slot="search">
        <svgImage className="search_guide" type="#icon-sousuo"/>
      </router-link>
      <router-link class="msite_title" to="/home" slot="msite-title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>

    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container"
               v-for="(itemTypes, index) in foodTypes"
               :key="index">
            <router-link class="link_to_food"
                         :to="{path: '/foodtype'}"
                         v-for="itemType in itemTypes"
                         :key="itemType.id">
              <figure>
                <img :src="imgBaseUrl + itemType.image_url">
                <figcaption>{{itemType.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="./fl.svg" class="fl_back" v-else>
    </nav>

    <div class="shop_list_container">
      <div class="shop_header">
        <svgImage className="shop_icon" type="#icon-xuanxiang"/>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list v-if="hasGetData"/>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import {mapState} from 'vuex'
  import headTop from 'components/header/head.vue'
  import shopList from 'components/shopList/shopList.vue'
  import {msiteAdress, msiteFoodTypes} from 'api'

  export default {

    data() {
      return {
        msiteTitle: '请选择地址...', // msiet页面头部标题
        foodTypes: [], // 食品分类列表
        hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        imgBaseUrl: 'https://fuss10.elemecdn.com', //分类图片域名地址
      }
    },

    async beforeMount() {
      //获取位置信息
      const address = await msiteAdress(this.geohash)
      this.msiteTitle = address.name
      this.hasGetData = true
    },

    async mounted() {
      //获取导航食品类型列表
      const apiFoodTypes = await msiteFoodTypes(this.geohash)
      // 对数据结构进行处理后, 更新foodTypes状态

      let resLength = apiFoodTypes.length
      let tempArr = [...apiFoodTypes] // 返回一个新的数组
      const foodTypes = []
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodTypes[j] = tempArr.splice(0, 8)
      }

      this.foodTypes = foodTypes
      //创建swiper对象, 实现翻页显示
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        })
      })
    },

    computed: {
      ...mapState([
        'geohash'
      ]),
    },

    components: {
      headTop,
      shopList,
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .msite {
    .link_search {
      left: .8rem;
      @include wh(.9rem, .9rem);
      @include ct;

      .search_guide {
        width: 100%;
        height: 100%;
      }
    }

    .msite_title {
      @include center;
      width: 50%;
      color: #fff;
      text-align: center;
      margin-left: -0.5rem;
      .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        display: block;
      }
    }

    .msite_nav {
      padding-top: 2.1rem;
      background-color: #fff;
      border-bottom: 0.025rem solid $bc;
      .swiper-container {
        @include wh(100%, auto);
        padding-bottom: 0.6rem;
        .food_types_container {
          display: flex;
          flex-wrap: wrap;
          .link_to_food {
            width: 25%;
            padding: 0.3rem 0rem;
            @include fj(center);
            figure {
              img {
                margin-bottom: 0.3rem;
                @include wh(1.8rem, 1.8rem);
              }
              figcaption {
                text-align: center;
                @include sc(0.55rem, #666);
              }
            }
          }
        }
        .swiper-pagination {
          bottom: 0.2rem;
        }
      }
      .fl_back {
        @include wh(100%, 100%);
      }
    }

    .shop_list_container {
      margin-top: .4rem;
      border-top: 0.025rem solid $bc;
      background-color: #fff;
      .shop_header {
        .shop_icon {
          fill: #999;
          margin-left: 0.6rem;
          vertical-align: middle;
          @include wh(0.6rem, 0.6rem);
        }
        .shop_header_title {
          color: #999;
          @include font(0.55rem, 1.6rem);
        }
      }
    }
  }
</style>

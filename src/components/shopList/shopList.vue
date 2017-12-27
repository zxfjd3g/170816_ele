<template>
  <div class="shoplist_container">
    <ul class="shoplist" v-if="shops.length">
      <router-link class="shop_li"
                   :to="{path: 'shop'}"
                   tag='li'
                   v-for="item in shops"
                   :key="item.id">
        <div>
          <img class="shop_img" :src="imgBaseUrl + item.image_path">
        </div>
        <div class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title ellipsis" :class="{premium: item.is_premium}">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports" v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <div class="rating_section">
                <span class="rating_num">{{item.rating}}</span>
              </div>
              <div class="order_section">
                月售{{item.recent_order_num}}单
              </div>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">硅谷专送</span>
              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ¥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
							<span
                v-if="Number(item.distance)">{{item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
              <span v-else>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </div>
      </router-link>
    </ul>

    <!--初始未加载到数据前的默认界面-->
    <ul class="animation_opactiy" v-else>
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img class="list_back_svg" src="./shopback.svg">
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getShopList} from 'api'
  import {imgBaseUrl} from 'common/utils/env'

  export default {
    data() {
      return {
        shops: [], // 店铺列表数据
        imgBaseUrl,
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'geohash'
      ]),
    },
    methods: {
      async initData() {
        const arr = this.geohash.split(',')
        //异步获取数据
        this.shops = await getShopList(arr[0], arr[1])
      },

      zhunshi(supports) {
        let zhunStatus = false
        if ((supports instanceof Array) && supports.length) {
          for (var i = 0; i < supports.length; i++) {
            if (supports[i].icon_name === '准') {
              zhunStatus = true
              break
            }
          }
        }
        return zhunStatus
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .shoplist_container {
    background-color: #fff;
    margin-bottom: 2rem;

    .shoplist {
      .shop_li {
        display: flex;
        border-bottom: 0.025rem solid #f1f1f1;
        padding: 0.7rem 0.4rem;

        .shop_img {
          @include wh(2.7rem, 2.7rem);
          display: block;
          margin-right: 0.4rem;
        }

        .shop_right {
          flex: auto;
          .shop_detail_header {
            @include fj;
            align-items: center;
            .shop_title {
              width: 8.5rem;
              color: #333;
              padding-top: .01rem;
              @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
              font-weight: 700;
            }
            .premium::before {
              content: '品牌';
              display: inline-block;
              font-size: 0.5rem;
              line-height: .6rem;
              color: #333;
              background-color: #ffd930;
              padding: 0 0.1rem;
              border-radius: 0.1rem;
              margin-right: 0.2rem;
            }
            .shop_detail_ul {
              display: flex;
              transform: scale(.8);
              margin-right: -0.3rem;
              .supports {
                @include sc(0.5rem, #999);
                border: 0.025rem solid #f1f1f1;
                padding: 0 0.04rem;
                border-radius: 0.08rem;
                margin-left: 0.05rem;
              }
            }
          }
          .rating_order_num {
            @include fj(space-between);
            height: 0.6rem;
            margin-top: 0.52rem;
            .rating_order_num_left {
              @include fj(flex-start);
              .rating_section {
                display: flex;
                .rating_num {
                  @include sc(0.4rem, #ff6000);
                  margin: 0 0.2rem;
                }
              }
              .order_section {
                transform: scale(.8);
                margin-left: -0.2rem;
                @include sc(0.4rem, #666);
              }
            }
            .rating_order_num_right {
              display: flex;
              align-items: center;
              transform: scale(.7);
              min-width: 5rem;
              justify-content: flex-end;
              margin-right: -0.8rem;
              .delivery_style {
                font-size: 0.4rem;
                padding: 0.04rem 0.08rem 0;
                border-radius: 0.08rem;
                margin-left: 0.08rem;
                border: 1px;
              }
              .delivery_left {
                color: #fff;
                background-color: $green;
                border: 0.025rem solid $green;
              }
              .delivery_right {
                color: $green;
                border: 0.025rem solid $green;
              }
            }
          }
          .fee_distance {
            margin-top: 0.52rem;
            @include fj;
            @include sc(0.5rem, #333);
            .fee {
              transform: scale(.9);
              @include sc(0.5rem, #666);
            }
            .distance_time {
              transform: scale(.9);
              span {
                color: #999;
              }
              .order_time {
                color: $green;
              }
              .segmentation {
                color: #ccc;
              }
            }
          }
        }
      }
    }

    .animation_opactiy {
      .list_back_li {
        height: 4.85rem;
        .list_back_svg {
          @include wh(100%, 100%)
        }
      }
    }
  }
</style>
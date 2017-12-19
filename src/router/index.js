/*
路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../pages/goods/goods.vue'
import ratings from '../pages/ratings/ratings.vue'
import seller from '../pages/seller/seller.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
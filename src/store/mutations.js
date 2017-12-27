import Vue from 'vue'
import {
  RECEIVE_SELLER,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCRMENT_FOOD_COUNT,
  DECRMENT_FOOD_COUNT,
  CLEAR_CART,
  GET_USERINFO,
  RECORD_USERINFO,
} from './mutation-types'
import {setStore} from '../common/utils/storageUtil'

export default {
  [RECEIVE_SELLER](state, {seller}) {
    state.seller = seller
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCRMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count++
    } else {
      // food.count = 1 //给food添加属性count, 值为1    没有数据绑定
      // 添加一个带数据绑定的属性
      Vue.set(food, 'count', 1)
    }
  },

  [DECRMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--
    }
  },

  [CLEAR_CART](state, {foods}) {
    foods.forEach(food => food.count = 0)
  },

  //获取用户信息存入vuex
  [GET_USERINFO](state, {info}) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },

  // 记录用户信息
  [RECORD_USERINFO](state, {info}) {
    state.userInfo = info;
    state.login = true
    setStore('user_id', info.user_id);
  },
}
import Vue from 'vue'
import {
  RECEIVE_SELLER,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCRMENT_FOOD_COUNT,
  DECRMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

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
  }
}
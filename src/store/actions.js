import {
  requestGoods,
  requestRatings,
  requestSeller
} from '../api'
import {
  RECEIVE_SELLER,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCRMENT_FOOD_COUNT,
  DECRMENT_FOOD_COUNT
} from './mutation-types'

export default {
  requestSeller({commit}) {
    requestSeller().then(response => {
      const result = response.data  // {code:0, data: seller}
      if(result.code===0) {
        const seller = result.data
        seller.score = 3.5
        commit(RECEIVE_SELLER, {seller})
      }
    })
  },

  requestRatings({commit}) {
    requestRatings().then(response => {
      const result = response.data  // {code:0, data: ratings}
      if(result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
      }
    })
  },

  requestGoods({commit}, cb) {
    requestGoods().then(response => {
      const result = response.data  // {code:0, data: goods}
      if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
        cb && cb()
      }
    })
  },

  // 增加/减少指定食物的数量
  updateFoodCount ({commit}, {food, isAdd}) {
    if(isAdd) {
      commit(INCRMENT_FOOD_COUNT, {food})
    } else {
      commit(DECRMENT_FOOD_COUNT, {food})
    }
  }
}